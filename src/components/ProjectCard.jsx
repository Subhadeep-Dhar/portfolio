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
              <span className="font-mono text-xs text-lab-muted opacity-60">
                {project.year}
              </span>
            </div>

            <h3 className="font-display font-semibold text-lg text-lab-text leading-tight mb-1 group-hover:text-lab-cyan transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-sm text-lab-muted leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Status badge + expand indicator */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className={`${statusClass} text-xs px-2 py-0.5 rounded font-mono`}>
              {project.status}
            </span>
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-lab-cyan text-lg font-mono leading-none"
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
              className="font-mono text-xs px-2 py-0.5 rounded border border-lab-line text-lab-muted hover:border-lab-cyan hover:text-lab-cyan transition-colors duration-150"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="font-mono text-xs px-2 py-0.5 text-lab-muted">
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
            <div className="border-t border-lab-line mx-5 sm:mx-6" />

            <div className="p-5 sm:p-6 space-y-4">
              {/* Lab notebook rows */}
              {[
                { label: 'PROBLEM',    content: project.problem },
                { label: 'HYPOTHESIS', content: project.hypothesis },
                { label: 'APPROACH',   content: project.approach },
                { label: 'RESULT',     content: project.result },
                { label: 'NEXT',       content: project.future },
              ].map(({ label, content }) => (
                <div key={label}>
                  <span className="mono-label block mb-1">{label}</span>
                  <p className="text-sm text-lab-muted leading-relaxed">{content}</p>
                </div>
              ))}

              {/* Links */}
              {(project.links?.demo || project.links?.github) && (
                <div className="flex gap-3 pt-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mono-label hover:text-lab-text border border-lab-line hover:border-lab-cyan px-3 py-1.5 rounded transition-all duration-200"
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
                      className="mono-label text-lab-cyan border border-lab-cyan hover:bg-lab-cyan hover:text-lab-bg px-3 py-1.5 rounded transition-all duration-200"
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
