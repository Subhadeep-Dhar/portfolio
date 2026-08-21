'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import HowIThink from '@/components/HowIThink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ResearchSection() {
  const [activePaperId, setActivePaperId] = useState(null);

  const researchProjects = projects.filter(
    (p) => p.tags.includes('Remote Sensing / GIS')
  );

  const containerRef = useRef(null);

  useGSAP(() => {
    // Animate the section header
    gsap.fromTo('.research-header',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // Stagger animate the research items
    gsap.fromTo('.research-item',
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.research-grid',
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="research-section" ref={containerRef} className="py-32 md:py-48 relative z-20">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-24 relative z-10 will-change-transform">
          <span className="mono-label block mb-6 text-[#7eb391]">Research</span>
          <h2 className="text-super-header font-light text-neutral-100 tracking-tighter leading-tight">
            Publications
          </h2>
          <p className="text-xl md:text-2xl text-neutral-400 mt-6 max-w-2xl leading-relaxed font-light">
            My academic research and published work.
          </p>
        </div>

        {/* 1. Research Projects List */}
        <div className="space-y-4 mb-24 relative z-10">
          <div className="flex flex-col gap-1 mb-12">
            <span className="mono-label text-neutral-500">Papers & Reports</span>
            <h3 className="font-semibold text-2xl md:text-3xl text-neutral-200">Selected Works</h3>
          </div>

          <div className="research-grid grid md:grid-cols-2 gap-6">
            {researchProjects.map((paper, idx) => {
              const isOpen = activePaperId === paper.id;

              return (
                <div
                  key={paper.id}
                  className="research-item border border-neutral-900/60 bg-[#060b08]/85 backdrop-blur-md rounded p-6 hover:border-neutral-800 transition-colors duration-300 flex flex-col justify-between will-change-transform"
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
                    <div className="space-y-4 pt-2">
                      <h4 className="font-semibold text-xl text-neutral-200 leading-snug">
                        {paper.title}
                      </h4>
                      <p className="text-sm md:text-base text-neutral-450 leading-relaxed font-light">
                        {paper.tagline}
                      </p>
                    </div>

                    <div className="text-xs text-neutral-400 space-y-2 pt-2">
                      <div>
                        <span className="mono-label text-neutral-650 block">Tools & Data</span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
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
                        {/* Project Snapshot Placeholder */}
                        <div className="w-full aspect-video bg-[#0a0f0d] border border-neutral-900 rounded overflow-hidden relative flex flex-col items-center justify-center text-neutral-600 mb-6">
                          <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-mono-tech text-[10px] uppercase tracking-widest">Snapshot Placeholder</span>
                        </div>

                        <div>
                          <span className="mono-label text-neutral-650 block">Summary</span>
                          <p className="text-neutral-300 mt-2 leading-relaxed">{paper.problem}</p>
                        </div>
                        <div>
                          <span className="mono-label text-neutral-650 block">The Question</span>
                          <p className="text-neutral-300 mt-2 leading-relaxed">{paper.hypothesis}</p>
                        </div>
                        <div>
                          <span className="mono-label text-neutral-650 block">How I Did It</span>
                          <p className="text-neutral-300 mt-2 leading-relaxed">{paper.approach}</p>
                        </div>
                        <div>
                          <span className="mono-label text-green-650 block">What I Found</span>
                          <p className="text-neutral-200 mt-2 leading-relaxed">{paper.result}</p>
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
