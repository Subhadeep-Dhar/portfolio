'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { featuredProjects } from '@/data/projects';

/**
 * Case Studies Section
 * ──────────────────────
 * Pulls `featured: true` projects from src/data/projects.js
 * Shows a tab-based deep-dive layout.
 * To feature a project: set `featured: true` in projects.js
 */
export default function CaseStudy() {
  const [active, setActive] = useState(0);

  const project = featuredProjects[active];
  if (!project) return null;

  // The breakdown steps shown in the case study
  const steps = [
    { key: 'problem',    label: '01 PROBLEM',    content: project.problem },
    { key: 'hypothesis', label: '02 HYPOTHESIS', content: project.hypothesis },
    { key: 'approach',   label: '03 APPROACH',   content: project.approach },
    { key: 'result',     label: '04 RESULT',     content: project.result },
    { key: 'future',     label: '05 NEXT',       content: project.future },
  ];

  return (
    <section id="casestudies" className="py-24">
      <div className="section-container">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-lab-line to-transparent mb-24" />

        <SectionHeader
          label="CASE STUDIES"
          title="Deep dives."
          subtitle="Selected experiments with a full breakdown — problem to post-mortem."
        />

        {/* ── Project selector tabs ──────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {featuredProjects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`font-mono text-xs px-4 py-2 rounded border transition-all duration-200 ${
                active === i
                  ? 'border-lab-cyan text-lab-cyan bg-lab-cyan/10'
                  : 'border-lab-line text-lab-muted hover:border-lab-cyan/40 hover:text-lab-text'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* ── Case study body ────────────────────────────────── */}
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass-card p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <span className="mono-label block mb-2">
                CASE_STUDY // {project.year}
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-lab-text">
                {project.title}
              </h3>
              <p className="text-lab-muted mt-1">{project.tagline}</p>
            </div>
            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2 py-0.5 border border-lab-line text-lab-muted rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Steps grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className={`space-y-2 ${
                  // "Result" spans full row on md for emphasis
                  step.key === 'result' ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <span
                  className="mono-label block"
                  style={{ color: step.key === 'result' ? '#4ade80' : undefined }}
                >
                  {step.label}
                </span>
                <p className="text-sm text-lab-muted leading-relaxed">{step.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Links */}
          {(project.links?.demo || project.links?.github) && (
            <div className="flex gap-3 mt-8 pt-6 border-t border-lab-line">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs border border-lab-line text-lab-muted px-4 py-2 rounded hover:border-lab-cyan hover:text-lab-cyan transition-all duration-200"
                >
                  VIEW CODE →
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs bg-lab-cyan text-lab-bg px-4 py-2 rounded hover:bg-lab-cyan/90 transition-all duration-200"
                >
                  LIVE DEMO →
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
