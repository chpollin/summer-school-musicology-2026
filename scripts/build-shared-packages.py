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


def pack(target: Path, members: list[tuple[Path, str]]) -> None:
    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
        for path, name in members:
            info = zipfile.ZipInfo(name, date_time=(2026, 9, 15, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(info, path.read_bytes())


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
    manifest_path = DOWNLOADS / "drive-materials.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    for record in manifest["files"]:
        path = ROOT / record["path"]
        record["sha256"] = hashlib.sha256(path.read_bytes()).hexdigest()
        record["local_size"] = path.stat().st_size
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("[OK] Rebuilt the facsimile, introductory and shared archives.")


if __name__ == "__main__":
    main()
