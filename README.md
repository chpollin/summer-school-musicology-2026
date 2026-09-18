# Summer School Musicology 2026 · Research Data Workflows and LLMs

Teaching materials from Christopher Pollin's four sessions at the University of Music and Performing Arts Graz on 16 and 17 September 2026, part of the summer school “Gender – Knowledge – Mobility. Digital Perspectives in Musicology”.

[Open the course website](https://chpollin.github.io/summer-school-musicology-2026/) · [Project knowledge](knowledge/INDEX.md) · [Reuse conditions](LICENSE-CONTENT.md)

## Use the materials

The website links slides, lecture notes and their PDF exports, with one download package per session. Sessions 3 and 4 share a deck, a reader and a package. Native Google documents remain the editing sources, so their links always show the current version. Lecture notes for Session 2 and Sessions 3 and 4 are marked as drafts.

- Session 1 follows a source from Stefan Zweig Digital through XML metadata, IIIF, TEI and RDF. Its package contains the Schulnachricht image and the XML-to-IIIF exercise.
- Session 2 introduces LLMs and uses the two scans of the Bayreuth 1953 programme `UAKUG_NIM_005_137_3` for transcription and contextualisation with supplied metadata. Further exercises explore a small CSV and generate TEI from facsimiles.
- Sessions 3 and 4 use Promptotyping to build a small digital edition or research dashboard. The package contains source PDFs, a starter CSV and a pinned archival JSON-LD snapshot with provenance.

The reference transcriptions preserve uncertain readings and source variants. They are teaching derivatives; scholarly acceptance as a critical edition remains outstanding. The unpublished M³GIM prototype is not linked from the course page.

The [IIIF viewer](https://chpollin.github.io/summer-school-musicology-2026/tools/iiif-viewer/) opens XML metadata or an IIIF Presentation 3 manifest with locally selected images. Files stay in the browser. Mirador 3.3.0 is bundled locally.

## Preview and maintain

The website needs no installation or browser framework. Serve the repository root locally:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/. Edit course content in `scripts/sessions.mjs` and the viewer markup in `scripts/viewer-page.mjs`, then regenerate the pages with Node.js 22 or newer:

```sh
node scripts/build-site.mjs
node scripts/build-site.mjs --check
```

Python 3.11+ and uv provide the material builders and checks. If uv is not on PATH, use `python -m uv`.

```sh
uv sync --locked
uv run --locked scripts/build-shared-packages.py
uv run --locked pytest -q
uv run --locked scripts/check-material-links.py
```

After changing a title slide, refresh both the PNG and its responsive display copies before rebuilding:

```sh
node scripts/fetch-title-slides.mjs
uv run --locked scripts/build-title-images.py session-1 session-2 session-3
node scripts/build-site.mjs
```

The site check verifies generated-page consistency, duplicate IDs, local paths, anchors and responsive image references. The link checker additionally verifies public course links and all six PDF exports, rejecting login pages returned with HTTP 200. It accepts optional Markdown, text or PPTX exports through `--source FILE`, and `--live` checks deployed site URLs. Reports are local under `.artifacts/`.

The package tests cover the Session 2 context and image inputs, included reuse conditions, archive integrity, repeatable generation and preservation of existing downloads when a build fails. The optional pre-commit configuration checks the maintained Python builders with Ruff.

Additional data builders are `scripts/build-m3gim-tei.py` (run with `uv run`), `scripts/build-mobility-starter.py` and `scripts/build-m3gim-dataset.py`. They maintain the TEI references, starter data and pinned JSON-LD snapshot respectively. Source meanings and review limits are documented in [the specification](knowledge/specification.md) and the provenance files beside each dataset.

## Repository structure and publication

- `index.html` is the generated course page. `sessions/` and `materials/` preserve earlier URLs through redirects.
- `downloads/` contains session packages, individual files, reference materials and provenance. Older published download paths remain available.
- `tools/iiif-viewer/` contains the viewer and teaching transformation; `tools/mobility-starter/` contains the CSV reference application.
- `assets/` contains styles, a favicon, title images and illustration provenance.
- `scripts/` contains the course data and generators. `tests/` verifies publication packages and link checks.
- `knowledge/` records purpose, behaviour, decisions and open authoring inputs.

GitHub Pages serves the root of `main` without a build step on GitHub. Generated HTML, images and ZIPs are committed. Rebuild them from maintained inputs before publishing; do not edit them by hand.

## Licence and attribution

Original teaching texts are CC BY 4.0 and code is MIT. Archival scans and other third-party material retain their own conditions, described in [LICENSE-CONTENT.md](LICENSE-CONTENT.md). The session packages include these conditions. Google-hosted slides and notes carry their own licence statements.

Suggested attribution: Christopher Pollin, *Summer School Musicology 2026 · Research Data Workflows and LLMs*, with a link to this repository and the applicable licence.

The website and file processing were developed with GPT-6 Astra in Codex and Claude Code. The viewer uses [Mirador 3.3.0](https://github.com/ProjectMirador/mirador/tree/v3.3.0) and [IIIF Presentation 3](https://iiif.io/api/presentation/3.0/).
