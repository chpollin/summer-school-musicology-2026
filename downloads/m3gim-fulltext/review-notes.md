# Reference texts · Review notes

## Scope and provenance

Seven complete document transcriptions cover 40 scan pages. They derive from the existing M³GIM demonstration pipeline output dated 8 September 2026. That run records the model identifier `gemini-3.8-flash`; this is retained as recorded provenance.

On 15 September 2026, Codex visually inspected all 40 scan images for coverage and layout, checked selected readings and prepared this edited teaching reference. The review was not an exhaustive character-by-character collation. Expert acceptance as a critical edition remains pending.

The reference archive contains the original model transcriptions under `raw/`, the edited files under `text/`, a page-structured `reference.json`, the reconstructed table and this correction log. Raw text is reconstructed from the original page transcription fields; model metadata and API logs are excluded.

## Corrections

- **_7, scan 2:** 'PAUL KUEN' → 'PAUL KUËN'. Trema visible above E in the printed name.
- **_12, scan 1:** '{12-1[?]}' → ''. No legible handwritten number is visible on the supplied cover scan.
- **_12, scan 3:** 'GESAMTLEITÜNG' → 'GESAMTLEITUNG'. The printed heading has U without an umlaut.
- **_12, scan 11:** 'Populai[?]' → 'Populair'. The final r is visible; the source spelling Populair is retained.
- **_12, scan 23:** 'Sroll Johann' → 'Stroll Johann'. The printed surname includes t after S.
- **_11, scan 3:** 'Separate name and role-column lists' → '30 performer rows with five aligned columns, empty cells and two source footnotes'. The original output lost table relationships. Reconstructed against the scan; typographic wraps within table cells joined.

## TEI and metadata extension

The reference now includes seven complete TEI P5 files, metadata in JSON and CSV, and a combined TEI-plus-images bundle for Session 3. The metadata was reviewed against the programme/title-page scans and the supplied archive context on 15 September 2026.

Programme dates are explicitly labelled as announced performances. For _12, the title-page imprint and copyright statement support publication in 1953. Language metadata includes German, English and French for _3 (short key designations), _11 (visitor forms) and _12 (multilingual booklet).

TEI conversion preserves the edited transcription, including uncertainty markers and the reconstructed table. Page markers link to all 40 PNG scans through relative paths. The files are checked against the supplied TEI Lite schema; this structural check does not change their textual review status.

## Reading conventions and remaining questions

- `--- Scanseite N ---` identifies the PDF scan, including scans that contain a two-page spread.
- Curly braces mark handwriting. `[?]` marks an uncertain reading; `[illegible]` marks unreadable text.
- Uncertain pencil annotations remain, including _7 scan 1 and _11 scan 3. A plausible sequential number is not enough to resolve a faint annotation.
- Source spelling and source discrepancies are retained, including variants of personal names and differences between the multilingual biographies.
- _12 scan 21 visibly carries the handwritten numbers 12-19 and 12-20. These were retained even though they interrupt the apparent sequence.
- _12 scan 24 is a single scanned page with publisher information and photographic credits. A previous model note incorrectly described a spread; that note is excluded from this reference.
- The table in _11 scan 3 is tab-separated, with five columns. Empty cells remain empty. Its two footnotes are retained in the full text; they read “* II, III, V” and “** I, IV”. Table-cell line wraps are joined.
- The table and the individual programmes may name different role sets for the same performer. Preserve each source's statement and document any comparison separately.

Facsimiles: archive of the University of Music and Performing Arts Graz (UAKUG), collection NIM, Ira Malaniuk materials. Existing rights and source credits remain applicable; no additional licence for the historical materials is asserted here.
