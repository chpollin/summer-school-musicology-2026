/**
 * Generate the course page, viewer and redirect stubs from scripts/sessions.mjs.
 * `--check` renders without writing, compares with the committed files and verifies every local link.
 */
import { existsSync, readdirSync, readFileSync, realpathSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { viewerPage } from './viewer-page.mjs';
import { course, event, sessions, site, venue } from './sessions.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteDescription = "Slides, lecture notes, hands-on tools and downloads for Christopher Pollin's sessions at Summer School Musicology 2026.";
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const slidesUrl = s => `https://docs.google.com/presentation/d/${s.slides}`;
const sessionLabel = s => s.label ?? `Session ${s.n}`;
const notesUrl = s => `https://docs.google.com/document/d/${s.notes}`;
const downloadIcon = '<svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg>';
const outputs = new Map();

function materialGroup(s, kind) {
  const slides = kind === 'slides';
  const label = slides ? 'Slides' : 'Lecture notes';
  const icon = slides ? '<path d="M3 4h18v12H3zM12 16v5m-4 0h8"/>' : '<path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6"/>';
  const svg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icon}</svg>`;
  const url = slides ? slidesUrl(s) : notesUrl(s);
  return `<span class="material-group">${svg}<a href="${url}/preview" aria-label="${sessionLabel(s)} ${label}">${label}</a><a class="pdf-link" href="${url}/${slides ? 'export/pdf' : 'export?format=pdf'}" aria-label="${sessionLabel(s)} ${label} PDF">PDF</a></span>`;
}

function frame({ title, content, base, description = siteDescription, current = '', stylesheet = '', scripts = '' }) {
  const items = [[`${base}tools/iiif-viewer/`, 'IIIF viewer', 'viewer']];
  const nav = items.map(([href, label, key]) => `<a href="${href}"${key && key === current ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title === course ? course : `${title} · ${course}`)}</title>
<meta name="description" content="${escape(description)}">
<meta name="theme-color" content="#6240a2">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:image" content="${site}assets/slides/session-1.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="${base}assets/site.css">
${stylesheet ? `<link rel="stylesheet" href="${base}${stylesheet}">\n` : ''}</head>
<body>
<a class="skip" href="#content">Skip to content</a>
<header class="site-header"><div class="wrap header-inner"><a class="brand" href="${base}index.html">${escape(event)}</a><nav aria-label="Main navigation">${nav}</nav></div></header>
<main class="wrap" id="content">
${content}
</main>
<footer><div class="wrap footer-inner">
<p>Christopher Pollin · <a href="https://dhcraft.org/">Digital Humanities Craft</a></p>
<p>Teaching material <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> · Code <a href="https://github.com/chpollin/summer-school-musicology-2026/blob/main/LICENSE">MIT</a> · <a href="https://github.com/chpollin/summer-school-musicology-2026">Source code</a></p>
</div></footer>
${scripts}</body>
</html>
`;
}

const resourceList = resources => `<ul class="resources">${resources.map(r => `<li><a href="${escape(r.url)}"${r.url.startsWith('downloads/') ? ' download' : ''}>${escape(r.label)}</a>${r.companion ? `<br><a class="small" href="${escape(r.companion.url)}" download>${escape(r.companion.label)}</a>` : ''}${r.note ? `<br><span class="small">${escape(r.note)}</span>` : ''}</li>`).join('')}</ul>`;

const activityList = activities => activities.map(a => `<div class="activity" id="${escape(a.id)}"><h4>${escape(a.title)}</h4>${a.note ? `<p class="small">${escape(a.note)}</p>` : ''}${resourceList(a.resources)}</div>`).join('\n');

const sessionDownloads = s => `<div class="downloads" aria-label="${sessionLabel(s)} hands-on materials">
<h3 class="downloads-label">${downloadIcon}Hands-on materials</h3>
${activityList(s.activities)}
<details${s.id === 'session-2' ? ' id="session-2-reference"' : ''}><summary>Optional preparation and reference materials<span class="visually-hidden"> for ${sessionLabel(s)}</span></summary>${resourceList(s.additional)}</details>
</div>`;

const section = s => `<section id="${s.id}" class="session session-row">
<img class="session-image" src="assets/slides/${s.id}.png" width="960" height="540" alt="" decoding="async">
<div class="session-content"${s.id === 'session-3' ? ' id="session-4"' : ''}>
<h2>${sessionLabel(s)} · ${escape(s.title)}</h2>
<p><strong>${escape(s.subtitle)}</strong></p>
<div class="material-links">${materialGroup(s, 'slides')}${materialGroup(s, 'notes')}</div>
<p>${escape(s.description)}</p>
<h3>Learning objectives</h3>
<ul>${s.objectives.map(objective => `<li>${escape(objective)}</li>`).join('')}</ul>
${sessionDownloads(s)}
</div>
</section>`;

const home = `<div class="hero">
<h1>Research Data Workflows<br>and LLMs</h1>
<p class="byline">Christopher Pollin · Digital Humanities Craft · ${escape(venue)} · 16 and 17 September 2026</p>
</div>
<div id="downloads"><div id="sessions">${sessions.map(section).join('\n')}</div></div>
`;
outputs.set('index.html', frame({ title: course, content: home, base: '' }));

const stub = (target, label) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${target}">
<title>${escape(label)} · moved</title>
</head>
<body><p>This page has moved to <a href="${target}">${escape(label)}</a>.</p></body>
</html>
`;
for (const s of sessions) outputs.set(`sessions/${s.id}.html`, stub(`../index.html#${s.id}`, sessionLabel(s)));
outputs.set('sessions/session-4.html', stub('../index.html#session-4', 'Sessions 3 and 4'));
outputs.set('materials/index.html', stub('../index.html#downloads', 'Downloads'));
outputs.set('materials/m3gim-fulltext.html', `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>From Facsimiles to TEI · moved</title><script type="module" src="../assets/material-redirect.js"></script></head>
<body><p>The exercise materials are now on the course page. Continue to <a href="../index.html#session-2">Session 2</a>, <a href="../index.html#session-2-reference">the optional references</a> or <a href="../index.html#session-3">Sessions 3 and 4</a>.</p></body></html>\n`);
outputs.set('tools/iiif-viewer/index.html', frame({ title: 'From XML to IIIF', content: viewerPage(), base: '../../', description: 'Teaching tool: open your XML metadata or IIIF manifest with its page images in Mirador, entirely in the browser.', current: 'viewer', stylesheet: 'assets/viewer.css', scripts: '<script type="module" src="app.js"></script>\n' }));

