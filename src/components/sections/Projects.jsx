import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projectsApi } from '../../utils/api';
import { useFetch } from '../../hooks/useFetch';

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-40 group-hover:opacity-60"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, var(--color-bg) 100%)' }}
        />
        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-medium"
            style={{ background: 'var(--color-primary)', color: '#0a0a0f' }}
          >
            Featured
          </div>
        )}
        {/* Action buttons on hover */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(10,10,15,0.8)', color: 'var(--color-text)' }}
              aria-label={`View ${project.title} on GitHub`}
            >
              <FiGithub size={14} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--color-primary)', color: '#0a0a0f' }}
              aria-label={`View ${project.title} live demo`}
            >
              <FiExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="font-display font-bold text-lg mb-2 transition-colors"
          style={{ color: 'var(--color-text)' }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech?.map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="skeleton h-48 w-full" />
      <div className="p-6 space-y-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
        <div className="flex gap-2 mt-4">
          <div className="skeleton h-6 w-16" />
          <div className="skeleton h-6 w-20" />
          <div className="skeleton h-6 w-14" />
        </div>
      </div>
    </div>
  );
}

export default function Projects({ config }) {
  const { projects: configProjects } = config;
  const { data: backendProjects, loading } = useFetch(projectsApi.getAll, null);
  const allProjects = backendProjects || configProjects;

  const [filter, setFilter] = useState('All');

  // Collect unique tech tags
  const allTags = ['All', ...new Set(allProjects.flatMap(p => p.tech).filter(Boolean))].slice(0, 8);

  const filtered = filter === 'All'
    ? allProjects
    : allProjects.filter(p => p.tech?.includes(filter));

  return (
    <section id="projects" className="section-padding" aria-label="Projects section">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="section-label mb-3">02. My Work</p>
            <h2
              className="text-4xl md:text-5xl font-display font-extrabold"
              style={{ color: 'var(--color-text)' }}
            >
              Featured Projects
            </h2>
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            A selection of projects I&apos;ve built. Each one challenged me to grow.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter projects by technology">
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              role="tab"
              aria-selected={filter === tag}
              onClick={() => setFilter(tag)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
              style={
                filter === tag
                  ? { background: 'var(--color-primary)', color: '#0a0a0f' }
                  : {
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-muted)',
                    }
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <motion.p
            className="text-center py-16"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects found for this filter.
          </motion.p>
        )}
      </div>
    </section>
  );
}
