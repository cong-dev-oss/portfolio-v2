import http from 'node:http';
import path from 'node:path';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import puppeteer from 'puppeteer-core';
import { createBrowserLaunchOptions } from './prerender-config.mjs';

const OUT_DIR = path.resolve(process.cwd(), 'out');
const HOST = process.env.PRERENDER_HOST || '127.0.0.1';
const PORT = Number(process.env.PRERENDER_PORT || 4173);
const ORIGIN = `http://${HOST}:${PORT}`;

const SITE_URL = (process.env.VITE_SITE_URL || 'https://victorvu-my-portfolio.info').replace(/\/+$/, '');
function canonicalFor(routePath) {
  return routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
}

const ROUTES = [
  { path: '/services', outFile: path.join(OUT_DIR, 'services', 'index.html'), canonical: canonicalFor('/services') },
  { path: '/hire', outFile: path.join(OUT_DIR, 'hire', 'index.html'), canonical: canonicalFor('/hire') },
  { path: '/contact', outFile: path.join(OUT_DIR, 'contact', 'index.html'), canonical: canonicalFor('/contact') },
  { path: '/', outFile: path.join(OUT_DIR, 'index.html'), canonical: canonicalFor('/') },
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function getContentType(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function resolveExecutablePath() {
  const programFiles = process.env.PROGRAMFILES;
  const programFilesX86 = process.env['PROGRAMFILES(X86)'];

  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    programFiles ? path.join(programFiles, 'Google', 'Chrome', 'Application', 'chrome.exe') : undefined,
    programFilesX86 ? path.join(programFilesX86, 'Google', 'Chrome', 'Application', 'chrome.exe') : undefined,
    programFiles ? path.join(programFiles, 'Microsoft', 'Edge', 'Application', 'msedge.exe') : undefined,
    programFilesX86 ? path.join(programFilesX86, 'Microsoft', 'Edge', 'Application', 'msedge.exe') : undefined,
  ].filter(Boolean);

  for (const p of candidates) {
    if (p && existsSync(p)) return p;
  }
  return undefined;
}

function createSpaStaticServer(rootDir) {
  const indexPath = path.join(rootDir, 'index.html');

  return http.createServer(async (req, res) => {
    try {
      const u = new URL(req.url || '/', ORIGIN);
      const pathname = decodeURIComponent(u.pathname);

      // Try serve direct file/dir from disk
      const diskPath = path.join(rootDir, pathname.replace(/^\/+/, ''));
      const normalized = path.normalize(diskPath);

      if (!normalized.startsWith(rootDir)) {
        res.statusCode = 400;
        res.end('Bad request');
        return;
      }

      let filePath = normalized;
      try {
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) filePath = path.join(filePath, 'index.html');
      } catch {
        // ignore
      }

      try {
        const buf = await fs.readFile(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', getContentType(filePath));
        res.end(buf);
        return;
      } catch {
        // ignore
      }

      // SPA fallback
      const indexBuf = await fs.readFile(indexPath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(indexBuf);
    } catch (err) {
      res.statusCode = 500;
      res.end('Server error');
    }
  });
}

async function waitForServerReady(url, timeoutMs = 15_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url, { redirect: 'manual' });
      if (r.status >= 200 && r.status < 500) return;
    } catch {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error(`Server not ready after ${timeoutMs}ms at ${url}`);
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();

  page.on('pageerror', (err) => {
    // eslint-disable-next-line no-console
    console.error(`[browser:${route.path}] pageerror:`, err);
  });

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const t = req.resourceType();
    if (t === 'image' || t === 'media' || t === 'font') {
      req.abort();
      return;
    }
    req.continue();
  });

  await page.goto(`${ORIGIN}${route.path}`, { waitUntil: 'domcontentloaded' });

  try {
    await page.waitForFunction(
      (expectedCanonical) => {
        const root = document.getElementById('root');
        const hasBody = !!root && root.children.length > 0;
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
        const hasDesc = !!document.querySelector('meta[name="description"]');
        return hasBody && hasDesc && canonical === expectedCanonical;
      },
      { timeout: 15_000 },
      route.canonical
    );

    // Home page has an intro overlay; wait until content is revealed.
    if (route.path === '/') {
      await page.waitForFunction(
        () => !document.querySelector('.door-overlay') && document.body.style.overflow !== 'hidden',
        { timeout: 25_000 }
      );
    }
  } catch (err) {
    const debug = await page.evaluate(() => {
      const root = document.getElementById('root');
      return {
        location: window.location.href,
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
        hasDescription: !!document.querySelector('meta[name="description"]'),
        rootChildren: root?.children?.length ?? 0,
        rootTextSample: (root?.textContent ?? '').trim().slice(0, 220),
      };
    });
    // eslint-disable-next-line no-console
    console.error('[prerender] wait failed debug:', debug);
    throw err;
  }

  const html = await page.content();
  await fs.mkdir(path.dirname(route.outFile), { recursive: true });
  await fs.writeFile(route.outFile, html, 'utf8');
  await page.close();
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    throw new Error(`Build output folder not found: ${OUT_DIR}. Run "npm run build" first.`);
  }

  const server = createSpaStaticServer(OUT_DIR);
  await new Promise((resolve) => server.listen(PORT, HOST, resolve));

  try {
    await waitForServerReady(`${ORIGIN}/`);

    const executablePath = resolveExecutablePath();
    if (!executablePath) {
      throw new Error(
        'No Chromium executable found. Set PUPPETEER_EXECUTABLE_PATH or install chromium in your environment.'
      );
    }

    const browser = await puppeteer.launch(
      createBrowserLaunchOptions({
        executablePath,
      })
    );

    try {
      for (const route of ROUTES) {
        // eslint-disable-next-line no-console
        console.log(`[prerender] ${route.path} -> ${path.relative(process.cwd(), route.outFile)}`);
        await prerenderRoute(browser, route);
      }
    } finally {
      await browser.close();
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[prerender] failed:', err);
  process.exitCode = 1;
});
