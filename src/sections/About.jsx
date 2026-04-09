'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { siteConfig } from '@/data/siteConfig';

/**
 * About / Researcher Profile Section
 * ───────────────────────────────────
 * A non-generic intro focused on mindset and approach.
 * Pulls from siteConfig.bio — edit that file to update content.
 */
export default function About() {
  // Core traits / working principles — edit here or move to siteConfig if preferred
  const traits = [
    {
      icon: '◈',
      label: 'Systems thinker',
      desc: 'I map dependencies before writing a single line. Complexity is managed, not feared.',
    },
    {
      icon: '◑',
      label: 'Data-driven',
      desc: 'Gut feelings get a hypothesis. Hypotheses get experiments. Experiments get measured.',
    },
    {
      icon: '◎',
      label: 'Finish-line focused',
      desc: 'Features ship when they solve the problem they were built for — not before, not after.',
    },
    {
      icon: '◻',
      label: 'Curiosity-led',
      desc: 'The best projects started as "I wonder if..." Most of mine still do.',
    },
  ];

  return (
    <section id="profile" className="py-24">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Text ─────────────────────────────────────── */}
          <div>
            <SectionHeader
              label="RESEARCHER PROFILE"
              title="Not just a developer."
              subtitle="I treat engineering like applied science. Every project starts with a problem, not a feature list."
            />

            <div className="space-y-4">
              {siteConfig.bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="text-lab-muted leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Location + availability */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <span className="font-mono text-xs text-lab-muted border border-lab-line px-3 py-1.5 rounded">
                📍 {siteConfig.location}
              </span>
              <span className="font-mono text-xs text-lab-muted border border-lab-line px-3 py-1.5 rounded">
                🎓 MCA Student
              </span>
              {siteConfig.available && (
                <span className="font-mono text-xs text-green-400 border border-green-400/30 px-3 py-1.5 rounded">
                  ✦ Available for projects
                </span>
              )}
            </motion.div>
          </div>

          {/* ── Right: Traits grid ────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="glass-card p-5 group hover:border-lab-cyan/20 transition-colors duration-300"
              >
                <span className="text-lab-cyan text-xl block mb-3 font-mono group-hover:scale-110 transition-transform duration-200 inline-block">
                  {trait.icon}
                </span>
                <h4 className="font-display font-semibold text-lab-text text-sm mb-2">
                  {trait.label}
                </h4>
                <p className="text-xs text-lab-muted leading-relaxed">
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
