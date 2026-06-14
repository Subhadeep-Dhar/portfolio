'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import BootLoader from '@/components/BootLoader';
import Navbar from '@/components/Navbar';
import InteractiveBackground from '@/components/InteractiveBackground';

import Hero from '@/sections/Hero';
import About from '@/sections/About';
import DeveloperSection from '@/sections/DeveloperSection';
import ResearchSection from '@/sections/ResearchSection';
import UnifiedIdentity from '@/components/UnifiedIdentity';
import InteractiveTimeline from '@/components/InteractiveTimeline';
import Contact from '@/sections/Contact';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [experienceFocus, setExperienceFocus] = useState('unified');

  return (
    <>
      {/* 1. Custom boot loader (run-once session check) */}
      <AnimatePresence>
        {loading && (
          <BootLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/* 2. Unified Header navigation */}
          <Navbar />

          {/* 3. Performance layered atmospheric background */}
          <InteractiveBackground focus={experienceFocus} />

          {/* 4. Core experiential content sections */}
          <main className="relative z-10">
            {/* Cinematic landing, updates focus state */}
            <Hero onFocusChange={setExperienceFocus} />

            {/* Mindset overview bio */}
            <About />

            {/* Developer technology grid & system specs */}
            <DeveloperSection />

            {/* Scientific assessments & How I think pipeline */}
            <ResearchSection />

            {/* Identity merge bridge */}
            <UnifiedIdentity />

            {/* Coordinate-driven scroll log */}
            <InteractiveTimeline />

            {/* Signal pulse contact & boot reset footer */}
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
