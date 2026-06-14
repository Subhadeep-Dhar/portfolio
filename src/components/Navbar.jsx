'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

const navLinks = [
  { label: 'Profile',    href: '#profile' },
  { label: 'Systems',   href: '#ecosystem-section' },
  { label: 'Research',  href: '#research-section' },
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-305 ${
        scrolled ? 'bg-[#030712]/90 backdrop-blur-md border-b border-gray-950' : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Handle */}
          <a href="#" className="font-mono-tech text-xs text-teal-400 hover:text-gray-300 transition-colors uppercase tracking-widest">
            {siteConfig.handle}
            <span className="animate-pulse">_</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono-tech text-[10px] text-gray-400 hover:text-teal-400 transition-colors tracking-widest uppercase"
              >
                {link.label}
              </a>
            ))}
            {siteConfig.links.resume && (
              <a
                href={siteConfig.links.resume}
                download
                className="font-mono-tech text-[10px] border border-teal-900/50 text-teal-400 px-3 py-1 rounded hover:bg-teal-950/15 transition-all duration-200"
              >
                RESUME
              </a>
            )}
          </nav>

          {/* Mobile hamburger menu */}
          <button
            className="md:hidden font-mono-tech text-teal-400 text-base"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '[ CLOSE ]' : '[ MENU ]'}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#070b15] border-t border-gray-950"
          >
            <div className="section-container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono-tech text-xs text-gray-400 hover:text-teal-400 transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
              {siteConfig.links.resume && (
                <a
                  href={siteConfig.links.resume}
                  download
                  className="font-mono-tech text-xs border border-teal-900 text-teal-400 py-2 rounded text-center"
                >
                  DOWNLOAD RESUME
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
