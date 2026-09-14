'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

import dynamic from 'next/dynamic';
import BootLoader from '@/components/BootLoader';
import SwarmCursor from '@/components/SwarmCursor';
import Navbar from '@/components/Navbar';
import MusicPlayer from '@/components/MusicPlayer';

const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { ssr: false });

import Hero from '@/sections/Hero';
import About from '@/sections/About';
import DeveloperSection from '@/sections/DeveloperSection';
import ResearchSection from '@/sections/ResearchSection';
import ExperienceLayer from '@/components/ExperienceLayer';
import InteractiveTimeline from '@/components/InteractiveTimeline';
import UnifiedIdentity from '@/components/UnifiedIdentity';
import ParallaxDemo from '@/demos/default';
import Contact from '@/sections/Contact';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

      // Synthesized zero-latency, zero-network click sound
  useEffect(() => {
    const handleInteraction = () => {
      if (!window.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        window.audioCtx = new AudioContext();
      }
      const ctx = window.audioCtx;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    };

    window.addEventListener('click', handleInteraction, { passive: true });
    return () => window.removeEventListener('click', handleInteraction);
  }, []);


  // Scroll background colors
  useGSAP(() => {
    if (loading) return;
    
    // Instead of scrub: true (which snaps during gaps between sections),
    // we use a 1-second smooth fade when sections enter the screen.
    const sections = [
      { id: '#ecosystem-section', color: '#0a192f' }, // deep slate blue
      { id: '#research-section', color: '#0f1715' }, // deep forest green
      { id: '#contact', color: '#07090b' }           // back to default
    ];

    sections.forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec.id,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => gsap.to(containerRef.current, { backgroundColor: sec.color, duration: 1, ease: "power2.out", overwrite: "auto" }),
        onEnterBack: () => gsap.to(containerRef.current, { backgroundColor: sec.color, duration: 1, ease: "power2.out", overwrite: "auto" }),
      });
    });

    // Return to default dark when scrolling back up past the first colored section
    ScrollTrigger.create({
      trigger: '#ecosystem-section',
      start: 'top center',
      onLeaveBack: () => gsap.to(containerRef.current, { backgroundColor: '#07090b', duration: 1, ease: "power2.out", overwrite: "auto" })
    });

  }, { dependencies: [loading], scope: containerRef });

  // Permanent fix for cached service workers causing static chunk 404s on reload
  useState(() => {
    if (typeof window !== 'undefined') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (let registration of registrations) {
            registration.unregister();
          }
        });
      }
      if ('caches' in window) {
        caches.keys().then((keys) => {
          keys.forEach((key) => caches.delete(key));
        });
      }
    }
  });

  return (
    <div ref={containerRef} className="theme-unified min-h-screen" style={{ backgroundColor: '#07090b' }}>
      
      {/* 1. Custom boot loader */}
      <AnimatePresence>
        {loading && (
          <BootLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/* 2. Swarm Cursor (React Bits) */}
          {/* CHANGE SWARMCURSOR COLORS HERE! */}
          <SwarmCursor 
            color="#e5b87d"
            accentColor="#dea791"
            className="fixed inset-0 z-30 pointer-events-none" 
            style={{ position: 'fixed' }}
            count={10}
            size={14}
            speed={2.5}
            spread={100}
            wander={0.2}
            trail={0}
            scatterOnClick
          />

          {/* Immersive header */}
          <Navbar />
          <MusicPlayer />

          {/* Three.js interactive background */}
          <ThreeBackground />

          {/* Main Content Flow */}
          <main className="relative z-10 flex flex-col items-center w-full">
            <Hero />
            <About />
            <DeveloperSection />
            <ResearchSection />
            <InteractiveTimeline mode="unified" />
            <UnifiedIdentity />
            <ParallaxDemo />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}
