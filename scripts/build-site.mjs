/**
 * Generate the course page, the exercise pages and the redirect stubs from scripts/sessions.mjs.
 * `--check` renders without writing, compares with the committed files and verifies every local link.
 */
import { existsSync, readdirSync, readFileSync, realpathSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { m3gimCard, m3gimNextSession, m3gimPage } from './m3gim-exercise.mjs';
import { viewerPage } from './viewer-page.mjs';
import { course, data, drive, event, prep, sessions, site, venue } from './sessions.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteDescription = "Slides, lecture notes, hands-on tools and downloads for Christopher Pollin's sessions at Summer School Musicology 2026.";
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const link = (url, label, kind = '') => `<a${kind ? ` class="${kind}"` : ''} href="${escape(url)}">${escape(label)}</a>`;
const slidesUrl = s => `https://docs.google.com/presentation/d/${s.slides}`;
const notesUrl = s => `https://docs.google.com/document/d/${s.notes}`;
const shortDay = day => {
  const match = day.match(/^(\w{3})\w* (\d+) (\w{3})\w*$/);
  if (!match) throw new Error(`Day must read like "Wednesday 16 September", got "${day}"`);
  return `${match[1]} ${match[2]} ${match[3]}`;
};
const outputs = new Map();

const panels = {
  iiif: () => `<div class="panel"><h3>From XML to IIIF</h3><p>Combine your XML metadata and images, generate a manifest with Python, and inspect the result in Mirador. The viewer also accepts the XML directly.</p><div class="actions">${link('tools/iiif-viewer/', 'Open the IIIF viewer', 'button')}${link('downloads/xml-iiif-workshop.zip', 'Download Python + IIIF package', 'button secondary')}</div><p class="small">Script, XML template, two synthetic example images and an English guide.</p></div>`,
  m3gim: base => m3gimCard(base, link),
  'm3gim-next': base => m3gimNextSession(base, link),
};

function frame({ title, content, base, description = siteDescription, current = '', stylesheet = '', scripts = '' }) {
  const home = base ? `${base}index.html` : '';
  const items = [...sessions.map(s => [`${home}#${s.id}`, `Session ${s.n}`]), [`${home}#downloads`, 'Downloads'], [`${base}tools/iiif-viewer/`, 'IIIF viewer', 'viewer']];
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
<header class="site-header"><div class="wrap header-inner"><a class="brand" href="${base}index.html">Summer School Musicology 2026</a><nav aria-label="Main navigation">${nav}</nav></div></header>
<main class="wrap" id="content">
${content}
</main>
<footer><div class="wrap">
<p>Christopher Pollin · <a href="https://dhcraft.org/">Digital Humanities Craft</a></p>
<p>Texts and teaching material <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>, code <a href="https://github.com/chpollin/summer-school-musicology-2026/blob/main/LICENSE">MIT</a> · <a href="https://github.com/chpollin/summer-school-musicology-2026">Source code</a> · Developed with GPT-6 Astra in Codex and Claude Code, images shown with <a href="https://projectmirador.org/">Mirador</a></p>
</div></footer>
${scripts}</body>
</html>
`;
}

const resourceList = (resources, base) => `<ul class="resources">${resources.map(r => `<li>${link(r.local ? base + r.url : r.url, r.label)}${r.note ? `<br><span class="small">${escape(r.note)}</span>` : ''}</li>`).join('')}</ul>`;

const card = s => `<a class="card" href="#${s.id}"><img src="assets/slides/${s.id}.png" width="960" height="540" alt="" decoding="async"><span class="number">Session ${s.n} · ${shortDay(s.day)} · ${s.time}</span><h3>${escape(s.title)}</h3><p>${escape(s.short)}</p></a>`;

const section = s => `<section id="${s.id}" class="session">
<p class="eyebrow">Session ${s.n} · ${s.day} · ${s.time}</p>
<h2>${escape(s.title)}</h2>
<p class="lead">${escape(s.description)}</p>
<div class="actions">${link(`${slidesUrl(s)}/preview`, 'Open slides', 'button')}${link(`${slidesUrl(s)}/export/pdf`, 'Slides PDF', 'button secondary')}${link(`${notesUrl(s)}/preview`, 'Lecture notes', 'button')}${link(`${notesUrl(s)}/export?format=pdf`, 'Notes PDF', 'button secondary')}</div>
<details class="slides-embed"><summary>Show the slides on this page</summary><iframe class="embed slides" src="${slidesUrl(s)}/embed?start=false&amp;loop=false&amp;delayms=3000" title="Session ${s.n} slides" allowfullscreen loading="lazy"></iframe></details>
${s.panel ? `${panels[s.panel]('')}\n` : ''}${resourceList(s.resources, '')}
</section>`;

const home = `<div class="hero">
<p class="eyebrow">${escape(event)}</p>
<h1>Research Data Workflows<br>and LLMs</h1>
<p class="lead">From archival sources to structured research data and applications.</p>
<p class="byline">Christopher Pollin · Digital Humanities Craft · ${escape(venue)} · 16 and 17 September 2026</p>
<div class="actions">${link('#sessions', 'Go to the sessions', 'button')}${link('#downloads', 'Downloads', 'button secondary')}</div>
</div>
<section id="sessions"><h2 class="visually-hidden">Sessions</h2><div class="grid">${sessions.map(card).join('')}</div></section>
${sessions.map(section).join('\n')}
<section id="downloads">
<h2>Downloads</h2>
<ul class="resources">
<li><a href="downloads/xml-iiif-workshop.zip" download>XML to IIIF · Python package</a><br><span class="small">Session 1 · script, XML template, two example images and guide.</span></li>
<li><a href="downloads/pdf-to-images.zip" download>PDF pages as images · Python package</a><br><span class="small">Session 1 · script, two-page source PDF and instructions.</span></li>
<li>${link('materials/m3gim-fulltext.html', 'M³GIM · From Facsimiles to TEI')}<br><span class="small">Sessions 2 and 3 · PDFs, PNGs, prompts, TEI template, checker and reference files.</span></li>
<li>${link('tools/iiif-viewer/', 'IIIF viewer')}<br><span class="small">Open your XML or manifest with its images in Mirador.</span></li>
<li>${link(`${prep}/preview`, 'Technical preparation slides')}</li>
<li>${link(drive, 'Course material folder on Google Drive')}</li>
<li>${link(data, 'Shared source material and exercise files')}</li>
</ul>
</section>`;
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
for (const s of sessions) outputs.set(`sessions/${s.id}.html`, stub(`../index.html#${s.id}`, `Session ${s.n}`));
outputs.set('materials/index.html', stub('../index.html#downloads', 'Downloads'));
outputs.set('materials/m3gim-fulltext.html', frame({ title: 'M³GIM · From Facsimiles to TEI', content: m3gimPage(link), base: '../', description: 'Hands-on exercise: turn seven M³GIM facsimiles into full texts, document metadata and simple TEI with an LLM, with downloads and reference files.' }));
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
console.log(`${check ? 'Checked' : 'Generated'} ${outputs.size} pages: course page, exercise page, viewer and redirect stubs.`);
