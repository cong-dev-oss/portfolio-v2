# Portfolio SEO + Prerender Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tối ưu SEO cho portfolio trên domain `victorvu-my-portfolio.info` bằng metadata chuẩn + prerender HTML tĩnh cho `/`, `/services`, `/hire`, `/contact` để Google crawl thấy nội dung thật ngay lập tức.

**Architecture:** Vite + React Router vẫn chạy SPA cho UX, nhưng pipeline build sẽ prerender (headless Chrome) ra `out/<route>/index.html` cho các route chính. Metadata được quản lý bằng `react-helmet-async` để title/description/canonical/OG/JSON-LD đúng theo từng route.

**Tech Stack:** React 19, Vite, React Router, Tailwind, `react-helmet-async`, `puppeteer-core` + system Chromium (Docker builder), Nginx static.

---

## File map (tạo/sửa)

- Modify: `D:/Project/portfolioV2/public/robots.txt`
- Modify: `D:/Project/portfolioV2/public/sitemap.xml`
- Modify: `D:/Project/portfolioV2/index.html`
- Modify: `D:/Project/portfolioV2/package.json`
- Modify: `D:/Project/portfolioV2/src/main.tsx`
- Modify: `D:/Project/portfolioV2/src/components/feature/SEOHead.tsx`
- Modify: `D:/Project/portfolioV2/src/router/config.tsx`
- Modify: `D:/Project/portfolioV2/Dockerfile`

- Create: `D:/Project/portfolioV2/public/og-image.svg`
- Create: `D:/Project/portfolioV2/scripts/prerender.mjs`
- Create: `D:/Project/portfolioV2/src/components/feature/PortfolioPageNavbar.tsx`
- Create: `D:/Project/portfolioV2/src/pages/services/page.tsx`
- Create: `D:/Project/portfolioV2/src/pages/hire/page.tsx`
- Create/Modify: `D:/Project/portfolioV2/src/pages/contact/page.tsx` (đổi sang portfolio contact page)

---

### Task 1: Fix domain SEO (robots + sitemap + SITE_URL fallback)

**Files:**
- Modify: `public/robots.txt`
- Modify: `public/sitemap.xml`
- Modify: `src/components/feature/SEOHead.tsx`

- [ ] **Step 1: Update `public/robots.txt`**

```txt
User-agent: *
Allow: /

Sitemap: https://victorvu-my-portfolio.info/sitemap.xml
```

- [ ] **Step 2: Update `public/sitemap.xml` to production URLs**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://victorvu-my-portfolio.info/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://victorvu-my-portfolio.info/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://victorvu-my-portfolio.info/hire</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://victorvu-my-portfolio.info/contact</loc>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Update `SITE_URL` fallback (no more `example.com`)**

```tsx
const SITE_URL = (import.meta.env.VITE_SITE_URL as string) || 'https://victorvu-my-portfolio.info';
```

- [ ] **Step 4: Verify**
  - Open `public/robots.txt` and confirm sitemap points to the real domain.
  - Open `public/sitemap.xml` and confirm only `/`, `/services`, `/hire`, `/contact`.

---

### Task 2: Helmet-based head management (per-route metadata)

**Files:**
- Modify: `package.json`
- Modify: `src/main.tsx`
- Modify: `src/components/feature/SEOHead.tsx`
- Modify: `index.html`

- [ ] **Step 1: Add dependency**

Run:

```bash
npm i react-helmet-async
```

- [ ] **Step 2: Wrap app with `HelmetProvider`**

Update `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import './i18n';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
```

- [ ] **Step 3: Refactor `SEOHead` to use `<Helmet>` and remove `last-modified`**

Target shape:

```tsx
import { Helmet } from 'react-helmet-async';

export default function SEOHead(...) {
  // compute canonicalUrl, schemas...
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* ... */}
    </Helmet>
  );
}
```

- [ ] **Step 4: Trim duplicated hardcoded SEO tags in `index.html`**
  - Keep: charset, viewport, icons, fonts, remixicon/fontawesome includes.
  - Remove or minimize: title/description/keywords/og/twitter that will be managed by Helmet.

- [ ] **Step 5: Verify**
  - Run `npm run dev`
  - Navigate `/` then `/contact` and check browser tab title changes (runtime).

---

### Task 3: Add OG image (text-based asset)

**Files:**
- Create: `public/og-image.svg`
- Modify: `src/components/feature/SEOHead.tsx`

- [ ] **Step 1: Add `public/og-image.svg`** (simple, lightweight SVG card)
- [ ] **Step 2: In `SEOHead`, set default `ogImage` if not provided**

```tsx
const defaultOgImage = `${SITE_URL}/og-image.svg`;
const finalOgImage = ogImage ? ogImage : defaultOgImage;
```

- [ ] **Step 3: Verify**
  - View source on prerendered pages later: should include `og:image` and `twitter:image`.

---

### Task 4: Portfolio navigation for multi-page routes

**Files:**
- Create: `src/components/feature/PortfolioPageNavbar.tsx`

