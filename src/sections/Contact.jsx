'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

export default function Contact() {
  const contactLinks = [
    siteConfig.links.email && {
      label: 'EMAIL',
      value: siteConfig.links.email,
      href: `mailto:${siteConfig.links.email}`,
      code: ''
    },
    siteConfig.links.github && {
      label: 'GITHUB',
      value: siteConfig.links.github.replace('https://', ''),
      href: siteConfig.links.github,
      code: ''
    },
    siteConfig.links.linkedin && {
      label: 'LINKEDIN',
      value: siteConfig.links.linkedin.replace('https://', ''),
      href: siteConfig.links.linkedin,
      code: ''
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
          {/* Heading */}
          <div className="text-center space-y-4">
            <div className="mb-2">
              <span className="font-mono-tech text-xs text-[var(--active-accent)] uppercase tracking-[0.25em]">
                Get In Touch
              </span>
            </div>
            
            <h2 className="text-3xl font-light text-neutral-100 tracking-tight leading-tight">
              Let&apos;s talk about your next project.
            </h2>
            <p className="text-sm text-neutral-450 max-w-sm mx-auto leading-relaxed">
              I&apos;m open to web, mobile, and data-driven work where clarity and care matter.
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
                  <span className="font-mono-tech text-xs text-neutral-500">{link.code}</span>
                  <span className="mono-label text-neutral-350 group-hover:text-neutral-200 transition-colors">
                    {link.label}
                  </span>
                </div>
                <span className="font-mono-tech text-xs sm:text-sm text-neutral-400 group-hover:text-[var(--active-accent)] transition-colors truncate max-w-xs sm:max-w-md">
                  {link.value} →
                </span>
              </motion.a>
            ))}
          </div>

          {/* Resume download */}
          {siteConfig.links.resume && (
            <div className="text-center pt-4">
              <a
                href={siteConfig.links.resume}
                download
                className="inline-block font-mono-tech text-xs border border-neutral-900 text-neutral-400 px-6 py-3 rounded hover:border-[var(--active-accent)] hover:text-neutral-200 transition-all duration-300"
              >
                Download Resume (PDF)
              </a>
            </div>
          )}

          {/* Professional Footer */}
          <div className="border-t border-neutral-950 pt-12 mt-16 text-center space-y-3">
            <p className="font-mono-tech text-xs text-neutral-500">
              Thank you for visiting my portfolio. If you're interested in discussing potential collaborations, projects, or just want to say hi, feel free to reach out through any of the contact methods above. I'm always open to connecting with like-minded individuals and exploring new opportunities in the tech space.
            </p>
            <p className="font-mono-tech text-xs text-neutral-600">
              {siteConfig.name} © {new Date().getFullYear()} · Karnataka, India
            </p>
            
            {/* Replay action */}
            <div className="pt-4">
              <button
                onClick={handleReplayBoot}
                className="font-mono-tech text-xs text-neutral-600 hover:text-[var(--active-accent)] focus:outline-none bg-transparent border-0 transition-colors duration-250 cursor-pointer"
              >
                Replay Welcome Animation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
