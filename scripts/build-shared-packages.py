"""Pack the course downloads from maintained local material files.

Run: python scripts/build-shared-packages.py
Preserves original PDFs and JPEGs and records hashes of local Drive derivatives.
Source and repair provenance remains in downloads/drive-materials.json.
"""

from __future__ import annotations

import hashlib
import json
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = ROOT / "downloads"


def pack(target: Path, members: list[tuple[Path | bytes, str]]) -> None:
    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
        for source, name in members:
            info = zipfile.ZipInfo(name, date_time=(2026, 9, 15, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(info, source if isinstance(source, bytes) else source.read_bytes())


def zip_members(archive: Path) -> list[tuple[bytes, str]]:
    with zipfile.ZipFile(archive) as source:
        return [(source.read(name), name) for name in source.namelist() if not name.endswith("/")]


M3GIM = DOWNLOADS / "m3gim-fulltext"
M3GIM_INSTRUCTIONS = ["exercise.md", "prompt.txt", "metadata-prompt.txt", "tei-prompt.txt", "tei-guide.md", "tei-template.xml", "validate_tei.py", "schema/tei_lite.rng", "schema/README.md"]


def session_packages() -> None:
    """One ZIP per session with everything its hands-ons need; the course page offers it as the single download."""
    shared = DOWNLOADS / "shared"
    viewer = ROOT / "tools" / "iiif-viewer"
    starter = [(DOWNLOADS / "m3gim-mobility-starter.csv", "m3gim-mobility-starter.csv"), (DOWNLOADS / "m3gim-mobility-starter-source.txt", "m3gim-mobility-starter-source.txt")]
    pdfs = [(p, f"m3gim/pdf/{p.name}") for p in sorted((M3GIM / "pdf").glob("*.pdf"))]
    # The Schulnachricht sits at the top level for the TEI and RDF hands-ons and inside the IIIF exercise folder.
    pack(DOWNLOADS / "session-1-materials.zip", [
        (shared / "schulnachricht.jpg", "schulnachricht.jpg"),
        (viewer / "STUDENT-GUIDE.md", "xml-iiif/README.md"),
        (viewer / "build_manifest.py", "xml-iiif/build_manifest.py"),
        (viewer / "metadata.xml", "xml-iiif/metadata.xml"),
        (viewer / "images" / "page-001.jpg", "xml-iiif/images/page-001.jpg"),
        (viewer / "images" / "page-002.jpg", "xml-iiif/images/page-002.jpg"),
        (shared / "schulnachricht.jpg", "xml-iiif/images/schulnachricht.jpg"),
    ])
    pack(DOWNLOADS / "session-2-materials.zip", [
        *[(shared / name, f"zweig-facsimiles/{name}") for name in ["szd-facsimile-0.jpg", "szd-facsimile-1.jpg", "szd-facsimiles-PROVENANCE.md"]],
        *starter,
        *pdfs,
        *[(data, f"m3gim/{name}") for data, name in zip_members(M3GIM / "m3gim-png.zip")],
        *[(M3GIM / name, f"m3gim/{name}") for name in M3GIM_INSTRUCTIONS],
    ])
    pack(DOWNLOADS / "sessions-3-4-materials.zip", [
        *starter,
        *pdfs,
        (DOWNLOADS / "m3gim-dataset.jsonld", "m3gim-dataset.jsonld"),
        (DOWNLOADS / "m3gim-dataset-source.txt", "m3gim-dataset-source.txt"),
    ])


def main() -> None:
    shared = DOWNLOADS / "shared"
    pack(
        DOWNLOADS / "szd-facsimiles.zip",
        [
            (shared / name, name)
            for name in [
                "szd-facsimile-0.jpg",
                "szd-facsimile-1.jpg",
                "szd-facsimiles-PROVENANCE.md",
            ]
        ],
    )
    for name in ["ai-harness", "python-vscode"]:
        members = [
            (DOWNLOADS / name / filename, f"{name}/{filename}")
            for filename in ["README.md", "pdf_to_images.py"]
        ]
        members.extend(
            (p, f"{name}/input/{p.name}")
            for p in sorted((DOWNLOADS / "m3gim-fulltext" / "pdf").glob("*.pdf"))
        )
        pack(DOWNLOADS / f"{name}.zip", members)
    pack(
        DOWNLOADS / "shared-materials.zip",
        [(p, p.name) for p in sorted(shared.iterdir()) if p.is_file()],
    )
    session_packages()
    session_packages()
    manifest_path = DOWNLOADS / "drive-materials.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    for record in manifest["files"]:
        path = ROOT / record["path"]
        record["sha256"] = hashlib.sha256(path.read_bytes()).hexdigest()
        record["local_size"] = path.stat().st_size
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("[OK] Rebuilt the facsimile, introductory, shared and per-session archives.")


if __name__ == "__main__":
    main()
