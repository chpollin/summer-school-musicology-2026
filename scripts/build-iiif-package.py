"""Pack the IIIF exercise package for download from the files in tools/iiif-viewer.

Run: python scripts/build-iiif-package.py
Fixed timestamps keep the archive byte-identical across runs, so git only changes when a source file does.
"""

from __future__ import annotations

import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tools" / "iiif-viewer"
TARGET = ROOT / "downloads" / "xml-iiif-workshop.zip"
PREFIX = "xml-iiif-workshop"
FILES = {
    "build_manifest.py": "build_manifest.py",
    "metadata.xml": "metadata.xml",
    "images/page-001.jpg": "images/page-001.jpg",
    "images/page-002.jpg": "images/page-002.jpg",
    "README.md": "STUDENT-GUIDE.md",
}
FIXED_TIME = (2026, 1, 1, 0, 0, 0)


def main() -> None:
    with zipfile.ZipFile(TARGET, "w") as archive:
        for name, source in FILES.items():
            info = zipfile.ZipInfo(f"{PREFIX}/{name}", date_time=FIXED_TIME)
            info.compress_type = zipfile.ZIP_DEFLATED
            # Unix origin with a regular-file mode, so extraction gives the same permissions on every platform.
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            data = (SOURCE / source).read_bytes()
            # Git checks text out with CRLF on Windows; the archive carries LF regardless of the packing platform.
            if not name.endswith(".jpg"):
                data = data.replace(b"\r\n", b"\n")
            archive.writestr(info, data)
    print(f"Wrote {TARGET.relative_to(ROOT)} with {len(FILES)} files.")


if __name__ == "__main__":
    main()
