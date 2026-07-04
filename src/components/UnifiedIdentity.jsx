'use client';

import { motion } from 'framer-motion';

export default function UnifiedIdentity() {
  const pillars = [
    {
      title: 'Geospatial Intelligence & Systems',
      desc: 'Field science generates high-resolution spatial variables—coordinates, elevation composites, precipitation curves. Software engineering converts these indexes into fast APIs and microarchitectures.',
      tag: 'GIS & Dev'
    },
    {
      title: 'Hypothesis Validation & Products',
      desc: 'A mobile application is a living experiment. Combining location telemetry with user streaks enables us to audit routine consistency and measure trust parameters under operational limits.',
      tag: 'Analysis & App'
    },
    {
      title: 'Scientific Method & Architectures',
      desc: 'Approaching code with scientific discipline. We observe query cycles, hypothesize bottlenecks, analyze logs, build cached channels, and calibrate outcomes. Code scales when it is validated.',
      tag: 'Research & Code'
    }
  ];

  return (
    <section className="py-28 relative overflow-hidden z-20">
      <div className="section-container">
        {/* Subtle grid line separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-900 to-transparent mb-24" />

        {/* Narrative Center Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="mono-label tracking-[0.25em] text-[var(--active-accent)] block">
            Approach
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-neutral-100 tracking-tight leading-tight">
            Why these worlds belong together.
          </h2>
          <div className="h-px w-12 bg-[var(--active-accent)] mx-auto mt-2" />
        </div>

        {/* Core Philosophy Callout */}
        <div className="max-w-4xl mx-auto border border-neutral-900 bg-[#24201c]/5 p-8 rounded mb-16 relative">
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#111111] px-3 font-mono-tech text-xs text-[var(--active-accent)] uppercase tracking-wider">
            Focus
          </div>
          <p className="text-base sm:text-lg text-neutral-350 leading-relaxed text-center font-light">
            “I do not simply build software or conduct research independently. <br className="hidden sm:inline" />
            I research problems, analyze systems, and build meaningful technological solutions around them.”
          </p>
        </div>

        {/* Three Pillars Intersection */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 border border-neutral-900 bg-transparent rounded hover:border-neutral-800 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono-tech text-xs text-neutral-500 border border-neutral-900 px-2 py-0.5 rounded bg-neutral-950/20 mb-4 inline-block">
                  {item.tag}
                </span>
                <h4 className="font-semibold text-sm text-neutral-350 uppercase tracking-wider mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-500 font-light">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
