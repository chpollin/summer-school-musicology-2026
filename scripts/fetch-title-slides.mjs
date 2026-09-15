/**
 * Download the first slide of every session deck as PNG into assets/slides/.
 * Run after a deck changes; the images are committed so the site works without Google at runtime.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { sessions } from './sessions.mjs';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'slides');
await mkdir(dir, { recursive: true });
for (const s of sessions) {
  const url = `https://docs.google.com/presentation/d/${s.slides}/export/png`;
  const response = await fetch(url);
  const type = response.headers.get('content-type') ?? '';
  // Google answers a private deck with an HTML sign-in page and status 200, so the content type is the real check.
  if (!response.ok || !type.startsWith('image/png')) throw new Error(`Session ${s.n}: expected a PNG from ${url}, got ${response.status} ${type}. Share the deck with anyone who has the link.`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(dir, `${s.id}.png`), bytes);
  console.log(`assets/slides/${s.id}.png · ${Math.round(bytes.length / 1e3)} kB`);
}
