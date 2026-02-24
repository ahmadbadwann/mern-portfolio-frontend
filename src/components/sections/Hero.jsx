import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDown, FiDownload, FiExternalLink,FiInstagram } from 'react-icons/fi';

const SOCIAL_ICONS = {
  github: FiGithub,
  linkedin: FiLinkedin,
  instagram:FiInstagram,
  
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero({ config }) {
  const { personal } = config;

  const handleScroll = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center section-padding grid-bg"
      aria-label="Hero section"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--color-primary)', top: '-10%', right: '-10%' }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-8 blur-3xl"
          style={{ background: 'var(--color-accent)', bottom: '10%', left: '-5%' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="container-max relative z-10 w-full">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Greeting */}
          <motion.p variants={item} className="section-label mb-4">
            Hi there, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-8xl font-display font-extrabold leading-none mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            {personal.name.split(' ').map((word, i) => (
              <span
                key={i}
                className={i === personal.name.split(' ').length - 1 ? 'gradient-text' : ''}
              >
                {word}
                {i < personal.name.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={item}
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-6"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {personal.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {personal.subTagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-primary text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
              <FiExternalLink size={14} />
            </motion.a>
            <motion.a
              href={personal.cvUrl}
              download
              className="btn-outline text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Download CV
              <FiDownload size={14} />
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-6">
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Find me on
            </span>
            <div className="flex gap-4">
              {Object.entries(personal.social)
                .filter(([, url]) => url)
                .slice(0, 4)
                .map(([platform, url]) => {
                  const Icon = SOCIAL_ICONS[platform] || FiExternalLink;
                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                      style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-muted)',
                      }}
                      whileHover={{
                        scale: 1.1,
                        borderColor: 'var(--color-primary)',
                        color: 'var(--color-primary)',
                      }}
                      aria-label={`Visit ${platform}`}
                    >
                      <Icon size={16} />
                    </motion.a>
                  );
                })}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 right-6 md:right-24 hidden md:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{
              color: 'var(--color-text-muted)',
              writingMode: 'vertical-rl',
              fontFamily: 'var(--font-body)',
            }}
          >
            scroll
          </span>
          <motion.button
            onClick={handleScroll}
            className="w-8 h-14 rounded-full flex items-start justify-center pt-2"
            style={{ border: '1px solid var(--color-border)' }}
            whileHover={{ borderColor: 'var(--color-primary)' }}
            aria-label="Scroll to about section"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-primary)' }}
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating stat cards */}
      <div className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
        {[
          { num: '5+', label: 'Years Exp.' },
          { num: '30+', label: 'Projects' },
          { num: '20+', label: 'Happy Clients' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card rounded-xl px-5 py-4 text-right min-w-[120px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="text-2xl font-display font-bold"
              style={{ color: 'var(--color-primary)' }}
            >
              {stat.num}
            </div>
            <div
              className="text-xs"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
