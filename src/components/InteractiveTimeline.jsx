'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TIMELINE_DATA = [
  {
    year: '2022',
    type: 'Education',
    title: 'Bachelor of Computer Applications',
    desc: 'Graduated with distinction from Sikkim Manipal Institute of Technology. Focus on relational databases, networking parameters, and algorithm design.',
    location: 'Sikkim, India',
    mode: 'both'
  },
  {
    year: '2024',
    type: 'Work',
    title: 'SH1ELD Tech — InfoSec Intern',
    desc: 'Conducted system log audits, analyzed vulnerability metrics, and mapped early local security configurations.',
    location: 'Gangtok, Sikkim',
    mode: 'developer'
  },
  {
    year: '2024',
    type: 'Research & GIS',
    title: 'South Lhonak Glacier Analysis',
    desc: 'Assessed glacier flow velocity post-glacial lake flood disaster. Processed remote sensing imagery in SNAP and Google Earth Engine, classifying anomalies via K-Means.',
    location: 'South Lhonak Lake, Sikkim',
    mode: 'researcher'
  },
  {
    year: '2024',
    type: 'Research',
    title: 'Asian Development Research Institute — Research Intern',
    desc: 'Contributed to regional health surveillance mapping (IHIP-IDSP Bihar project). Modeled spatial trends to optimize department reporting indices.',
    location: 'Patna, Bihar',
    mode: 'researcher'
  },
  {
    year: '2024',
    type: 'Work',
    title: 'SH1ELD Tech — Web Developer',
    desc: 'Built tailored tourism portals and local data workflows for regional agencies. Integrated API routes and optimized database access pipelines.',
    location: 'Gangtok, Sikkim',
    mode: 'developer'
  },
  {
    year: '2024',
    type: 'Work',
    title: 'Asian Development Reseasrch Institute — Research Intern',
    desc: 'Enhanced regional health surveillance mapping (IHIP-IDSP Bihar project) by modeling spatial trends to optimize reporting indices.',
    location: 'Patna, Bihar',
    mode: 'developer'
  },
  {
    year: '2025',
    type: 'Education',
    title: 'Master of Computer Applications',
    desc: 'Began postgraduate MCA studies at Manipal Institute of Technology. Focus on location analytics, systems caching, and responsive product structures.',
    location: 'Manipal, Karnataka',
    mode: 'both'
  },
  {
    year: '2026',
    type: 'Research',
    title: 'Spatio-Temporal variability of NDVI and LST in a monsoon dominated region of Manipal',
    desc: 'Analysing the spatial-temporal variability of NDVI and LST in a monsoon dominated region of Manipal using Landsat-8 imagery.',
    location: 'Manipal, Karnataka',
    mode: 'researcher'
  }
];

export default function InteractiveTimeline({ mode = 'developer' }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredData = TIMELINE_DATA.filter(item => item.mode === 'both' || item.mode === mode);

  return (
    <div id="evolution" className="py-24 relative bg-transparent select-none z-20">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="mono-label block mb-2 text-[var(--active-accent)]">Evolution Log</span>
          <h2 className="text-3xl sm:text-4xl font-light text-neutral-100 tracking-tight leading-tight">
            {mode === 'developer' ? 'How I got here.' : 'Research & Academic Ledger'}
          </h2>
          <p className="text-sm text-neutral-450 mt-2 leading-relaxed font-light">
            {mode === 'developer'
              ? 'A chronological log of academic foundations, security operations, and systems engineering.'
              : 'A chronological log of remote sensing analysis, GIS development, and academic milestones.'}
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative border-l border-neutral-900 ml-4 sm:ml-8 space-y-12 py-4">
          
          {filteredData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Point Indicator on Vertical Line */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border border-neutral-850 bg-[var(--color-bg)] flex items-center justify-center transition-colors duration-300 group-hover:border-[var(--active-accent)]">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 transition-colors duration-300 group-hover:bg-[var(--active-accent)]" />
              </div>

              {/* Timeline Card */}
              <div className="p-6 border border-neutral-900 bg-[#24201c]/5 group-hover:border-neutral-800 transition-colors duration-350 rounded-lg max-w-3xl space-y-3">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-950 pb-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[var(--active-accent)]">
                      {item.year}
                    </span>
                    <span className="text-[10px] uppercase font-body border border-neutral-900 text-neutral-450 px-2 py-0.5 rounded bg-[var(--color-bg)]/60">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-neutral-550 font-body text-[10px]">Record {String(index + 1).padStart(2, '0')}</span>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-sm sm:text-base text-neutral-200 group-hover:text-[var(--active-accent)] transition-colors duration-300 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Location Footer */}
                <div className="pt-2 border-t border-neutral-950 flex gap-2 items-center text-xs text-neutral-500">
                  <span>📍</span>
                  <span>{item.location}</span>
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
}
