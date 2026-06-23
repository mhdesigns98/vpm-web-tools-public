const fs = require('fs');
const path = require('path');

const PROTOTYPES_DIR = path.join(__dirname, '../../prototypes');
const OUTPUT = path.join(PROTOTYPES_DIR, 'index.html');

function getTitle(name) {
  try {
    const html = fs.readFileSync(path.join(PROTOTYPES_DIR, name, 'index.html'), 'utf8');
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return match ? match[1].trim() : name;
  } catch { return name; }
}

function getDescription(name) {
  try {
    const html = fs.readFileSync(path.join(PROTOTYPES_DIR, name, 'index.html'), 'utf8');
    const m = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
           || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
    return m ? m[1].trim() : '';
  } catch { return ''; }
}

function getMtime(name) {
  try { return fs.statSync(path.join(PROTOTYPES_DIR, name, 'index.html')).mtime; }
  catch { return new Date(0); }
}

function hasScreenshot(name) {
  return fs.existsSync(path.join(PROTOTYPES_DIR, name, 'screenshot.png'));
}

function formatDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const prototypes = fs.readdirSync(PROTOTYPES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory() && fs.existsSync(path.join(PROTOTYPES_DIR, d.name, 'index.html')))
  .map(d => ({
    slug: d.name,
    title: getTitle(d.name),
    desc: getDescription(d.name),
    mtime: getMtime(d.name),
    screenshot: hasScreenshot(d.name),
  }))
  .sort((a, b) => b.mtime - a.mtime);

const [latest, ...rest] = prototypes;

function previewEl(p, size = 'hero') {
  if (p.screenshot) {
    return `<img src="./${p.slug}/screenshot.png" alt="${p.title}" loading="lazy" class="preview-img">`;
  }
  // Placeholder when screenshot hasn't been generated yet
  return `<div class="preview-placeholder"><span>Preview generates on deploy</span></div>`;
}

const heroSection = latest ? `
  <section class="hero">
    <div class="hero-meta">
      <span class="badge">Latest</span>
      <span class="hero-date">${formatDate(latest.mtime)}</span>
    </div>
    <h1 class="hero-title">${latest.title !== latest.slug ? latest.title : latest.slug}</h1>
    ${latest.desc ? `<p class="hero-desc">${latest.desc}</p>` : ''}
    <a class="hero-cta" href="./${latest.slug}/" target="_blank">Open prototype →</a>
    <div class="browser-frame">
      <div class="browser-chrome">
        <div class="browser-dots"><span></span><span></span><span></span></div>
        <div class="browser-bar">${latest.slug}/</div>
      </div>
      <div class="browser-viewport hero-viewport">
        ${previewEl(latest, 'hero')}
      </div>
    </div>
  </section>` : '';

const otherCards = rest.length ? `
  <section class="archive">
    <h2 class="archive-heading">All prototypes <span class="archive-count">${rest.length}</span></h2>
    <div class="card-grid">
      ${rest.map(p => `
      <a class="card" href="./${p.slug}/" target="_blank">
        <div class="card-viewport">
          ${previewEl(p, 'card')}
        </div>
        <div class="card-info">
          <span class="card-title">${p.title !== p.slug ? p.title : p.slug}</span>
          <span class="card-date">${formatDate(p.mtime)}</span>
        </div>
      </a>`).join('\n')}
    </div>
  </section>` : '';

