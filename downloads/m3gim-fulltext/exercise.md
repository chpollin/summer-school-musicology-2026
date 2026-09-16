# Hands-on: From Facsimiles to TEI XML

Create a simple TEI XML file from **one document**, `UAKUG_NIM_005_137_3.pdf` (two scans). Save it with its source images for the final project. Further documents and the complete reference corpus are optional.

## 1. Open the source

- Download the [source PDF](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/pdf/UAKUG_NIM_005_137_3.pdf).
- Open a new conversation in an LLM chat that supports PDFs or images. Upload the PDF or its two [prepared PNG scans](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/m3gim-png.zip). The PNG ZIP contains all seven documents; use the `_3` folder for this exercise.
- Download the [instructions and TEI template](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/m3gim-instructions.zip). Use `tei-prompt.txt` with the supplied template and the actual PNG filenames. An AI harness is an optional alternative.

The source belongs to the Ira Malaniuk materials used in M³GIM, UAKUG archive, collection NIM. Keep this supplied context distinguishable from information printed in the scans.

## 2. Create simple TEI

- Preserve the original language, spelling, scan order and table relationships.
- Use `unclear` for doubtful readings and `gap reason="illegible"` for unreadable text. Never invent a reading.
- Put source-supported metadata in `teiHeader`. Distinguish the document's publication date from dates of announced or mentioned events. Record missing or uncertain information in a note.
- Put the transcription in `text/body`. Use `p` and `lb` for text, and `table/row/cell` where needed.
- Add one `pb` per scan, including a double-page scan. Its `facs` must point to the actual supplied PNG file.

Save the result as `tei/UAKUG_NIM_005_137_3.xml`. Unzip the PNG archive beside `tei/`, keeping its `png/` directory. The first image reference is then:

```xml
<pb n="1" facs="../png/UAKUG_NIM_005_137_3/UAKUG_NIM_005_137_3_p001.png"/>
```

## 3. Check and save

- Compare a passage and the metadata with the scans. Record corrections and unresolved readings.
- Check XML syntax and open both image paths. Ask the assistant to explain any corrections briefly.
- Save the TEI, its two matching PNGs and your review notes together for the final project.

An XML syntax check establishes that the file can be parsed. It does not verify the transcription or the historical claims. The optional `validate_tei.py` additionally checks the stricter supplied course profile and TEI Lite schema; see `tei-guide.md`.

## Optional extension and references

The [full PDF archive](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/m3gim-pdf.zip) contains seven documents and 40 scans. Extend the exercise only after checking the first document. `prompt.txt` and `metadata-prompt.txt` support separate transcription and metadata passes when useful.

The [reference solutions](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/m3gim-reference.zip) contain richer TEI, edited LLM transcriptions and metadata evidence. The [complete reference with images](https://chpollin.github.io/summer-school-musicology-2026/downloads/m3gim-fulltext/m3gim-next-session.zip) is an optional fallback. References retain uncertain readings and require source comparison; they are not an expert-approved critical edition. Their literal uncertainty notation differs from the `unclear`/`gap` encoding requested in this exercise.

For the final project, reuse your TEI and images for an edition or choose the full M³GIM dataset for a dashboard. Record the data in `knowledge/data.md`, the research question in `knowledge/research.md`, and the implementation requirements in `knowledge/specification.md`. Follow the working instructions in the Sessions 3 and 4 slides.
