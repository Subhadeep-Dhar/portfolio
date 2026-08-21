'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { useGestures } from '@/hooks/useGestures';
const unifiedLinks = [
  { label: 'Profile', href: '#profile' },
  { label: 'Software', href: '#ecosystem-section' },
  { label: 'Research', href: '#research-section' },
  { label: 'Experience', href: '#evolution' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
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
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500"
    >
      <div 
        className={`pointer-events-auto flex items-center justify-between px-6 md:px-8 h-14 md:h-16 rounded-full transition-all duration-500 border overflow-hidden relative shadow-2xl ${
          scrolled 
            ? 'w-[90%] max-w-5xl bg-neutral-900/60 backdrop-blur-xl border-white/10 shadow-black/50' 
            : 'w-[95%] max-w-7xl bg-transparent border-transparent shadow-transparent'
        }`}
      >
        <div className="flex w-full items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={handleBrandClick}
              className="font-body text-xl md:text-2xl text-[var(--active-accent)] hover:text-gray-100 transition-colors tracking-normal font-semibold"
            >
              Subhadeep Dhar
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-7">
            {unifiedLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-[15px] md:text-lg text-gray-300 hover:text-white transition-colors tracking-wide font-medium"
                >
                  {link.label}
                </a>
              ))}
              {siteConfig.links.resume && (
                <a
                  href={siteConfig.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm md:text-base bg-white text-black px-6 py-2.5 rounded-full hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Resume
                </a>
              )}
          </nav>

          <button
            className="md:hidden font-body text-[var(--active-accent)] text-sm focus:outline-none font-medium"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute top-20 left-1/2 w-[90%] max-w-sm bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-40 overflow-hidden md:hidden pointer-events-auto"
          >
            <div className="p-6 flex flex-col gap-4">
              {unifiedLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setMenuOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className="font-body text-base text-gray-300 hover:text-white transition-colors tracking-wide font-medium border-b border-white/5 pb-2 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              {siteConfig.links.resume && (
                <a
                  href={siteConfig.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body mt-2 text-sm bg-white text-black py-2.5 rounded-full text-center font-semibold hover:bg-gray-200 transition-colors"
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
