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
updated: 2026-09-15
language: en
authors: [Christopher Pollin]
generated-with: Claude Code (Fable)
related: [project, journal, handoff]
---

# Specification

The site is one course page with one row and a download area per session, plus the IIIF viewer, which shares its header, footer and stylesheet. Everything is static and served from the repository root of `main` by GitHub Pages without a build step on GitHub.

## Pages

Each session now shows its full slide title, subtitle, one descriptive sentence and a flat list of learning objectives, followed by downloads. Session 1 is “Making Estate Materials Digitally Accessible”, subtitled “Research Data Workflows in Stefan Zweig Digital”. Session 2 and Sessions 3 and 4 share “Large Language Models for Research Data Workflows”, with subtitles “An Introduction” and “Hands-On Practice”. These fields and objectives live in `scripts/sessions.mjs`. Detailed exercise sequences are in the linked guides, not repeated on the course page. The `session-4` anchor remains at the shared section's content.

The course page opens with the event, dates and venue, followed by one row per session. Each row pairs its title-slide image on the left with its material links and exercise text on the right. Below 800 pixels, the image appears above the text. There is no separate overview repeating the sessions. Every session has one heading, a plain row of slide and notes links including PDF exports, then one descriptive sentence, learning objectives and material links. Session times, separate date labels, nested cards and slide embeds are omitted. Each session has a compact violet download area on the right: materials are grouped under the actual hands-on titles. Optional preparation, references and independent examples are collapsed in a separate disclosure. The header carries the full official event name, and the introduction contains the title and byline; its subtitle and jump buttons are omitted.

M³GIM exercise instructions, prompts and references are direct downloads on the course page. The legacy `materials/m3gim-fulltext.html` redirects to the Session 2 TEI exercise, `#reference` to its optional references and `#next-session` to the final project. The viewer page holds the file inputs, the Mirador container and three collapsed guides, and its element IDs are the contract with `tools/iiif-viewer/app.js`.

`sessions/session-N.html` and `materials/index.html` remain redirect stubs for previously shared URLs. Internal navigation in the M³GIM module links directly to the course-page anchors.

## Generation

The introductory AI-harness exercise uses `m3gim-mobility-starter.csv`: twelve statements from six documents and three places. Session 2 uses the same file for a timeline in chat; Sessions 3 and 4 use it for a local static website. Prompts and local preview instructions remain in the slides. `scripts/build-mobility-starter.py` reads its historic input from Git commit f2d0608; the obsolete public 40-row download is removed. The reference viewer in `tools/mobility-starter/` preserves overlap selection and date uncertainty. It is not offered as the primary exercise solution.

`scripts/sessions.mjs` is the single source for the sessions, their Drive IDs, concise titles and resources, together with the site and Drive constants. `scripts/build-site.mjs` renders all pages from the session data and the viewer module. It writes them into the repository and checks every local link and anchor. With `--check` it renders without writing, compares with the committed files and fails on drift or on a broken link. `scripts/fetch-title-slides.mjs` downloads the first slide of every deck as PNG into `assets/slides/` and fails when Google answers with anything but an image, which happens for a deck that is not shared with the link. `scripts/build-iiif-package.py` packs `downloads/xml-iiif-workshop.zip` from `tools/iiif-viewer/` with fixed timestamps so the archive only changes when a source file does. `scripts/build-m3gim-tei.py` builds the M³GIM archives; `scripts/build-shared-packages.py` builds the introductory, shared and facsimile archives from maintained local files.

Adding, merging or removing a session is an edit of the array in `scripts/sessions.mjs`, followed by the title-slide fetch and the build. No page text states the number of sessions.

Sessions 3 and 4 share the existing deck `1IOCdHFnlxyNuMwiyUNviyQ53KwD13k4_tRXpieXHgOo` and lecture notes `138Kl6CCtpZI3BM6VHGEgpFuZPVZJTfJT5FH8ASIdHPA`. One course section contains the shared materials and guided-to-independent exercise sequence. Session 3 provides cumulative guided practice and Session 4 continues with independent work. Their main objective is to use LLMs for coding and build small research tools through Promptotyping, supported by Knowledge Engineering, Context Engineering and Agentic Engineering. The source viewer is an exercise example. The old Session 4 URL and page anchor remain usable.

Stored files from the Drive exercise folders are mirrored as direct downloads, with provenance in `downloads/drive-materials.json`. The two hands-on ZIPs each include their updated guide, unchanged script and all seven input PDFs. The locally maintained guides and their ZIP copies are canonical; the original Drive files retain an earlier version. Additional source material remains individually downloadable and bundled. Native Slides and Docs continue to use live links and export links.