function brokenLinks(rel, html) {
  const problems = [];
  const ids = new Set([...html.matchAll(/ id="([^"]+)"/g)].map(m => m[1]));
  // Attributes inside real tags only, so escaped code samples such as &lt;page xlink:href="…"/&gt; are not checked as links.
  for (const [, raw] of html.matchAll(/<[a-z][^>]*?\s(?:href|src)="([^"]+)"/g)) {
    const url = raw.replaceAll('&amp;', '&');
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    const [target, fragment] = url.split('#');
    if (!target) { if (!ids.has(fragment)) problems.push(`${rel}: missing anchor #${fragment}`); continue; }
    let file = path.join(root, path.dirname(rel), target.split('?')[0]);
    if (target.endsWith('/')) file = path.join(file, 'index.html');
    if (!existsSync(file)) { problems.push(`${rel}: missing file ${url}`); continue; }
    // Windows resolves paths case-insensitively, GitHub Pages does not.
    if (path.relative(root, realpathSync.native(file)) !== path.relative(root, file)) { problems.push(`${rel}: wrong case in ${url}`); continue; }
    if (!fragment) continue;
    const targetHtml = outputs.get(path.relative(root, file).replaceAll('\\', '/'));
    // Redirect stubs carry no anchors of their own; their refresh target does.
    if (targetHtml && !targetHtml.includes('http-equiv="refresh"') && !targetHtml.includes(` id="${fragment}"`)) problems.push(`${rel}: missing anchor ${url}`);
  }
  return problems;
}

const check = process.argv.includes('--check');
const problems = [];
for (const [rel, raw] of outputs) {
  const file = path.join(root, rel);
  // Text read from the exercise package may carry CRLF line endings; the generated pages are always LF.
  const html = raw.replaceAll('\r\n', '\n');
  if (check) {
    const disk = existsSync(file) ? readFileSync(file, 'utf8').replaceAll('\r\n', '\n') : null;
    if (disk !== html) problems.push(`${rel}: differs from the generated output, run node scripts/build-site.mjs`);
  } else {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
  }
  problems.push(...brokenLinks(rel, html));
}
// A page that is no longer generated, such as the stub of a merged session, must not linger in the repository.
for (const dir of ['sessions', 'materials']) {
  for (const name of readdirSync(path.join(root, dir)).filter(name => name.endsWith('.html'))) {
    if (!outputs.has(`${dir}/${name}`)) problems.push(`${dir}/${name}: no longer generated, delete it`);
  }
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`${check ? 'Checked' : 'Generated'} ${outputs.size} pages: course page, viewer and redirect stubs.`);
