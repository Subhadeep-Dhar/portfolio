'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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

export default function Hero() {
  const [greetingIdx, setGreetingIdx] = useState(0);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Animate the main massive title from bottom up with an elastic fade
    tl.fromTo(titleRef.current, 
      { y: 150, opacity: 0, rotationX: 45 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.5, ease: "power4.out", delay: 0.2 }
    );
    
    // Stagger in the subtitle
    tl.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=1"
    );
  }, { scope: heroRef });

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIdx((prev) => (prev + 1) % GREETINGS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById('profile');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex flex-col pt-32 pb-6 select-none overflow-hidden">
      
      {/* Top Spacer to balance the bottom indicators */}
      <div className="flex-none hidden md:block h-12"></div>

      {/* Main Content - Centered */}
      <div className="flex-grow flex items-center justify-center">
        <div className="section-container w-full mx-auto text-center z-10 space-y-12">
        {/* Multilingual cycling greeting */}
        <div className="h-6 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={greetingIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="font-mono-tech text-xs md:text-sm uppercase tracking-[0.4em] text-[var(--active-accent)]/80 font-medium inline-block"
            >
              {GREETINGS[greetingIdx].text}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Main massive headline and name */}
        <div className="space-y-8 [perspective:1000px]">
          <h1 ref={titleRef} className="text-super-hero font-light text-gray-100 will-change-transform">
            {siteConfig.name}
          </h1>
          <p ref={subtitleRef} className="text-lg md:text-2xl font-mono-tech text-gray-400 tracking-widest max-w-4xl mx-auto leading-relaxed mt-12 will-change-transform">
            {siteConfig.headline}
          </p>
        </div>

        </div>
      </div>

      {/* Bottom Indicators - Normal Document Flow at the bottom */}
      <div className="flex flex-col items-center gap-6 z-20 shrink-0 mt-12">
        <button
          onClick={handleScrollDown}
          className="group flex flex-col items-center bg-transparent border-0 focus:outline-none"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg className="w-6 h-6 text-gray-500 group-hover:text-[var(--active-accent)] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </motion.div>
        </button>

        {siteConfig.available && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-gray-900/60 bg-gray-950/10 mb-2">
            <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s-6-5.4-6-11a6 6 0 1 1 12 0c0 5.6-6 11-6 11Z" />
              <circle cx="12" cy="10" r="2.2" />
            </svg>
            <span className="font-mono-tech text-xs text-gray-500 tracking-wider uppercase">
              {siteConfig.location}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
