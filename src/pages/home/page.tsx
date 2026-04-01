import PortfolioNavbar from './components/PortfolioNavbar';
import HeroNew from './components/HeroNew';
import Experience from './components/Experience';
import SkillsSection from './components/SkillsSection';
import ProjectsAndEducation from './components/ProjectsAndEducation';
import PortfolioFooter from './components/PortfolioFooter';
import SEOHead, { SITE_URL } from '@/components/feature/SEOHead';

/* Decorative wave divider between chapters */
function WaveDivider({
  fromColor,
  toColor,
  flip = false,
}: {
  fromColor: string;
  toColor: string;
  flip?: boolean;
}) {
  return (
    <div
      className="relative w-full overflow-hidden pointer-events-none"
      style={{ height: 64, background: fromColor }}
    >
      <svg
        viewBox="0 0 1440 64"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      >
        <path
          d="M0,20 C240,60 480,0 720,30 C960,60 1200,8 1440,28 L1440,64 L0,64 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}

export default function Home() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vũ Chí Công',
    jobTitle: 'Senior Fullstack Developer',
    url: SITE_URL,
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'VN',
    },
    knowsAbout: ['.NET Core', 'Spring Boot', 'DDD', 'CQRS', 'TypeScript', 'React', 'Microservices'],
    description:
      'Senior Fullstack Developer tại TP.HCM với 4+ năm kinh nghiệm .NET Core, Spring Boot, DDD, CQRS và tích hợp hệ thống phức tạp.',
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Vũ Chí Công — Senior Fullstack Developer Portfolio',
    url: SITE_URL,
    mainEntity: {
      '@type': 'Person',
      name: 'Vũ Chí Công',
      jobTitle: 'Senior Fullstack Developer',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
      ],
    },
  };

  return (
    <div className="min-h-screen" style={{ background: '#060D1F' }}>
      <SEOHead
        title="Vũ Chí Công | Senior Fullstack Developer HCMC | .NET Core & Spring Boot"
        description="Portfolio của Vũ Chí Công — Senior Fullstack Developer tại TP.HCM với 4+ năm kinh nghiệm .NET Core, Spring Boot, DDD, CQRS và tích hợp hệ thống phức tạp tại Việt Nam."
        keywords="Vũ Chí Công, Fullstack Developer HCMC, .NET Core, Spring Boot, DDD, CQRS, Solution Architect, Vietnam"
        canonical="/"
        ogType="profile"
        jsonLd={[personSchema, profilePageSchema]}
      />
      <PortfolioNavbar />

      {/* Hero */}
      <div id="hero">
        <HeroNew />
      </div>

      {/* Dark → Warm gold */}
      <WaveDivider fromColor="#060D1F" toColor="#FFFDF0" />

      {/* Chapter I — Experience */}
      <Experience />

      {/* Warm parchment → Dark ship hold */}
      <WaveDivider fromColor="#E8D498" toColor="#1E0E04" />

      {/* Chapter II — Skills */}
      <SkillsSection />

      {/* Chapter III — Projects */}
      <ProjectsAndEducation />

      {/* Chapter IV — Footer */}
      <PortfolioFooter />
    </div>
  );
}
