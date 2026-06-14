'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

export default function Contact() {
  const contactLinks = [
    siteConfig.links.email && {
      label: 'EMAIL',
      value: siteConfig.links.email,
      href: `mailto:${siteConfig.links.email}`,
      code: 'MAIL_CONN'
    },
    siteConfig.links.github && {
      label: 'GITHUB',
      value: siteConfig.links.github.replace('https://', ''),
      href: siteConfig.links.github,
      code: 'REPOS_CONN'
    },
    siteConfig.links.linkedin && {
      label: 'LINKEDIN',
      value: siteConfig.links.linkedin.replace('https://', ''),
      href: siteConfig.links.linkedin,
      code: 'PROF_CONN'
    }
  ].filter(Boolean);

  const handleReplayBoot = () => {
    sessionStorage.removeItem('booted');
    window.location.reload();
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden select-none">
      <div className="section-container">
        {/* Subtle separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-900 to-transparent mb-24" />

        <div className="max-w-2xl mx-auto space-y-12">
          {/* Signal Header with geofence pulse */}
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
              <span className="font-mono-tech text-[10px] text-teal-400 uppercase tracking-widest">
                TRANSMITTING BEACON // STABLE
              </span>
            </div>
            
            <h2 className="text-3xl font-light text-gray-150 tracking-tight">
              Let's build something meaningful.
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              Open to collaborating on geospatial datasets, systems caching, or custom full-stack engines.
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
                className="flex items-center justify-between p-4 border border-gray-900 bg-[#070b15]/20 hover:border-teal-900/60 rounded transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono-tech text-[9px] text-gray-650">{link.code}</span>
                  <span className="mono-label text-[10px] text-gray-400 group-hover:text-gray-200 transition-colors">
                    {link.label}
                  </span>
                </div>
                <span className="font-mono-tech text-[11px] text-gray-500 group-hover:text-teal-400 transition-colors truncate max-w-xs sm:max-w-md">
                  {link.value} →
                </span>
              </motion.a>
            ))}
          </div>

          {/* Resume Download */}
          {siteConfig.links.resume && (
            <div className="text-center pt-4">
              <a
                href={siteConfig.links.resume}
                download
                className="inline-block font-mono-tech text-xs border border-gray-800 text-gray-400 px-6 py-3 rounded hover:border-teal-500 hover:text-teal-400 transition-all duration-300"
              >
                DOWNLOAD SPEC SHEET [RESUME.PDF]
              </a>
            </div>
          )}

          {/* Immersive Footer */}
          <div className="border-t border-gray-950 pt-12 mt-16 text-center space-y-3">
            <p className="font-mono-tech text-[10px] text-gray-650">
              BUILD // Next.js · CSS-in-JS · Canvas API · Framer Motion
            </p>
            <p className="font-mono-tech text-[10px] text-gray-700">
              {siteConfig.name} © {new Date().getFullYear()} · MANIPAL & SIKKIM
            </p>
            
            {/* Replay action */}
            <div className="pt-4">
              <button
                onClick={handleReplayBoot}
                className="font-mono-tech text-[9px] text-teal-800 hover:text-teal-500 focus:outline-none transition-colors duration-200"
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
