import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
];

export default function Navbar({ config, theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { personal } = config;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const initials = personal.name
    .split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container-max flex items-center justify-between py-4 px-6 md:px-12 lg:px-24">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group"
            aria-label="Go to top"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-display font-bold transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'rgba(110,231,183,0.1)',
                border: '1px solid var(--color-primary)',
                color: 'var(--color-primary)',
              }}
            >
              {initials}
            </div>
            <span
              className="font-display font-semibold text-sm hidden sm:block"
              style={{ color: 'var(--color-text)' }}
            >
              {personal.firstName}
              <span style={{ color: 'var(--color-primary)' }}>.dev</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <ol className="flex items-center gap-6" role="list">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                    aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                  >
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.7rem' }}>0{i + 1}.</span>{' '}
                    {link.label}
                  </a>
                </li>
              ))}
            </ol>

            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-primary)',
                }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
              </button>

              {/* Resume */}
              <a
                href={personal.cvUrl}
                download
                className="btn-outline py-2 text-xs"
                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                Resume
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-primary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-primary)' }}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center md:hidden"
            style={{ background: 'rgba(10,10,15,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="font-display text-3xl font-bold"
                  style={{ color: 'var(--color-text)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ color: 'var(--color-primary)', x: 8 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={personal.cvUrl}
                download
                className="btn-primary mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08 }}
              >
                Download Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
