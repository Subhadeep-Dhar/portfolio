'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

export default function About() {
  const traits = [
    {
      code: 'SYS_01',
      label: 'Systems Thinking',
      desc: 'Mapping relational dependencies before deploying a single line of logic. Complex schemas are organized using strict, predictable models.'
    },
    {
      code: 'DAT_02',
      label: 'Data Validation',
      desc: 'Formulating structured assumptions. Hypotheses get test models, logs are evaluated, and parameters are continuously refined.'
    },
    {
      code: 'GIS_03',
      label: 'Spatial Intelligence',
      desc: 'Analyzing how physical variables interact across geography. Processing temporal indices and mapping climate benchmarks.'
    },
    {
      code: 'DEV_04',
      label: 'Execution focus',
      desc: 'Building performant full-stack architectures. Focused on minimum compiler overhead, cached channels, and clear blueprints.'
    }
  ];

  return (
    <section id="profile" className="py-24 relative z-20">
      <div className="section-container">
        {/* Separator line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-900 to-transparent mb-24" />

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative Bio */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="mono-label block mb-2 text-[var(--active-accent)]">RESEARCHER PROFILE</span>
              <h2 className="text-3xl font-light text-neutral-100 tracking-tight leading-tight">
                Engineering through scientific discipline.
              </h2>
            </div>
            
            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              {siteConfig.bio.map((paragraph, i) => (
                <p key={i}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="font-mono-tech text-xs border border-neutral-900 px-3 py-1 rounded bg-[#24201c]/5 text-neutral-500">
                📍 {siteConfig.location}
              </span>
              <span className="font-mono-tech text-xs border border-neutral-900 px-3 py-1 rounded bg-[#24201c]/5 text-neutral-500">
                🎓 MCA Scholar
              </span>
              {siteConfig.available && (
                <span className="font-mono-tech text-xs border border-[var(--active-accent)]/30 text-[var(--active-accent)] px-3 py-1 rounded bg-[var(--active-accent)]/5">
                  ✦ Available for systems build
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Traits list */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {traits.map((trait, idx) => (
              <motion.div
                key={trait.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="p-5 border border-neutral-900 bg-[#24201c]/5 rounded group hover:border-neutral-800 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-tech text-xs text-neutral-600">{trait.code}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--active-accent)]/50" />
                </div>
                <h4 className="font-semibold text-sm text-neutral-350 uppercase tracking-wider mb-2">
                  {trait.label}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-500 font-light">
                  {trait.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