- [ ] **Step 1: Create navbar with links**
  - Links: `/` (Home), `/services`, `/hire`, `/contact`
  - Styling: follow palette from `PortfolioNavbar` (navy/gold), keep sticky/fixed top.

- [ ] **Step 2: Verify**
  - Can navigate between routes without reload.

---

### Task 5: Create `/services` page (keyword C)

**Files:**
- Create: `src/pages/services/page.tsx`
- Modify: `src/router/config.tsx`

- [ ] **Step 1: Implement page content**
  - H1: Backend `.NET Core` / `Spring Boot` + `DDD` / `CQRS`
  - Sections: Backend Engineering, Architecture, Payment/Integration, Case highlights, CTA to contact.

- [ ] **Step 2: Add `SEOHead` with Service schema**

Example JSON-LD skeleton:

```ts
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '.NET Core & Spring Boot Backend Development',
  provider: { '@type': 'Person', name: 'Vũ Chí Công' },
  areaServed: 'VN',
};
```

- [ ] **Step 3: Add route**

```tsx
{ path: '/services', element: <ServicesPage /> }
```

- [ ] **Step 4: Verify**
  - Manual: open `/services`, confirm H1 visible and metadata updates.

---

### Task 6: Create `/hire` page (keyword D)

**Files:**
- Create: `src/pages/hire/page.tsx`
- Modify: `src/router/config.tsx`

- [ ] **Step 1: Implement page content**
  - H1: Hire Senior Fullstack Developer (.NET Core / Spring Boot) tại TP.HCM
  - Include: engagement model, availability, CTA, FAQ.

- [ ] **Step 2: Add `SEOHead` with FAQPage schema**

Example JSON-LD skeleton:

```ts
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Bạn nhận freelance hay full-time?',
      acceptedAnswer: { '@type': 'Answer', text: '...' },
    },
  ],
};
```

- [ ] **Step 3: Add route**

```tsx
{ path: '/hire', element: <HirePage /> }
```

- [ ] **Step 4: Verify**
  - Manual: open `/hire`, confirm FAQ present and metadata updates.

---

### Task 7: Convert `/contact` route into portfolio contact page

**Files:**
- Modify: `src/pages/contact/page.tsx`
- (Optional) Reuse: `src/pages/home/components/PortfolioFooter.tsx`

- [ ] **Step 1: Replace SaaS-themed content**
  - Use `PortfolioPageNavbar`
  - Add concise hero copy for hiring/freelance inquiries
  - Render the existing `PortfolioFooter` contact form section to avoid duplication

- [ ] **Step 2: Ensure `SEOHead` content matches portfolio**
  - Title/description include hire/freelance keywords.

- [ ] **Step 3: Verify**
  - open `/contact`, ensure form works and metadata changes.

---

### Task 8: Prerender pipeline (Puppeteer)

**Files:**
- Modify: `package.json`
- Create: `scripts/prerender.mjs`
- Modify: `Dockerfile`

- [ ] **Step 1: Add devDependency**

Run:

```bash
npm i -D puppeteer-core
```

- [ ] **Step 2: Add npm script**

```json
{
  "scripts": {
    "prerender": "node scripts/prerender.mjs"
  }
}
```

- [ ] **Step 3: Implement `scripts/prerender.mjs`**
  - Start `vite preview` pointing to built `out/` (use fixed port, e.g. 4173).
  - Launch puppeteer with `executablePath` from `PUPPETEER_EXECUTABLE_PATH`.
  - Crawl and write:
    - `/` → `out/index.html`
    - `/services` → `out/services/index.html`
    - `/hire` → `out/hire/index.html`
    - `/contact` → `out/contact/index.html`
  - Abort images/fonts/media to speed up and avoid flaky network.

- [ ] **Step 4: Update `Dockerfile` builder stage to install Chromium and run prerender**

Target idea:

```dockerfile
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN npm run build && npm run prerender
```

- [ ] **Step 5: Verify locally**
  - Run: `npm run build`
  - Run: `npm run prerender`
  - Expect: `out/services/index.html`, `out/hire/index.html`, `out/contact/index.html` exist.

---

### Task 9: Acceptance verification (SEO)

**Files:** none (commands only)

- [ ] **Step 1: Preview built output**

Run:

```bash
npm run build
npm run prerender
npm run preview -- --host 127.0.0.1 --port 4173
```

- [ ] **Step 2: Check “View Page Source”**
  - `/services`, `/hire`, `/contact`
  - Confirm presence of:
    - `<title>`
    - `<meta name="description">`
    - `<link rel="canonical">`
    - `og:title`, `og:description`, `og:image`
    - JSON-LD `<script type="application/ld+json">`

- [ ] **Step 3: Validate sitemap/robots**
  - `GET /robots.txt` contains sitemap with correct domain.
  - `GET /sitemap.xml` contains only the 4 URLs.

---

### Task 10: Deploy checklist (server riêng + nginx)

- [ ] Add domain property in Google Search Console
- [ ] Submit sitemap: `https://victorvu-my-portfolio.info/sitemap.xml`
- [ ] After deploy, request indexing for `/services` và `/hire`

