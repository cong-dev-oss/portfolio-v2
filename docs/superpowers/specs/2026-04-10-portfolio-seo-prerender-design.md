# Portfolio SEO (Prerender) — Design Spec

Ngày: 2026-04-10  
Domain mục tiêu: `https://victorvu-my-portfolio.info`

## 1) Mục tiêu

- **Index đúng domain**: toàn bộ canonical/JSON-LD/sitemap/robots trỏ về `victorvu-my-portfolio.info` (không còn `example.com`).
- **SEO theo keyword nhóm C + D**:
  - **C**: `.NET Core`, `Spring Boot`, `DDD`, `CQRS`, “system architecture”, “backend”.
  - **D**: “hire”, “freelance”, “tư vấn”, “Senior Fullstack Developer HCMC/TP.HCM”.
- **Bot nhìn thấy HTML thật ngay khi crawl**: pre-render HTML tĩnh cho các URL chính (không phụ thuộc JS render).
- **Mỗi URL có metadata riêng**: title/description/canonical/OG/Twitter/structured-data chính xác theo trang.
- **Dễ triển khai trên Docker + Nginx static**: build ra thư mục `out/` rồi Nginx serve.

## 2) Không cam kết / Ngoài phạm vi

- **Không thể “cam kết top 1”** chỉ bằng SEO kỹ thuật: thứ hạng còn phụ thuộc độ cạnh tranh, uy tín domain, backlink, hành vi người dùng, thời gian index.
- Không xây CMS/blog engine (nếu cần blog sẽ làm thành spec riêng).

## 3) Hiện trạng (observations)

- Project là **Vite + React Router (SPA)**, build ra `out/` và serve bằng **Nginx** (xem `Dockerfile`).
- `public/robots.txt` và `public/sitemap.xml` đang dùng `https://example.com/...` ⇒ sai domain.
- `SEOHead.tsx` đang render `<title>/<meta>` trong React nhưng **chưa có cơ chế quản lý `<head>` đúng chuẩn** (chưa dùng `react-helmet-async` / SSR / SSG) ⇒ metadata theo route không ổn định cho crawler/view-source.
- Với Nginx default, deep-link các route có thể **404** nếu không có `try_files` hoặc không có `/<route>/index.html`.

## 4) Kiến trúc SEO mục tiêu (IA + URL plan)

Giữ số trang ít nhưng “đúng intent” cho C + D.

- **`/`**: trang portfolio tổng quan (branding + proof + sections).
- **`/services`**: landing page nhắm keyword C (dịch vụ/kỹ năng cốt lõi, case highlights).
- **`/hire`**: landing page nhắm keyword D (hiring/freelance/consulting + CTA + FAQ).
- **`/contact`**: liên hệ (CTA rõ ràng, structured data dạng ContactPage).

Các route template kiểu SaaS (ví dụ `/pricing`, `/features`) **không phục vụ mục tiêu portfolio**:
- **Option A (khuyến nghị)**: bỏ route khỏi router + bỏ khỏi sitemap.
- **Option B**: giữ route nhưng **noindex** và không đưa vào sitemap (nếu cần vì lý do demo).

## 5) Giải pháp kỹ thuật (Recommended: Head chuẩn + Prerender)

### 5.1 Canonical + SITE_URL

- Set `VITE_SITE_URL=https://victorvu-my-portfolio.info` cho environment production.
- `SEOHead` phải build canonical theo `SITE_URL + path` (không fallback `example.com`).

### 5.2 Quản lý `<head>` đúng chuẩn

Thêm `react-helmet-async` để:
- CSR: chuyển route thì title/meta đổi đúng.
- Prerender: snapshot HTML sẽ có sẵn title/meta/canonical/OG/JSON-LD theo từng trang.

Thiết kế:
- Wrap app bằng `HelmetProvider` (1 lần ở root).
- Refactor `SEOHead.tsx` để render `<Helmet>...</Helmet>` thay vì fragment thuần.
- Tối giản meta SEO “cứng” trong `index.html` để tránh **trùng description/canonical** sau khi Helmet chạy.

### 5.3 Prerender ra HTML tĩnh (SSG kiểu snapshot)

Vì codebase có nhiều animation/browser-only libs, ưu tiên **prerender theo kiểu headless browser snapshot** (ổn định hơn SSR thuần).

