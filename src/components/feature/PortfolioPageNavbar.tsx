import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Hire', to: '/hire' },
  { label: 'Contact', to: '/contact' },
];

export default function PortfolioPageNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-port-navy/95 backdrop-blur-md border-b border-port-gold/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer group" aria-label="Về trang chủ">
            <motion.i
              className="ri-quill-pen-line"
              animate={{ rotate: [0, -8, 0] }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{
                fontSize: 26,
                color: '#F2C84A',
                filter: 'drop-shadow(0 0 5px rgba(242,200,74,0.55))',
                display: 'block',
              }}
            />
            <span
              style={{
                fontFamily: 'Caveat, cursive',
                fontSize: 22,
                fontWeight: 600,
                color: '#F2C84A',
                letterSpacing: '0.04em',
                display: 'inline-block',
                lineHeight: 1,
              }}
            >
              Victor Vũ
            </span>
          </Link>

          {/* desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm tracking-wide cursor-pointer whitespace-nowrap transition-all duration-300 ${
                    isActive ? 'text-port-gold font-bold' : 'text-port-silver/80 hover:text-port-gold'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <a
            href="mailto:interact.congvu@gmail.com"
            className="hidden md:flex items-center gap-2 bg-port-gold/10 border border-port-gold/40 hover:bg-port-gold hover:border-port-gold text-port-gold hover:text-port-navy-deep px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-mail-line" />
            Liên hệ
          </a>

          {/* hamburger */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center text-port-star cursor-pointer z-[1001]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <i className={menuOpen ? 'ri-close-line text-2xl' : 'ri-menu-line text-2xl'} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-port-navy border-t border-port-gold/20 px-6 py-4 overflow-hidden relative z-[1010]"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block w-full text-left py-4 transition-colors text-sm cursor-pointer relative z-[1011] touch-manipulation ${
                    isActive ? 'text-port-gold font-bold' : 'text-port-silver/80 hover:text-port-gold'
                  }`
                }
              >
                <div className="flex items-center justify-between">
                  <span>{link.label}</span>
                  {location.pathname === link.to && <i className="ri-compass-3-line text-port-gold" />}
                </div>
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

