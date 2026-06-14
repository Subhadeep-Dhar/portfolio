'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SLIDES_DATA = [
  {
    num: '01',
    title: 'Curiosity & Observation',
    subtitle: 'Fieldwork & Geospatial Sensing',
    desc: 'Standing at the boundary where physical geography meets systemic data. Observing glacier flow rates in high-altitude catchments, precipitation spikes, and vegetation indices. Curiosity begins by inspecting anomalies on the terrain.',
    details: 'Location: South Lhonak Glacier, Sikkim'
  },
  {
    num: '02',
    title: 'Hypotheses & Analysis',
    subtitle: 'Data Synthesis & Spatial Analysis',
    desc: 'Formulating parameters to test environmental dynamics. We process multi-spectral Landsat tiles in Google Earth Engine and apply K-Means velocity classifications to filter spatial noise and extract the primary signal.',
    details: 'Methodology: Landsat 8 Composites & NDVI temporal regressions'
  },
  {
    num: '03',
    title: 'Building Solutions',
    subtitle: 'Software Architecture & Implementation',
    desc: 'Translating verified models into high-fidelity code. Deploying geofenced routine challenges, database caching, and custom Express frameworks. The engineering loop closes when data transforms into active software.',
    details: 'Location: Manipal, Karnataka'
  }
];

export default function ExperienceLayer() {
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Vertical scroll to horizontal translate transform (with 10% padding at start/end)
  const xTranslate = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '-66.6%']);
  
  // Parallax elements translations
  const labelX = useTransform(scrollYProgress, [0.1, 0.9], ['0px', '-100px']);

  // Unconditional hook for scrollbar progress
  const progressWidth = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDesktop = windowWidth >= 768;

  if (!isDesktop) {
    // Graceful mobile fallback: elegant vertical stacked scroll blocks
    return (
      <div className="py-20 bg-transparent space-y-16 px-6 relative z-20">
        <div className="flex flex-col gap-1 mb-8">
          <span className="mono-label text-xs text-gray-500">EXPERIENCE LAYER</span>
          <h3 className="text-2xl font-light text-gray-100 tracking-tight">Immersive Storytelling</h3>
        </div>
        
        {SLIDES_DATA.map((slide) => (
          <div 
            key={slide.num}
            className="p-6 border border-neutral-900 bg-[#1a211d]/10 rounded space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-950 pb-2">
              <span className="text-4xl font-extrabold font-mono-tech opacity-15 text-neutral-400">
                {slide.num}
              </span>
              <span className="font-mono-tech text-xs text-neutral-600 uppercase tracking-widest">
                {slide.subtitle}
              </span>
            </div>
            <h4 className="text-xl font-light text-neutral-200 tracking-tight">{slide.title}</h4>
            <p className="text-sm leading-relaxed text-neutral-450 font-light">{slide.desc}</p>
            <span className="font-mono-tech text-xs text-[var(--active-accent)]/80 block pt-2">{slide.details}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[550vh] w-full bg-transparent select-none z-20">
      {/* Sticky Scroll Lock Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-transparent">
        
        {/* Parallax layer: large monospaced label in background */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-[0.02] z-0 flex flex-col justify-between p-16 font-mono-tech"
          style={{ x: labelX }}
        >
          <div className="text-[120px] font-extrabold leading-none">OBSERVE</div>
          <div className="text-[120px] font-extrabold leading-none self-center">ANALYZE</div>
          <div className="text-[120px] font-extrabold leading-none self-end">BUILD</div>
        </motion.div>

        {/* Horizontal Track */}
        <motion.div
          className="horizontal-scroll-container w-[300vw] h-full items-center relative z-10"
          style={{ x: xTranslate }}
        >
          {SLIDES_DATA.map((slide) => (
            <div 
              key={slide.num}
              className="w-screen h-full flex items-center justify-center px-16 sm:px-24 md:px-32"
            >
              <div className="max-w-4xl w-full grid md:grid-cols-12 gap-12 items-center">
                {/* Left Numbering Indicator */}
                <div className="md:col-span-4 flex flex-col items-start md:items-end md:text-right">
                  <span className="text-7xl sm:text-9xl font-extrabold font-mono-tech opacity-10 text-neutral-450">
                    {slide.num}
                  </span>
                  <span className="font-mono-tech text-xs text-gray-500 tracking-[0.25em] mt-3">
                    {slide.subtitle}
                  </span>
                </div>

                {/* Right Description content */}
                <div className="md:col-span-8 space-y-4 border-l border-neutral-900/60 pl-8">
                  <h3 className="text-2xl sm:text-3xl font-light text-neutral-100 tracking-tight">
                    {slide.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-450 leading-relaxed font-light max-w-xl">
                    {slide.desc}
                  </p>
                  
                  <div className="pt-4 flex items-center gap-2 text-xs font-mono-tech text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--active-accent)]/80" />
                    <span>{slide.details}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Progress line */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          <span className="font-mono-tech text-xs text-gray-650">01 — Start</span>
          <div className="w-40 h-px bg-neutral-900 relative">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-[var(--active-accent)]/60" 
              style={{
                width: progressWidth
              }}
            />
          </div>
          <span className="font-mono-tech text-xs text-gray-650">03 — Merge</span>
        </div>
      </div>
    </div>
  );
}
