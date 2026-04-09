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

      <h2 className="font-display font-bold text-3xl sm:text-4xl text-lab-text mb-3 leading-tight">
        {title}
      </h2>

      {/* Cyan accent underline */}
      <div
        className={`h-px w-16 bg-gradient-to-r from-lab-cyan to-transparent mb-4 ${
          isCenter ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <p className="text-lab-muted max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
