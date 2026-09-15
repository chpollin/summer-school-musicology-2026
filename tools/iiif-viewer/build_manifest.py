# /// script
# requires-python = ">=3.11"
# dependencies = ["lxml>=5,<7", "Pillow>=10,<13"]
# ///
"""Convert the workshop's viewer XML and local images into IIIF Presentation 3.

Run: python build_manifest.py metadata.xml
The local URL matches the server command in README.md. The mapping is a teaching
example, not the GAMS ingest transformation. Original XML values are preserved.
"""

import argparse
import json
import sys
from pathlib import Path
from urllib.parse import quote

from lxml import etree
from PIL import Image

NS = {"v": "http://gams.uni-graz.at/viewer"}
HREF = "{http://www.w3.org/1999/xlink}href"
BASE = "http://localhost:8000"


def build(source: Path) -> dict:
    root_dir = source.resolve().parent
    parser = etree.XMLParser(resolve_entities=False, no_network=True, load_dtd=False)
    tree = etree.parse(str(source), parser)
    if tree.docinfo.doctype:
        raise ValueError("DOCTYPE declarations are not supported in this exercise.")
    root = tree.getroot()
    if root.tag != f"{{{NS['v']}}}book":
        raise ValueError('Expected <book xmlns="http://gams.uni-graz.at/viewer">.')

    def value(path: str) -> str:
        element = root.find(path, NS)
        return "" if element is None else "".join(element.itertext()).strip()

    title = value("v:title")
    if not title:
        raise ValueError("Fill in <title> before generating the manifest.")
    manifest = {
        "@context": "http://iiif.io/api/presentation/3/context.json",
        "id": f"{BASE}/manifest.json",
        "type": "Manifest",
        "label": {"none": [title]},
        "metadata": [],
        "items": [],
    }
    fields = {
        "v:author": "Creator (as recorded)",
        "v:idno": "Source repository identifier",
        "v:date": "Date (as recorded)",
        "v:owner/v:name": "Institution / website / rights (as recorded)",
        "v:language": "Language",
        "v:category": "Document type",
        "v:languageCode": "Language code",
        "v:source": "Shelfmark",
    }
    for path, label in fields.items():
        content = value(path)
        if content:
            manifest["metadata"].append(
                {"label": {"en": [label]}, "value": {"none": [content]}}
            )
    pages = root.findall("v:structure/v:div/v:page", NS)
    if not pages:
        raise ValueError("Add at least one <page> inside <structure><div>.")
    for index, page in enumerate(pages, 1):
        reference = page.get(HREF, "").strip()
        if not reference:
            raise ValueError(
                f"Page {index}: fill xlink:href, e.g. images/page-001.jpg."
            )
        image_path = (root_dir / reference).resolve()
        if not image_path.is_relative_to(root_dir):
            raise ValueError(
                f"Page {index}: images must be inside the exercise folder."
            )
        if not image_path.is_file():
            raise FileNotFoundError(f"Page {index}: image not found: {reference}")
        with Image.open(image_path) as picture:
            if picture.format not in {"JPEG", "PNG"}:
                raise ValueError(f"Page {index}: use JPEG or PNG images.")
            width, height = picture.size
            media_type = Image.MIME[picture.format]
            picture.verify()
        image_url = f"{BASE}/{quote(image_path.relative_to(root_dir).as_posix())}"
        canvas_id = f"{BASE}/canvas/{index}"
        body = {
            "id": image_url,
            "type": "Image",
            "format": media_type,
            "width": width,
            "height": height,
        }
        manifest["items"].append(
            {
                "id": canvas_id,
                "type": "Canvas",
                "label": {"en": [f"Page {index}"]},
                "width": width,
                "height": height,
                "thumbnail": [body.copy()],
                "items": [
                    {
                        "id": f"{BASE}/page/{index}",
                        "type": "AnnotationPage",
                        "items": [
                            {
                                "id": f"{BASE}/annotation/{index}",
                                "type": "Annotation",
                                "motivation": "painting",
                                "body": body,
                                "target": canvas_id,
                            }
                        ],
                    }
                ],
            }
        )
    return manifest


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("xml", type=Path, help="XML file in the exercise folder")
    args = parser.parse_args()
    try:
        manifest = build(args.xml)
        output = args.xml.resolve().parent / "manifest.json"
        temporary = output.with_suffix(".json.tmp")
        temporary.write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        temporary.replace(output)
    except (OSError, ValueError, etree.XMLSyntaxError) as error:
        parser.exit(1, f"ERROR: {error}\n")
    print(f"OK: {output.name} created with {len(manifest['items'])} pages.")
    print("Open https://chpollin.github.io/summer-school-musicology-2026/tools/iiif-viewer/")
    print("Select manifest.json and the referenced images, then click Open in Mirador.")


if __name__ == "__main__":
    main()
