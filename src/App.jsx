import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import config from './config/config.json';
import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import LoadingScreen from './components/ui/LoadingScreen';

// Apply theme CSS variables from config
const applyTheme = (cfg) => {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', cfg.theme.primaryColor);
  root.style.setProperty('--color-primary-dark', cfg.theme.primaryDark);
  root.style.setProperty('--color-accent', cfg.theme.accentColor);
  root.style.setProperty('--font-display', `'${cfg.theme.fontDisplay}', sans-serif`);
  root.style.setProperty('--font-body', `'${cfg.theme.fontBody}', sans-serif`);
};

// Update meta tags from config
const applyMeta = (cfg) => {
  document.title = cfg.meta.siteTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', cfg.meta.siteDescription);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', cfg.meta.siteTitle);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', cfg.meta.siteDescription);
};

function HomePage({ theme, setTheme }) {
  return (
    <main className="relative">
      <Hero config={config} />
      <About config={config} />
      <Projects config={config} />
      <Contact config={config} />
      <Footer config={config} theme={theme} setTheme={setTheme} />
    </main>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });
  const [loading, setLoading] = useState(true);

  // Handle cursor glow effect
  const handleMouseMove = useCallback((e) => {
    const cursor = document.querySelector('.cursor-glow');
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  }, []);

  useEffect(() => {
    applyTheme(config);
    applyMeta(config);

    window.addEventListener('mousemove', handleMouseMove);
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
  }, [theme]);

  return (
    <Router>
      <div className="relative min-h-screen" style={{ background: 'var(--color-bg)' }}>
        {/* Ambient effects */}
        <div className="cursor-glow hidden md:block" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(110,231,183,0.08) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loader" name={config.personal.name} />
          ) : (
            <div key="app" className="relative z-10">
              <Navbar config={config} theme={theme} setTheme={setTheme} />
              <Routes>
                <Route path="/" element={<HomePage theme={theme} setTheme={setTheme} />} />
              </Routes>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}
