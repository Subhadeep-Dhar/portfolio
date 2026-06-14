'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

const devLinks = [
  { label: 'Profile',    href: '#profile' },
  { label: 'Systems',   href: '#ecosystem-section' },
  { label: 'Evolution', href: '#evolution' },
  { label: 'Contact',   href: '#contact' },
];

const resLinks = [
  { label: 'Profile',    href: '#profile' },
  { label: 'Research',  href: '#research-section' },
  { label: 'Evolution', href: '#evolution' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar({ mode = 'home', onExitMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBrandClick = (e) => {
    if (mode !== 'home') {
      e.preventDefault();
      onExitMode();
    }
  };

  const currentLinks = mode === 'developer' ? devLinks : mode === 'researcher' ? resLinks : [];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-gray-950' : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Reset Path Action */}
          <a
            href="#"
            onClick={handleBrandClick}
            className="font-mono-tech text-xs text-[var(--active-accent)] hover:text-gray-100 transition-colors uppercase tracking-[0.2em] font-semibold"
          >
            {mode === 'home' ? (
              <>
                {siteConfig.handle}
                <span className="animate-pulse">_</span>
              </>
            ) : (
              '← Return to Origin'
            )}
          </a>

          {/* Dynamic Path Navigation */}
          {mode !== 'home' && (
            <nav className="hidden md:flex items-center gap-6">
              {currentLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono-tech text-xs text-gray-400 hover:text-[var(--active-accent)] transition-colors tracking-widest uppercase"
                >
                  {link.label}
                </a>
              ))}
              {siteConfig.links.resume && (
                <a
                  href={siteConfig.links.resume}
                  download
                  className="font-mono-tech text-xs border border-[var(--active-accent)]/30 text-[var(--active-accent)] px-3 py-1 rounded hover:bg-[var(--active-accent)]/10 transition-all duration-200"
                >
                  RESUME
                </a>
              )}
            </nav>
          )}

          {/* Mobile menu trigger */}
          {mode !== 'home' && (
            <button
              className="md:hidden font-mono-tech text-[var(--active-accent)] text-sm focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? '[ CLOSE ]' : '[ MENU ]'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile navigation panel */}
      <AnimatePresence>
        {menuOpen && mode !== 'home' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0c0e14] border-t border-gray-950"
          >
            <div className="section-container py-6 flex flex-col gap-4">
              {currentLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono-tech text-sm text-gray-400 hover:text-[var(--active-accent)] transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
              {siteConfig.links.resume && (
                <a
                  href={siteConfig.links.resume}
                  download
                  className="font-mono-tech text-sm border border-[var(--active-accent)]/50 text-[var(--active-accent)] py-2 rounded text-center"
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
