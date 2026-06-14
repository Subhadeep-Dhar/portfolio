'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

export default function Contact() {
  const contactLinks = [
    siteConfig.links.email && {
      label: 'EMAIL',
      value: siteConfig.links.email,
      href: `mailto:${siteConfig.links.email}`,
      code: 'MAIL_STREAM'
    },
    siteConfig.links.github && {
      label: 'GITHUB',
      value: siteConfig.links.github.replace('https://', ''),
      href: siteConfig.links.github,
      code: 'REPOS_STREAM'
    },
    siteConfig.links.linkedin && {
      label: 'LINKEDIN',
      value: siteConfig.links.linkedin.replace('https://', ''),
      href: siteConfig.links.linkedin,
      code: 'LINK_STREAM'
    }
  ].filter(Boolean);

  const handleReplayBoot = () => {
    sessionStorage.removeItem('booted');
    window.location.reload();
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden select-none z-20">
      <div className="section-container">
        {/* Subtle grid line separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-900 to-transparent mb-24" />

        <div className="max-w-2xl mx-auto space-y-12">
          {/* Signal Indicator & Heading */}
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--active-accent)] animate-ping" />
              <span className="font-mono-tech text-[9px] text-[var(--active-accent)] uppercase tracking-[0.25em]">
                TRANSMITTING BEACON // STABLE
              </span>
            </div>
            
            <h2 className="text-3xl font-light text-neutral-100 tracking-tight leading-tight">
              Let's build something meaningful.
            </h2>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
              Open to collaborating on geospatial indices, cached database structures, or custom API channels.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid gap-3">
            {contactLinks.map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
                className="flex items-center justify-between p-4 border border-neutral-900 bg-[#24201c]/5 hover:border-[var(--active-accent)]/50 rounded transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono-tech text-[9px] text-neutral-600">{link.code}</span>
                  <span className="mono-label text-[10px] text-neutral-450 group-hover:text-neutral-200 transition-colors">
                    {link.label}
                  </span>
                </div>
                <span className="font-mono-tech text-[10px] text-neutral-500 group-hover:text-[var(--active-accent)] transition-colors truncate max-w-xs sm:max-w-md">
                  {link.value} →
                </span>
              </motion.a>
            ))}
          </div>

          {/* PDF spec sheet download */}
          {siteConfig.links.resume && (
            <div className="text-center pt-4">
              <a
                href={siteConfig.links.resume}
                download
                className="inline-block font-mono-tech text-xs border border-neutral-900 text-neutral-400 px-6 py-3 rounded hover:border-[var(--active-accent)] hover:text-neutral-200 transition-all duration-300"
              >
                DOWNLOAD SPEC SHEET [RESUME.PDF]
              </a>
            </div>
          )}

          {/* Immersive Footer */}
          <div className="border-t border-neutral-950 pt-12 mt-16 text-center space-y-3">
            <p className="font-mono-tech text-[9px] text-neutral-600">
              BUILD // Next.js · CSS-in-JS · Canvas 2D · Framer Motion
            </p>
            <p className="font-mono-tech text-[9px] text-neutral-700">
              {siteConfig.name} © {new Date().getFullYear()} · MANIPAL & SIKKIM
            </p>
            
            {/* Replay action */}
            <div className="pt-4">
              <button
                onClick={handleReplayBoot}
                className="font-mono-tech text-[8px] text-neutral-700 hover:text-[var(--active-accent)] focus:outline-none bg-transparent border-0 transition-colors duration-250 cursor-pointer"
              >
                [ RESET EXPERIENCE SESSION ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
