# M³GIM final project materials

The final project offers two paths. Follow the working instructions and prompts in the Sessions 3 and 4 slides. This file describes the available materials.

## Path A: From PDFs to a digital edition

Start with the source PDFs in [m3gim-pdf.zip](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/m3gim-pdf.zip). Choose documents, produce and check transcriptions, encode TEI and build a small static edition with matching source images.

The reference bundle is optional. It contains seven TEI P5 documents, seven edited original-language TXT files in `text/`, and 40 PNG scans. Existing transcriptions and TEI can support comparison or provide a fallback. Keep `tei/` and `png/` beside one another so that `pb/@facs` image references resolve relative to each TEI file.

`metadata.csv` gives a compact overview. `metadata.json` includes extraction evidence and distinguishes supplied context from printed information. `review-notes.md` records the review scope. The edited LLM reference transcriptions retain uncertainty markers; conversion to XML does not constitute another expert reading. Performance dates remain distinct from publication dates.

The included checker can validate the reference bundle with `uv run validate_tei.py tei --full-corpus`, or a smaller selection with `uv run validate_tei.py tei`. Compare the text with the scans as well.

## Path B: Explore the full M³GIM dataset

Use the full project dataset linked from the course website to develop a research question and build a dashboard. The small mobility starter CSV belongs to the introductory harness exercise. This reference bundle supplies edition materials; obtain the full dataset separately for the dashboard path.

## Project knowledge

For either path, document the data, its provenance and limitations in `knowledge/data.md`, and the research question and requirements in `knowledge/research.md`. Use these documents as context for the agent and revise them as you verify results.

Course materials and slides: https://chpollin.github.io/summer-school-musicology-2026/#session-3

Sources for this reference bundle: UAKUG, collection NIM, Ira Malaniuk materials used in M³GIM (Mapping Mobile Musicians).
