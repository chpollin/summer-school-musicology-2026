# M³GIM final project materials

The final project offers two paths. Follow the working instructions and prompts in the Sessions 3 and 4 slides. This file describes the available materials.

## Path A: From PDFs to a digital edition

Start with the one-document result from the TEI exercise, or [UAKUG_NIM_005_137_3.pdf](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/pdf/UAKUG_NIM_005_137_3.pdf) and its two scans. Use your checked transcription or the optional existing transcription in the reference bundle, encode TEI and build a small static edition with matching source images. Additional documents in [m3gim-pdf.zip](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/m3gim-pdf.zip) are optional.

The reference bundle is optional. It contains seven TEI P5 documents, seven edited original-language TXT files in `text/`, and 40 PNG scans. Existing transcriptions and TEI can support comparison or provide a fallback. Keep `tei/` and `png/` beside one another so that `pb/@facs` image references resolve relative to each TEI file.

`metadata.csv` gives a compact overview. `metadata.json` includes extraction evidence and distinguishes supplied context from printed information. `review-notes.md` records the review scope. The edited LLM reference transcriptions retain uncertainty markers; conversion to XML does not constitute another expert reading. Performance dates remain distinct from publication dates.

The included checker can validate the reference bundle with `uv run validate_tei.py tei --full-corpus`, or a smaller selection with `uv run validate_tei.py tei`. Compare the text with the scans as well.

## Path B: Explore the full M³GIM dataset

Use the full project dataset linked from the course website to develop a research question and build a dashboard. The small mobility starter CSV belongs to the introductory harness exercise. This reference bundle supplies edition materials; obtain the full dataset separately for the dashboard path.

## Project knowledge

For either path, create three knowledge documents:

- `knowledge/data.md` describes the data, provenance and limitations.
- `knowledge/research.md` states the research question and the evidence needed to address it.
- `knowledge/specification.md` defines the view, core interaction and checks for the result.

Use these documents as context for the agent and revise them as you verify results. Build a local static application with one view and one core interaction, using plain HTML, CSS and JavaScript. Use no libraries, frameworks, external dependencies, backend, database or build step. The edition may show text with its matching scan; the dashboard should support the question recorded in `research.md`.

Course materials and slides: https://chpollin.github.io/summer-school-musicology-2026/#session-3

Sources for this reference bundle: UAKUG, collection NIM, Ira Malaniuk materials used in M³GIM (Mapping Mobile Musicians).
