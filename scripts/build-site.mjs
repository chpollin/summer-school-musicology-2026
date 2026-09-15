/**
 * Generate the course page, the exercise pages and the redirect stubs from scripts/sessions.mjs.
 * `--check` renders without writing, compares with the committed files and verifies every local link.
 */
import { existsSync, readdirSync, readFileSync, realpathSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { m3gimPage } from './m3gim-exercise.mjs';
import { viewerPage } from './viewer-page.mjs';
import { course, event, sessions, site, venue } from './sessions.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteDescription = "Slides, lecture notes, hands-on tools and downloads for Christopher Pollin's sessions at Summer School Musicology 2026.";
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const link = (url, label, kind = '') => `<a${kind ? ` class="${kind}"` : ''} href="${escape(url)}">${escape(label)}</a>`;
const slidesUrl = s => `https://docs.google.com/presentation/d/${s.slides}`;
const sessionLabel = s => s.label ?? `Session ${s.n}`;
const notesUrl = s => `https://docs.google.com/document/d/${s.notes}`;
const downloadIcon = '<svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg>';
const outputs = new Map();

const exercises = {
  iiif: () => `<p>Combine XML metadata and images, generate a manifest with Python, and inspect the result in Mirador. The ${link('tools/iiif-viewer/', 'IIIF viewer')} also accepts the XML directly. The package below contains the script, XML template, two synthetic example images and a guide.</p>`,
  m3gim: () => `<p>Transcribe seven documents with 40 scan pages, extract metadata and combine the checked results in TEI-XML. The ${link('materials/m3gim-fulltext.html', 'M³GIM exercise')} provides the source images, prompts, TEI template, checker and reference files. Keep your TEI files and images together for the tool-building exercise in Session 3.</p>`,
  'm3gim-next': () => `<p>Session 3 guides you through the first three steps. We return to PDF-to-PNG conversion to compare how you and an agent execute the same task, then reuse the TEI corpus from Session 2 for tool building.</p>
<ol class="workflow">
<li><strong>Run the workflow yourself.</strong> Open the first package in Visual Studio Code, follow its guide and run the supplied script. Inspect the generated images against the PDFs.</li>
<li><strong>Repeat the workflow with an agent.</strong> Give the agent the same task, script and PDFs. Compare the outputs with your first run. Practise Agentic Engineering by inspecting its tool use and results and providing feedback.</li>
<li><strong>Build a small research tool.</strong> Reuse your TEI files and images from Session 2 to implement and inspect a first tool together. A source viewer is the worked example. Maintain the requirements, data description and checks as project knowledge (Knowledge Engineering), and select the relevant context for each task (Context Engineering).</li>
<li id="session-4"><strong>Continue independently in Session 4.</strong> Choose a requirement for your own research tool or extend the guided example. Supply the relevant context, inspect the agent’s changes and verify the result against the data. Record what works and what remains uncertain.</li>
</ol>
<p>Both hands-on ZIPs contain their guide, the supplied Python script and all seven input PDFs. Keep your Session 2 <code>tei/</code> and <code>png/</code> folders together so the image links remain usable.</p>`,
};

function frame({ title, content, base, description = siteDescription, current = '', stylesheet = '', scripts = '' }) {
  const home = base ? `${base}index.html` : '';
  const items = [...sessions.map(s => [`${home}#${s.id}`, sessionLabel(s)]), [`${base}tools/iiif-viewer/`, 'IIIF viewer', 'viewer']];
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
<footer><div class="wrap footer-inner">
<p>Christopher Pollin · <a href="https://dhcraft.org/">Digital Humanities Craft</a></p>
<p>Teaching material <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> · Code <a href="https://github.com/chpollin/summer-school-musicology-2026/blob/main/LICENSE">MIT</a> · <a href="https://github.com/chpollin/summer-school-musicology-2026">Source code</a></p>
</div></footer>
${scripts}</body>
</html>
`;
}

const resourceList = resources => `<ul class="resources">${resources.map(r => `<li><a href="${escape(r.url)}"${r.url.startsWith('downloads/') ? ' download' : ''}>${escape(r.label)}</a>${r.note ? `<br><span class="small">${escape(r.note)}</span>` : ''}</li>`).join('')}</ul>`;

const sessionDownloads = s => `<div class="downloads" aria-label="${sessionLabel(s)} downloads">
<p class="downloads-label">${downloadIcon}Downloads</p>
${resourceList(s.downloads)}
<details><summary>More materials<span class="visually-hidden"> for ${sessionLabel(s)}</span></summary>${resourceList(s.additional)}</details>
</div>`;

const section = s => `<section id="${s.id}" class="session session-row">
<img class="session-image" src="assets/slides/${s.id}.png" width="960" height="540" alt="" decoding="async">
<div class="session-content">
<h2>${sessionLabel(s)} · ${escape(s.title)}</h2>
<p class="material-links">${link(`${slidesUrl(s)}/preview`, 'Slides')} · ${link(`${slidesUrl(s)}/export/pdf`, 'Slides PDF')} · ${link(`${notesUrl(s)}/preview`, 'Lecture notes')} · ${link(`${notesUrl(s)}/export?format=pdf`, 'Notes PDF')}</p>
${s.description ? `<p>${escape(s.description)}</p>\n` : ''}${s.exercise ? `${exercises[s.exercise]()}\n` : ''}${sessionDownloads(s)}
</div>
</section>`;

const home = `<div class="hero">
<p class="eyebrow">${escape(event)}</p>
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
