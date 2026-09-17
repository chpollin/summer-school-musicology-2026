---
title: Project
project:
  name: Summer School Musicology 2026
  repository: https://github.com/chpollin/summer-school-musicology-2026
method:
  name: Promptotyping
  url: https://lisa.gerda-henkel-stiftung.de/digitale_geschichte_pollin
status: complete
created: 2026-09-15
updated: 2026-09-17
language: en
authors: [Christopher Pollin]
generated-with: Claude Code (Fable), Codex (GPT-6 Astra)
related: [specification, journal, handoff]
---

# Project

Course website for the four sessions Christopher Pollin teaches at the Summer School “Gender – Knowledge – Mobility. Digital Perspectives in Musicology” of the University of Music and Performing Arts Graz on 16 and 17 September 2026. The site gives participants one page with the sessions, their slides and lecture notes, the exercise packages and the hands-on tools, published through GitHub Pages at https://chpollin.github.io/summer-school-musicology-2026/.

## Audience and use

Participants of the summer school without assumed AI or coding background use the site during the sessions and afterwards. In the seminar room it is the launch point for slides, exercise downloads and the IIIF viewer. Afterwards it remains the reference for the material. Course pages and teaching instructions are English. Historical sources keep their original languages.

## Sessions

Session 1, Making Estate Materials Digitally Accessible, introduces research data workflows with Stefan Zweig Digital and works through XML, IIIF, TEI and RDF on one source image. Session 2, Large Language Models for Research Data Workflows, An Introduction, covers models, prompt and context engineering and a first transcription and TEI exercise on archival facsimiles. Sessions 3 and 4, Hands-On Practice, share one deck and one lecture-notes document and lead from an AI harness exercise on a small CSV to a Promptotyping project, a small digital edition or a research dashboard. Titles, learning objectives and materials are held in `scripts/sessions.mjs`.

## Material

Slides and lecture notes live as Google Slides and Docs in the course folder on Drive, which remains the editing location. The site links their preview and export addresses and versions each deck's title slide as an image. Exercise files in the repository are the IIIF package derived from `tools/iiif-viewer/`, the PDF-to-images packages from the teaching package maintained in the vault, the mobility starter CSV, the pinned snapshot of the published M³GIM archival graph, and the M³GIM full-text and TEI package under `downloads/m3gim-fulltext/`. The latter derives from the Ira Malaniuk materials of the archive of the University of Music and Performing Arts Graz (UAKUG, collection NIM) used in the M³GIM project and is a teaching derivative, not a critical edition. The IIIF viewer displays images with Mirador, vendored under `tools/iiif-viewer/vendor/`.

The course dates appear once in the page introduction. Session times and the room are announced by the organiser and do not appear on the site.

## Origin and licence

The site and its file processing were developed with GPT-6 Astra in Codex and with Claude Code. Texts and teaching material are licensed CC BY 4.0 (`LICENSE-CONTENT.md`), the code MIT (`LICENSE`). Third-party material keeps its own terms, named in `LICENSE-CONTENT.md`.