Session 2 allows one or two documents or all seven, processed with an AI Harness or LLM chat in their original languages. Translation is optional. The final project has two paths: PDFs through TEI XML to a digital edition, or the complete published M³GIM archival graph to a research dashboard. Existing transcriptions and TEI are optional inputs. Both paths use Promptotyping with at least `knowledge/data.md` and `knowledge/research.md`; user stories are optional. The five project slides supply the working instructions. The reference corpus is an optional fallback, and NEXT-SESSION.md describes its contents and reuse. PDF conversion packages are optional preparation.

Session 1 uses the Schulnachricht for XML, IIIF, TEI and RDF. Its source image is a primary download and included in the IIIF ZIP. The PDF conversion exercise is not part of the required Session 1 sequence. M³GIM exploration is a separate, download-free activity before the harness exercise. The Cast Explorer prompts and independent source examples remain optional and carry usage notes.

`m3gim-dataset.jsonld` is a byte-identical snapshot of the full published archival graph at upstream revision bec2a068802e9f2cb9885df072699b269d6efaa9. Its provenance file explains the 4,321 top-level nodes and source limitations. The dataset builder verifies the pinned Git blob hash; `.gitattributes` disables text conversion for the snapshot.

The existing Session 2 and Sessions 3 and 4 title slides contain generated illustrations whose source assets and prompts are preserved under `assets/illustrations/`. Native title text and metadata remain unchanged. The opera singer from Session 1 is the only human figure in each replacement, with the conceptual workflow below. An opaque cube-headed tentacle figure represents the model. Session 2 depicts text generation; Sessions 3 and 4 show the opera singer coding on a laptop. Below her, the user's Promptotyping sphere contains curved source-data and research-interface planes connected through the opaque tentacle model, with a feedback arc. The former lower workflow graphic in Sessions 3 and 4 was replaced. The previous Session 4 deck and reader remain in the sibling Drive folder `1HqmFO4TNbQmGIH8JBFc_Ua780GcYqaxV`; course-folder files have consistent session and material labels.

Only the current title illustrations are kept as PNGs under `assets/illustrations/`; superseded variants remain recoverable through Git history. Generation prompts retain the sequence of edits and their historical source filenames.

## Design

One token set in `assets/site.css` on `:root`, colours in OKLCH, spacing and type on a small scale, cascade layers in the order reset, tokens, base, layout, components, utilities. Session rows use a one-third/two-thirds grid, stacked below 800 pixels. The header and footer use wrapping flex rows. The header remains in document flow so its full event title never obscures anchor targets. Slides and lecture notes each form a compact SVG-labelled link group with an adjacent PDF export. Horizontal separator rules are omitted; whitespace separates the sessions. Each session's download area uses a light violet background and a decorative download icon. Native `details` and `summary` elements provide keyboard-operable disclosure without JavaScript. The legacy `#downloads` anchor points to the session list; the main navigation contains only the IIIF viewer; the event title links home. The footer keeps attribution, licences and the source link; development provenance is recorded in the README. The viewer adds `assets/viewer.css` for its form and the Mirador container. The palette is light only, because the title slides are white and the site is used in a lit seminar room.

The accessibility baseline consists of semantic landmarks, a skip link, visible focus, `aria-current` on the viewer link while the viewer page is open, list semantics preserved with an empty `list-style-type` where bullets are removed, button target sizes above 24 pixels, body text at 17 pixels with line height 1.6, and `prefers-reduced-motion` for the smooth anchor scrolling.

## Decisions

Single page without a router. The sessions are short enough for one document with anchor navigation. A hash router would add focus management, title updates and scroll restoration without a benefit for participants.

Title slides as versioned images. Fetched once per deck change through the public export endpoint and committed, so the overview works in the seminar room without Google. Slide and notes PDFs are not versioned, because the decks change until shortly before the sessions and each export would add several megabytes to the history. A local export before the workshop covers the offline case.

Direct slide links. Plain preview and PDF links provide access to the current deck without an additional embedded view on the course page. Versioned title images keep the overview independent of Google at page load.

Lecture notes as links. The earlier embedded Google Docs preview was the heaviest element on every page and the likeliest to fail. A preview link and the PDF export replace it.

Every lecture-notes link group has a visible AI-assistance disclosure, also associated with the preview and PDF links through aria-describedby. Session 2 and Sessions 3–4 additionally show “Work in progress” and explain that sections may be incomplete and are being revised. Session 1 carries no completion claim. The draft status is controlled by notesInProgress in scripts/sessions.mjs.

The course page owns all material navigation. The removed M³GIM HTML generator has no remaining callers; the source teaching files and archives remain in `downloads/m3gim-fulltext/`. The separate map-demo application is excluded from the course downloads and shared archive at the user's request. The Session 2 mobility task, prototype exploration and independent source files remain available.

## Acceptance

`node scripts/build-site.mjs --check` passes, which covers drift between script and committed pages and every local link and anchor. The course page renders at 320 pixels width without horizontal scrolling and with the cards in one column, the viewer opens its example object, and the legacy M³GIM URL preserves its three destination mappings.
