import SEOHead, { SITE_URL } from '@/components/feature/SEOHead';
import PortfolioPageNavbar from '@/components/feature/PortfolioPageNavbar';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'Bạn nhận freelance hay full-time?',
    a: 'Mình ưu tiên freelance/consulting theo gói hoặc theo sprint. Nếu yêu cầu phù hợp (team, sản phẩm, lộ trình), mình có thể trao đổi thêm về full-time.',
  },
  {
    q: 'Bạn mạnh nhất ở mảng nào?',
    a: 'Backend & architecture: .NET Core, Spring Boot, DDD/CQRS, payment integration, tối ưu SQL, event-driven và vận hành production.',
  },
  {
    q: 'Bạn có thể làm remote không?',
    a: 'Có. Mình làm remote/hybrid tùy theo timezone và nhịp làm việc của team. Nếu onsite, mình ở TP.HCM.',
  },
  {
    q: 'Quy trình làm việc như thế nào?',
    a: 'Mình bắt đầu bằng discovery (mục tiêu + constraints), sau đó chốt scope theo milestone, triển khai có review/checkpoint, cuối cùng bàn giao kèm hướng dẫn vận hành.',
  },
  {
    q: 'Bạn có nhận “sửa bug / tối ưu performance” không?',
    a: 'Có. Nếu bạn có hệ thống đang chậm/khó vận hành, mình có thể audit nhanh (logging/metrics), tìm bottleneck và đề xuất roadmap tối ưu theo ưu tiên.',
  },
];

export default function HirePage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Hire Senior Fullstack Developer (.NET Core / Spring Boot) TP.HCM | Vũ Chí Công',
    url: `${SITE_URL}/hire`,
    description:
      'Hire / freelance / consulting: Senior Fullstack Developer tại TP.HCM — .NET Core, Spring Boot, DDD/CQRS, payment integration và tối ưu hệ thống production.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Hire', item: `${SITE_URL}/hire` },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen" style={{ background: '#060D1F' }}>
      <SEOHead
        title="Hire Senior Fullstack Developer (.NET Core / Spring Boot) TP.HCM | Freelance & Consulting | Vũ Chí Công"
        description="Bạn cần hire/freelance/consulting cho backend .NET Core hoặc Spring Boot? Mình hỗ trợ thiết kế kiến trúc (DDD/CQRS), payment integration, tối ưu performance và triển khai production."
        keywords="hire fullstack developer Vietnam, freelance .NET Core developer, Spring Boot developer, Senior developer HCMC, consulting software architecture, DDD, CQRS, payment integration"
        canonical="/hire"
        jsonLd={[webPageSchema, faqSchema]}
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
              Hire · Freelance · Consulting
            </p>

            <h1
              className="text-4xl md:text-5xl leading-tight mb-5"
              style={{ color: '#FFFAEE', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, letterSpacing: '0.02em' }}
            >
              Hire Senior Fullstack Developer tại <span style={{ color: '#F2C84A' }}>TP.HCM</span>
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed max-w-3xl"
              style={{ color: 'rgba(220,200,160,0.75)', fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              Nếu bạn đang cần người đồng hành để <strong style={{ color: 'rgba(242,200,74,0.9)' }}>thiết kế</strong> và{' '}
              <strong style={{ color: 'rgba(242,200,74,0.9)' }}>triển khai</strong> hệ thống backend thực chiến (payments,
              integrations, performance), mình có thể tham gia theo dạng freelance hoặc consulting theo milestone.
            </p>

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
                <i className="ri-chat-3-line" />
                Liên hệ nhanh
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap"
                style={{
                  color: '#F2C84A',
                  background: 'rgba(242,200,74,0.08)',
                  border: '1px solid rgba(242,200,74,0.25)',
                }}
              >
                <i className="ri-compass-3-line" />
                Xem dịch vụ kỹ thuật
              </Link>
            </div>
          </div>
        </section>

        {/* Engagement */}
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
            {[
              { icon: 'ri-timer-line', title: 'Theo milestone', desc: 'Chốt mục tiêu → chia phase → bàn giao theo mốc rõ ràng.' },
              { icon: 'ri-radar-line', title: 'Audit & tối ưu', desc: 'Đo đạc, tìm bottleneck, đề xuất roadmap tối ưu performance.' },
              { icon: 'ri-shield-check-line', title: 'Production-ready', desc: 'Chuẩn hóa delivery, quan sát hệ thống, rollback & vận hành.' },
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

        {/* FAQ */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span
                className="text-xs tracking-[0.32em] uppercase"
                style={{ color: 'rgba(242,200,74,0.6)', fontFamily: 'Inter, sans-serif' }}
              >
                FAQ
              </span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(242,200,74,0.35), transparent)' }} />
            </div>

            <div className="space-y-4">
              {FAQS.map((f) => (
                <div
                  key={f.q}
                  className="rounded-lg p-6"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(220,200,160,0.14)',
                  }}
                >
                  <h3 className="text-base font-bold mb-2" style={{ color: '#FFFAEE', fontFamily: 'Montserrat, sans-serif' }}>
                    {f.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,200,160,0.72)', fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                    {f.a}
                  </p>
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
                <i className="ri-mail-send-line" />
                Gửi mô tả dự án / nhu cầu hire
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

