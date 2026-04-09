'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { concepts } from '@/data/concepts';

/**
 * Concept Vault Section (Optional)
 * ─────────────────────────────────
 * Shows half-baked ideas, shelved experiments, and future plans.
 * Data lives in src/data/concepts.js — remove from page.jsx to hide this section.
 */
export default function ConceptVault() {
  const statusConfig = {
    idea:         { label: 'IDEA',         color: '#00e5ff' },
    prototyping:  { label: 'PROTOTYPING',  color: '#facc15' },
    shelved:      { label: 'SHELVED',      color: '#64748b' },
  };

  return (
    <section id="vault" className="py-24">
      <div className="section-container">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-lab-line to-transparent mb-24" />

        <SectionHeader
          label="SECTION_06 // CONCEPT VAULT"
          title="Things I haven't built yet."
          subtitle="Ideas in progress, shelved experiments, and future directions."
        />

        <div className="grid sm:grid-cols-2 gap-4">
          {concepts.map((concept, i) => {
            const cfg = statusConfig[concept.status] ?? statusConfig.idea;

            return (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="glass-card p-5 group hover:border-lab-cyan/20 transition-colors duration-300"
              >
                {/* Status */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      color: cfg.color,
                      background: `${cfg.color}15`,
                    }}
                  >
                    {cfg.label}
                  </span>
                </div>

                <h4 className="font-display font-semibold text-lab-text mb-2 group-hover:text-lab-cyan transition-colors duration-200">
                  {concept.title}
                </h4>
                <p className="text-sm text-lab-muted leading-relaxed mb-3">{concept.desc}</p>

                <div className="border-t border-lab-line pt-3">
                  <span className="mono-label block mb-1">WHY IT MATTERS</span>
                  <p className="text-xs text-lab-muted leading-relaxed">{concept.why}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
