'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { siteConfig } from '@/data/siteConfig';

/**
 * Contact Section
 * ────────────────
 * Links pulled from siteConfig.links — edit there to update.
 * Set a link to null in siteConfig to hide it.
 */
export default function Contact() {
  // Build the links array from siteConfig, filtering nulls
  const contactLinks = [
    siteConfig.links.email && {
      label: 'EMAIL',
      value: siteConfig.links.email,
      href: `mailto:${siteConfig.links.email}`,
      icon: '✉',
    },
    siteConfig.links.github && {
      label: 'GITHUB',
      value: siteConfig.links.github.replace('https://', ''),
      href: siteConfig.links.github,
      icon: '◈',
    },
    siteConfig.links.linkedin && {
      label: 'LINKEDIN',
      value: siteConfig.links.linkedin.replace('https://', ''),
      href: siteConfig.links.linkedin,
      icon: '◎',
    },
    siteConfig.links.twitter && {
      label: 'TWITTER',
      value: siteConfig.links.twitter.replace('https://', ''),
      href: siteConfig.links.twitter,
      icon: '◻',
    },
  ].filter(Boolean);

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-lab-line to-transparent mb-24" />

        {/* Centered layout for contact */}
        <div className="max-w-xl mx-auto text-center">
          <SectionHeader
            label="CONTACT"
            title="Let's work on something."
            subtitle="Open to interesting problems — freelance, collaboration, or full-time roles."
            align="center"
          />

          {/* Contact links */}
          <div className="space-y-3 mt-8">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                className="flex items-center justify-between glass-card px-5 py-4 group hover:border-lab-cyan/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lab-cyan font-mono text-sm">{link.icon}</span>
                  <span className="mono-label">{link.label}</span>
                </div>
                <span className="font-mono text-xs text-lab-muted group-hover:text-lab-cyan transition-colors duration-200 truncate max-w-xs">
                  {link.value} →
                </span>
              </motion.a>
            ))}
          </div>

          {/* Resume download */}
          {siteConfig.links.resume && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-6"
            >
              <a
                href={siteConfig.links.resume}
                download
                className="inline-block font-mono text-sm border border-lab-cyan text-lab-cyan px-6 py-3 rounded hover:bg-lab-cyan hover:text-lab-bg transition-all duration-200"
              >
                DOWNLOAD RESUME
              </a>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center mt-24 pt-8 border-t border-lab-line"
        >
          <p className="font-mono text-xs text-lab-muted">
            Built with Next.js · Tailwind CSS · Framer Motion
          </p>
          <p className="font-mono text-xs text-lab-muted/50 mt-1">
            {siteConfig.name} · {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