Thiết kế prerender:
- Sau `vite build` (ra `out/`), chạy script Node:
  - start static server local trỏ `out/`
  - dùng `puppeteer-core` + `chromium` (cài trong builder stage) truy cập lần lượt:
    - `/`, `/services`, `/hire`, `/contact` (và các route khác nếu cần)
  - đợi `networkidle` + (tuỳ chọn) đợi selector chính (ví dụ `main` hoặc `#root *`)
  - lấy `page.content()` và ghi thành:
    - `out/index.html` cho `/`
    - `out/services/index.html`
    - `out/hire/index.html`
    - `out/contact/index.html`
- Nginx sẽ serve trực tiếp các HTML này ⇒ bot “view source” thấy nội dung thật.

### 5.4 Nginx routing

Khi đã có `/<route>/index.html`, deep-link sẽ hoạt động tốt.

Khuyến nghị thêm `nginx.conf` (tuỳ chọn nhưng nên có) để:
- `try_files $uri $uri/ /index.html;` (fallback SPA cho các path không prerender)
- cache-control hợp lý cho assets, hạn chế cache cho HTML.

## 6) Structured Data (JSON-LD) cần có

- Global:
  - `WebSite` + `Person` (tên, jobTitle, addressLocality, sameAs links: GitHub/LinkedIn/Telegram…)
- `/services`:
  - `Service` hoặc `OfferCatalog` (mô tả dịch vụ: backend, architecture, integration, payment…)
- `/hire`:
  - `FAQPage` (các câu hỏi: availability, tech stack, cách làm việc, onsite/remote…)
- `/contact`:
  - `ContactPage` (+ `Person` mainEntity)

## 7) Sitemap / Robots

- `public/robots.txt`
  - `Sitemap: https://victorvu-my-portfolio.info/sitemap.xml`
  - Chỉ allow các path thực sự muốn index (không liệt kê path demo nếu noindex).
- `public/sitemap.xml`
  - `<loc>` dùng domain thật
  - Chỉ include các URL cần index: `/`, `/services`, `/hire`, `/contact`
  - `lastmod` set theo ngày build hoặc update gần nhất.

## 8) Nội dung (On-page) để đánh C + D

### `/services` (keyword C)

- H1 gợi ý: “Dịch vụ Backend .NET Core & Spring Boot — DDD · CQRS · Integration”
- Có các section:
  - “Backend Engineering”: Web API, EF Core/JPA, background jobs, realtime (SignalR)
  - “System Architecture”: DDD, CQRS, event-driven, clean architecture
  - “Payments/Integration”: Stripe/PayPal/SePay, idempotency, webhook, consistency
  - “Case highlights” (ngắn, có số liệu/impact)
- Internal links: trỏ sang `/hire` + `/contact`

### `/hire` (keyword D)

- H1 gợi ý: “Hire Senior Fullstack Developer (.NET Core / Spring Boot) tại TP.HCM”
- Có:
  - Availability (full-time/freelance/consulting)
  - Engagement model (remote/onsite/hybrid)
  - CTA rõ (button tới `/contact`)
  - FAQ (dùng `FAQPage` schema)

## 9) Đo lường & vận hành SEO (non-code checklist)

- Add site vào **Google Search Console**, verify domain.
- Submit sitemap: `https://victorvu-my-portfolio.info/sitemap.xml`
- Kiểm tra:
  - Coverage / indexing
  - Page experience / Core Web Vitals
- Tạo backlink nền:
  - GitHub profile, LinkedIn, CV PDF, các bài viết (dev.to/medium) trỏ về `/services` và `/hire`.

## 10) Tiêu chí nghiệm thu (acceptance criteria)

- Mở “View Page Source” của:
  - `/services`, `/hire`, `/contact`
  - thấy đúng: `<title>`, `<meta name="description">`, `<link rel="canonical">`, OG tags, JSON-LD.
- `robots.txt` và `sitemap.xml` trỏ đúng domain thật (không còn `example.com`).
- Build Docker tạo ra `out/services/index.html`, `out/hire/index.html`, `out/contact/index.html`.
- Refresh trực tiếp URL `/services` (deep link) **không 404** trên Nginx.

## 11) Rollout

- Phase 1 (tech SEO): SITE_URL + robots/sitemap + Helmet.
- Phase 2 (prerender): script + Docker builder update.
- Phase 3 (content): tạo `/services`, `/hire`, sửa/loại bỏ route template.
- Phase 4 (submit/monitor): GSC + theo dõi index/ranking 2–6 tuần.

