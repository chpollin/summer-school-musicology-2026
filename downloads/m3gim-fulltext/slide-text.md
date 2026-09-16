# Hands-on: From Facsimiles to TEI XML

1. **Start with one document.** Download `UAKUG_NIM_005_137_3.pdf` (two scans). Further documents are optional.
2. **Upload the source.** Use a chat with PDF or image support; an AI harness is optional. Prepared PNGs are available.
3. **Generate and inspect the TEI.** Use the prompt below, inspect the result and ask for corrections.
4. **Check and save.** Compare a passage and the metadata with the scans. Check XML syntax and image links. Save the TEI, matching images and unresolved readings for the final project.

## Example prompt

```markdown
Create simple TEI XML from the attached document.

- Preserve the original language, scan order and tables.
- Use unclear for uncertain readings and gap for unreadable text.
- Put source-supported metadata in teiHeader. Distinguish document dates from mentioned event dates.
- Put the transcription in text/body.
- Add one pb per scan; use the supplied PNG filenames in facs.
- Return the complete XML in a code block and list unresolved readings separately.

Use simple, concise language.
```

Materials: https://chpollin.github.io/summer-school-musicology-2026/#session-2-tei

## Speaker notes

Start with one document. Prepared PNGs remove the need for PDF conversion. A chat interface is sufficient for this exercise; introduce the harness in the next session. Supply both actual PNG filenames even when uploading the PDF. The downloadable reference is a richer optional comparison, not the minimum output. XML syntax checks do not establish transcription accuracy. For the final project, participants can reuse their TEI and images for an edition or explore the full M³GIM dataset in a dashboard. Both paths use knowledge/data.md, knowledge/research.md and knowledge/specification.md to guide a local static application with one view and one core interaction.
