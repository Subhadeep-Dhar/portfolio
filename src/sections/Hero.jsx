'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

const GREETINGS = [
  { text: 'Welcome', lang: 'en' },
  { text: 'নমস্কার', lang: 'bn' },
  { text: 'नमस्ते', lang: 'hi' },
  { text: 'Bonjour', lang: 'fr' },
  { text: 'Hola', lang: 'es' },
  { text: 'こんにちは', lang: 'ja' },
  { text: 'Hallo', lang: 'de' },
  { text: '안녕하세요', lang: 'ko' },
  { text: 'Ciao', lang: 'it' },
  { text: 'مرحبا', lang: 'ar' },
  { text: 'Olá', lang: 'pt' },
  { text: 'Привет', lang: 'ru' },
  { text: 'สวัสดี', lang: 'th' },
  { text: 'Merhaba', lang: 'tr' },
  { text: 'Xin chào', lang: 'vi' },
];

export default function Hero({ onFocusChange }) {
  const [greetingIdx, setGreetingIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIdx((prev) => (prev + 1) % GREETINGS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (focusType, elementId) => {
    if (onFocusChange) {
      onFocusChange(focusType);
    }
    // Set active class on body for color propagation
    const body = document.querySelector('body');
    if (body) {
      body.className = `theme-${focusType}`;
    }

    // Push a history entry so the browser back gesture will return to the landing page
    if (typeof window !== 'undefined' && window.history && window.history.pushState) {
      try {
        window.history.pushState({ experience: focusType }, '', `#${elementId}`);
      } catch (err) {
        // ignore
      }
    }

    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 select-none">
      <div className="section-container w-full max-w-3xl mx-auto text-center z-10 space-y-10">
        {/* Multilingual cycling greeting */}
        <div className="h-6 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={greetingIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="font-mono-tech text-xs uppercase tracking-[0.3em] text-[var(--active-accent)]/80 font-medium inline-block"
            >
              {GREETINGS[greetingIdx].text}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Main headline and name */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-100 leading-tight">
            {siteConfig.name}
          </h1>
          <p className="text-sm sm:text-base font-mono-tech text-gray-400 tracking-wider max-w-lg mx-auto leading-relaxed">
            {siteConfig.headline}
          </p>
        </div>

        {/* Professional Entry Invitations */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-8">
          <button
            onClick={() => handleLinkClick('developer', 'ecosystem-section')}
            className="group flex flex-col items-center bg-transparent border-0 focus:outline-none"
          >
            <span className="font-mono-tech text-xs sm:text-sm tracking-[0.2em] text-gray-400 group-hover:text-[#9B6B4E] transition-colors uppercase border-b border-transparent group-hover:border-[#9B6B4E] pb-1 duration-200">
              Software Development
            </span>
          </button>

          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-800" />

          <button
            onClick={() => handleLinkClick('researcher', 'research-section')}
            className="group flex flex-col items-center bg-transparent border-0 focus:outline-none"
          >
            <span className="font-mono-tech text-xs sm:text-sm tracking-[0.2em] text-gray-400 group-hover:text-[#6F8167] transition-colors uppercase border-b border-transparent group-hover:border-[#6F8167] pb-1 duration-200">
              Research & Analysis
            </span>
          </button>
        </div>

        {/* Ambient status indicator */}
          <div className="pt-8 flex justify-center">
          {siteConfig.available && (
            <div className="flex items-center px-3 py-1 rounded border border-gray-900/60 bg-gray-950/10">
              <span className="font-mono-tech text-xs text-gray-500 tracking-wider uppercase">
                {siteConfig.location}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
