"""Create small WebP display copies from the versioned PNG title exports.

Run with uv run scripts/build-title-images.py. The original PNGs remain available
for social previews and fallback display. See knowledge/specification.md.
"""

import argparse
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "sessions", nargs="+", help="Session IDs from scripts/sessions.mjs"
    )
    args = parser.parse_args()
    sources = ROOT / "assets" / "slides"
    for identifier in args.sessions:
        if (
            not identifier.startswith("session-")
            or not identifier.removeprefix("session-").isdigit()
        ):
            raise ValueError(f"Invalid session ID: {identifier}")
        source = sources / f"{identifier}.png"
        with Image.open(source) as image:
            for width in (480, 960):
                size = (width, round(image.height * width / image.width))
                target = source.with_name(f"{source.stem}-{width}.webp")
                image.convert("RGB").resize(size, Image.Resampling.LANCZOS).save(
                    target, "WEBP", quality=88, method=6
                )
                print(
                    f"[OK] {target.relative_to(ROOT)} ({target.stat().st_size} bytes)"
                )


if __name__ == "__main__":
    main()
