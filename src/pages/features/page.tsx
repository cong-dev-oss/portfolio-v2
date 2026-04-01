import Hero from './components/Hero';
import CoreFeatures from './components/CoreFeatures';
import AnalyticsFeatures from './components/AnalyticsFeatures';
import IntegrationFeatures from './components/IntegrationFeatures';
import SecurityFeatures from './components/SecurityFeatures';
import CTA from './components/CTA';
import PageNavbar from '../../components/feature/PageNavbar';
import Footer from '../home/components/Footer';
import SEOHead, { SITE_URL } from '@/components/feature/SEOHead';

export default function FeaturesPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Features | AI-Powered Analytics Platform | Find Your Tribe',
    url: `${SITE_URL}/features`,
    description:
      'Explore powerful analytics features including real-time insights, AI-driven analysis, custom dashboards, and enterprise-grade security for your business.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Features', item: `${SITE_URL}/features` },
      ],
    },
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Find Your Tribe Analytics Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'AI-powered business intelligence and analytics platform featuring real-time insights, custom dashboards, enterprise-grade security, and seamless integrations.',
    offers: {
      '@type': 'Offer',
      price: '29',
      priceCurrency: 'USD',
      priceValidUntil: '2027-12-31',
    },
    featureList: [
      'Real-time analytics',
      'AI-driven insights',
      'Custom dashboards',
      'Enterprise-grade security',
      'Third-party integrations',
      'Collaborative workspaces',
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Features | AI Analytics & Real-Time Insights | Find Your Tribe"
        description="Explore Find Your Tribe's powerful analytics features — real-time insights, AI-driven analysis, custom dashboards, enterprise security and 100+ integrations."
        keywords="AI analytics, real-time insights, business intelligence, custom dashboards, enterprise security, data integration"
        canonical="/features"
        jsonLd={[webPageSchema, softwareSchema]}
      />
      <PageNavbar />
      <Hero />
      <CoreFeatures />
      <AnalyticsFeatures />
      <IntegrationFeatures />
      <SecurityFeatures />
      <CTA />
      <Footer />
    </div>
  );
}
