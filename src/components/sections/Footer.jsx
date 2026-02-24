import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart, FiSun, FiMoon } from 'react-icons/fi';

const SOCIAL_ICONS = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
};

export default function Footer({ config, theme, setTheme }) {
  const { personal, meta } = config;
  const year = new Date().getFullYear();

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      className="relative py-12 px-6 md:px-12 lg:px-24"
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
      role="contentinfo"
    >
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-display font-bold"
                style={{
                  background: 'rgba(110,231,183,0.1)',
                  border: '1px solid var(--color-primary)',
                  color: 'var(--color-primary)',
                }}
              >
                {personal.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <span className="font-display font-semibold" style={{ color: 'var(--color-text)' }}>
                {personal.firstName}<span style={{ color: 'var(--color-primary)' }}>.dev</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {meta.siteDescription}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3
              className="text-xs section-label mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm transition-colors hover:text-primary"
                    style={{ color: 'var(--color-text-muted)', display: 'inline-block' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs section-label mb-4">
              Connect
            </h3>
            <div className="flex gap-3 flex-wrap">
              {Object.entries(personal.social)
                .filter(([, url]) => url)
                .map(([platform, url]) => {
                  const Icon = SOCIAL_ICONS[platform] || FiGithub;
                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'var(--color-surface-2)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-muted)',
                      }}
                      whileHover={{
                        scale: 1.1,
                        borderColor: 'var(--color-primary)',
                        color: 'var(--color-primary)',
                      }}
                      aria-label={platform}
                    >
                      <Icon size={15} />
                    </motion.a>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p
            className="text-xs text-center sm:text-left flex items-center gap-1.5"
            style={{ color: 'var(--color-text-muted)' }}
          >
            © {year} {personal.name}. Built with
            <FiHeart size={11} style={{ color: 'var(--color-primary)' }} />
            using React &amp; MERN Stack.
          </p>

          <div className="flex items-center gap-4">
            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs flex items-center gap-1.5 transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
            >
              Back to top ↑
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-primary)',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={14} /> : <FiMoon size={14} />}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
