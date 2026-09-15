# /// script
# requires-python = ">=3.11"
# dependencies = ["pypdfium2>=4.30,<6", "Pillow>=11,<13"]
# ///
"""Render every PDF in input/ into output/<PDF name>/page-001.png, etc.

Run: python pdf_to_images.py
Alternative: uv run pdf_to_images.py
The default folders are next to this script. All PDFs directly inside input/
are processed at 150 DPI. The script creates output/ and its subfolders.
Existing output is preserved; use --output output-new for another run.
"""

import argparse
import sys
from contextlib import closing
from importlib import import_module
from pathlib import Path
from tempfile import TemporaryDirectory


def render_pdf(source: Path, destination: Path, dpi: int) -> int:
    """Write one PNG per page, preserving page order and dimensions."""
    import pypdfium2 as pdfium

    with closing(pdfium.PdfDocument(source)) as document:
        if len(document) == 0:
            raise ValueError("The PDF contains no pages.")
        for index in range(len(document)):
            page = document[index]
            try:
                bitmap = page.render(scale=dpi / 72)
                try:
                    with bitmap.to_pil() as image:
                        image.save(
                            destination / f"page-{index + 1:03}.png",
                            dpi=(dpi, dpi),
                        )
                finally:
                    bitmap.close()
            finally:
                page.close()
        return len(document)


def main() -> int:
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8")

    script_folder = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--input",
        type=Path,
        default=script_folder / "input",
        help="PDF folder (default: input/ next to this script)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=script_folder / "output",
        help="New output folder (default: output/ next to this script)",
    )
    parser.add_argument("--dpi", type=int, default=150)
    args = parser.parse_args()
    input_folder = args.input.resolve()
    output_folder = args.output.resolve()

    if not input_folder.is_dir():
        parser.error(f"Input folder not found: {input_folder}. Create it and add PDFs.")
    if args.dpi <= 0:
        parser.error("--dpi must be a positive integer.")
    pdfs = sorted(
        (
            path
            for path in input_folder.iterdir()
            if path.is_file() and path.suffix.casefold() == ".pdf"
        ),
        key=lambda path: path.name.casefold(),
    )
    if not pdfs:
        parser.error(f"No PDFs found directly inside {input_folder}.")
    names = [path.stem.casefold() for path in pdfs]
    if len(set(names)) != len(names) or any(name in {"", ".", ".."} for name in names):
        parser.error("PDF names must produce distinct, valid output folder names.")
    if output_folder.exists():
        parser.error(
            f"Output already exists: {output_folder}. Use --output output-new."
        )
    try:
        import_module("pypdfium2")
        import_module("PIL.Image")
    except ImportError:
        parser.error(
            "Install the dependencies: python -m pip install "
            '"pypdfium2>=4.30,<6" "Pillow>=11,<13"'
        )

    output_folder.mkdir(parents=True)
    print(f"[OK] Input: {input_folder}")
    print(f"[OK] Output: {output_folder}")
    print(f"[OK] Found {len(pdfs)} PDFs; rendering at {args.dpi} DPI.")
    errors = []
    page_count = 0
    for source in pdfs:
        destination = output_folder / source.stem
        try:
            # Publish a document folder only after every page was written.
            with TemporaryDirectory(prefix=".render-", dir=output_folder) as temporary:
                pages = render_pdf(source, Path(temporary), args.dpi)
                Path(temporary).rename(destination)
        except Exception as error:
            errors.append({"pdf": source.name, "error": str(error)})
            print(f"[ERROR] {source.name}: {error}", file=sys.stderr)
            continue
        page_count += pages
        print(f"[OK] {source.name}: {pages} images -> {destination}")

    print(
        f"[SUMMARY] {len(pdfs) - len(errors)}/{len(pdfs)} PDFs converted; "
        f"{page_count} images; {len(errors)} errors."
    )
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
