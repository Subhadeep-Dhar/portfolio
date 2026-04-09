'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

/**
 * Hero / Landing Section
 * ─────────────────────
 * Features:
 *  - Staggered text reveals
 *  - CSS-only scan-line effect (no canvas, no JS)
 *  - CTA button to enter the lab
 *  - Floating availability badge
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Scan-line effect (CSS only, lightweight) ─────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-lab-cyan/20 to-transparent"
          style={{ animation: 'scan 8s linear infinite' }}
        />
      </div>

      {/* ── Ambient glow orbs (CSS only) ─────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #00e5ff, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }}
        />
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="section-container w-full pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Mono label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="mono-label">Portfolio</span>
            {siteConfig.available && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-green-400 border border-green-400/30 px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse-slow" />
                OPEN TO WORK
              </span>
            )}
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-lab-text leading-tight mb-4"
          >
            {siteConfig.headline.split(' ').map((word, i) => (
              <span key={i}>
                {/* Highlight "Solutions" and "Curiosity" */}
                {['Solutions', 'Curiosity'].includes(word) ? (
                  <span className="text-neon-cyan">{word} </span>
                ) : (
                  <span>{word} </span>
                )}
              </span>
            ))}
          </motion.h1>

          {/* Sub-roles */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-mono text-lab-muted text-sm sm:text-base tracking-widest mb-8"
          >
            {siteConfig.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href="#lab"
              className="font-mono text-sm bg-lab-cyan text-lab-bg px-6 py-3 rounded hover:bg-lab-cyan/90 transition-all duration-200 hover:shadow-neon-cyan"
            >
              My works →
            </a>
            <a
              href="#profile"
              className="font-mono text-sm border border-lab-line text-lab-muted px-6 py-3 rounded hover:border-lab-cyan hover:text-lab-cyan transition-all duration-200"
            >
              ABOUT ME
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-lab-line"
          >
            {[
              { value: '5+', label: 'Real-world Projects' },
              { value: '2', label: 'Internships' },
              // { value: '500+', label: 'App Users' },
              { value: '2 years', label: 'Since working' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-display font-bold text-2xl text-lab-cyan">{value}</div>
                <div className="font-mono text-xs text-lab-muted mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="mono-label text-lab-muted/50">SCROLL</span>
          <div className="scroll-mouse">
            <span className="scroll-mouse-wheel" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
