'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import ProjectCard from '@/components/ProjectCard';
import { projects, allTags } from '@/data/projects';

/**
 * Projects / Experiments Section
 * ────────────────────────────────
 * Features:
 *  - Filter tabs generated from tags in projects.js
 *  - All project cards rendered from data — zero hardcoding
 *  - Adding a project = add entry to src/data/projects.js only
 */
export default function Projects() {
  const [activeTag, setActiveTag] = useState('All');

  const filteredProjects =
    activeTag === 'All'
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  const filterTabs = ['All', ...allTags];

  return (
    <section id="lab" className="py-24">
      <div className="section-container">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-lab-line to-transparent mb-24" />

        <SectionHeader
          label="Implementations and EXPERIMENTS"
          title="Projects"
          subtitle="Each project is an experiment. Here's what I tried, what worked, and what I'd change."
        />

        {/* ── Filter tabs ─────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterTabs.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 ${
                activeTag === tag
                  ? 'border-lab-cyan text-lab-cyan bg-lab-cyan/10'
                  : 'border-lab-line text-lab-muted hover:border-lab-cyan/50 hover:text-lab-text'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── Project grid ─────────────────────────────────────── */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid md:grid-cols-2 gap-4"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <p className="font-mono text-sm text-lab-muted text-center py-12">
            No experiments tagged "{activeTag}" yet.
          </p>
        )}

        {/* How to add a project hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 p-4 border border-dashed border-lab-line rounded-lg"
        >
          <p className="font-mono text-xs text-lab-muted">
            <span className="text-lab-cyan">Moreover:</span>{' '}
            Trying not to be the best, but be someone to {' '}
            <code className="text-lab-purple">Contribute, Try again.</code>{' '}
            
          </p>
        </motion.div>
      </div>
    </section>
  );
}
