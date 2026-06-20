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
      // Use browser history to navigate back so gestures/buttons work
      if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
        window.history.back();
      } else if (onExitMode) {
        onExitMode();
      }
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
          {/* Logo / Brand Name Trigger (Reset Path) */}
          <div className="flex items-center gap-3">
            {mode !== 'home' && (
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
                    window.history.back();
                  } else if (onExitMode) {
                    onExitMode();
                  }
                }}
                aria-label="Go back"
                className="text-gray-300 hover:text-[var(--active-accent)] transition-colors"
              >
                ←
              </button>
            )}

            <a
              href="#"
              onClick={handleBrandClick}
              className="font-body text-base text-[var(--active-accent)] hover:text-gray-100 transition-colors tracking-normal font-semibold"
            >
              Subhadeep Dhar
            </a>
          </div>

          {/* Dynamic Path Navigation */}
          {mode !== 'home' && (
            <nav className="hidden md:flex items-center gap-6">
              {currentLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-[14px] text-gray-300 hover:text-[var(--active-accent)] transition-colors tracking-normal font-medium"
                >
                  {link.label}
                </a>
              ))}
              {siteConfig.links.resume && (
                <a
                  href={siteConfig.links.resume}
                  download
                  className="font-body text-xs border border-[var(--active-accent)]/30 text-[var(--active-accent)] px-3 py-1 rounded hover:bg-[var(--active-accent)]/10 transition-all duration-200 tracking-normal font-medium"
                >
                  Resume
                </a>
              )}
            </nav>
          )}

          {/* Mobile menu trigger */}
          {mode !== 'home' && (
            <button
              className="md:hidden font-body text-[var(--active-accent)] text-sm focus:outline-none font-medium"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? 'Close' : 'Menu'}
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
                  className="font-body text-sm text-gray-400 hover:text-[var(--active-accent)] transition-colors tracking-normal font-medium"
                >
                  {link.label}
                </a>
              ))}
              {siteConfig.links.resume && (
                <a
                  href={siteConfig.links.resume}
                  download
                  className="font-body text-sm border border-[var(--active-accent)]/50 text-[var(--active-accent)] py-2 rounded text-center font-medium"
                >
                  Download Resume
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
