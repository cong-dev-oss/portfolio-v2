import SEOHead, { SITE_URL } from '@/components/feature/SEOHead';
import PortfolioPageNavbar from '@/components/feature/PortfolioPageNavbar';
import PortfolioFooter from '../home/components/PortfolioFooter';

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Liên hệ Vũ Chí Công — Senior Fullstack Developer',
    url: `${SITE_URL}/contact`,
    description:
      'Liên hệ Vũ Chí Công (Senior Fullstack Developer tại TP.HCM) để trao đổi về nhu cầu hire/freelance/consulting: .NET Core, Spring Boot, DDD/CQRS, payment integration và tối ưu hệ thống.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
      ],
    },
    mainEntity: {
      '@type': 'Person',
      name: 'Vũ Chí Công',
      jobTitle: 'Senior Fullstack Developer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ho Chi Minh City',
        addressCountry: 'VN',
      },
      availableLanguage: ['Vietnamese', 'English'],
    },
  };

  return (
    <div className="min-h-screen" style={{ background: '#060D1F' }}>
      <SEOHead
        title="Liên hệ | Hire / Freelance .NET Core & Spring Boot Developer TP.HCM | Vũ Chí Công"
        description="Liên hệ Vũ Chí Công — Senior Fullstack Developer tại TP.HCM. Nhận dự án freelance/consulting: .NET Core, Spring Boot, DDD/CQRS, payment integration, tối ưu performance và triển khai production."
        keywords="liên hệ Vũ Chí Công, hire fullstack developer Vietnam, freelance .NET Core developer, Spring Boot developer, consulting software architecture, TP.HCM"
        canonical="/contact"
        jsonLd={contactSchema}
      />

      <PortfolioPageNavbar />

      <main className="pt-24">
        <section className="px-6 py-10">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: 'rgba(242,200,74,0.65)', fontFamily: 'Inter, sans-serif' }}
            >
              Contact
            </p>
            <h1
              className="text-4xl md:text-5xl leading-tight mb-4"
              style={{ color: '#FFFAEE', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, letterSpacing: '0.02em' }}
            >
              Liên hệ &amp; hợp tác
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: 'rgba(220,200,160,0.75)', fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              Gửi mô tả ngắn về bài toán / nhu cầu hire/freelance/consulting. Mình sẽ phản hồi sớm với hướng triển khai phù hợp.
            </p>
          </div>
        </section>

        <PortfolioFooter />
      </main>
    </div>
  );
}
