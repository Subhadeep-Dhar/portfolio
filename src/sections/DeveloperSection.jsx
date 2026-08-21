'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import TechEcosystem from '@/components/TechEcosystem';
import TechMarquee from '@/components/TechMarquee';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function DeveloperSection() {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const devProjects = projects.filter(
    (p) => !p.tags.includes('Remote Sensing / GIS')
  );

  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Animate the section header
    gsap.fromTo('.dev-header',
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

  }, { scope: containerRef });

  // Find active project object
  const activeProject = devProjects.find((p) => p.id === activeProjectId);

  return (
    <section id="ecosystem-section" ref={containerRef} className="py-32 md:py-48 relative z-10 w-full overflow-hidden">
      <div className="section-container">
        {/* Section Header */}
        <div className="dev-header max-w-3xl mb-16 will-change-transform">
          <span className="mono-label block mb-6 text-[var(--active-accent)]">Software Projects</span>
          <h2 className="text-super-header font-light text-neutral-100 tracking-tighter leading-tight">
            My Work
          </h2>
          <p className="text-base md:text-xl text-neutral-400 mt-6 max-w-2xl leading-relaxed font-light">
            Building robust web applications, reliable backends, and seamless user experiences.
          </p>
        </div>

        {/* 1. Tech Ecosystem Component - Commented out as requested */}
        {/* 
        <div className="mb-24">
          <TechEcosystem />
        </div> 
        */}

        {/* New Tech Icons Marquee */}
        <div className="mb-32">
          <TechMarquee />
        </div>
      </div>

      {/* 2. Systems Specs (Vertical Sticky Stacking Carousel) */}
      <div className="dev-projects-wrapper w-full flex flex-col relative px-4 md:px-8 xl:px-0 mx-auto max-w-7xl mt-12 mb-48">
        <div className="flex flex-col gap-1 mb-16 relative z-10">
          <span className="mono-label text-[var(--active-accent)]">Selected Projects</span>
          <h3 className="font-semibold text-3xl md:text-5xl text-neutral-200">What I've Built</h3>
        </div>

        <div className="relative w-full pb-[10vh]">
          {devProjects.map((project, idx) => (
            <div 
              key={`wrapper-${project.id}`} 
              className="dev-project-wrapper sticky top-[10vh] lg:top-[12vh] w-full flex items-center justify-center mb-16 lg:mb-32 origin-top"
              style={{ zIndex: idx, height: '80vh' }}
            >
              <motion.div
                key={project.id}
                layoutId={`card-container-${project.id}`}
                onClick={() => setActiveProjectId(project.id)}
                className="dev-project-item w-full h-full flex flex-col lg:flex-row bg-neutral-900 border border-neutral-800 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden cursor-pointer hover:border-[var(--active-accent)]/80 transition-colors group will-change-transform shadow-2xl"
              >
                {/* Card Content (Top Half on Mobile, Left Half on Desktop) */}
                <motion.div layoutId={`card-content-${project.id}`} className="w-full h-[50%] lg:w-1/2 lg:h-full p-6 lg:p-12 xl:p-16 flex flex-col justify-center relative bg-neutral-900 overflow-hidden shrink-0">
                  <div className="flex items-center gap-3 mb-4 lg:mb-8">
                    <span className="font-mono-tech text-[10px] lg:text-xs px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 uppercase">
                      {project.year}
                    </span>
                    <span className="font-mono-tech text-[10px] lg:text-xs text-[var(--active-accent)] uppercase tracking-wider font-medium">
                      {project.status}
                    </span>
                  </div>
                  
                  <motion.h4 layoutId={`card-title-${project.id}`} className="font-semibold text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-neutral-100 mb-2 lg:mb-6 tracking-tight leading-tight line-clamp-2">
                    {project.title}
                  </motion.h4>
                  
                  <motion.p layoutId={`card-desc-${project.id}`} className="text-sm md:text-base lg:text-xl text-neutral-400 font-light mb-4 lg:mb-12 leading-relaxed max-w-2xl line-clamp-3">
                    {project.tagline}
                  </motion.p>
                  
                  <div className="hidden lg:flex flex-wrap gap-2.5 mt-auto">
                    {project.tech.map((t) => (
                      <span key={t} className="font-mono-tech text-xs px-4 py-2 border border-neutral-800/60 text-neutral-500 rounded-full bg-neutral-900/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Card Main Snapshot (Bottom Half on Mobile, Right Half on Desktop) */}
                {project.snapshots && project.snapshots.length > 0 && (
                  <div className="w-full h-[50%] lg:w-1/2 lg:h-full bg-neutral-950/30 border-t lg:border-t-0 lg:border-l border-neutral-800 flex items-center justify-center p-4 lg:p-12 shrink-0">
                    <motion.div 
                      layoutId={`card-image-${project.id}`} 
                      className={`relative rounded-xl overflow-hidden shadow-2xl border border-neutral-800/60 bg-neutral-900 flex items-center justify-center ${['poultry_disease_detection', 'grounded_app', 'famspace'].includes(project.id) ? 'w-auto h-full aspect-[9/16] max-w-[220px] lg:max-w-[300px]' : 'w-full max-h-full aspect-video'}`}
                    >
                      <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                      <img 
                        src={project.snapshots[0]} 
                        alt={project.title} 
                        className={`w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-500 ${['poultry_disease_detection', 'grounded_app', 'famspace'].includes(project.id) ? 'object-contain p-2 lg:p-4' : 'object-cover'}`} 
                      />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {activeProject && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProjectId(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
            />
            
            {/* Modal Container */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center pt-24 pb-8 px-4 md:px-8 pointer-events-none">
              <motion.div
                layoutId={`card-container-${activeProject.id}`}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden w-full max-w-5xl max-h-[85vh] flex flex-col pointer-events-auto shadow-2xl relative"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setActiveProjectId(null)}
                  className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black p-2 rounded-full text-white backdrop-blur-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                {/* Modal Header / Main Snapshot */}
                {activeProject.snapshots && activeProject.snapshots.length > 0 && (
                  <motion.div layoutId={`card-image-${activeProject.id}`} className={`w-full h-64 md:h-96 bg-neutral-950 relative flex items-center justify-center shrink-0 border-b border-neutral-800 overflow-hidden ${['poultry_disease_detection', 'grounded_app', 'famspace'].includes(activeProject.id) ? 'py-4' : ''}`}>
                    <img 
                      src={activeProject.snapshots[0]} 
                      alt={activeProject.title} 
                      className={`w-full h-full cursor-zoom-in hover:scale-[1.02] transition-transform duration-500 ${['poultry_disease_detection', 'grounded_app', 'famspace'].includes(activeProject.id) ? 'object-contain' : 'object-cover'}`} 
                      onClick={(e) => { e.stopPropagation(); setLightboxImage(activeProject.snapshots[0]); }}
                    />
                  </motion.div>
                )}

                {/* Scrollable Content Area */}
                <div className="overflow-y-auto p-6 md:p-10 flex-grow custom-scrollbar">
                  <motion.div layoutId={`card-content-${activeProject.id}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono-tech text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-400 uppercase">
                        {activeProject.year}
                      </span>
                      <span className="font-mono-tech text-xs text-[var(--active-accent)] uppercase border border-[var(--active-accent)]/30 px-2 py-1 rounded">
                        {activeProject.status}
                      </span>
                    </div>

                    <motion.h4 layoutId={`card-title-${activeProject.id}`} className="font-semibold text-3xl md:text-5xl text-neutral-100 mb-4 tracking-tight">
                      {activeProject.title}
                    </motion.h4>
                    
                    <motion.p layoutId={`card-desc-${activeProject.id}`} className="text-lg md:text-xl text-neutral-400 font-light mb-10 max-w-3xl">
                      {activeProject.tagline}
                    </motion.p>
                  </motion.div>

                  <div className="grid md:grid-cols-12 gap-10">
                    {/* Left Column: Details & More Snapshots */}
                    <div className="md:col-span-8 space-y-10">
                      
                      <div className="space-y-3">
                        <span className="mono-label text-[var(--active-accent)] block">The Problem</span>
                        <p className="text-neutral-300 font-light leading-relaxed text-base">{activeProject.problem}</p>
                      </div>

                      {/* Extra Snapshot 2 */}
                      {activeProject.snapshots && activeProject.snapshots.length > 1 && (
                        <div className="w-full bg-neutral-950 border border-neutral-800 rounded-lg relative flex items-center justify-center overflow-hidden">
                          <img 
                            src={activeProject.snapshots[1]} 
                            alt={`${activeProject.title} detail`} 
                            className="w-full h-auto max-h-[60vh] object-contain cursor-zoom-in hover:opacity-90 transition-opacity" 
                            onClick={(e) => { e.stopPropagation(); setLightboxImage(activeProject.snapshots[1]); }}
                          />
                        </div>
                      )}

                      <div className="space-y-3">
                        <span className="mono-label text-[var(--active-accent)] block">How I Built It</span>
                        <p className="text-neutral-300 font-light leading-relaxed text-base">{activeProject.approach}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <span className="mono-label text-[var(--active-accent)] block">The Results</span>
                        <p className="text-neutral-300 font-light leading-relaxed text-base">{activeProject.result}</p>
                      </div>

                      {/* Extra Snapshot 3 & 4 */}
                      {activeProject.snapshots && activeProject.snapshots.length > 2 && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="w-full bg-neutral-950 border border-neutral-800 rounded-lg relative flex items-center justify-center overflow-hidden">
                             <img 
                               src={activeProject.snapshots[2]} 
                               alt={`${activeProject.title} snapshot 3`} 
                               className="w-full h-auto max-h-[40vh] object-contain cursor-zoom-in hover:opacity-90 transition-opacity" 
                               onClick={(e) => { e.stopPropagation(); setLightboxImage(activeProject.snapshots[2]); }}
                             />
                          </div>
                          {activeProject.snapshots.length > 3 && (
                            <div className="w-full bg-neutral-950 border border-neutral-800 rounded-lg relative flex items-center justify-center overflow-hidden">
                               <img 
                                 src={activeProject.snapshots[3]} 
                                 alt={`${activeProject.title} snapshot 4`} 
                                 className="w-full h-auto max-h-[40vh] object-contain cursor-zoom-in hover:opacity-90 transition-opacity" 
                                 onClick={(e) => { e.stopPropagation(); setLightboxImage(activeProject.snapshots[3]); }}
                               />
                            </div>
                          )}
                        </div>
                      )}

                    </div>

                    {/* Right Column: Metadata */}
                    <div className="md:col-span-4 space-y-8">
                      <div>
                        <span className="mono-label text-neutral-500 block mb-3">Tech Stack</span>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tech.map((t) => (
                            <span key={t} className="font-mono-tech text-xs px-3 py-1.5 border border-neutral-800 text-neutral-300 rounded-md bg-neutral-900/50">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {(activeProject.links?.demo || activeProject.links?.github) && (
                        <div className="pt-8 border-t border-neutral-800 space-y-3">
                          <span className="mono-label text-neutral-500 block mb-3">Links</span>
                          {activeProject.links.github && (
                            <a
                              href={activeProject.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 font-mono-tech text-sm border border-neutral-700 text-white hover:bg-white hover:text-black py-3 rounded-md transition-all duration-300"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                              View Source Code
                            </a>
                          )}
                          {activeProject.links.demo && (
                            <a
                              href={activeProject.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 font-mono-tech text-sm bg-[var(--active-accent)] text-black hover:bg-white py-3 rounded-md transition-all duration-300 font-bold"
                            >
                              Launch Live Demo
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12 cursor-zoom-out" 
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button for Lightbox */}
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-20 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={lightboxImage} 
              alt="Fullscreen snapshot" 
              className="w-full h-full object-contain drop-shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
