'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import BootLoader from '@/components/BootLoader';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import InteractiveBackground from '@/components/InteractiveBackground';

import Hero from '@/sections/Hero';
import About from '@/sections/About';
import DeveloperSection from '@/sections/DeveloperSection';
import ResearchSection from '@/sections/ResearchSection';
import ExperienceLayer from '@/components/ExperienceLayer';
import InteractiveTimeline from '@/components/InteractiveTimeline';
import UnifiedIdentity from '@/components/UnifiedIdentity';
import Contact from '@/sections/Contact';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [experienceMode, setExperienceMode] = useState('home');

  const handleExitMode = () => {
    setExperienceMode('home');
    const body = document.querySelector('body');
    if (body) {
      body.className = '';
    }
  };

  return (
    <div className={experienceMode === 'developer' ? 'theme-developer' : experienceMode === 'researcher' ? 'theme-researcher' : ''}>
      {/* 1. Custom boot loader */}
      <AnimatePresence>
        {loading && (
          <BootLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/* 2. Custom interactive lag-ring cursor */}
          <CustomCursor mode={experienceMode} />

          {/* 3. Immersive header, Return to Origin brand trigger */}
          <Navbar mode={experienceMode} onExitMode={handleExitMode} />

          {/* 4. Interactive canvas background shifts based on active mode */}
          <InteractiveBackground focus={experienceMode} />

          {/* 5. Experience flows */}
          <main className="relative z-10">
            <AnimatePresence mode="wait">
              {experienceMode === 'home' && (
                <motion.div
                  key="home-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Hero onFocusChange={setExperienceMode} />
                </motion.div>
              )}

              {experienceMode === 'developer' && (
                <motion.div
                  key="developer-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Developer About Mindset */}
                  <About />
                  
                  {/* SVG-linked tech ecosystem and specs */}
                  <DeveloperSection />

                  {/* Vertical scroll timeline log */}
                  <InteractiveTimeline mode="developer" />

                  {/* Narrative bridge block */}
                  <UnifiedIdentity />

                  {/* Contact beacon */}
                  <Contact />
                </motion.div>
              )}

              {experienceMode === 'researcher' && (
                <motion.div
                  key="researcher-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Research About Mindset */}
                  <About />

                  {/* Publications index and "How I Think" pipeline */}
                  <ResearchSection />

                  {/* Horizontal visual storytelling panels */}
                  <ExperienceLayer />

                  {/* Horizontal scroll timeline log */}
                  <InteractiveTimeline mode="researcher" />

                  {/* Narrative bridge block */}
                  <UnifiedIdentity />

                  {/* Contact beacon */}
                  <Contact />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </>
      )}
    </div>
  );
}
