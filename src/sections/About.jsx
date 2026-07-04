'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

export default function About() {
  const traits = [
    {
      label: 'Research',
      desc: 'I begin by understanding the problem clearly, the context around it, and the constraints that matter.'
    },
    {
      label: 'Building',
      desc: 'I prefer clear structures, careful decisions, and work that is straightforward to maintain over time.'
    },
    {
      label: 'Fieldwork',
      desc: 'I work comfortably across maps, data, and real-world conditions when a project needs that depth.'
    },
    {
      label: 'Delivery',
      desc: 'I focus on building things that are practical, well considered, and useful to the people using them.'
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
              <span className="mono-label block mb-2 text-[var(--active-accent)]">PERSONAL PROFILE</span>
              <h2 className="text-3xl font-light text-neutral-100 tracking-tight leading-tight">
                Working through problems with care and patience.
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
              <span className="font-mono-tech text-xs border border-neutral-900 px-3 py-1 rounded bg-[#24201c]/5 text-neutral-500 flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21s-6-5.4-6-11a6 6 0 1 1 12 0c0 5.6-6 11-6 11Z" />
                  <circle cx="12" cy="10" r="2.2" />
                </svg>
                {siteConfig.location}
              </span>
              <span className="font-mono-tech text-xs border border-neutral-900 px-3 py-1 rounded bg-[#24201c]/5 text-neutral-500">
                MCA Scholar
              </span>
              {siteConfig.available && (
                <span className="font-mono-tech text-xs border border-[var(--active-accent)]/30 text-[var(--active-accent)] px-3 py-1 rounded bg-[var(--active-accent)]/5">
                  Available for freelance work
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
                className="p-5 border border-neutral-900/60 bg-neutral-950/80 backdrop-blur-md rounded group hover:border-neutral-800 transition-colors duration-300"
              >
                <div className="mb-3">
                  <span className="font-mono-tech text-xs text-neutral-600">{trait.label}</span>
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
