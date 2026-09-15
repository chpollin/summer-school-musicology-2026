# Session 2 · From Facsimiles to TEI

Insert these slides immediately after **Prompting Strategies: There Is No Prompt to Rule Them All**.

## Slide 1 · Hands-on: From Facsimiles to TEI

**Build a corpus we can reuse in the next session.**

- Start with `UAKUG_NIM_005_137_3.pdf`.
- Create full text from its two scan images.
- Extract the document metadata.
- Combine text and metadata in simple TEI-XML.
- Apply the workflow to all seven documents.

**Materials:** https://chpollin.github.io/summer-school-musicology-2026/materials/m3gim-fulltext.html

### Speaker notes

This exercise combines the TEI structure participants already know with LLM transcription. Work through the complete process on _3 first, then extend it to the other documents. The result is seven TEI files linked to 40 PNGs. These files become our input for Session 3.

## Slide 2 · Create and Check the Full Text

- Convert each PDF to PNG, or use the prepared images.
- Keep document IDs and scan order.
- Test and revise your prompt on _3.
- Complete all 40 scans in small batches.
- Check names, dates, reading order and table rows.

### Speaker notes

Include covers, multilingual text, advertisements and handwritten notes. Keep raw output separately and save one checked TXT per document. Record changes and retain uncertainty. Use a new conversation for each document and request missing pages after a truncated answer.

## Slide 3 · Extract the Metadata

**Record each value with its source evidence.**

- Title and languages
- Document type
- Date and its meaning
- Place and source publisher, where stated
- Identifier, archive and scan count

**Check:** Does the date describe a performance or the publication?

### Speaker notes

Use the metadata prompt after checking the transcription. Review the whole document: _3 includes short English and French phrases; _11 includes multilingual visitor forms; _12 contains multilingual biographies. Separate information printed in the facsimile from the supplied archive context. Omit unsupported optional values and record what remains unknown.

## Slide 4 · Put the Results in Simple TEI

- `teiHeader`: source description and metadata
- `langUsage`: languages in the document
- `text/body`: complete transcription
- `pb/@facs`: link each scan to its PNG
- `p`, `lb`, `table`: preserve text structure

**Use the supplied TEI template and guide.**

### Speaker notes

The digital transcription has its own publication statement. The historical source is described in sourceDesc. In this exercise one pb corresponds to one PDF scan, including a spread. Keep XML files in tei/ and images in png/ so the relative links remain valid. Use table/row/cell for “Wer singt was?” and preserve empty cells.

## Slide 5 · Validate and Continue in Session 3

- Produce seven complete TEI files and retain all 40 PNGs.
- Run the XML and image-link check.
- Compare metadata and text with the facsimiles.
- Investigate differences from the reference solution.
- Bring the complete folder to the next session.

**Deliver:** TEI + images, prompts and correction notes.

### Speaker notes

XML validation checks structure and links. Historical readings still need source comparison. Participants should explain one correction and one unresolved reading. In Session 3, reuse their TEI to read metadata, extract statements from the full text and return to the page images. The reference bundle provides a complete shared starting corpus if needed.
