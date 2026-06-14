'use client';

import { motion } from 'framer-motion';

export default function UnifiedIdentity() {
  const links = [
    {
      title: 'Geospatial Intelligence + Systems',
      desc: 'Environmental science generates enormous raw files—satellite bands, elevation grids, precipitation variables. Software engineering converts these indices into accessible dashboards, APIs, and real-time alerts.',
      tag: 'GIS & Dev'
    },
    {
      title: 'Hypothesis Validation + Mobile Products',
      desc: 'A mobile application is a living experiment. Combining location tracker APIs with behavioral psychology enables us to measure consistency dynamics, streak habits, and validation loops under actual constraints.',
      tag: 'Analysis & App'
    },
    {
      title: 'Scientific Method + Core Architectures',
      desc: 'Approaching code like a researcher. We observe query delays, hypothesize bottlenecks, analyze logs, build cached channels, and refine the outcome. Code becomes robust when it is validated, not just written.',
      tag: 'Research & Code'
    }
  ];

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="section-container">
        {/* Subtle separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-900 to-transparent mb-24" />

        {/* Narrative Center Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="mono-label tracking-widest text-teal-500 font-semibold block">UNIFIED IDENTITY MERGE</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-100 tracking-tight leading-tight">
            Why these worlds belong together.
          </h2>
          <div className="h-px w-16 bg-teal-500 mx-auto mt-2" />
        </div>

        {/* Core Philosophy Callout */}
        <div className="max-w-4xl mx-auto border border-gray-900 bg-[#070b15]/20 p-8 rounded-lg mb-16 relative">
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#030712] px-3 font-mono-tech text-[10px] text-teal-400">
            STATEMENT // 01
          </div>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-center font-light">
            “I do not simply build software or conduct research independently. <br className="hidden sm:inline" />
            I research problems, analyze systems, and build meaningful technological solutions around them.”
          </p>
        </div>

        {/* Three Pillars Intersection */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {links.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 border border-gray-900 bg-transparent rounded hover:border-gray-800 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[9px] text-lime-500 border border-lime-500/20 px-2 py-0.5 rounded bg-lime-500/5 mb-4 inline-block">
                  {item.tag}
                </span>
                <h4 className="font-semibold text-sm text-gray-200 mb-3 tracking-wide leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed text-gray-500">
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
