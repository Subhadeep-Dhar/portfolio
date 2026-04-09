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
    education:   { color: 'lab-cyan',   dot: '#00e5ff', label: 'EDU' },
    project:     { color: 'lab-purple', dot: '#a855f7', label: 'PROJ' },
    achievement: { color: 'lab-cyan',   dot: '#00e5ff', label: 'WIN' },
    milestone:   { color: 'lab-muted',  dot: '#64748b', label: 'LOG' },
  }[item.type] ?? { color: 'lab-muted', dot: '#64748b', label: '—' };

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="flex gap-4 sm:gap-6"
    >
      {/* ── Vertical line + dot ──────────────────────────────────── */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <div
          className="w-3 h-3 rounded-full shrink-0 mt-1 ring-2 ring-offset-2 ring-offset-lab-bg"
          style={{ backgroundColor: typeConfig.dot, ringColor: typeConfig.dot }}
        />
        {/* Line (hidden after last item) */}
        {!isLast && (
          <div className="w-px flex-1 mt-2 bg-lab-line" />
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="pb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="mono-label text-lab-muted">{item.year}</span>
          <span
            className="font-mono text-xs px-1.5 py-0.5 rounded"
            style={{
              color: typeConfig.dot,
              background: `${typeConfig.dot}18`,
            }}
          >
            {typeConfig.label}
          </span>
        </div>
        <h4 className="font-display font-semibold text-lab-text mb-1 leading-snug">
          {item.title}
        </h4>
        <p className="text-sm text-lab-muted leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}
