
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 flex items-center justify-center bg-brand-green rounded-lg">
              <i className="ri-line-chart-line text-2xl text-white"></i>
            </div>
            <span className="text-xl font-caprasimo text-brand-black group-hover:text-brand-green-light transition-colors whitespace-nowrap">
              Insight Flow
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="hover:text-brand-green transition-colors cursor-pointer text-brand-black">
              Home
            </a>
            <a href="/features" className="hover:text-brand-green transition-colors cursor-pointer text-brand-black">
              Features
            </a>
            <a href="/pricing" className="hover:text-brand-green transition-colors cursor-pointer text-brand-black">
              Pricing
            </a>
            <a href="/about" className="hover:text-brand-green transition-colors cursor-pointer text-brand-black">
              About
            </a>
            <a href="/contact" className="hover:text-brand-green transition-colors cursor-pointer text-brand-black">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#login" className="text-sm text-brand-black hover:text-brand-green transition-colors cursor-pointer whitespace-nowrap">
              Sign in
            </a>
            <a href="#signup" className="bg-brand-green hover:bg-brand-green-light text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap">
              Get started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
