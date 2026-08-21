'use client';

import { motion } from 'framer-motion';

/**
 * SectionHeader
 * -------------
 * Props:
 *   id       — anchor id for nav scroll
 *   label    — MONO_LABEL above the title (e.g. "SECTION_02")
 *   title    — main heading
 *   subtitle — optional sub-text
 *   align    — 'left' | 'center' (default: 'left')
 */
export default function SectionHeader({ id, label, title, subtitle, align = 'left' }) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id={id}
      className={`mb-12 ${isCenter ? 'text-center' : ''}`}
    >
      {label && (
        <span className="mono-label block mb-3">{label}</span>
      )}

      <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-[var(--color-text-main)] mb-6 leading-[0.9] tracking-tighter">
        {title}
      </h2>

      {/* Dynamic theme accent underline */}
      <div
        className={`h-1 w-24 bg-gradient-to-r from-[var(--active-accent)] to-transparent mb-4 ${
          isCenter ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <p className="text-[var(--color-text-muted)] max-w-xl leading-relaxed text-sm sm:text-base font-light">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
