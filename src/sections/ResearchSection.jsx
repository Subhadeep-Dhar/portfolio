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
    <section id="research-section" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="mono-label block mb-2 text-lime-500">Section 03 // Spatial Lab</span>
          <h2 className="text-3xl font-semibold text-gray-150 tracking-tight">
            Research & Location Intelligence
          </h2>
          <p className="text-xs text-gray-500 mt-2 max-w-xl leading-relaxed">
            Analyzing multi-temporal sensor datasets, monitoring glacial flow velocities, and assessing vegetation temperature dynamics in monsoon climates.
          </p>
        </div>

        {/* 1. Research Projects List (Styled as Scientific Papers) */}
        <div className="space-y-6 mb-24">
          <div className="flex flex-col gap-1 mb-8">
            <span className="mono-label">Observation Records</span>
            <h3 className="font-semibold text-lg text-gray-200">Environmental & GIS assessments</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {researchProjects.map((paper, idx) => {
              const isOpen = activePaperId === paper.id;
              // Coordinates mapping for header
              const coords = paper.id === 'manipal_ndvi_lst' ? '13.34° N, 74.79° E' : '27.78° N, 88.63° E';

              return (
                <div
                  key={paper.id}
                  className="border border-gray-900 bg-[#070b15]/20 rounded p-6 hover:border-gray-800 transition-colors duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 pb-3 border-b border-gray-950">
                      <div>
                        <span className="font-mono-tech text-[9px] text-lime-500 block">
                          PAPER_LOG_{String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono-tech text-[9px] text-gray-600 block mt-0.5">
                          COORD: {coords}
                        </span>
                      </div>
                      <span className="status-tag text-[9px] scale-90 origin-top-right">
                        {paper.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-200 leading-snug">
                        {paper.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-light">
                        {paper.tagline}
                      </p>
                    </div>

                    <div className="text-xs text-gray-400 space-y-2 pt-2">
                      <div>
                        <span className="mono-label text-[8px] text-gray-600 block">SENSORS & SYSTEMS</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {paper.tech.map((t) => (
                            <span
                              key={t}
                              className="font-mono-tech text-[9px] text-gray-400"
                            >
                              · {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expander Trigger */}
                  <div className="pt-6 mt-4 border-t border-gray-950 flex justify-between items-center">
                    <button
                      onClick={() => setActivePaperId(isOpen ? null : paper.id)}
                      className="font-mono-tech text-[10px] text-lime-600 hover:text-lime-500 focus:outline-none"
                    >
                      {isOpen ? '[ CLOSE BRIEF ]' : '[ ACCESS BRIEF ]'}
                    </button>
                    <span className="font-mono-tech text-[8px] text-gray-750">SEC_REF: GEE_L8</span>
                  </div>

                  {/* Expanded Brief */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden mt-4 pt-4 border-t border-dashed border-gray-950 text-xs text-gray-400 space-y-4 leading-relaxed font-light"
                      >
                        <div>
                          <span className="mono-label text-[8px] text-gray-600 block">ABSTRACT friction</span>
                          <p>{paper.problem}</p>
                        </div>
                        <div>
                          <span className="mono-label text-[8px] text-gray-600 block">RESEARCH HYPOTHESIS</span>
                          <p>{paper.hypothesis}</p>
                        </div>
                        <div>
                          <span className="mono-label text-[8px] text-gray-600 block">ANALYSIS & COMPOSITES PATH</span>
                          <p>{paper.approach}</p>
                        </div>
                        <div>
                          <span className="mono-label text-[8px] text-green-600 block">FINDINGS & METRICS</span>
                          <p className="text-gray-300 font-normal">{paper.result}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. "How I Think" Cognitive Pipeline */}
        <div>
          <HowIThink />
        </div>
      </div>
    </section>
  );
}
