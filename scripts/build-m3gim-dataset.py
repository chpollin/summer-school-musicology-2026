# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Copy the pinned published M3GIM graph unchanged and document its structure.

Run with python scripts/build-m3gim-dataset.py. The upstream Git blob hash
verifies source bytes; an existing verified download is reused. The source
README identifies this graph as the frontend's single archival data source.
"""

import hashlib
import json
import sys
from collections import Counter
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
REVISION = "bec2a068802e9f2cb9885df072699b269d6efaa9"
BLOB = "77fa9bc2e8bce7e7a7320db0dc7535532f4e4cac"
REPO = "https://github.com/DigitalHumanitiesCraft/m3gim"
SOURCE = f"https://raw.githubusercontent.com/DigitalHumanitiesCraft/m3gim/{REVISION}/docs/data/m3gim.jsonld"
DESTINATION = ROOT / "downloads" / "m3gim-dataset.jsonld"


def verify(payload: bytes) -> dict:
    header = f"blob {len(payload)}\0".encode()
    actual = hashlib.sha1(header + payload).hexdigest()
    if actual != BLOB:
        raise ValueError(f"Source blob mismatch: expected {BLOB}, got {actual}")
    data = json.loads(payload)
    graph = data["@graph"]
    ids = [node["@id"] for node in graph]
    if len(ids) != len(set(ids)):
        raise ValueError("The source graph contains duplicate top-level IDs")
    if not isinstance(data["@context"], dict):
        raise ValueError("Expected an embedded JSON-LD context")
    return data


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    if DESTINATION.exists():
        payload = DESTINATION.read_bytes()
    else:
        request = Request(
            SOURCE,
            headers={
                "User-Agent": "M3GIM-course-snapshot (christopher.pollin@dhcraft.org)"
            },
        )
        with urlopen(request, timeout=60) as response:
            payload = response.read()
    data = verify(payload)
    counts = Counter(node["@type"] for node in data["@graph"])
    sha256 = hashlib.sha256(payload).hexdigest()
    summary = "\n".join(f"- {kind}: {count}" for kind, count in sorted(counts.items()))
    provenance = f"""M3GIM dataset — full published archival graph

File: m3gim-dataset.jsonld
Purpose: data for an independent research dashboard or other research tool.
Scope: the complete archival JSON-LD file shipped by the M3GIM frontend at
the pinned revision below. It is not the twelve-statement starter CSV.

SOURCE AND INTEGRITY
Project: M³GIM — Mapping Mobile Musicians, Digital Humanities Craft.
Archival fonds: UAKUG/NIM, Universitätsarchiv der Kunstuniversität Graz.
Repository: {REPO}
Revision: {REVISION}
Source: {SOURCE}
Upstream exportDate (not a historical event date): {data.get("m3gim-ontology:exportDate")}
Snapshot prepared: 2026-09-16
Bytes: {len(payload)}
SHA-256: {sha256}
Git blob SHA-1: {BLOB}
The downloaded data is byte-identical to the pinned source: no fields,
IDs, relations, dates or notes were changed or inferred.

STRUCTURE
JSON-LD is JSON with a vocabulary context. It can be read with standard
JSON tools. @context defines prefixes; @graph contains {len(data["@graph"])} top-level nodes.
Verified node counts:
{summary}
These are graph-node counts, not numbers of people, performances or trips.
People, places, dates and relations also occur within nested structures.

- @id: persistent node identifier; join references by this value.
- @type: node class, such as rico:Record or m3gim-ontology:Annotation.
- rico:identifier / rico:title: archival identifier and recorded title.
- rico:hasOrHadPart: archival hierarchy references.
- rico:hasOrHadLocation: place statements, including roles and source values.
- agrelon:metadataProvenance: annotation link to its supporting record.
- m3gim-ontology:xlsxSource: original source sheet and row, where present.
- m3gim-ontology:recordedValue / recordedRole: original recorded statements.
- rico:date / m3gim-ontology:atDate: dates whose meaning depends on the
  associated record, role and notes. Values can be incomplete or uncertain.
Fields vary by node type; inspect nested values before choosing a chart.

INTERPRETATION AND LIMITS
The upstream project is a prerelease with known cataloguing/source defects
and pending scholarly acceptance. Missing values are not negative evidence.
Document dates, event references and biographical dates must remain distinct.
Mentions and place statements do not by themselves confirm attendance or
travel routes. Do not infer gender from names. Preserve source IDs and notes.
This snapshot includes the full published graph at this revision, not every
original spreadsheet, facsimile, source document, or map geometry file.
Use the original source repository for those materials and quality reports.
Linked external resources may require network access.

LICENCE AND ATTRIBUTION
The upstream README licenses generated data under CC BY 4.0:
https://creativecommons.org/licenses/by/4.0/
Credit: Digital Humanities Craft / M³GIM; archival fonds UAKUG/NIM,
Universitätsarchiv der Kunstuniversität Graz. Cite the revision above.
The archival source materials themselves are outside this data licence;
individual items retain their own rights notes.

Evidence for the source contract and licence:
{REPO}/blob/{REVISION}/README.md
Frontend loader:
{REPO}/blob/{REVISION}/docs/js/data/loader.js
Data model:
{REPO}/blob/{REVISION}/knowledge/data-model.md
Quality snapshot:
{REPO}/blob/{REVISION}/data/reports/quality-snapshot.md

REPRODUCE
From the course repository: python scripts/build-m3gim-dataset.py
The script reuses this file when present and validates its pinned Git hash.
"""
    DESTINATION.write_bytes(payload)
    DESTINATION.with_name("m3gim-dataset-source.txt").write_text(
        provenance, encoding="utf-8", newline="\n"
    )
    print(
        json.dumps(
            {
                "bytes": len(payload),
                "nodes": len(data["@graph"]),
                "types": dict(counts),
                "sha256": sha256,
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
