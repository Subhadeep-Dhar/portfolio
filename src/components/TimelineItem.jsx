'use client';

import { motion } from 'framer-motion';

/**
 * TimelineItem
 * -----------
 * Renders a single entry from the timeline data array.
 * Props: item (object from src/data/timeline.js), index (number), isLast (bool)
 */
export default function TimelineItem({ item, index, isLast }) {
  // Color per type
  const typeConfig = {
    education:   { dot: 'var(--active-accent)', label: 'EDU' },
    project:     { dot: 'rgba(var(--active-accent-rgb), 0.5)', label: 'PROJ' },
    achievement: { dot: 'var(--active-accent)', label: 'WIN' },
    milestone:   { dot: 'var(--color-text-dim)', label: 'LOG' },
  }[item.type] ?? { dot: 'var(--color-text-dim)', label: '—' };

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="flex gap-4 sm:gap-6"
    >
      {/* ── Vertical line ─────────────────────────────────────── */}
      <div className="flex flex-col items-center">
        <div
          className="w-0.5 flex-1 mt-1 bg-[var(--color-border)]"
          style={{ backgroundColor: typeConfig.dot }}
        />
        {!isLast && (
          <div className="w-px flex-1 mt-2 bg-[var(--color-border)]" />
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="pb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="mono-label text-neutral-500">{item.year}</span>
          <span
            className="font-mono text-xs px-1.5 py-0.5 rounded"
            style={{
              color: typeConfig.dot,
              background: typeConfig.dot.startsWith('var') ? 'rgba(var(--active-accent-rgb), 0.1)' : `${typeConfig.dot}18`,
            }}
          >
            {typeConfig.label}
          </span>
        </div>
        <h4 className="font-display font-semibold text-[var(--color-text-main)] mb-1 leading-snug">
          {item.title}
        </h4>
        <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}
