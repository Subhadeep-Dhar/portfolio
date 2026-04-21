'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

const navLinks = [
  { label: 'Profile',    href: '#profile' },
  { label: 'Skills',   href: '#arsenal' },
  { label: 'Projects',       href: '#lab' },
  { label: 'Evolution', href: '#evolution' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-lab-bg/90 backdrop-blur-md border-b border-lab-line' : ''
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo / name */}
          <a href="#" className="font-mono text-sm text-lab-cyan hover:opacity-80 transition-opacity">
            {siteConfig.handle}
            <span className="animate-flicker">_</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs text-lab-muted hover:text-lab-cyan transition-colors duration-200 tracking-widest uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.links.resume}
              className="font-mono text-xs border border-lab-cyan text-lab-cyan px-3 py-1.5 rounded hover:bg-lab-cyan hover:text-lab-bg transition-all duration-200"
            >
              RESUME
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden font-mono text-lab-cyan text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '≡'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-lab-surface border-t border-lab-line"
        >
          <div className="section-container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-sm text-lab-muted hover:text-lab-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.links.resume}
              className="font-mono text-sm border border-lab-cyan text-lab-cyan px-3 py-2 rounded text-center"
            >
              RESUME
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
