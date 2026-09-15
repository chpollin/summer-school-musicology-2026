# /// script
# requires-python = ">=3.10"
# dependencies = ["lxml==6.1.1"]
# ///
"""Check the seven M³GIM TEI files against TEI Lite and the course image layout.

Run from the corpus folder: uv run validate_tei.py tei
The bundled schema is used offline. Validation never repairs or rewrites XML.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

from lxml import etree

NS = {"tei": "http://www.tei-c.org/ns/1.0"}
XML_ID = "{http://www.w3.org/XML/1998/namespace}id"
EXPECTED = dict(zip((f"UAKUG_NIM_005_137_{n}" for n in [3, 7, 8, 9, 10, 11, 12]), [2, 2, 2, 2, 2, 6, 24], strict=True))


def check_file(path: Path, schema: etree.RelaxNG) -> int:
    parser = etree.XMLParser(resolve_entities=False, no_network=True, recover=False)
    tree = etree.parse(str(path), parser)
    if tree.docinfo.doctype:
        raise ValueError("DOCTYPE declarations are not part of this course profile.")
    schema.assertValid(tree)
    root = tree.getroot()
    identifier = root.get(XML_ID)
    if identifier not in EXPECTED or identifier != path.stem:
        raise ValueError("The TEI xml:id must match one of the seven source filenames.")
    if any(token in path.read_text(encoding="utf-8") for token in ["REPLACE_WITH_", "DOCUMENT_ID"]):
        raise ValueError("Template placeholders remain.")
    for location in [
        "tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:title",
        "tei:teiHeader/tei:fileDesc/tei:publicationStmt/tei:p",
        "tei:teiHeader/tei:fileDesc/tei:sourceDesc/tei:bibl/tei:title",
        "tei:teiHeader/tei:fileDesc/tei:sourceDesc/tei:bibl/tei:note[@type='holding-context']",
        "tei:teiHeader/tei:encodingDesc/tei:p",
    ]:
        node = root.find(location, NS)
        if node is None or not "".join(node.itertext()).strip():
            raise ValueError(f"Missing metadata or convention: {location}")
    source = root.find("tei:teiHeader/tei:fileDesc/tei:sourceDesc/tei:bibl", NS)
    identifier_node = source.find("tei:idno[@type='source-id']", NS)
    if identifier_node is None or identifier_node.text != identifier:
        raise ValueError("The source identifier does not match the file.")
    if not source.get("type"):
        raise ValueError("The source document type is missing.")
    languages = root.findall("tei:teiHeader/tei:profileDesc/tei:langUsage/tei:language", NS)
    if not languages or any(not re.fullmatch(r"[a-z]{2,3}(?:-[A-Za-z0-9]+)*", node.get("ident", "")) or node.get("ident") == "und" for node in languages):
        raise ValueError("Add verified language codes to langUsage.")
    for date in source.findall("tei:date", NS):
        if date.get("type") not in {"announced-performance", "publication"}:
            raise ValueError("Label the meaning of each source date.")
        if not date.get("when") and not "".join(date.itertext()).strip():
            raise ValueError("Empty source date.")
    body = root.find("tei:text/tei:body", NS)
    pages = body.findall("tei:pb", NS)
    expected = EXPECTED[identifier]
    if [page.get("n") for page in pages] != [str(n) for n in range(1, expected + 1)]:
        raise ValueError(f"Expected {expected} scan markers, in order, directly inside body.")
    for number, page in enumerate(pages, 1):
        relative = f"../png/{identifier}/{identifier}_p{number:03d}.png"
        if page.get("type") != "scan" or page.get("facs") != relative:
            raise ValueError(f"Scan {number}: image path or scan type does not match the course layout.")
        image = (path.parent / relative).resolve()
        if not image.is_file():
            raise ValueError(f"Scan {number}: PNG is missing or unreadable: {image}")
        with image.open("rb") as stream:
            if stream.read(8) != b"\x89PNG\r\n\x1a\n":
                raise ValueError(f"Scan {number}: invalid PNG signature: {image}")
        following = page.getnext()
        if following is None or following.tag == f"{{{NS['tei']}}}pb":
            raise ValueError(f"Scan {number}: no transcription after the scan marker.")
    for table in body.findall(".//tei:table", NS):
        rows = table.findall("tei:row", NS)
        widths = {len(row.findall("tei:cell", NS)) for row in rows}
        if len(widths) != 1 or 0 in widths:
            raise ValueError("Table rows have inconsistent cell counts.")
    return expected


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("tei_folder", type=Path)
    args = parser.parse_args()
    schema_path = Path(__file__).parent / "schema" / "tei_lite.rng"
    if not args.tei_folder.is_dir() or not schema_path.is_file():
        parser.error("Keep the tei folder, validate_tei.py and the bundled schema folder together.")
    schema = etree.RelaxNG(etree.parse(str(schema_path)))
    paths = sorted(args.tei_folder.glob("*.xml"))
    errors = []
    if {p.stem for p in paths} != set(EXPECTED):
        errors.append("The folder must contain exactly the seven source XML filenames.")
    total = 0
    for path in paths:
        try:
            total += check_file(path, schema)
        except (OSError, ValueError, etree.LxmlError) as error:
            errors.append(f"{path.name}: {error}")
        else:
            print(f"[OK] {path.name}")
    for error in errors:
        print(f"[ERROR] {error}", file=sys.stderr)
    print(f"Checked {len(paths)} files; {total} scans passed; {len(errors)} errors.")
    raise SystemExit(bool(errors))


if __name__ == "__main__":
    main()
