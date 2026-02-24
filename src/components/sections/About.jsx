import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillsApi } from '../../utils/api';
import { useFetch } from '../../hooks/useFetch';

function SectionTitle({ label, title, subtitle }) {
  return (
    <div className="mb-16">
      <p className="section-label mb-3">{label}</p>
      <h2
        className="text-4xl md:text-5xl font-display font-extrabold mb-4"
        style={{ color: 'var(--color-text)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function SkillBar({ skill, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <div className="flex justify-between mb-2">
        <span
          className="text-sm font-medium"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
        >
          {skill.name}
        </span>
        <span className="text-xs" style={{ color: 'var(--color-primary)' }}>
          {skill.level}%
        </span>
      </div>
      <div className="skill-bar-track h-1.5">
        <div
          className="skill-bar-fill"
          style={{ width: inView ? `${skill.level}%` : '0%' }}
        />
      </div>
    </motion.div>
  );
}

function TimelineItem({ exp, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8"
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Timeline line */}
      <div
        className="absolute left-0 top-3 bottom-0 w-px"
        style={{ background: 'var(--color-border)' }}
      />
      {/* Dot */}
      <div className="timeline-dot absolute left-[-4px] top-3" />

      <div className="glass-card rounded-xl p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3
              className="font-display font-bold text-lg"
              style={{ color: 'var(--color-text)' }}
            >
              {exp.role}
            </h3>
            <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem' }}>
              {exp.company} — {exp.location}
            </p>
          </div>
          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: 'rgba(110,231,183,0.08)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(110,231,183,0.15)',
              whiteSpace: 'nowrap',
            }}
          >
            {exp.period}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {exp.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {exp.tags?.map((tag) => (
            <span key={tag} className="tech-badge">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function About({ config }) {
  const { personal, skills: configSkills, experience } = config;
  const { data: backendSkills } = useFetch(skillsApi.getAll, null);
  const skills = backendSkills || configSkills;

  const avatarRef = useRef(null);
  const avatarInView = useInView(avatarRef, { once: true });

  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section id="about" className="section-padding" aria-label="About section">
      <div className="container-max">
        <SectionTitle
          label="01. About Me"
          title="Who I Am"
          subtitle="A bit about my background, skills, and what drives me."
        />

        {/* Bio + Avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-3">
            <motion.p
              className="text-lg leading-relaxed mb-6"
              style={{ color: 'var(--color-text-muted)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {personal.bio}
            </motion.p>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {[
                { label: 'Email', value: personal.email },
                { label: 'Location', value: personal.location },
              ].map((detail) => (
                <div key={detail.label}>
                  <p className="text-xs section-label mb-1">{detail.label}</p>
                  <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                    {detail.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Avatar */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <motion.div
              ref={avatarRef}
              className="relative w-64 h-64"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={avatarInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-[-12px] rounded-2xl"
                style={{ border: '1px dashed rgba(110,231,183,0.3)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-[-24px] rounded-2xl"
                style={{ border: '1px dashed rgba(167,139,250,0.15)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src={personal.avatar}
                  alt={`${personal.name} profile`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Image overlay */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, transparent 60%)' }}
                />
              </div>
              {/* Decorative corner accent */}
              <div
                className="absolute -bottom-3 -right-3 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--color-primary)' }}
              >
                <span className="text-xs font-display font-bold text-black">5+</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-24">
          <p className="section-label mb-8">Skills & Technologies</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>

          {/* Category pills */}
          <motion.div
            className="flex flex-wrap gap-2 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {cat}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <div>
          <p className="section-label mb-8">Work Experience</p>
          <div className="relative max-w-3xl">
            {experience.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
