import SEOHead, { SITE_URL } from '@/components/feature/SEOHead';
import PortfolioPageNavbar from '@/components/feature/PortfolioPageNavbar';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Dịch vụ Backend .NET Core & Spring Boot | Vũ Chí Công',
    url: `${SITE_URL}/services`,
    description:
      'Dịch vụ phát triển backend với .NET Core và Spring Boot: thiết kế API, DDD/CQRS, payment integration, tối ưu hiệu năng và triển khai production-ready.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      ],
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Backend Development (.NET Core & Spring Boot)',
    provider: {
      '@type': 'Person',
      name: 'Vũ Chí Công',
      url: SITE_URL,
      jobTitle: 'Senior Fullstack Developer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ho Chi Minh City',
        addressCountry: 'VN',
      },
    },
    areaServed: { '@type': 'Country', name: 'Vietnam' },
    serviceType: ['Backend Engineering', 'System Architecture', 'Payment & Integration'],
  };

  return (
    <div className="min-h-screen" style={{ background: '#060D1F' }}>
      <SEOHead
        title="Dịch vụ Backend .NET Core & Spring Boot | DDD · CQRS · Integration | Vũ Chí Công"
        description="Thiết kế và xây dựng backend production-ready với .NET Core & Spring Boot: DDD/CQRS, event-driven, payment integration (Stripe/PayPal/SePay), tối ưu performance và triển khai."
        keywords=".NET Core backend, Spring Boot backend, DDD, CQRS, Clean Architecture, event-driven, payment integration, Stripe, PayPal, SePay, webhook, idempotency"
        canonical="/services"
        jsonLd={[webPageSchema, serviceSchema]}
      />

      <PortfolioPageNavbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: 'rgba(242,200,74,0.65)', fontFamily: 'Inter, sans-serif' }}
            >
              Services · Backend Engineering
            </p>

            <h1
              className="text-4xl md:text-5xl leading-tight mb-5"
              style={{ color: '#FFFAEE', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, letterSpacing: '0.02em' }}
            >
              Dịch vụ Backend <span style={{ color: '#F2C84A' }}>.NET Core</span> &amp;{' '}
              <span style={{ color: '#F2C84A' }}>Spring Boot</span>
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed max-w-3xl"
              style={{ color: 'rgba(220,200,160,0.75)', fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              Mình giúp bạn thiết kế và xây dựng backend <span style={{ color: 'rgba(242,200,74,0.9)' }}>ổn định</span>,{' '}
              <span style={{ color: 'rgba(242,200,74,0.9)' }}>mở rộng tốt</span> và{' '}
              <span style={{ color: 'rgba(242,200,74,0.9)' }}>dễ vận hành</span> — tập trung vào kiến trúc (DDD/CQRS), tích
              hợp thanh toán, tối ưu hiệu năng và chuẩn hóa delivery (CI/CD).
            </p>

            <div className="flex flex-wrap gap-2 mt-8">
              {[
                'DDD · CQRS',
                'Clean Architecture',
                'Event-driven',
                'Webhooks · Idempotency',
                'Stripe · PayPal · SePay',
                'Observability',
              ].map((chip) => (
                <span
                  key={chip}
                  className="text-xs px-3 py-1 rounded-sm"
                  style={{
                    color: 'rgba(255,240,200,0.85)',
                    background: 'rgba(242,200,74,0.08)',
                    border: '1px solid rgba(242,200,74,0.18)',
                    fontFamily: 'monospace',
                    letterSpacing: '0.04em',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap"
                style={{
                  color: '#060D1F',
                  background: '#F2C84A',
                  border: '1px solid rgba(242,200,74,0.85)',
                }}
              >
                <i className="ri-mail-send-line" />
                Trao đổi yêu cầu
              </Link>

              <Link
                to="/hire"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap"
                style={{
                  color: '#F2C84A',
                  background: 'rgba(242,200,74,0.08)',
                  border: '1px solid rgba(242,200,74,0.25)',
                }}
              >
                <i className="ri-user-star-line" />
                Hire / Freelance
              </Link>
            </div>
          </div>
        </section>

        {/* Offerings */}
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
            {[
              {
                icon: 'ri-server-line',
                title: 'Backend APIs',
                desc: 'Thiết kế REST API / integration layer, schema rõ ràng, versioning, auth và validation.',
              },
              {
                icon: 'ri-building-4-line',
                title: 'Architecture',
                desc: 'DDD-lite/DDD, CQRS, module boundaries, event-driven để giảm coupling và tăng maintainability.',
              },
              {
                icon: 'ri-secure-payment-line',
                title: 'Payment & Webhooks',
                desc: 'Stripe/PayPal/SePay, webhook handling, idempotency + retry-safe để tránh duplicate transactions.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-lg p-6"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(242,200,74,0.14)',
                }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-lg mb-4"
                  style={{ background: 'rgba(242,200,74,0.10)', border: '1px solid rgba(242,200,74,0.22)' }}
                >
                  <i className={`${card.icon} text-lg`} style={{ color: '#F2C84A' }} />
                </div>
                <h2 className="text-lg font-bold mb-2" style={{ color: '#FFFAEE', fontFamily: 'Montserrat, sans-serif' }}>
                  {card.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,200,160,0.72)', fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Case highlights */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span
                className="text-xs tracking-[0.32em] uppercase"
                style={{ color: 'rgba(242,200,74,0.6)', fontFamily: 'Inter, sans-serif' }}
              >
                Case highlights
              </span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(242,200,74,0.35), transparent)' }} />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: 'Payment flow retry-safe (multi-gateway)',
                  points: ['Idempotency + dedup webhooks', 'Giảm rủi ro duplicate transaction', 'Event-driven sync Payment ↔ Booking'],
                },
                {
                  title: 'Tối ưu tổng hợp báo cáo (SQL + domain isolation)',
                  points: ['Cô lập domain logic khỏi infra', 'Query/indexing strategy', 'Rút ngắn thời gian tổng hợp đáng kể'],
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg p-6"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(220,200,160,0.14)',
                  }}
                >
                  <h3 className="text-base font-bold mb-3" style={{ color: '#FFFAEE', fontFamily: 'Montserrat, sans-serif' }}>
                    {item.title}
                  </h3>
                  <ul className="space-y-2">
                    {item.points.map((p) => (
                      <li key={p} className="text-sm flex gap-2" style={{ color: 'rgba(220,200,160,0.72)', fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                        <span style={{ color: '#F2C84A', fontWeight: 700 }}>›</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap"
                style={{
                  color: '#F2C84A',
                  background: 'rgba(242,200,74,0.06)',
                  border: '1px solid rgba(242,200,74,0.22)',
                }}
              >
                <i className="ri-chat-3-line" />
                Mô tả bài toán của bạn — mình phản hồi nhanh
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