const emptyState = !prototypes.length
  ? '<p class="empty">No prototypes yet — add a subfolder with an index.html to get started.</p>'
  : '';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VPM Prototypes</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ground:    #0d0d12;
      --surface:   #16161f;
      --surface-hi:#1e1e2a;
      --border:    #2a2a38;
      --text:      #e2e2f0;
      --muted:     #8888a8;
      --dim:       #44445a;
      --amber:     #f0b429;
      --amber-dim: #7a5c14;
      --violet:    #a78bfa;
      --violet-dim:#3d2f72;
      --green:     #34d399;
    }

    html, body {
      background: var(--ground);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      min-height: 100%;
      -webkit-font-smoothing: antialiased;
    }

    header {
      padding: 20px 32px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .wordmark {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .wordmark em { color: var(--amber); font-style: normal; }

    .count-pill {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--dim);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 3px 10px;
    }

    main {
      max-width: 1100px;
      margin: 0 auto;
      padding: 48px 32px 80px;
    }

    /* ── Hero ── */
    .hero { margin-bottom: 64px; }

    .hero-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
    }

    .badge {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--ground);
      background: var(--amber);
      border-radius: 3px;
      padding: 3px 8px;
    }

    .hero-date {
      font-size: 12px;
      color: var(--dim);
    }

    .hero-title {
      font-size: clamp(22px, 4vw, 38px);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.15;
      color: var(--text);
      margin-bottom: 12px;
    }

    .hero-desc {
      font-size: 15px;
      color: var(--muted);
      max-width: 560px;
      margin-bottom: 20px;
    }

    .hero-cta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 600;
      color: var(--amber);
      text-decoration: none;
      border: 1px solid var(--amber-dim);
      border-radius: 4px;
      padding: 8px 16px;
      margin-bottom: 28px;
      transition: background 120ms, border-color 120ms;
    }
    .hero-cta:hover {
      background: rgba(240,180,41,0.08);
      border-color: var(--amber);
    }

    /* ── Browser Frame ── */
    .browser-frame {
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      background: var(--surface);
      box-shadow: 0 24px 64px rgba(0,0,0,0.5);
    }

    .browser-chrome {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      background: var(--surface-hi);
      border-bottom: 1px solid var(--border);
    }

    .browser-dots { display: flex; gap: 5px; flex-shrink: 0; }
    .browser-dots span {
      display: block; width: 9px; height: 9px; border-radius: 50%;
    }
    .browser-dots span:nth-child(1) { background: #f87171; }
    .browser-dots span:nth-child(2) { background: #fbbf24; }
    .browser-dots span:nth-child(3) { background: var(--green); }

    .browser-bar {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      color: var(--muted);
      background: var(--border);
      border-radius: 4px;
      padding: 3px 10px;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .browser-viewport {
      position: relative;
      overflow: hidden;
    }

    .hero-viewport {
      max-height: 520px;
    }

    .preview-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }

    .hero-viewport .preview-img {
      max-height: 520px;
      object-fit: cover;
    }

    .preview-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 320px;
      background: var(--surface-hi);
      color: var(--dim);
      font-size: 12px;
    }

    /* ── Archive ── */
    .archive-heading {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--dim);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .archive-count {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1px 7px;
      font-size: 10px;
      color: var(--muted);
      letter-spacing: 0;
      font-weight: 600;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }

    .card {
      display: block;
      border: 1px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      background: var(--surface);
      transition: border-color 140ms, box-shadow 140ms, transform 120ms;
    }
    .card:hover {
      border-color: var(--violet-dim);
      box-shadow: 0 8px 28px rgba(0,0,0,0.35);
      transform: translateY(-2px);
    }

    .card-viewport {
      height: 180px;
      overflow: hidden;
      background: var(--surface-hi);
      position: relative;
    }

    .card-viewport .preview-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }

    .card-viewport .preview-placeholder {
      height: 180px;
    }

    .card-info {
      padding: 12px 14px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
    }

    .card-title {
      font-size: 13px;
      font-weight: 500;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-date {
      font-size: 11px;
      color: var(--dim);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .empty { color: var(--dim); font-size: 14px; padding: 32px 0; }

    @media (max-width: 600px) {
      header { padding: 16px 20px; }
      main { padding: 32px 20px 56px; }
      .hero-viewport { max-height: 280px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .card, .hero-cta { transition: none; }
    }
  </style>
</head>
<body>
  <header>
    <span class="wordmark">VP<em>M</em> Prototypes</span>
    <span class="count-pill">${prototypes.length} prototype${prototypes.length !== 1 ? 's' : ''}</span>
  </header>
  <main>
    ${emptyState}
    ${heroSection}
    ${otherCards}
  </main>
</body>
</html>`;

fs.writeFileSync(OUTPUT, html);
console.log(`Built index with ${prototypes.length} prototype(s) → prototypes/index.html`);
