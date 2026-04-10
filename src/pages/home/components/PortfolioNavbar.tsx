import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Về tôi',    href: '#about' },
  { label: 'Kinh nghiệm', href: '#experience' },
  { label: 'Kỹ năng',  href: '#skills' },
  { label: 'Dự án',    href: '#projects' },
  { label: 'Liên hệ',  href: '#contact' },
];

/* ── brush-written text ───────────────────────────────── */
const NAME = 'Victor Vũ';
const CHARS = NAME.split('');
const CHAR_DELAY = 0.072;
const START_DELAY = 0.35;
const STROKE_DELAY = START_DELAY + CHARS.length * CHAR_DELAY + 0.08;

function BrushWrittenName({ isScrolled }: { isScrolled: boolean }) {
  const textColor = isScrolled ? '#F2C84A' : '#FFFAEE';
  const strokeColor = isScrolled ? 'rgba(242,200,74,0.7)' : 'rgba(255,250,238,0.55)';

  return (
    <span style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
      {/* characters */}
      <span
        style={{
          fontFamily: 'Caveat, cursive',
          fontSize: 22,
          fontWeight: 600,
          color: textColor,
          letterSpacing: '0.04em',
          display: 'inline-block',
          transition: 'color 0.4s',
        }}
      >
        {CHARS.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -7, filter: 'blur(5px)', scale: 1.18 }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)', scale: 1 }}
            transition={{
              delay: START_DELAY + i * CHAR_DELAY,
              duration: 0.22,
              ease: 'easeOut',
            }}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>

      {/* brush stroke underline — draws left → right after text finishes */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: STROKE_DELAY, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          bottom: -3,
          left: 0,
          right: 0,
          height: 2.5,
          background: `linear-gradient(90deg, ${strokeColor}, transparent 90%)`,
          borderRadius: 2,
          transformOrigin: 'left center',
          display: 'block',
          transition: 'background 0.4s',
        }}
      />
    </span>
  );
}

/* ── navbar ───────────────────────────────────────────── */
export default function PortfolioNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handle = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 60);

      if (scrollY < window.innerHeight * 0.6) {
        setActiveSection('');
      }
    };

    handle();
    window.addEventListener('scroll', handle);
    
    // Intersection Observer for active section tracking
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the upper part of the viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections defined in navLinks
    navLinks.forEach((link) => {
      const sectionId = link.href.replace('#', '');
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handle);
      observer.disconnect();
    };
  }, []);

  const handleBackToTop = () => {
    setMenuOpen(false);
    setActiveSection('');
    window.history.replaceState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    const headerHeight = headerRef.current?.offsetHeight ?? 80;

    setMenuOpen(false);
    if (!el) return;

    window.history.replaceState(null, '', `#${id}`);

    if (id === 'about') {
      window.dispatchEvent(new Event('portfolio:reveal-about'));
    }

    requestAnimationFrame(() => {
      const targetPosition = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      });
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        isScrolled
          ? 'bg-port-navy/95 backdrop-blur-md border-b border-port-gold/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="flex items-center justify-between h-20">

          {/* ── logo ── */}
          <button
            onClick={handleBackToTop}
            className="flex items-center gap-2 cursor-pointer group"
            aria-label="Về trang chủ"
          >
            {/* quill icon */}
            <motion.i
              className="ri-quill-pen-line"
              animate={{ rotate: [0, -8, 0] }}
              transition={{ delay: START_DELAY - 0.1, duration: 0.35, ease: 'easeInOut' }}
              style={{
                fontSize: 26,
                color: isScrolled ? '#F2C84A' : '#FFFAEE',
                filter: isScrolled
                  ? 'drop-shadow(0 0 5px rgba(242,200,74,0.55))'
                  : 'drop-shadow(0 0 7px rgba(255,250,238,0.45))',
                transition: 'color 0.4s, filter 0.4s',
                display: 'block',
              }}
            />
            {/* name */}
            <BrushWrittenName isScrolled={isScrolled} />
          </button>

          {/* ── desktop nav ── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm tracking-wide cursor-pointer whitespace-nowrap transition-all duration-300 relative group ${
                    isActive ? 'text-port-gold font-bold scale-105' : 'text-port-silver/80 hover:text-port-gold'
                  }`}
                  style={{
                    textShadow: isActive ? '0 0 12px rgba(242,200,74,0.4)' : 'none'
                  }}
                >
                  {link.label}
                  {/* indicator line for active state */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-port-gold/60"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── CTA ── */}
          <a
            href="mailto:interact.congvu@gmail.com"
            className="hidden md:flex items-center gap-2 bg-port-gold/10 border border-port-gold/40 hover:bg-port-gold hover:border-port-gold text-port-gold hover:text-port-navy-deep px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-mail-line" />
            Liên hệ
          </a>

          {/* ── hamburger ── */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center text-port-star cursor-pointer z-[1001]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={menuOpen ? 'ri-close-line text-2xl' : 'ri-menu-line text-2xl'} />
          </button>
        </div>
      </div>

      {/* ── mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-port-navy border-t border-port-gold/20 px-6 py-4 overflow-hidden relative z-[1010]"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-left py-4 transition-colors text-sm cursor-pointer relative z-[1011] touch-manipulation ${
                    isActive ? 'text-port-gold font-bold' : 'text-port-silver/80 hover:text-port-gold'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.label}</span>
                    {isActive && <i className="ri-compass-3-line text-port-gold" />}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
