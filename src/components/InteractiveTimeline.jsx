'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timeline } from '@/data/timeline';

// Map milestones to coordinates for spatial storytelling
const MILESTONE_COORDS = {
  '2025': { coords: '13.34° N, 74.79° E', location: 'Manipal Campus, Karnataka' },
  '2024': { coords: '27.78° N, 88.63° E', location: 'Gangtok, Sikkim' },
  '2022': { coords: '27.78° N, 88.63° E', location: 'Sikkim Manipal Institute' },
  'default': { coords: '27.78° N, 88.63° E', location: 'Sikkim / Manipal Journey' }
};

export default function InteractiveTimeline() {
  const [activeCoords, setActiveCoords] = useState(MILESTONE_COORDS['2025']);
  const [expandedItem, setExpandedItem] = useState(null);
  const containerRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger when item is centered in viewport
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const year = entry.target.getAttribute('data-year');
          const config = MILESTONE_COORDS[year] || MILESTONE_COORDS['2024'];
          setActiveCoords(config);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Copy current refs for cleanup closure
    const currentRefs = itemRefs.current;
    
    Object.values(currentRefs).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      Object.values(currentRefs).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const toggleExpand = (index) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  return (
    <section id="evolution" className="py-24 relative">
      <div className="section-container" ref={containerRef}>
        {/* Subtle separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-900 to-transparent mb-24" />

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Sticky Coordinates & Narrative */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div>
              <span className="mono-label block mb-2 text-lime-500">Education & Evolution</span>
              <h2 className="text-3xl font-semibold text-gray-100 tracking-tight">How I got here.</h2>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                A non-linear history of academic benchmarks, GIS field observations, and application testing.
              </p>
            </div>

            {/* Spatial Anchor Dashboard */}
            <div className="p-4 border border-gray-900 bg-[#070b15]/60 rounded-md space-y-3">
              <span className="mono-label text-[9px] block text-gray-500">SPATIAL RADAR ANCHOR</span>
              <div className="space-y-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCoords.coords}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.25 }}
                    className="font-mono-tech text-sm text-teal-400 font-medium"
                  >
                    {activeCoords.coords}
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCoords.location}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] text-gray-500 font-mono-tech uppercase tracking-wider"
                  >
                    {activeCoords.location}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-1.5 pt-2 border-t border-gray-950">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                <span className="text-[9px] font-mono-tech text-gray-600">LINKED TO CURRENT TIMELINE NODE</span>
              </div>
            </div>
          </div>

          {/* Right: Vertical Journey list */}
          <div className="lg:col-span-8 relative pl-6 sm:pl-8 border-l border-gray-900 space-y-8">
            {timeline.map((item, index) => {
              const isExpanded = expandedItem === index;
              const isEdu = item.type === 'education';

              return (
                <div
                  key={`${item.year}-${item.title}`}
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-year={item.year}
                  className="relative group select-none"
                >
                  {/* Outer point node */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full border-2 bg-[#030712] transition-colors duration-300 flex items-center justify-center`}
                    style={{
                      borderColor: isEdu ? 'var(--dev-teal)' : 'var(--gis-olive)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: isEdu ? 'var(--dev-teal)' : 'var(--gis-olive)',
                      }}
                    />
                  </div>

                  {/* Year Tag */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono-tech text-xs font-semibold text-gray-400">{item.year}</span>
                    <span
                      className="font-mono text-[9px] px-1.5 py-0.5 rounded border"
                      style={{
                        color: isEdu ? 'var(--dev-teal)' : 'var(--gis-olive)',
                        borderColor: isEdu ? 'rgba(13, 148, 136, 0.2)' : 'rgba(63, 98, 18, 0.2)',
                        background: isEdu ? 'rgba(13, 148, 136, 0.05)' : 'rgba(63, 98, 18, 0.05)',
                      }}
                    >
                      {item.type.toUpperCase()}
                    </span>
                  </div>

                  {/* Card Structure */}
                  <div
                    onClick={() => toggleExpand(index)}
                    className="p-5 border border-gray-900 bg-[#070b15]/30 rounded hover:border-gray-800 cursor-pointer transition-all duration-300"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <h4 className="font-semibold text-sm text-gray-200 group-hover:text-teal-400 transition-colors duration-200 leading-snug">
                        {item.title}
                      </h4>
                      <span className="text-gray-600 font-mono text-xs select-none">
                        {isExpanded ? '—' : '+'}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      {item.desc}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-950 mt-4 pt-3 space-y-2">
                            <span className="mono-label text-[8px] text-gray-600 block">KEY FOCUS & LEARNINGS</span>
                            <p className="text-[11px] text-gray-400 leading-relaxed">
                              {isEdu 
                                ? 'Acquired fundamental computing architectures, structural databases, and algorithm logic. Analyzed practical systems models.' 
                                : 'Applied logic under operational constraints: handling spatial metrics coordinates, routing API data streams, and resolving verified user checkpoints.'}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
