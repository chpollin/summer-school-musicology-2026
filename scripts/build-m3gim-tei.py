# /// script
# requires-python = ">=3.10"
# dependencies = ["lxml==6.1.1"]
# ///
"""Build the M³GIM TEI teaching references from reviewed text and metadata.

Run: uv run scripts/build-m3gim-tei.py
Source text remains in reference.json; metadata evidence is in metadata.json.
The existing PNG and raw-text archives provide the reusable course inputs.
"""

from __future__ import annotations

import csv
import json
import zipfile
from pathlib import Path

from lxml import etree

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "downloads" / "m3gim-fulltext"
NS = "http://www.tei-c.org/ns/1.0"
XML = "http://www.w3.org/XML/1998/namespace"
LANGUAGES = {"de": "German", "en": "English", "fr": "French"}


def element(parent: etree._Element, name: str, text: str | None = None, **attrs: str) -> etree._Element:
    node = etree.SubElement(parent, f"{{{NS}}}{name}", **attrs)
    node.text = text
    return node


def paragraph(body: etree._Element, text: str) -> None:
    lines = text.split("\n")
    node = element(body, "p", lines[0])
    for line in lines[1:]:
        element(node, "lb").tail = line


def source_text(body: etree._Element, text: str) -> None:
    for block in text.split("\n\n"):
        if "\t" in block and block.startswith("Kleines Alphabet"):
            table = element(body, "table")
            for index, line in enumerate(block.rstrip("\n").split("\n")):
                row = element(table, "row", **({"role": "label"} if index == 0 else {}))
                for value in line.split("\t"):
                    element(row, "cell", value)
        else:
            paragraph(body, block)


def build_document(metadata: dict, reference: dict, manifest: dict) -> etree._Element:
    identifier = metadata["id"]
    root = etree.Element(f"{{{NS}}}TEI", nsmap={None: NS})
    root.set(f"{{{XML}}}id", identifier)
    header = element(root, "teiHeader")
    description = element(header, "fileDesc")
    titles = element(description, "titleStmt")
    element(titles, "title", f"{metadata['title']} — course transcription")
    element(description, "extent", f"{metadata['scan_pages']} PDF scan pages")
    publication = element(description, "publicationStmt")
    element(publication, "p", "Edited teaching reference prepared for Summer School Musicology 2026 from recorded LLM transcriptions; TEI conversion and metadata review by Codex on 15 September 2026.")
    sources = element(description, "sourceDesc")
    bibl = element(sources, "bibl", type=metadata["document_type"])
    title = element(bibl, "title", metadata["title"], type="main")
    title.set(f"{{{XML}}}lang", "de")
    for alternative in metadata["alternative_titles"]:
        title = element(bibl, "title", alternative["text"], type="alternative")
        title.set(f"{{{XML}}}lang", alternative["language"])
    element(bibl, "idno", identifier, type="source-id")
    element(bibl, "date", metadata["date_as_printed"], type=metadata["date_type"], when=metadata["date"])
    if metadata["place_type"] == "publication":
        element(bibl, "pubPlace", metadata["place"])
    else:
        element(bibl, "name", metadata["place"], type="performance-place")
    if metadata["publisher"]:
        element(bibl, "publisher", metadata["publisher"])
    element(bibl, "note", "Archive of the University of Music and Performing Arts Graz (UAKUG), collection NIM; Ira Malaniuk materials used in M³GIM. Identifier and holding context supplied with the course materials.", type="holding-context")
    evidence = f"Main title: scan {metadata['title_scan']}. Date: scan {metadata['date_scan']}. {metadata['metadata_note']} Place: {metadata['place_evidence']} Languages: {metadata['language_evidence']}"
    element(bibl, "note", evidence, type="metadata-evidence")
    element(bibl, "ref", "Supplied source PDF", target=manifest["source_url"])
    encoding = element(header, "encodingDesc")
    element(encoding, "p", "One pb per PDF scan, including spreads; n is the scan sequence. Each facs path is relative to this XML file. Text blocks and lb follow the edited transcription. Curly braces mark handwriting; [?] marks uncertainty; [illegible] marks unreadable text. The cast table preserves rows and empty cells. Textual readings retain the review status documented in review-notes.md.")
    profile = element(header, "profileDesc")
    usage = element(profile, "langUsage")
    for language in metadata["languages"]:
        element(usage, "language", LANGUAGES[language], ident=language)
    text = element(root, "text")
    body = element(text, "body")
    for page in reference["pages"]:
        number = page["page"]
        marker = element(body, "pb", type="scan", n=str(number), facs=f"../png/{identifier}/{identifier}_p{number:03d}.png")
        marker.set(f"{{{XML}}}id", f"scan_{number:03d}")
        source_text(body, page["transcription"].strip())
    return root


