'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

export default function About() {
  const traits = [
    {
      code: 'SYS_01',
      label: 'Systems Thinking',
      desc: 'Mapping relational dependencies before writing a single line of logic. Complex configurations are managed through systematic blueprints.'
    },
    {
      code: 'DAT_02',
      label: 'Data Validation',
      desc: 'Gut instincts get a hypothesis. Hypotheses get experiments. Experiments get measured, evaluated, and resolved.'
    },
    {
      code: 'GIS_03',
      label: 'Spatial Intelligence',
      desc: 'Analyzing how environmental variables interact across space and time. Integrating physical satellite parameters with cloud workflows.'
    },
    {
      code: 'DEV_04',
      label: 'Execution focus',
      desc: 'Building performant software that resolves real-world problems. Delivering minimal overhead, clear architecture, and clean documentation.'
    }
  ];

  return (
    <section id="profile" className="py-24 relative">
      <div className="section-container">
        {/* Subtle grid line separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-900 to-transparent mb-24" />

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Bio Story */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="mono-label block mb-2 text-teal-400">RESEARCHER PROFILE</span>
              <h2 className="text-3xl font-semibold text-gray-150 tracking-tight leading-tight">
                Engineering through scientific discipline.
              </h2>
            </div>
            
            <div className="space-y-4 text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
              {siteConfig.bio.map((paragraph, i) => (
                <p key={i}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="font-mono-tech text-[10px] border border-gray-900 px-3 py-1 rounded bg-[#070b15]/40 text-gray-450">
                📍 {siteConfig.location}
              </span>
              <span className="font-mono-tech text-[10px] border border-gray-900 px-3 py-1 rounded bg-[#070b15]/40 text-gray-450">
                🎓 MCA Scholar
              </span>
              {siteConfig.available && (
                <span className="font-mono-tech text-[10px] border border-teal-900/40 text-teal-400 px-3 py-1 rounded bg-teal-950/10">
                  ✦ Available for systems build
                </span>
              )}
            </div>
          </div>

          {/* Right: Traits Matrix */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {traits.map((trait, idx) => (
              <motion.div
                key={trait.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="p-5 border border-gray-900 bg-[#070b15]/20 rounded group hover:border-gray-800 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-tech text-[9px] text-gray-650">{trait.code}</span>
                  <span className="w-1 h-1 rounded-full bg-teal-500/50" />
                </div>
                <h4 className="font-semibold text-xs text-gray-350 uppercase tracking-wider mb-2">
                  {trait.label}
                </h4>
                <p className="text-[11px] leading-relaxed text-gray-500 font-light">
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
