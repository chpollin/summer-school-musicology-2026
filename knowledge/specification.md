---
title: Specification
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
generated-with: Claude Code (Fable)
related: [project, journal, handoff]
---

# Specification

The site is one course page with one row and one download area per session, plus the IIIF viewer, which shares header, footer and stylesheet and is reached from a Tools section at the end of the course page. Everything is static and served from the repository root of `main` by GitHub Pages without a build step.

## Course page

The page opens with the event, dates and venue, followed by one row per session. Each row pairs the title-slide image on the left with the session content on the right. Below 800 pixels the image moves above the text. A session shows its full slide title, subtitle and a flat list of learning objectives, then a compact link group for slides and one for lecture notes, each with a preview link and a PDF export. Session times, separate date lines, nested cards, slide embeds and a separate overview are omitted. The header carries the full official event name and links home. The footer holds attribution, licences and the source link.

Every lecture-notes group carries the AI-assistance disclosure as a small icon after the PDF link, with a native tooltip for pointer users and visually hidden text that both links reference through `aria-describedby`. A session flagged `notesInProgress` additionally shows “Work in progress” and explains that sections may be incomplete and are being revised.

The download area of a session is a light violet box on the right. Its head pairs the label with one button that downloads the session package, a ZIP with everything the hands-ons need. Below it every hands-on is one line with its slide title and, only where a tool or file is useful on its own, a link, such as the IIIF viewer, the starter CSV or the M³GIM prototype. Instruction sentences, appendices and optional-material disclosures are omitted, because the instructions live in the slides. Reference solutions and independent examples stay reachable under `downloads/` without a listing.

The Tools section lists the hands-on tools built for the course with a note on purpose and origin. The viewer page holds one card with introduction, file inputs, buttons, status line and the rule on page references, followed by the Mirador container. Its element IDs are the contract with `tools/iiif-viewer/app.js`.

## Sessions and exercises

Session 1, Making Estate Materials Digitally Accessible, uses the Schulnachricht image for the XML description, the IIIF exercise, the TEI encoding and the RDF representation. The session package carries the image at the top level and inside the IIIF exercise folder.

Session 2, Large Language Models for Research Data Workflows, An Introduction, holds three hands-ons. The transcription exercise and the mobility exploration work with the starter CSV in a chat. The exercise From Facsimiles to TEI XML starts with one document and its two scans in an LLM chat with PDF or image support, an AI harness is optional. Participants generate simple TEI, compare a passage and a metadata value with the scans, check XML syntax and keep matching images. Further documents and the reference solution are optional.

Sessions 3 and 4, Hands-On Practice, appear as one section. The main objective is to use LLMs for coding and build small research tools through Promptotyping, framed by Knowledge Engineering, Context Engineering and Agentic Engineering. Session 3 provides guided cumulative practice, Session 4 continues with independent work. The harness exercise starts from an empty folder with the starter CSV. Prompts and local preview instructions are in the slides. The final project has two paths, PDFs through TEI XML to a digital edition, or the published M³GIM archival graph to a research dashboard. Both paths use Promptotyping with `knowledge/data.md`, `knowledge/research.md` and `knowledge/specification.md`. The first version has one main view and one core interaction in plain HTML, CSS and JavaScript served locally, without external libraries, frameworks, package installation, build tools, backend, database or external services. Code refactoring and knowledge refactoring are separate iteration steps. Participants' own transcriptions and TEI from Session 2 are optional inputs, and the complete reference package with all TEI files, edited texts and scan pages is an optional fallback described in `downloads/m3gim-fulltext/NEXT-SESSION.md`. PDF conversion packages are optional preparation.

## Generation

`scripts/sessions.mjs` is the single source for the sessions, their Drive IDs, titles, objectives, packages and resources, together with the site constants. `scripts/build-site.mjs` renders all pages from it and the viewer module `scripts/viewer-page.mjs`, writes them into the repository and checks every local link and anchor. With `--check` it renders without writing, compares with the committed files and fails on drift or a broken link. `scripts/fetch-title-slides.mjs` downloads the first slide of every deck as PNG into `assets/slides/` and fails when Google answers with anything but an image, which happens for a deck not shared with the link.

Adding, merging or removing a session is an edit of the array followed by the title-slide fetch and the build. No page text states the number of sessions. A session with `published: false` stays off the course page until its day. Its redirect stubs and the legacy M³GIM links then point to the course page without an anchor, so the link check still passes. Releasing a session means removing the flag and rebuilding. The `aliases` field keeps a former session id as a second anchor and redirect stub, which is how `session-4` resolves to the shared section.

Legacy URLs are preserved. `sessions/session-N.html` and `materials/index.html` are redirect stubs. `materials/m3gim-fulltext.html` redirects to the Session 2 TEI exercise, `#reference` as well, and `#next-session` to the final project.

## Downloads

