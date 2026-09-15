# Hands-on: Build the M³GIM Full-Text Corpus

Use an image-capable LLM to create complete, traceable transcriptions of seven documents from the Ira Malaniuk materials used in M³GIM (Mapping Mobile Musicians). The facsimiles are credited to the archive of the University of Music and Performing Arts Graz (UAKUG), collection NIM.

## Materials and result

Download the seven PDFs or the prepared PNG archive from the course page. There are **40 scan pages**: documents _3, _7, _8, _9 and _10 have two each; _11 has six; _12 has 24. Some scan pages contain a spread of two printed pages.

Produce one complete UTF-8 text file per document, your final prompt and a correction log. Keep a separate copy of the original model output.

## 1. Prepare page images

Unzip the prepared PNGs, or place the seven PDFs in a folder named `pdf` and run the supplied converter:

```powershell
uv run pdf_to_png.py pdf png
```

If Python and pip are already installed:

```powershell
python -m pip install pypdfium2 Pillow
python pdf_to_png.py pdf png
```

The script renders each PDF page at 220 dpi. It keeps the PDF filename as the document ID and adds a three-digit scan number: `UAKUG_NIM_005_137_3_p001.png`. It keeps spreads intact. Use a fresh output folder if you change the resolution.

## 2. Test with document _3

Open a new conversation in an LLM interface that accepts images. Attach the two PNGs for _3. Copy the supplied start prompt and enter the document ID and image filenames.

Check the output against both images. Look for omitted lines, substituted names, altered spelling and a reversed reading order. Save the raw output. Revise your prompt to address an observed problem and compare the next result.

## 3. Transcribe all seven documents

Continue with _7, _8, _9, _10, _11 and _12. Use a new conversation for each document. Begin with one or two images per request; adjust the batch size to the density of the source and the output limit of the interface.

Record the scan numbers in every request. After each response, check that every requested page is present and ends at the end of its source page. If a response stops early, request the remaining pages explicitly. Merge the batches in scan order and check for repeated or missing pages.

Include all visible text: covers, headings, cast lists, biographies, captions, advertisements, footnotes and handwriting. Keep source languages and spelling. Mark uncertainty instead of completing names from memory. For tables, preserve the relationship between each row and its column headings, including empty cells.

## 4. Edit the full texts

Save the edited versions as `UAKUG_NIM_005_137_3.txt`, and so on. Begin each scan with `--- Scanseite N ---`. The German marker is retained for compatibility with the reference corpus.

Compare each page with its transcription. Check names, dates, punctuation and diacritics closely. Log changes as: document ID | scan | original output | correction | evidence. Separate transcription from comments about the source.

For _11, scan 3, inspect “Wer singt was?” cell by cell. The role must remain attached to its printed performer and work. For a further check, compare Ira Malaniuk’s entries in _10 and _11. Retain differences between the documents. The programmes establish an announced cast; use additional evidence for claims about actual performances.

## 5. Compare with the reference

Download the edited reference texts after completing your own pass. Resolve differences by returning to the image. Exact string agreement is not a sufficient quality measure: examine missing text, mistaken characters and lost relationships separately.

The reference includes all 40 scans, a reconstructed table and a correction log. It is an edited LLM reference with remaining uncertain readings; it has not received expert acceptance as a critical edition.

## Completion checklist

- Seven edited text files, covering 2 + 2 + 2 + 2 + 2 + 6 + 24 scan pages.
- All textual areas retained, including material outside the main programme.
- A raw-output copy, the final prompt and a correction log.
- One example of a corrected error and one unresolved reading to discuss.

## File notation

`{text}` marks handwriting, `word[?]` an uncertain reading, and `[illegible]` unreadable text. The source images take precedence over any model or reference reading.
