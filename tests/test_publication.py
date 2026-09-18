"""Check the course packages against the published exercise inputs.

Run: uv run pytest -q. Real package members verify extraction and provenance;
temporary files exercise failed and repeated archive generation.
"""

import importlib.util
import zipfile
from pathlib import Path, PurePosixPath

import pytest
from lxml import etree

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "packages", ROOT / "scripts/build-shared-packages.py"
)
packages = importlib.util.module_from_spec(spec)
spec.loader.exec_module(packages)


def test_session_two_contains_context_and_source_images() -> None:
    with zipfile.ZipFile(ROOT / "downloads/session-2-materials.zip") as archive:
        for name in ["metadata.csv", "metadata.json", "manifest.json"]:
            assert archive.read(f"m3gim/{name}") == (
                ROOT / "downloads/m3gim-fulltext" / name
            ).read_bytes().replace(b"\r\n", b"\n")
        for page in ["001", "002"]:
            name = f"png/UAKUG_NIM_005_137_3/UAKUG_NIM_005_137_3_p{page}.png"
            assert (
                archive.read(f"m3gim/{name}")
                == (ROOT / "downloads/m3gim-fulltext" / name).read_bytes()
            )


@pytest.mark.parametrize(
    "name", ["session-1-materials", "session-2-materials", "sessions-3-4-materials"]
)
def test_session_packages_preserve_reuse_conditions(name: str) -> None:
    with zipfile.ZipFile(ROOT / "downloads" / f"{name}.zip") as archive:
        assert archive.testzip() is None
        assert len(archive.namelist()) == len(set(archive.namelist()))
        assert archive.read("LICENSE-CONTENT.md") == (
            ROOT / "LICENSE-CONTENT.md"
        ).read_bytes().replace(b"\r\n", b"\n")


def test_failed_pack_preserves_previous_download(tmp_path: Path) -> None:
    target = tmp_path / "course.zip"
    packages.pack(target, [(b"original", "file.txt")])
    before = target.read_bytes()
    with pytest.raises(FileNotFoundError):
        packages.pack(target, [(tmp_path / "missing.txt", "file.txt")])
    assert target.read_bytes() == before
    assert not list(tmp_path.glob("*.tmp"))


def test_pack_is_stable_across_input_order(tmp_path: Path) -> None:
    target = tmp_path / "course.zip"
    members = [(b"one\r\n", "one.txt"), (b"two", "two.txt")]
    packages.pack(target, members)
    before = target.read_bytes()
    packages.pack(target, list(reversed(members)))
    assert target.read_bytes() == before


def test_reference_tei_retains_all_scan_links() -> None:
    with zipfile.ZipFile(
        ROOT / "downloads/m3gim-fulltext/m3gim-next-session.zip"
    ) as archive:
        names = archive.namelist()
        schema = etree.RelaxNG(
            etree.fromstring(archive.read("m3gim-work/schema/tei_lite.rng"))
        )
        documents = [
            name
            for name in names
            if name.startswith("m3gim-work/tei/") and name.endswith(".xml")
        ]
        assert len(documents) == 7
        pages = 0
        for name in documents:
            tree = etree.fromstring(
                archive.read(name),
                etree.XMLParser(resolve_entities=False, no_network=True),
            )
            schema.assertValid(tree)
            for page in tree.iter("{http://www.tei-c.org/ns/1.0}pb"):
                reference = page.get("facs")
                assert reference.startswith("../png/")
                assert (
                    str(
                        PurePosixPath(name).parent.parent
                        / reference.removeprefix("../")
                    )
                    in names
                )
                pages += 1
        assert pages == 40
