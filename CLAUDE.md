# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this repository is

Static course website for Christopher Pollin's four sessions at Summer School Musicology 2026 (Graz, 16 and 17 September 2026), published by GitHub Pages straight from the root of `main` without a build step on GitHub. Generated HTML, title-slide images and download ZIPs are therefore committed. Slides and lecture notes stay as Google Slides and Docs on Drive and are only linked. Project knowledge follows the Promptotyping convention under `knowledge/`, entry point `knowledge/INDEX.md`, work diary `knowledge/journal.md`. Consult `knowledge/specification.md` before conceptual changes, it records the design decisions. Course page texts and teaching instructions are English, README and journal are German.

## Commands

Site generation (Node, no dependencies):

```
node scripts/build-site.mjs            # regenerate index.html, viewer page and redirect stubs
node scripts/build-site.mjs --check    # render without writing, fail on drift or broken local links and anchors
node scripts/fetch-title-slides.mjs    # refetch assets/slides/*.png after a deck changed (needs public decks)
```

Download packages and teaching data (Python, run from the repository root):

```
uv run scripts/build-m3gim-tei.py        # rebuild TEI files, CSV, guides and the m3gim-fulltext ZIPs
python scripts/build-shared-packages.py  # rebuild the session packages and shared archives, refresh hashes in downloads/drive-materials.json
python scripts/build-mobility-starter.py # rebuild m3gim-mobility-starter.csv and tools/mobility-starter/data.json (reads git commit f2d0608)
python scripts/build-m3gim-dataset.py    # verify or refetch the pinned M3GIM JSON-LD snapshot
```

Scripts with a PEP 723 header (`# /// script`) run with `uv run`, the others need only the standard library. `downloads/m3gim-fulltext/validate_tei.py` validates the course TEI against the bundled TEI Lite schema (`uv run validate_tei.py tei` from that folder).

After any change to `scripts/sessions.mjs`, `scripts/viewer-page.mjs` or `scripts/build-site.mjs`, run the build and commit the regenerated pages. `--check` is the acceptance gate before a commit. There is no linter, typechecker or test suite beyond these scripts and the asserts inside them.

## Architecture

The whole site is rendered from one data module. `scripts/sessions.mjs` holds the site constants, the Drive IDs and, per session, title, subtitle, learning objectives, the `package` ZIP, activities with optional resources, the `notesInProgress` flag and an optional `published: false` that keeps a session off the course page until its day. `scripts/build-site.mjs` turns that array into `index.html` (one row per session with its download area), the viewer page `tools/iiif-viewer/index.html` (body from `scripts/viewer-page.mjs`, whose element IDs are the contract with `tools/iiif-viewer/app.js`), and redirect stubs under `sessions/` and `materials/`. Adding, merging or removing a session is an edit of the array followed by the title-slide fetch and the build. No page text states the number of sessions. Sessions 3 and 4 share one deck and one lecture-notes document and appear as one section. The `aliases` field keeps `session-4` as a second anchor and redirect stub.

Legacy URLs are preserved. `materials/m3gim-fulltext.html` redirects to the Session 2 TEI exercise via `assets/material-redirect.js`, mapping `#next-session` to the final project. Keep every already published download path reachable.

Hands-on tools are plain no-build browser apps. `tools/iiif-viewer/` reads the project XML (namespace `http://gams.uni-graz.at/viewer`) or a generated IIIF Presentation 3 manifest plus images entirely in the browser and shows them in the vendored Mirador 3.3.0. `tools/mobility-starter/` is the reference viewer for the mobility CSV. `build_manifest.py` inside the viewer folder is the teaching transformation that participants run themselves.

Downloads are derived artefacts with provenance. Each package has a builder in `scripts/` and a provenance file next to it (`drive-materials.json`, `*-source.txt`, `szd-facsimiles-PROVENANCE.md`, `m3gim-fulltext/manifest.json`). Builders use fixed ZIP timestamps and LF normalisation so archives stay byte-identical across runs and platforms. The M3GIM JSON-LD snapshot is pinned by upstream Git blob hash and excluded from text conversion in `.gitattributes`. Do not edit ZIPs, generated CSVs or the TEI files by hand. Edit the source (`reference.json`, `metadata.json`, the guides) and rerun the builder.

CSS lives in `assets/site.css` as one token set on `:root` with OKLCH colours and cascade layers in the order reset, tokens, base, layout, components, utilities. The accessibility baseline (landmarks, skip link, visible focus, `aria-current`, 320 px width without horizontal scrolling) is part of the acceptance criteria in `knowledge/specification.md`.

## Conventions specific to this repository

- Generated files (`index.html`, `sessions/*.html`, `materials/*.html`, `tools/iiif-viewer/index.html`, `assets/slides/*.png`, the ZIPs) are committed on purpose. Never hand-edit them.
- Google Drive remains the editing location of slides and notes. The site never changes their sharing settings, and slide or notes PDFs are not versioned.
- The AI-assistance disclosure on lecture-notes links and the "Work in progress" state are driven by data in `sessions.mjs`, not by page markup.
- Each session offers one package ZIP. Hands-on entries name the exercises without instruction sentences and link only tools or files useful on their own. Instructions belong in the slides.
- Licence split is CC BY 4.0 for teaching material (`LICENSE-CONTENT.md`) and MIT for code (`LICENSE`). Third-party material keeps its own terms and is listed there.
- Record substantive changes as a short entry in `knowledge/journal.md` and keep `knowledge/specification.md` in step when a decision changes.
