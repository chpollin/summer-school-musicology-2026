# M³GIM · Corpus for Session 3

This folder contains seven TEI P5 documents with full text and document metadata, the seven edited original-language TXT files in `text/`, and the 40 PNG scans they reference. This is an optional reference or fallback. Your own complete selection of one or two documents, or all seven, is the primary input for Session 3.

Keep `tei/` and `png/` beside one another. Each `pb/@facs` path is relative to its TEI file. Open the XML files in your editor; image links may not open automatically in a generic XML editor.

## Check before continuing

Run `uv run validate_tei.py tei --full-corpus` to check this complete reference bundle. For your own selection, run `uv run validate_tei.py tei` from this folder. The checker uses the local TEI Lite schema. Open at least one scan and compare it with the corresponding text.

## Build a static web publication

In Session 3, build a small static web publication using your TEI and images. Display document metadata, the full transcription and the matching scan. In Session 4, extend that publication or another research requirement.

Read document metadata from `teiHeader`. Read transcribed content from `text/body`. Follow each `pb/@facs` link to inspect source evidence. The table in _11 scan 3 is represented with `table/row/cell`.

`metadata.csv` gives a compact overview. `metadata.json` includes extraction evidence and distinguishes supplied context from printed information. `review-notes.md` records the review scope and text corrections.

The texts are edited LLM reference transcriptions with remaining uncertainty markers. Their conversion to XML preserves that text and does not constitute an additional expert reading. Dates of announced performances remain distinct from publication dates.

Sources: UAKUG, collection NIM, Ira Malaniuk materials used in M³GIM (Mapping Mobile Musicians).
