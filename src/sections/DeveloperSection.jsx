'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import TechEcosystem from '@/components/TechEcosystem';

export default function DeveloperSection() {
  const [activeProjectId, setActiveProjectId] = useState(null);

  // Filter projects for developer/builder paths
  const devProjects = projects.filter(
    (p) => !p.tags.includes('Remote Sensing / GIS')
  );

  return (
    <section id="ecosystem-section" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="mono-label block mb-2 text-teal-400">Section 02 // Engineering Space</span>
          <h2 className="text-3xl font-semibold text-gray-150 tracking-tight">
            Developer & Builder
          </h2>
          <p className="text-xs text-gray-500 mt-2 max-w-xl leading-relaxed">
            Architecting database schemas, designing offline-first components, and caching pipelines. Click on nodes to isolate connections.
          </p>
        </div>

        {/* 1. Interactive Tech Ecosystem */}
        <div className="mb-24">
          <TechEcosystem />
        </div>

        {/* 2. Systems & Blueprint Specs */}
        <div className="space-y-6">
          <div className="flex flex-col gap-1 mb-8">
            <span className="mono-label">System Blueprints</span>
            <h3 className="font-semibold text-lg text-gray-200">Engineering experiments</h3>
          </div>

          <div className="grid gap-6">
            {devProjects.map((project, idx) => {
              const isOpen = activeProjectId === project.id;

              return (
                <div
                  key={project.id}
                  className="border border-gray-900 bg-[#070b15]/20 rounded overflow-hidden hover:border-gray-800 transition-colors duration-300"
                >
                  {/* Summary Bar */}
                  <div
                    onClick={() => setActiveProjectId(isOpen ? null : project.id)}
                    className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono-tech text-[10px] text-teal-400">
                          SPEC_{String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono-tech text-[9px] text-gray-650">
                          // {project.year}
                        </span>
                      </div>
                      <h4 className="font-semibold text-base text-gray-200 group-hover:text-teal-400 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-light">
                        {project.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Tech highlights */}
                      <div className="hidden md:flex gap-1.5">
                        {project.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="font-mono-tech text-[9px] px-2 py-0.5 border border-gray-950 text-gray-500 rounded bg-[#030712]/50"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Expand symbol */}
                      <span className="font-mono-tech text-gray-500 text-sm pl-2">
                        {isOpen ? '[ CLOSE ]' : '[ OPEN SPEC ]'}
                      </span>
                    </div>
                  </div>

                  {/* Expandable Case Study Area */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden bg-[#030712]/40 border-t border-gray-950"
                      >
                        <div className="p-6 grid md:grid-cols-12 gap-8 text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                          {/* Left Column: Architectural spec parameters */}
                          <div className="md:col-span-8 space-y-5">
                            <div>
                              <span className="mono-label text-[9px] text-gray-600 block mb-1">THE PROBLEM</span>
                              <p className="text-gray-400">{project.problem}</p>
                            </div>
                            
                            <div>
                              <span className="mono-label text-[9px] text-gray-600 block mb-1">HYPOTHESIS FRAMEWORK</span>
                              <p className="text-gray-400">{project.hypothesis}</p>
                            </div>

                            <div>
                              <span className="mono-label text-[9px] text-gray-600 block mb-1">IMPLEMENTATION PATH</span>
                              <p className="text-gray-400">{project.approach}</p>
                            </div>

                            <div>
                              <span className="mono-label text-[9px] text-green-600 block mb-1">VALIDATION METRICS & OUTCOMES</span>
                              <p className="text-gray-300 font-normal">{project.result}</p>
                            </div>

                            <div>
                              <span className="mono-label text-[9px] text-teal-650 block mb-1">FUTURE DRIFT ITERATIONS</span>
                              <p className="text-gray-500">{project.future}</p>
                            </div>
                          </div>

                          {/* Right Column: Spec metadata */}
                          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-gray-950 pt-6 md:pt-0 md:pl-6 space-y-4">
                            <div>
                              <span className="mono-label text-[9px] text-gray-600 block mb-1">FULL TECH STACK</span>
                              <div className="flex flex-wrap gap-1.5">
                                {project.tech.map((t) => (
                                  <span
                                    key={t}
                                    className="font-mono-tech text-[10px] px-2 py-0.5 border border-gray-900 text-gray-400 rounded bg-[#070b15]/50"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="mono-label text-[9px] text-gray-600 block mb-1">STATUS INDEX</span>
                              <span
                                className={`status-tag text-[10px] inline-block ${
                                  project.status === 'completed'
                                    ? 'status-completed'
                                    : 'status-in-progress'
                                }`}
                              >
                                {project.status.toUpperCase()}
                              </span>
                            </div>

                            {/* Verification Links */}
                            {(project.links?.demo || project.links?.github) && (
                              <div className="pt-4 border-t border-gray-950 space-y-2">
                                <span className="mono-label text-[9px] text-gray-600 block mb-2">VERIFICATION CHANNELS</span>
                                {project.links.github && (
                                  <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block font-mono-tech text-xs border border-gray-900 text-gray-400 hover:border-teal-500 hover:text-teal-400 text-center py-2 rounded transition-colors duration-200"
                                  >
                                    VIEW SOURCE CODE →
                                  </a>
                                )}
                                {project.links.demo && (
                                  <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block font-mono-tech text-xs bg-teal-950/20 border border-teal-900/60 text-teal-400 hover:bg-teal-900/30 text-center py-2 rounded transition-colors duration-200"
                                  >
                                    DEPLOYED LIVE DEMO →
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
