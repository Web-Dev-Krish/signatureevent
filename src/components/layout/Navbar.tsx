import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Theme & Events', path: '/events' },
  { name: "Malhotra Catering's", path: '/catering' },
  { name: 'Signature Events', path: '/signature-events' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0B1929]/90 backdrop-blur-xl py-3 border-b border-white/[0.04] shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <Logo className="h-10 w-10 sm:h-12 sm:w-12 transition-transform duration-300 group-hover:scale-110" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[13px] font-medium tracking-wide transition-colors duration-300 hover:text-[#F5C518] ${
                location.pathname === link.path ? 'text-[#F5C518]' : 'text-[#6A9AB8]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="tel:+919354710637"
            className="ml-2 px-5 py-2.5 bg-gradient-to-r from-[#F5C518] to-[#FFE066] text-[#0B1929] font-bold tracking-wider text-xs rounded-full flex items-center gap-2 hover:shadow-[0_0_20px_rgba(245,197,24,0.3)] transition-all duration-300 whitespace-nowrap"
          >
            <Phone size={13} /> +91 93547 10637
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-[#E8F4FD] p-1" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#0B1929]/98 backdrop-blur-xl border-t border-white/[0.04] py-6 px-6 flex flex-col gap-1 lg:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#F5C518] bg-[#F5C518]/5'
                    : 'text-[#6A9AB8] hover:text-[#E8F4FD] hover:bg-[#0B1929]/[0.03]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:+919354710637"
              className="mt-4 px-6 py-3.5 bg-gradient-to-r from-[#F5C518] to-[#FFE066] text-[#0B1929] text-center font-bold uppercase tracking-wider rounded-full text-sm"
            >
              +91 93547 10637
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
