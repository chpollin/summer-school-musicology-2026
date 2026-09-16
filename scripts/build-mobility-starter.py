"""Build a small, traceable teaching sample and reference-viewer data."""

import csv
import json
import io
import subprocess
from collections import Counter
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SELECTION = {
    3469: ("document", "not_flagged"),
    3470: ("event", "inferred_year"),
    3472: ("event", "year_requires_review"),
    3473: ("event", "year_requires_review"),
    3543: ("document", "not_flagged"),
    3544: ("event", "not_flagged"),
    3557: ("document", "not_flagged"),
    3558: ("mention", "inferred_day"),
    3295: ("event", "not_flagged"),
    3297: ("event", "not_flagged"),
    535: ("document", "not_flagged"),
    543: ("document", "not_flagged"),
}
FIELDS = [
    "evidence_id", "document_id", "date", "place", "recorded_role",
    "date_type", "date_status", "title", "source_statement", "note", "source_url",
]


def main():
    original_csv = subprocess.run(
        ["git", "show", "f2d0608:downloads/m3gim-mobility-evidence.csv"],
        cwd=ROOT, check=True, capture_output=True, encoding="utf-8",
    ).stdout
    source = {row["evidence_id"]: row for row in csv.DictReader(io.StringIO(original_csv))}
    rows = []
    for number, (date_type, status) in SELECTION.items():
        original = source[f"box1-row-{number}"]
        date.fromisoformat(original["date"])
        row = {key: original[key] for key in FIELDS if key in original}
        row.update(date_type=date_type, date_status=status)
        row["note"] = " ".join(filter(None, [
            original["cataloguing_note"], original["context_note"]
        ]))
        if status == "year_requires_review":
            row["note"] += " Teaching flag: the same enquiry contains an inferred year; this related event year needs source review."
        rows.append(row)
    rows.sort(key=lambda row: (row["date"], row["evidence_id"]))
    assert len(rows) == len({row["evidence_id"] for row in rows}) == 12
    assert len({row["place"] for row in rows}) == 3
    assert len({row["document_id"] for row in rows}) == 6
    assert any(n > 1 for n in Counter((r["place"], r["date"]) for r in rows).values())
    for row in rows:
        for key in FIELDS:
            if key in source[row["evidence_id"]]:
                assert row[key] == source[row["evidence_id"]][key]
    with (ROOT / "downloads/m3gim-mobility-starter.csv").open(
        "w", encoding="utf-8", newline=""
    ) as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(rows)
    viewer = ROOT / "tools/mobility-starter"
    viewer.mkdir(parents=True, exist_ok=True)
    (viewer / "data.json").write_text(
        json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps({
        "rows": len(rows), "documents": len({r["document_id"] for r in rows}),
        "places": sorted({r["place"] for r in rows}),
        "date_range": [rows[0]["date"], rows[-1]["date"]],
        "date_types": dict(Counter(r["date_type"] for r in rows)),
        "date_status": dict(Counter(r["date_status"] for r in rows)),
    }, ensure_ascii=True, indent=2))


if __name__ == "__main__":
    main()
