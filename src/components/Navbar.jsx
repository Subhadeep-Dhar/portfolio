'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { useGestures } from '@/hooks/useGestures';

const devLinks = [
  { label: 'Profile',    href: '#profile' },
  { label: 'Projects',   href: '#ecosystem-section' },
  { label: 'Evolution', href: '#evolution' },
  { label: 'Contact',   href: '#contact' },
];

const resLinks = [
  { label: 'Profile',    href: '#profile' },
  { label: 'Projects',  href: '#research-section' },
  { label: 'Evolution', href: '#evolution' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar({ mode = 'home', onExitMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [gesturesEnabled, setGesturesEnabled] = useState(false);

  const handleGestureAction = (action) => {
    switch (action) {
      case 'SCROLL_UP':
        window.scrollBy({ top: -400, behavior: 'smooth' });
        break;
      case 'SCROLL_DOWN':
        window.scrollBy({ top: 400, behavior: 'smooth' });
        break;
      case 'NEXT_SECTION':
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        break;
      case 'PREV_SECTION':
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        break;
      case 'SHOW_RESUME':
        if (siteConfig.links.resume) {
          window.open(siteConfig.links.resume, '_blank', 'noopener,noreferrer');
        }
        break;
      default:
        break;
    }
  };

  const { isReady } = useGestures(gesturesEnabled, handleGestureAction);

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

  const handleNavClick = (e, href) => {
    if (mode !== 'home') {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.hash = href;
      }
    }
  };

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
              {/*
              <button
                onClick={() => setGesturesEnabled(!gesturesEnabled)}
                title={gesturesEnabled ? "Disable Gestures" : "Enable Gestures"}
                className={`font-body text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
                  gesturesEnabled ? 'bg-[var(--active-accent)] text-[#07090e]' : 'text-gray-400 hover:text-[var(--active-accent)] border border-gray-700/50'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
                  <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
                  <path d="M10 10.5V5a2 2 0 0 0-2-2a2 2 0 0 0-2 2v4" />
                  <path d="M6 14v-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8a6 6 0 0 0 6 6h1a8 8 0 0 0 8-8v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v3" />
                </svg>
                {gesturesEnabled ? (isReady ? 'Gestures ON' : 'Loading...') : 'Gestures OFF'}
              </button>
              */}
              {currentLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-[14px] text-gray-300 hover:text-[var(--active-accent)] transition-colors tracking-normal font-medium"
                >
                  {link.label}
                </a>
              ))}
              {siteConfig.links.resume && (
                <a
                  href={siteConfig.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  onClick={(e) => {
                    setMenuOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className="font-body text-sm text-gray-400 hover:text-[var(--active-accent)] transition-colors tracking-normal font-medium"
                >
                  {link.label}
                </a>
              ))}
              {siteConfig.links.resume && (
                <a
                  href={siteConfig.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm border border-[var(--active-accent)]/50 text-[var(--active-accent)] py-2 rounded text-center font-medium"
                >
                  View Resume
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
