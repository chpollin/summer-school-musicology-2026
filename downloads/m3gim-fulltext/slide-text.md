# Session 2 · M³GIM full-text hands-on

Insert these slides immediately after **Prompting Strategies: There Is No Prompt to Rule Them All**.

## Slide 1 · Hands-on: Build the M³GIM Full-Text Corpus

**Turn seven facsimiles into seven complete transcriptions.**

- Download the M³GIM materials from the course website.
- Start with `UAKUG_NIM_005_137_3.pdf`: two scan pages.
- Test your transcription prompt and inspect the result.
- Apply your revised workflow to all seven documents: 40 scan pages.

**Materials:** https://chpollin.github.io/summer-school-musicology-2026/materials/m3gim-fulltext.html

### Speaker notes

The corpus comes from the Ira Malaniuk materials used in M³GIM. It contains short programmes, a cast overview and a longer Bayreuth festival booklet. Everyone works towards a complete corpus. Covers, advertisements, multilingual biographies and handwritten marks belong to the transcription.

## Slide 2 · Prepare Images and Test Your Prompt

- Convert each PDF to PNG, or use the prepared images.
- Keep the document ID and scan order: `…_p001.png`, `…_p002.png`.
- Ask for complete text, original spelling and marked uncertainty.
- Compare both test pages with the facsimile.
- Save the first output and your revised prompt.

### Speaker notes

The download includes a PDF-to-PNG script. Prepared PNGs let participants continue directly with transcription. A PNG corresponds to a PDF scan page; some scans contain two printed pages. Show how a small change to reading-order or table instructions changes the result. Use a model that accepts images.

## Slide 3 · Complete All 40 Scan Pages

- Work through documents `_3, _7, _8, _9, _10, _11, _12`.
- Use a new conversation for each document.
- Send small batches; check every page before continuing.
- Keep headings, notes, captions and advertisements.
- Preserve table rows, empty cells and performer–role relationships.

**Deliver:** seven UTF-8 text files, your prompt and a short correction log.

### Speaker notes

Begin with one or two images per request and adapt batch size to the interface and page density. The 24-page booklet needs several requests. Ask explicitly for the remaining pages after an interrupted response. Keep raw output separately; corrections go in the edited version. A correct total page count alone does not establish textual accuracy.

## Slide 4 · Review and Compare

- Check coverage, reading order, names, dates and diacritics.
- Inspect `_11`, scan 3: **“Wer singt was?”**
- Check Ira Malaniuk’s roles against the relevant table cells.
- Compare your files with the downloadable reference texts.
- Explain one correction and one reading that remains uncertain.

### Speaker notes

Open the reference files after participants have produced their own results. Discuss PAUL KUËN in the Rheingold programme and the row alignment in the season table. Compare Malaniuk’s roles in the Götterdämmerung programme with the season table; preserve what each source states. A programme records an announced cast. Further evidence is needed to establish who actually performed. The reference files contain edited LLM transcriptions with remaining uncertainty markers.
