'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import HowIThink from '@/components/HowIThink';

export default function ResearchSection() {
  const [activePaperId, setActivePaperId] = useState(null);

  // Filter projects for Remote Sensing / GIS research focus
  const researchProjects = projects.filter(
    (p) => p.tags.includes('Remote Sensing / GIS')
  );

  return (
    <section id="research-section" className="py-24 relative z-20">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="mono-label block mb-2 text-neutral-500">Section 03 — Spatial Research</span>
          <h2 className="text-3xl sm:text-4xl font-light text-neutral-100 tracking-tight leading-tight">
            Research & Location Intelligence
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl leading-relaxed">
            Processing multi-temporal Landsat sensor bands, monitoring Sikkim glacier flow velocities, and assessing vegetation temperature dynamics.
          </p>
        </div>

        {/* 1. Research Projects List (Styled as Scientific Publication Records) */}
        <div className="space-y-6 mb-24">
          <div className="flex flex-col gap-1 mb-8">
            <span className="mono-label text-neutral-500">Observation Records</span>
            <h3 className="font-semibold text-lg text-neutral-200">Environmental & GIS assessments</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {researchProjects.map((paper, idx) => {
              const isOpen = activePaperId === paper.id;

              return (
                <div
                  key={paper.id}
                  className="border border-neutral-900/60 bg-[#060b08]/85 backdrop-blur-md rounded p-6 hover:border-neutral-800 transition-colors duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 pb-3 border-b border-neutral-900">
                      <div>
                        <span className="font-mono-tech text-xs text-[var(--active-accent)] block">
                          Research {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono-tech text-xs text-neutral-600 block mt-0.5">
                          Location: {paper.location}
                        </span>
                      </div>
                      <span className="status-tag text-[10px] scale-90 origin-top-right">
                        {paper.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-neutral-200 leading-snug">
                        {paper.title}
                      </h4>
                      <p className="text-sm text-neutral-450 leading-relaxed font-light">
                        {paper.tagline}
                      </p>
                    </div>

                    <div className="text-xs text-neutral-400 space-y-2 pt-2">
                      <div>
                        <span className="mono-label text-neutral-650 block">Methodology & Sensors</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {paper.tech.map((t) => (
                            <span
                              key={t}
                              className="font-mono-tech text-xs text-neutral-400"
                            >
                              · {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expander Trigger */}
                  <div className="pt-6 mt-4 border-t border-neutral-900 flex justify-between items-center">
                    <button
                      onClick={() => setActivePaperId(isOpen ? null : paper.id)}
                      className="font-mono-tech text-xs text-[var(--active-accent)] hover:text-neutral-200 focus:outline-none bg-transparent border-0"
                    >
                      {isOpen ? 'Close Overview' : 'View Research Brief'}
                    </button>
                    {/* <span className="font-mono-tech text-xs text-neutral-650">Source: Remote Sensing</span> */}
                  </div>

                  {/* Expanded Brief */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden mt-4 pt-4 border-t border-dashed border-neutral-900 text-sm text-neutral-450 space-y-4 leading-relaxed font-light"
                      >
                        <div>
                          <span className="mono-label text-neutral-650 block">Project Abstract</span>
                          <p className="text-neutral-350">{paper.problem}</p>
                        </div>
                        <div>
                          <span className="mono-label text-neutral-650 block">Research Hypothesis</span>
                          <p className="text-neutral-350">{paper.hypothesis}</p>
                        </div>
                        <div>
                          <span className="mono-label text-neutral-650 block">Analysis Methodology</span>
                          <p className="text-neutral-350">{paper.approach}</p>
                        </div>
                        <div>
                          <span className="mono-label text-green-650 block">Results & Findings</span>
                          <p className="text-neutral-200 font-normal">{paper.result}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. "How I Think" methodology */}
        <div>
          <HowIThink />
        </div>
      </div>
    </section>
  );
}
