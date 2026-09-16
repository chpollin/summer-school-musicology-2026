const roleNames = { entstehung: 'Document creation', probe: 'Rehearsal', Generalprobe: 'Dress rehearsal', auftritt: 'Performance reference', erwähnt: 'Mention', gastspiel: 'Guest-performance reference' };
const element = (tag, text) => { const node = document.createElement(tag); if (text) node.textContent = text; return node; };
const summary = document.querySelector('#summary');

function select(row, button) {
  document.querySelectorAll('.point').forEach(point => point.setAttribute('aria-pressed', String(point === button)));
  const panel = document.querySelector('#details');
  panel.replaceChildren(element('h2', row.title));
  const list = element('dl');
  for (const [key, value] of Object.entries(row)) {
    list.append(element('dt', key));
    const description = element('dd');
    if (key === 'source_url') {
      const link = element('a', 'Source CSV · row ' + row.evidence_id.split('-').at(-1));
      link.href = value;
      description.append(link);
    } else description.textContent = value;
    list.append(description);
  }
  panel.append(list);
}

try {
  const response = await fetch('data.json');
  if (!response.ok) throw new Error(`Data request failed: ${response.status}`);
  const rows = await response.json();
  const places = [...new Set(rows.map(row => row.place))].sort();
  summary.textContent = `${rows.length} statements · ${new Set(rows.map(row => row.document_id)).size} documents · ${places.length} places · 1952–1957`;
  for (const role of new Set(rows.map(row => row.recorded_role))) {
    const key = element('span', `${roleNames[role]} (${role})`);
    key.className = 'key'; key.dataset.role = role;
    document.querySelector('#legend').append(key);
  }
  const chart = document.querySelector('#timeline');
  const axis = element('div'); axis.className = 'axis'; axis.append(element('span', 'Place'));
  const years = element('div'); years.className = 'years';
  for (let year = 1952; year <= 1958; year++) years.append(element('span', String(year)));
  axis.append(years); chart.append(axis);
  const start = Date.parse('1952-01-01'), end = Date.parse('1958-01-01');
  for (const place of places) {
    const group = element('section'); group.className = 'place-row'; group.append(element('h2', place));
    const track = element('div'); track.className = 'track';
    const laneEnds = [];
    for (const row of rows.filter(item => item.place === place)) {
      const x = 100 * (Date.parse(row.date) - start) / (end - start);
      let lane = laneEnds.findIndex(last => x - last > 7);
      if (lane < 0) lane = laneEnds.length;
      laneEnds[lane] = x;
      const uncertain = row.date_status !== 'not_flagged';
      const point = element('button', uncertain ? '?' : '●');
      point.className = 'point'; point.dataset.role = row.recorded_role;
      point.dataset.evidenceId = row.evidence_id;
      point.style.setProperty('--x', `${x}%`); point.style.setProperty('--y', `${12 + lane * 38}px`);
      point.setAttribute('aria-pressed', 'false');
      point.setAttribute('aria-label', `${place}, ${row.date}, ${roleNames[row.recorded_role]}, ${row.date_type}, ${row.date_status}, ${row.evidence_id}`);
      point.title = point.getAttribute('aria-label');
      point.addEventListener('click', () => select(row, point)); track.append(point);
    }
    track.style.height = `${Math.max(100, laneEnds.length * 38 + 24)}px`;
    group.append(track); chart.append(group);
  }
} catch (error) { summary.textContent = `Unable to load the data. Open this page through a local web server. ${error.message}`; }
