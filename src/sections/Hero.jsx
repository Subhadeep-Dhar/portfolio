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
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Visual coordinates tracking in background */}
      <div className="absolute top-24 left-8 font-mono-tech text-[10px] text-gray-700 tracking-wider hidden sm:block">
        SYS_LOC: Manipal, IN // 13.3444° N, 74.7944° E
      </div>
      <div className="absolute bottom-24 right-8 font-mono-tech text-[10px] text-gray-700 tracking-wider hidden sm:block">
        ALT_LOC: Sikkim, IN // 27.7800° N, 88.6300° E
      </div>

      <div className="section-container w-full max-w-4xl mx-auto text-center z-10 space-y-12">
        {/* Multilingual greeting */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={greetIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="font-mono-tech text-xs uppercase tracking-[0.2em] text-teal-400 font-medium"
            >
              {GREETINGS[greetIndex]} // WELCOME_STREAM
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Main headline and name */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-100 leading-tight">
            {siteConfig.name}
          </h1>
          <p className="text-sm sm:text-base font-mono-tech text-gray-400 tracking-wider max-w-xl mx-auto">
            {siteConfig.headline}
          </p>
        </div>

        {/* Cinematic Invitations (Explore Links) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 pt-8">
          <button
            onClick={() => handleLinkClick('developer', 'ecosystem-section')}
            className="group flex flex-col items-center focus:outline-none"
          >
            <span className="cinematic-link text-xs tracking-[0.2em] font-medium text-gray-400 group-hover:text-teal-400">
              Explore My Systems
            </span>
            <span className="font-mono-tech text-[9px] text-gray-650 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
              BUILDER // DEV_MODE
            </span>
          </button>

          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-gray-800" />

          <button
            onClick={() => handleLinkClick('researcher', 'research-section')}
            className="group flex flex-col items-center focus:outline-none"
          >
            <span className="cinematic-link text-xs tracking-[0.2em] font-medium text-gray-400 group-hover:text-lime-500">
              Enter Research Space
            </span>
            <span className="font-mono-tech text-[9px] text-gray-650 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
              ANALYST // GIS_MODE
            </span>
          </button>
        </div>

        {/* Ambient status indicator */}
        <div className="pt-12 flex justify-center">
          {siteConfig.available && (
            <div className="flex items-center gap-2 px-3 py-1 rounded border border-gray-900 bg-gray-950/20">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono-tech text-[10px] text-gray-500 tracking-wider">
                CORE SYSTEM ONLINE · LOC: {siteConfig.location}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
