const fs = require('fs');
const path = require('path');

const PROTOTYPES_DIR = path.join(__dirname, '../../prototypes');
const OUTPUT = path.join(PROTOTYPES_DIR, 'index.html');

function getTitle(name) {
  try {
    const html = fs.readFileSync(path.join(PROTOTYPES_DIR, name, 'index.html'), 'utf8');
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return match ? match[1].trim() : name;
  } catch {
    return name;
  }
}

const prototypes = fs.readdirSync(PROTOTYPES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory() && fs.existsSync(path.join(PROTOTYPES_DIR, d.name, 'index.html')))
  .map(d => ({ slug: d.name, title: getTitle(d.name) }))
  .sort((a, b) => a.slug.localeCompare(b.slug));

const cards = prototypes.length
  ? prototypes.map(p => `
    <a class="card" href="./${p.slug}/">
      <span class="card-name">${p.slug}</span>
      <span class="card-title">${p.title !== p.slug ? p.title : ''}</span>
      <span class="card-arrow">→</span>
    </a>`).join('\n')
  : '<p class="empty">No prototypes yet — add a subfolder with an index.html to get started.</p>';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VPM Prototypes</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --navy: #003865;
      --deep: #001f3d;
      --yellow: #E0E721;
      --blue: #6CACE4;
      --red: #EE2737;
      --text: #e8f0f8;
      --muted: #7fa8cc;
      --dim: #4a7094;
      --surface: #003865;
      --surface-hi: #0a4278;
    }
    html, body { background: var(--deep); color: var(--text); min-height: 100%; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; }
    header {
      background: var(--deep);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 16px 28px 0;
      position: sticky; top: 0; z-index: 10;
    }
    .hd-inner { display: flex; align-items: baseline; gap: 14px; padding-bottom: 14px; }
    .brand {
      font-family: Impact, 'Arial Black', sans-serif;
      font-size: 18px; letter-spacing: 0.08em; text-transform: uppercase;
    }
    .brand em { color: var(--yellow); font-style: normal; }
    .sub { font-size: 12px; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; font-weight: 600; }
    .bar { display: flex; height: 3px; }
    .bar span { flex: 1; }
    .bar span:nth-child(1) { background: var(--blue); }
    .bar span:nth-child(2) { background: var(--yellow); }
    .bar span:nth-child(3) { background: var(--red); }
    main { max-width: 900px; margin: 0 auto; padding: 32px 24px 64px; }
    .count { font-size: 11px; color: var(--dim); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; }
    .card {
      display: flex; align-items: center; gap: 12px;
      background: var(--surface); border-radius: 3px; padding: 14px 16px;
      text-decoration: none; color: inherit;
      border-left: 4px solid var(--blue);
      transition: background 120ms ease;
    }
    .card:hover { background: var(--surface-hi); }
    .card-name {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 13px; color: var(--yellow); flex: 1;
    }
    .card-title { font-size: 11px; color: var(--muted); flex: 2; }
    .card-arrow { color: var(--dim); font-size: 14px; }
    .empty { color: var(--dim); font-size: 13px; padding: 24px 0; }
    @media (max-width: 600px) {
      header { padding: 12px 16px 0; }
      main { padding: 24px 16px 48px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="hd-inner">
      <span class="brand">VP<em>M</em> <span style="color:var(--dim)">//</span> Prototypes</span>
      <span class="sub">${prototypes.length} prototype${prototypes.length !== 1 ? 's' : ''}</span>
    </div>
    <div class="bar"><span></span><span></span><span></span></div>
  </header>
  <main>
    <div class="grid">
      ${cards}
    </div>
  </main>
</body>
</html>`;

fs.writeFileSync(OUTPUT, html);
console.log(`Built index with ${prototypes.length} prototype(s) → prototypes/index.html`);
