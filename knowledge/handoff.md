---
title: Handoff
project:
  name: Summer School Musicology 2026
  repository: https://github.com/chpollin/summer-school-musicology-2026
method:
  name: Promptotyping
  url: https://lisa.gerda-henkel-stiftung.de/digitale_geschichte_pollin
status: active
created: 2026-09-15
updated: 2026-09-15
language: en
related: [journal, specification]
---

# Handoff

Handover points for the Codex instance, for the merged session and for the time after the workshop.

## Merged Session 3 and 4

The slides and lecture notes of Sessions 3 and 4 are being merged into one session by the Codex instance working on Google Drive. Once the new deck and document IDs exist, replace the two entries in `scripts/sessions.mjs` with one, set day and time (15:00–18:30 on Thursday 17 September with a break, to be confirmed), run `node scripts/fetch-title-slides.mjs`, then `node scripts/build-site.mjs`, and adjust the “Sessions 2 and 3” wording of the M³GIM entry in the downloads section if the numbering changes.

## Links in the M³GIM module

`scripts/m3gim-exercise.mjs` links `../sessions/session-2.html#exercises` and `../sessions/session-3.html#exercises`. Once these point to `../index.html#session-2` and `../index.html#session-3`, the redirect stubs generated for `sessions/` and `materials/index.html` can be dropped from `scripts/build-site.mjs`.

## README language

The README is German and maintained by the Codex instance during the workshop preparation. After the workshop it switches to English, following the convention for public repositories, and its structure section is checked against the generated pages.

## Title slide of Session 4

The title slide of the current Session 4 deck reads “17 September 2026. . KUG Graz” with a doubled full stop and has no illustration on its left half. Both resolve with the merged deck.

## Duplicate image archives

`downloads/m3gim-fulltext/m3gim-next-session.zip` contains the same forty PNG scans as `m3gim-png.zip`. Both archives are in the git history. Whether the next-session bundle should reference the PNG archive instead is a decision for the M³GIM lane.

## Offline copy of the decks

Before the sessions, export the current slides and notes as PDF through the export links on the course page and keep them on the presenting laptop, since the site does not version them.
