import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
}

const SITE_URL = (import.meta.env.VITE_SITE_URL as string) || 'https://victorvu-my-portfolio.info';

function joinUrl(origin: string, path: string) {
  const o = origin.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${o}${p}`;
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage,
  jsonLd,
  noindex = false,
}: SEOHeadProps) {
  const canonicalUrl = canonical ? joinUrl(SITE_URL, canonical) : SITE_URL;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const finalOgImage = ogImage ?? joinUrl(SITE_URL, '/og-image.svg');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content="Vũ Chí Công — Fullstack Developer" />
      <meta property="og:locale" content="vi_VN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  );
}

export { SITE_URL };
