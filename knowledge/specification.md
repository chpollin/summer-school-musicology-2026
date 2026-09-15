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

The site is one course page with the session overview, one section per session and a downloads section, plus two separate pages, the M³GIM exercise and the IIIF viewer, which share the same header, footer and stylesheet. Everything is static and served from the repository root of `main` by GitHub Pages without a build step on GitHub.

## Pages

The course page opens with the event, the two days and the venue, followed by a card grid in which each session appears with the image of its title slide, its day and time, its title and a one-line subtitle. Each card links to the session section below. A session section carries day and time, title, a one-sentence description, buttons for the slides, the slides PDF, the lecture notes and the notes PDF, a collapsed disclosure that embeds the slides only when opened, an optional panel for the session's hands-on, and the session's resource links. The downloads section lists the files kept in the repository and the shared Drive folders once.

The M³GIM exercise page is a long-form worksheet whose content comes from `scripts/m3gim-exercise.mjs` and the files under `downloads/m3gim-fulltext/`. The viewer page holds the file inputs, the Mirador container and three collapsed guides, and its element IDs are the contract with `tools/iiif-viewer/app.js`.

`sessions/session-N.html` and `materials/index.html` are redirect stubs to the anchors of the course page, kept for links already written into the M³GIM module.

## Generation

`scripts/sessions.mjs` is the single source for the sessions, their Drive IDs, day, time, texts, hands-on panel and resources, together with the site and Drive constants. `scripts/build-site.mjs` renders all pages from it and from the two page modules, writes them into the repository and checks every local link and anchor. With `--check` it renders without writing, compares with the committed files and fails on drift or on a broken link. `scripts/fetch-title-slides.mjs` downloads the first slide of every deck as PNG into `assets/slides/` and fails when Google answers with anything but an image, which happens for a deck that is not shared with the link. `scripts/build-iiif-package.py` packs `downloads/xml-iiif-workshop.zip` from `tools/iiif-viewer/` with fixed timestamps so the archive only changes when a source file does. `scripts/build-m3gim-tei.py` builds the M³GIM archives.

Adding, merging or removing a session is an edit of the array in `scripts/sessions.mjs`, followed by the title-slide fetch and the build. No page text states the number of sessions.

Sessions 3 and 4 share the existing deck `1IOCdHFnlxyNuMwiyUNviyQ53KwD13k4_tRXpieXHgOo` and lecture notes `138Kl6CCtpZI3BM6VHGEgpFuZPVZJTfJT5FH8ASIdHPA`. One course section shows the two original time blocks. Session 3 provides cumulative guided practice and Session 4 continues with independent work. Their main objective is to use LLMs for coding and build small research tools through Promptotyping, supported by Knowledge Engineering, Context Engineering and Agentic Engineering. The source viewer is an exercise example. The old Session 4 URL and page anchor remain usable.

Stored files from the Drive exercise folders are mirrored as direct downloads, with provenance in `downloads/drive-materials.json`. The two hands-on ZIPs each include their updated guide, unchanged script and all seven input PDFs. The guides are synchronised with their original Drive file IDs. Additional source material remains individually downloadable and bundled. Native Slides and Docs continue to use live links and export links.

The guided sequence first executes the supplied PDF-to-PNG script manually, repeats this operation with an agent, then introduces LLM coding through Promptotyping. The third step reuses the TEI files and images from Session 2 for a source-viewer example. Session 4 allows participants to extend that example or implement another research requirement. The website and common lecture notes express the same sequence. Downloads are grouped into exercise starters, reference solutions and additional materials.

The overview uses a dedicated compact card grid, with three equal columns when space permits. The existing Session 2 and Sessions 3 and 4 title slides contain generated illustrations whose source assets and prompts are preserved under `assets/illustrations/`. Existing slide objects are retained. The previous Session 4 deck and reader remain in the sibling Drive folder `1HqmFO4TNbQmGIH8JBFc_Ua780GcYqaxV`; course-folder files have consistent session and material labels.

## Design

One token set in `assets/site.css` on `:root`, colours in OKLCH, spacing and type on a small scale, cascade layers in the order reset, tokens, base, layout, components, utilities. Layout is intrinsic, a grid with `auto-fit` for the cards and wrapping flex rows for header and button groups, so media queries are used only for reduced motion, for print, and to release the sticky header on narrow screens where the wrapped navigation would cover anchor targets. The viewer adds `assets/viewer.css` for its form and the Mirador container. The palette is light only, because the title slides are white and the site is used in a lit seminar room. Class names used by the M³GIM module (`panel`, `card`, `grid`, `actions`, `button`, `resources`, `workflow`, `metadata-table` and the others) stay stable.

The accessibility baseline consists of semantic landmarks, a skip link, visible focus, `aria-current` on the viewer link while the viewer page is open, list semantics preserved with an empty `list-style-type` where bullets are removed, button target sizes above 24 pixels, body text at 17 pixels with line height 1.6, and `prefers-reduced-motion` for the smooth anchor scrolling.

## Decisions

Single page without a router. The sessions are short enough for one document with anchor navigation. A hash router would add focus management, title updates and scroll restoration without a benefit for participants.

Title slides as versioned images. Fetched once per deck change through the public export endpoint and committed, so the overview works in the seminar room without Google. Slide and notes PDFs are not versioned, because the decks change until shortly before the sessions and each export would add several megabytes to the history. A local export before the workshop covers the offline case.

Slides embedded on demand. The embed iframe sits in a closed disclosure with lazy loading, so opening the page loads no deck, and the page keeps working when Google is unreachable, with the title images and the PDF links still in place.

Lecture notes as links. The earlier embedded Google Docs preview was the heaviest element on every page and the likeliest to fail. A preview link and the PDF export replace it.

Repository split with the parallel Codex instance. Codex owns `downloads/m3gim-fulltext/`, `scripts/m3gim-exercise.mjs`, `scripts/build-m3gim-tei.py` and the German README. The interface `m3gimCard`, `m3gimNextSession` and `m3gimPage(link)` stays unchanged. The generated `materials/m3gim-fulltext.html` is build output and is regenerated by the site build. The README switches to English after the workshop.

## Acceptance

`node scripts/build-site.mjs --check` passes, which covers drift between script and committed pages and every local link and anchor. The course page renders at 320 pixels width without horizontal scrolling and with the cards in one column, the viewer opens its example object, and the M³GIM page keeps its structure under the shared stylesheet.
