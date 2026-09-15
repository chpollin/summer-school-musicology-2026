# /// script
# requires-python = ">=3.10"
# dependencies = ["pypdfium2", "Pillow"]
# ///
"""Render a folder of PDFs to numbered PNG scan pages."""

from __future__ import annotations

import argparse
from pathlib import Path

import pypdfium2 as pdfium


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="Folder containing the source PDFs")
    parser.add_argument("output", type=Path, help="New folder for numbered PNG images")
    parser.add_argument("--dpi", type=int, default=220)
    args = parser.parse_args()
    if not args.input.is_dir():
        parser.error("The input folder does not exist.")
    if not 72 <= args.dpi <= 600:
        parser.error("Choose a resolution from 72 to 600 dpi.")
    sources = sorted(p for p in args.input.iterdir() if p.suffix.lower() == ".pdf")
    if not sources:
        parser.error("No PDFs found in the input folder.")
    if len({p.stem.casefold() for p in sources}) != len(sources):
        parser.error("PDF filenames must have unique document IDs.")
    if args.output.exists():
        parser.error("The output folder already exists. Choose a new folder.")
    args.output.mkdir(parents=True)
    total = 0
    for source in sources:
        destination = args.output / source.stem
        destination.mkdir()
        with pdfium.PdfDocument(source) as document:
            page_count = len(document)
            for index in range(len(document)):
                page = document[index]
                try:
                    bitmap = page.render(scale=args.dpi / 72)
                    try:
                        with bitmap.to_pil() as image:
                            image.save(destination / f"{source.stem}_p{index + 1:03d}.png")
                    finally:
                        bitmap.close()
                finally:
                    page.close()
                total += 1
        print(f"{source.name}: {page_count} scan pages")
    print(f"Created {total} PNGs in {args.output.resolve()}")


if __name__ == "__main__":
    main()
