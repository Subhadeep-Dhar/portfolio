'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

const GREETINGS = [
  'Hello',
  'Namaste',
  'Nomoskar',
  'Bonjour',
  'Hola',
  'こんにちは',
  'Welcome'
];

export default function Hero({ onFocusChange }) {
  const [greetIndex, setGreetIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetIndex((prev) => (prev + 1) % GREETINGS.length);
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

    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 select-none">
      {/* Visual coordinates tracking in background */}
      <div className="absolute top-24 left-8 font-mono-tech text-[9px] text-gray-700 tracking-[0.2em] hidden sm:block">
        SYS_ANCHOR // 13.3444° N, 74.7944° E
      </div>
      <div className="absolute bottom-24 right-8 font-mono-tech text-[9px] text-gray-700 tracking-[0.2em] hidden sm:block">
        ALT_ANCHOR // 27.7800° N, 88.6300° E
      </div>

      <div className="section-container w-full max-w-3xl mx-auto text-center z-10 space-y-10">
        {/* Multilingual greeting */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={greetIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-teal-500/70"
            >
              {GREETINGS[greetIndex]} // STREAM
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Main headline and name */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-100 leading-tight">
            {siteConfig.name}
          </h1>
          <p className="text-xs sm:text-sm font-mono-tech text-gray-400 tracking-wider max-w-lg mx-auto leading-relaxed">
            {siteConfig.headline}
          </p>
        </div>

        {/* Immersive Entry Invitations (Coordinates Typographical Links) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-8">
          <button
            onClick={() => handleLinkClick('developer', 'ecosystem-section')}
            className="group flex flex-col items-center bg-transparent border-0 focus:outline-none"
          >
            <span className="font-mono-tech text-[11px] tracking-[0.25em] text-gray-400 group-hover:text-teal-400 transition-colors uppercase">
              [ 13.34° N // Explore My Systems ]
            </span>
            <span className="font-mono-tech text-[8px] text-gray-650 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
              BUILDER MODE ACTIVE ON SELECTION
            </span>
          </button>

          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-800" />

          <button
            onClick={() => handleLinkClick('researcher', 'research-section')}
            className="group flex flex-col items-center bg-transparent border-0 focus:outline-none"
          >
            <span className="font-mono-tech text-[11px] tracking-[0.25em] text-gray-400 group-hover:text-lime-500 transition-colors uppercase">
              [ 27.78° N // Enter Research Space ]
            </span>
            <span className="font-mono-tech text-[8px] text-gray-650 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
              SPATIAL MODE ACTIVE ON SELECTION
            </span>
          </button>
        </div>

        {/* Ambient status indicator */}
        <div className="pt-8 flex justify-center">
          {siteConfig.available && (
            <div className="flex items-center gap-2 px-3 py-1 rounded border border-gray-900/60 bg-gray-950/10">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-ping" />
              <span className="font-mono-tech text-[9px] text-gray-500 tracking-wider uppercase">
                Systems online · {siteConfig.location}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
