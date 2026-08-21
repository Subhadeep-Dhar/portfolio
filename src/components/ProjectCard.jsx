'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProjectCard
 * -----------
 * Renders a single project from the projects data array.
 * Props: project (object from src/data/projects.js), index (number)
 *
 * Design: Closed = teaser card. Open = expanded experiment log.
 */
export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  // Map status to display styles (defined in globals.css)
  const statusClass = {
    completed:   'status-completed',
    'in-progress': 'status-in-progress',
    archived:    'status-archived',
  }[project.status] ?? '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass-card overflow-hidden cursor-pointer group"
      onClick={() => setExpanded(!expanded)}
      role="button"
      aria-expanded={expanded}
      aria-label={`Toggle details for ${project.title}`}
    >
      {/* ── Card Header (always visible) ─────────────────────────── */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Experiment ID + year */}
            <div className="flex items-center gap-3 mb-2">
              <span className="mono-label">
                EXP_{String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-xs text-neutral-500 opacity-60">
                {project.year}
              </span>
            </div>

            <h3 className="font-display font-semibold text-2xl md:text-3xl lg:text-4xl text-[var(--color-text-main)] leading-tight mb-2 group-hover:text-[var(--active-accent)] transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              {project.tagline}
            </p>
          </div>

          {/* Status badge + expand indicator */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            <span className={`${statusClass} text-xs md:text-sm px-3 py-1 rounded font-mono-tech uppercase tracking-wider`}>
              {project.status}
            </span>
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-[var(--active-accent)] text-2xl md:text-3xl font-light leading-none"
            >
              +
            </motion.span>
          </div>
        </div>

        {/* Tech stack badges — always visible */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="font-mono-tech text-xs md:text-sm px-3 py-1 rounded border border-[var(--color-border)] text-neutral-450 hover:border-[var(--active-accent)] hover:text-[var(--active-accent)] transition-colors duration-150"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="font-mono-tech text-xs md:text-sm px-3 py-1 text-neutral-500">
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* ── Expanded Detail (lab notebook style) ─────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--color-border)] mx-5 sm:mx-6" />

            <div className="p-5 sm:p-6 space-y-8">
              
              {/* Snapshot Image Placeholders */}
              <div className="w-full aspect-video bg-neutral-900 border border-neutral-800 rounded overflow-hidden relative flex items-center justify-center">
                <div className="text-center text-neutral-600">
                  <svg className="w-10 h-10 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-mono-tech text-xs uppercase tracking-widest">Project Snapshot Placeholder</span>
                  <p className="text-[10px] mt-1 opacity-50">Replace with Next.js Image component</p>
                </div>
              </div>

              {/* Lab notebook rows */}
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { label: 'PROBLEM',    content: project.problem },
                  { label: 'HYPOTHESIS', content: project.hypothesis },
                  { label: 'APPROACH',   content: project.approach },
                  { label: 'RESULT',     content: project.result },
                  { label: 'NEXT',       content: project.future },
                ].map(({ label, content }) => (
                  <div key={label}>
                    <span className="mono-label block mb-2">{label}</span>
                    <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-light">{content}</p>
                  </div>
                ))}
              </div>

              {/* Links */}
              {(project.links?.demo || project.links?.github) && (
                <div className="flex gap-3 pt-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mono-label hover:text-[var(--color-text-main)] border border-[var(--color-border)] hover:border-[var(--active-accent)] px-3 py-1.5 rounded transition-all duration-200"
                    >
                      GITHUB →
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mono-label text-[var(--active-accent)] border border-[var(--active-accent)] hover:bg-[var(--active-accent)] hover:text-neutral-900 px-3 py-1.5 rounded transition-all duration-200"
                    >
                      LIVE DEMO →
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