def archive_files(archive: zipfile.ZipFile, names: list[str]) -> None:
    for name in names:
        archive.write(OUT / name, name)


def main() -> None:
    metadata = json.loads((OUT / "metadata.json").read_text(encoding="utf-8"))
    references = {d["id"]: d for d in json.loads((OUT / "reference.json").read_text(encoding="utf-8"))["documents"]}
    manifests = {d["id"]: d for d in json.loads((OUT / "manifest.json").read_text(encoding="utf-8"))["documents"]}
    schema = etree.RelaxNG(etree.parse(str(OUT / "schema" / "tei_lite.rng")))
    (OUT / "tei").mkdir(exist_ok=True)
    for record in metadata["documents"]:
        root = build_document(record, references[record["id"]], manifests[record["id"]])
        schema.assertValid(root)
        (OUT / "tei" / f"{record['id']}.xml").write_bytes(etree.tostring(root, xml_declaration=True, encoding="UTF-8", pretty_print=True))
    with (OUT / "metadata.csv").open("w", encoding="utf-8", newline="") as stream:
        fields = ["id", "title", "languages", "document_type", "date", "date_type", "place", "place_type", "publisher", "scan_pages"]
        writer = csv.DictWriter(stream, fieldnames=fields)
        writer.writeheader()
        for record in metadata["documents"]:
            writer.writerow({**{field: record[field] for field in fields}, "languages": ";".join(record["languages"])})
    instructions = ["exercise.md", "prompt.txt", "slide-text.md", "pdf_to_png.py", "manifest.json", "metadata-prompt.txt", "tei-prompt.txt", "tei-guide.md", "tei-template.xml", "validate_tei.py", "schema/tei_lite.rng", "schema/README.md", "NEXT-SESSION.md"]
    with zipfile.ZipFile(OUT / "m3gim-instructions.zip", "w", zipfile.ZIP_DEFLATED) as archive:
        archive_files(archive, instructions)
    with zipfile.ZipFile(OUT / "m3gim-reference.zip") as archive:
        raw = {name: archive.read(name) for name in archive.namelist() if name.startswith("raw/")}
    references_to_package = ["reference.json", "corrections.json", "review-notes.md", "manifest.json", "UAKUG_NIM_005_137_11_p003.tsv", "metadata.json", "metadata.csv", "tei-guide.md", "validate_tei.py", "schema/tei_lite.rng", "schema/README.md", "NEXT-SESSION.md"]
    texts = [f"text/{identifier}.txt" for identifier in references]
    tei = [f"tei/{identifier}.xml" for identifier in references]
    with zipfile.ZipFile(OUT / "m3gim-reference.zip", "w", zipfile.ZIP_DEFLATED) as archive:
        archive_files(archive, references_to_package + texts + tei)
        for name, data in raw.items():
            archive.writestr(name, data)
    with zipfile.ZipFile(OUT / "m3gim-next-session.zip", "w", zipfile.ZIP_DEFLATED) as archive:
        for name in tei + texts + ["metadata.json", "metadata.csv", "review-notes.md", "tei-guide.md", "validate_tei.py", "schema/tei_lite.rng", "schema/README.md", "NEXT-SESSION.md"]:
            archive.write(OUT / name, f"m3gim-work/{name}")
        with zipfile.ZipFile(OUT / "m3gim-png.zip") as images:
            for name in images.namelist():
                archive.writestr(f"m3gim-work/{name}", images.read(name))
    print("[OK] Built and TEI-Lite-validated seven TEI files; updated three course archives.")


if __name__ == "__main__":
    main()