Every download is a derived artefact with a builder in `scripts/` and a provenance file next to it. Builders use fixed ZIP timestamps and LF normalisation, so an archive changes only when a source file does. Sources are edited, archives are rebuilt, never edited by hand.

`scripts/build-shared-packages.py` packs the session packages, the IIIF exercise package from `tools/iiif-viewer/`, the two PDF conversion packages with guide, script and input PDFs, the facsimile archive and the shared materials, and refreshes the hashes in `downloads/drive-materials.json`. The locally maintained guides are canonical, the original Drive files retain an earlier version. The Session 2 package takes the scan PNGs from the M³GIM PNG archive.

`scripts/build-m3gim-tei.py` builds the M³GIM full-text and TEI package under `downloads/m3gim-fulltext/` from `reference.json`, `metadata.json` and the guides. The edited reference keeps source variants and uncertain readings and separates its technical checks from the outstanding scholarly review as a critical edition. `metadata.json` records title, languages, document type, date and date type, place, publisher where present, identifier and extent with source references, and keeps announced performances distinct from publication dates. The TEI files carry the edited full text with uncertainty marks and link every scan page to its PNG through `pb/@facs`. They validate against the bundled TEI Lite schema with `validate_tei.py`, which accepts a non-empty selection of documents, demands the complete corpus with `--full-corpus`, and rejects empty sets, broken XML and missing images.

`scripts/build-mobility-starter.py` derives `m3gim-mobility-starter.csv`, a small selection of statements about places, from its historic input in Git commit f2d0608, and writes the data of the reference viewer in `tools/mobility-starter/`. Original fields and identifiers are unchanged, `date_type` and `date_status` make documented date meanings and uncertainties usable, and `year_requires_review` marks inferred years. The reference viewer preserves overlap selection and date uncertainty and is not offered as the primary exercise solution.

`scripts/build-m3gim-dataset.py` verifies or refetches `m3gim-dataset.jsonld`, a byte-identical snapshot of the full published M³GIM archival graph pinned by upstream Git blob hash. Its provenance file explains structure, licence and limits. `.gitattributes` disables text conversion for the snapshot. `m3gim-jsonld-example.jsonld` adds a fully resolvable context to the excerpt shown on the workflow slide, and its provenance note warns that a database relation to a place is not evidence of a performance.

## Title slides and illustrations

The Session 2 and Sessions 3 and 4 title slides carry generated illustrations whose current PNGs and generation prompts, including the sequence of edits, are preserved under `assets/illustrations/`. Superseded variants remain recoverable through Git history. The opera singer from Session 1 is the only human figure. An opaque cube-headed tentacle figure represents the model. Session 2 depicts text generation. Sessions 3 and 4 show the singer coding on a laptop above the Promptotyping sphere, in which curved source-data and research-interface planes connect through the model with a feedback arc.

## Design

One token set in `assets/site.css` on `:root`, colours in OKLCH, spacing and type on a small scale, cascade layers in the order reset, tokens, base, layout, components, utilities. Session rows use a one-third to two-thirds grid, stacked below 800 pixels. Header and footer are wrapping flex rows. The header stays in document flow so its full event title never obscures anchor targets. Whitespace separates the sessions, there are no horizontal rules. The viewer adds `assets/viewer.css` for its form and the Mirador container. The palette is light only, because the title slides are white and the site is used in a lit seminar room.

The accessibility baseline consists of semantic landmarks, a skip link, visible focus, list semantics preserved with an empty `list-style-type` where bullets are removed, button target sizes above 24 pixels, body text at 17 pixels with line height 1.6, and `prefers-reduced-motion` for the smooth anchor scrolling.

## Decisions

Single page without a router. The sessions are short enough for one document with anchor navigation. A hash router would add focus management, title updates and scroll restoration without a benefit for participants.

Title slides as versioned images. They are fetched once per deck change through the public export endpoint and committed, so the overview works in the seminar room without Google. Slide and notes PDFs are not versioned, because the decks change until shortly before the sessions and each export would add several megabytes to the history.

Direct slide and notes links. Plain preview and PDF links give access to the current deck without an embedded view. The earlier embedded Google Docs preview was the heaviest element on every page and the likeliest to fail.

One package per session. A single ZIP with everything the hands-ons need replaces per-exercise download lists and optional-material disclosures on the course page, and the slides carry the instructions.

Course page owns all material navigation. The earlier M³GIM HTML generator was removed, its URL redirects by anchor. The separate map-demo application is excluded from course downloads and the shared archive. The Session 2 mobility exercise, the prototype exploration and the independent source files remain available.

## Acceptance

`node scripts/build-site.mjs --check` passes, which covers drift between script and committed pages and every local link and anchor. The course page renders at 320 pixels width without horizontal scrolling and with the session rows in one column, the viewer opens its example object, and the legacy M³GIM URL preserves its three destination mappings.
