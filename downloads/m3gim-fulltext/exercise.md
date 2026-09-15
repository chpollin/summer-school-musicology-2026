# Hands-on: From Facsimiles to TEI

Combine the TEI you have already encountered with an LLM transcription workflow. Generate full texts from images, extract document metadata and encode both in simple TEI-XML.

## Materials and result

The seven PDFs contain **40 scan pages**: _3, _7, _8, _9 and _10 have two each; _11 has six; _12 has 24. Some scans contain two printed pages. Sources: Ira Malaniuk materials used in M³GIM (Mapping Mobile Musicians), UAKUG archive, collection NIM.

Choose **one or two documents, or all seven**. Your result is one complete TEI file per selected document and all its PNG scans, with stable filenames and working image links. Keep your checked plain texts, raw model outputs, prompts and correction notes alongside them. Bring your working folder to Session 3 to build a small static web publication from your TEI and images. Session 4 extends that publication or another research requirement.

## 1. Prepare the images

Download the [instructions package](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/m3gim-instructions.zip) and the [source PDFs](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/m3gim-pdf.zip). Use the [prepared PNGs](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/m3gim-png.zip) directly or convert the PDFs:

```powershell
uv run pdf_to_png.py pdf png
```

With an existing Python installation:

```powershell
python -m pip install pypdfium2 Pillow
python pdf_to_png.py pdf png
```

The converter creates one PNG per PDF scan at 220 dpi. Keep names such as `UAKUG_NIM_005_137_3_p001.png`; keep spreads intact. Use a fresh output folder.

## 2. Test the complete workflow on _3

Use an AI Harness with access to your working folder and images, or open a new conversation in an LLM chat that accepts images. Provide the two PNGs for _3 and use `prompt.txt` to request a complete original-language transcription. Translation is an optional later task and must remain separate from the transcription. Compare both pages with the output. Save the raw result, revise the prompt to address an observed error and edit the text.

Next use `metadata-prompt.txt` to extract the fields below, with a scan number and evidence for each value. Check the metadata before asking for TEI. Use `tei-prompt.txt`, the template and guide to combine the checked text and metadata in `tei/UAKUG_NIM_005_137_3.xml`.

## 3. Extract document metadata

| Field | What to record |
| --- | --- |
| Title | Main title as printed; alternative titles only if present |
| Languages | Every language represented by text, including translated phrases and inserts |
| Document type | For example programme or festival booklet |
| Date | Printed form, supported normalized value and meaning of the date |
| Place | Place and its relation to performance or publication |
| Source publisher | Only when supported by an imprint |
| Identifier and holding context | Supplied filename, archive and collection |
| Extent | Number of PDF scan pages |

Keep unknown values explicit in your notes. A printed programme date identifies an announced performance. A source publication date requires evidence of its own. The named composer does not automatically become the author of the programme.

Check every scan before assigning languages. An insert may contain languages absent from the cover. Keep supplied archive information distinguishable from text visible in the facsimile.

## 4. Complete your selected documents

You may stop after _3, add a second document, or continue with all six remaining documents (_7, _8, _9, _10, _11 and _12). Start a separate conversation or agent context for each document. Begin with one or two images per request; adjust batch size to page density and the interface’s output limit.

Record scan numbers in every request. Check each response for missing or truncated text. Request remaining pages explicitly and merge batches in scan order. Include covers, headings, cast lists, biographies, captions, advertisements, footnotes and handwriting.

Keep a checked TXT per document, with `--- Scanseite N ---` before each scan. Retain source language, spelling and uncertainty. Log corrections as: document ID | scan | original output | correction | image evidence.

## 5. Create simple TEI

Use the structure in `tei-template.xml` and the field mapping in `tei-guide.md`.

- Put the digital transcription description and source metadata in `teiHeader`.
- Put languages in `profileDesc/langUsage`.
- Put the complete source text in `text/body`, using `p` and `lb`.
- Start each scan with `pb`, carrying its scan number and a relative image path.
- If your selection includes _11, use `table/row/cell` for “Wer singt was?” in scan 3. Preserve all five columns and empty cells.
- Preserve the handwriting and uncertainty notation as literal text in this introductory profile.

For example, from `tei/UAKUG_NIM_005_137_3.xml`:

```xml
<pb xml:id="scan_001" type="scan" n="1"
    facs="../png/UAKUG_NIM_005_137_3/UAKUG_NIM_005_137_3_p001.png"/>
```

One `pb` represents one PDF scan in this exercise, including a spread. It replaces the TXT scan heading and introduces the full text of that scan. Keep the TEI namespace, close every element and escape XML characters. Final files must contain all source text and no template placeholders.

For the long booklet, generate complete scan blocks in batches if needed, then assemble one document with one header and one text body.

## 6. Check and compare

From the working folder, run:

```powershell
uv run validate_tei.py tei
```

The default checker accepts a non-empty selection. Use `uv run validate_tei.py tei --full-corpus` only to require all seven documents. It validates against the local TEI Lite schema and checks IDs, required fields, scan order and PNG paths. See the TEI guide for an existing-Python alternative.

Compare text and metadata with the images separately. Check names, dates, diacritics and table relationships. If _11 is present, inspect each performer’s row in scan 3. If both _10 and _11 are present, compare Ira Malaniuk’s roles and preserve each source’s statement.

After your own pass, download the reference. It contains edited full texts, extracted metadata and seven complete TEI files. Resolve differences against the facsimile. Bring one corrected error and one unresolved reading to the discussion.

## 7. Bring the corpus to Session 3

Keep the folders together:

```text
m3gim-work/
  tei/                 one XML file per selected document
  png/                 all scans of your selected documents
  schema/              supplied TEI Lite schema
  validate_tei.py
```

In Session 3, build a small static web publication that displays your TEI metadata, full texts and matching images. Session 4 extends it with a research requirement. The complete reference bundle (seven documents, 40 PNGs and seven edited TXT files) is an optional comparison or fallback.

## Completion checklist

- One or two complete TEI documents, or all seven, covering every scan of each selected source.
- Checked metadata with source evidence and explicit treatment of unknowns.
- Every relative image link for your selection works in the shared folder structure.
- XML check passed; textual and metadata checks recorded separately.
- Checked TXT files, raw output, prompts and a correction log retained.

## Reference status

The full texts are edited LLM reference transcriptions with remaining uncertain readings. All scan images were inspected for coverage and layout; selected readings were corrected. Metadata was checked against the relevant scans and supplied context. TEI validation establishes structural validity; expert acceptance as a critical edition remains pending.

[TEI Lite](https://tei-c.org/release/doc/tei-p5-exemplars/html/tei_lite.doc.html) and the [TEI page-beginning element](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-pb.html) document the XML structure used here.
