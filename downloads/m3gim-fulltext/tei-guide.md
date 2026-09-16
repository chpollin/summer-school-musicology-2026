# Simple TEI for the M³GIM corpus

Start with UAKUG_NIM_005_137_3.pdf and its two scans. Each TEI file combines source-supported metadata, the transcription and links to the actual supplied PNG files. A chat with PDF or image support is sufficient; an AI harness is optional. This guide includes optional details for the richer reference profile.

## Folder structure

```text
m3gim-work/
  tei/
    UAKUG_NIM_005_137_3.xml
    ... optional further selected TEI files
  png/
    UAKUG_NIM_005_137_3/
      UAKUG_NIM_005_137_3_p001.png
      UAKUG_NIM_005_137_3_p002.png
    ... matching folders for further selected documents
  schema/
    tei_lite.rng
  validate_tei.py
```

Unzip the prepared PNG archive into your working folder; it already contains the `png/` directory. Put your XML files in the adjacent `tei/` directory. Keep the supplied filenames.

## Metadata in the header

| Information | TEI location |
| --- | --- |
| Title of your digital transcription | `teiHeader/fileDesc/titleStmt/title` |
| Short statement about the course transcription | `fileDesc/publicationStmt/p` |
| Printed title of the source | `fileDesc/sourceDesc/bibl/title` |
| Document type | `bibl/@type` |
| Document identifier | `bibl/idno[@type="source-id"]` |
| Number of scan pages | `fileDesc/extent` |
| Supplied archive and collection | `bibl/note[@type="holding-context"]` |
| Date and its meaning | `bibl/date/@when` and `@type` |
| Place of the announced performance | `bibl/name[@type="performance-place"]` |
| Source publication place and publisher, when present | `bibl/pubPlace` and `bibl/publisher` |
| Languages present in the source | `profileDesc/langUsage/language/@ident` |
| Extraction evidence and missing information | `bibl/note[@type="metadata-evidence"]` |

For a programme, use `type="announced-performance"` on its performance date. Use `type="publication"` only when the source supports a publication date. Keep partial dates partial: `when="1953"` records a year.

The `publicationStmt` describes your digital transcription. A historical publisher printed in a source belongs in `sourceDesc/bibl`.

Check all pages before assigning languages. Document _3 includes short English and French key designations; _11 contains multilingual visitor forms; _12 contains multilingual headings and biographies. Names alone are insufficient evidence for a language.

If information is missing, omit the unsupported optional element and record the gap in a note. Preserve uncertain source text. Avoid empty date attributes, invented publication details and placeholder values in final files.

## Full text and images

```xml
<pb xml:id="scan_001" type="scan" n="1"
    facs="../png/UAKUG_NIM_005_137_3/UAKUG_NIM_005_137_3_p001.png"/>
<p>{3-1}</p>
<p>BAYREUTHER<lb/>FESTSPIELE 1953</p>
```

The `pb` marks the start of the associated text. Its `facs` value is a path from the XML file to the image. This exercise uses scan numbers; a scan can include two printed pages. Document that convention in `encodingDesc`.

Use `p` for text blocks and `lb` for line breaks. In the exercise, encode a doubtful reading as `<unclear>reading</unclear>` and unreadable text as `<gap reason="illegible"/>`. Preserve handwriting and explain your convention in `encodingDesc`. The optional reference corpus retains literal `word[?]` and `[illegible]` markers from its edited transcriptions; it illustrates a different documented encoding choice.

If your selection includes _11, for the table in scan 3, use `table`, `row` and `cell`. Keep five cells in every row, including empty cells. The first row uses `role="label"`. Keep the two source footnotes after the table.

## Check the files

For the introductory exercise, compare a passage and the metadata with the scans, check XML syntax, and confirm that both image links open. Record unresolved readings separately. Syntax checks do not verify the historical content.

The following course-profile checker is optional. It expects the richer supplied template conventions, including `pb/@type="scan"`, the exact folder layout, and verified language codes. A simpler TEI file can be well-formed without meeting all these additional course-profile checks.

The instructions package contains the official TEI Lite Relax NG schema and a small local checker. From your working folder, run:

```powershell
uv run validate_tei.py tei
```

With an existing Python installation:

```powershell
python -m pip install lxml
python validate_tei.py tei
```

The checker parses XML without recovery, validates against the supplied TEI Lite schema and checks document IDs, scan counts, metadata fields, table cells and local image paths. It accepts a non-empty selection of one or more course documents, reports every failed file and exits with a non-zero status if any check fails. The optional `--full-corpus` flag requires all seven documents and 40 scans.

Schema validity checks the XML structure. Compare text, metadata and image associations with the facsimiles separately.

## Keep the result for the final project

Keep the TEI for your first document, its two matching images and unresolved readings in `m3gim-work/`. Further documents are optional. For the final project, reuse this folder for a static edition displaying source text and corresponding images. Alternatively, explore the full M³GIM dataset in a dashboard. Preserve the folder structure when copying the edition materials.

Record data and limitations in `knowledge/data.md`, the research question in `knowledge/research.md`, and the implementation requirements in `knowledge/specification.md`. Build one view with one core interaction using local HTML, CSS and JavaScript, without libraries, frameworks, external dependencies, a backend, database or build step.

The downloadable reference bundle contains seven complete TEI files, seven edited original-language TXT files and all 40 PNGs in this structure. It is available as an optional comparison or fallback.

## TEI documentation

- [TEI Lite introduction](https://tei-c.org/release/doc/tei-p5-exemplars/html/tei_lite.doc.html)
- [Page beginnings and image links](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-pb.html)
- [Source descriptions with bibl](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-bibl.html)
- [Language usage](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-langUsage.html)
