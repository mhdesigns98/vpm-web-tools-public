const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '../..');
const PROTOTYPES_DIR = path.join(REPO_ROOT, 'prototypes');
const PORT = 8765;
const VIEWPORT = { width: 1440, height: 900 };

function createServer() {
  const mimeTypes = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2', '.woff': 'font/woff',
  };

  const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    const filePath = path.join(REPO_ROOT, urlPath);
    try {
      const content = fs.readFileSync(filePath);
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise(resolve => server.listen(PORT, () => resolve(server)));
}

async function main() {
  const dirs = fs.readdirSync(PROTOTYPES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && fs.existsSync(path.join(PROTOTYPES_DIR, d.name, 'index.html')));

  if (!dirs.length) {
    console.log('No prototypes found.');
    return;
  }

  const server = await createServer();
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true,
  });

  for (const dir of dirs) {
    const outPath = path.join(PROTOTYPES_DIR, dir.name, 'screenshot.png');
    const url = `http://localhost:${PORT}/prototypes/${dir.name}/`;
    try {
      const page = await browser.newPage();
      await page.setViewport(VIEWPORT);
      await page.goto(url, { waitUntil: 'load', timeout: 20000 });
      // let JS and any CSS transitions settle
      await new Promise(r => setTimeout(r, 1500));
      await page.screenshot({ path: outPath, type: 'png' });
      await page.close();
      console.log(`  ✓ ${dir.name}`);
    } catch (err) {
      console.warn(`  ✗ ${dir.name}: ${err.message}`);
    }
  }

  await browser.close();
  server.close();
  console.log(`\nScreenshots written to prototypes/*/screenshot.png`);
}

main().catch(err => { console.error(err); process.exit(1); });
