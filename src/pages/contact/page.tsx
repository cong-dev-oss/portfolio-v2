import { motion } from 'framer-motion';
import PageNavbar from '../../components/feature/PageNavbar';
import Footer from '../home/components/Footer';
import ContactInfoBento from './components/ContactInfoBento';
import SEOHead, { SITE_URL } from '@/components/feature/SEOHead';

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Vũ Chí Công — Senior Fullstack Developer',
    url: `${SITE_URL}/contact`,
    description:
      'Get in touch with Vũ Chí Công, Senior Fullstack Developer based in Ho Chi Minh City. Available for freelance projects and full-time opportunities.',
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
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Contact | Vũ Chí Công — Senior Fullstack Developer HCMC"
        description="Liên hệ với Vũ Chí Công — Senior Fullstack Developer tại TP.HCM. Nhận dự án freelance, tư vấn kỹ thuật .NET Core, Spring Boot và kiến trúc hệ thống."
        keywords="liên hệ Vũ Chí Công, hire fullstack developer Vietnam, .NET Core developer HCMC, freelance developer Ho Chi Minh"
        canonical="/contact"
        jsonLd={contactSchema}
      />
      <PageNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-brand-beige/40 to-brand-brown/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-brand-green/20 to-brand-beige/30 rounded-full blur-3xl animate-pulse delay-300"></div>
          <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-gradient-to-br from-brand-beige/25 to-brand-brown/15 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-caprasimo mb-6 text-brand-black">
              Get in Touch
            </h1>
            <p className="text-xl text-brand-grey max-w-3xl mx-auto">
              We&apos;re here to help. Reach out to our team and we&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Bento Grid */}
      <ContactInfoBento />

      <Footer />
    </div>
  );
}
