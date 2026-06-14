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
    idea:         { label: 'IDEA',         color: 'var(--active-accent)' },
    prototyping:  { label: 'PROTOTYPING',  color: '#facc15' },
    shelved:      { label: 'SHELVED',      color: '#64748b' },
  };

  return (
    <section id="vault" className="py-24">
      <div className="section-container">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mb-24" />

        <SectionHeader
          label="CONCEPT VAULT"
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
                className="glass-card p-5 group hover:border-[var(--active-accent)]/20 transition-colors duration-300"
              >
                {/* Status */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      color: cfg.color,
                      background: cfg.color.startsWith('var') ? `rgba(var(--active-accent-rgb), 0.1)` : `${cfg.color}15`,
                    }}
                  >
                    {cfg.label}
                  </span>
                </div>

                <h4 className="font-display font-semibold text-[var(--color-text-main)] mb-2 group-hover:text-[var(--active-accent)] transition-colors duration-200">
                  {concept.title}
                </h4>
                <p className="text-sm text-neutral-450 leading-relaxed mb-3">{concept.desc}</p>

                <div className="border-t border-[var(--color-border)] pt-3">
                  <span className="mono-label block mb-1">WHY IT MATTERS</span>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">{concept.why}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
