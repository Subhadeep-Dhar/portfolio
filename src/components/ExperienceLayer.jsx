'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SLIDES_DATA = [
  {
    num: '01',
    title: 'Fieldwork',
    subtitle: 'Research & site context',
    desc: 'I begin with the setting: terrain, conditions, and the questions that matter on the ground before making any assumptions.',
    details: 'South Lhonak Glacier, Sikkim'
  },
  {
    num: '02',
    title: 'Reviewing the data',
    subtitle: 'Analysis & interpretation',
    desc: 'I work through the material carefully, checking patterns, comparing observations, and keeping the conclusions grounded in evidence.',
    details: 'Landsat composites and NDVI-based review'
  },
  {
    num: '03',
    title: 'Implementation',
    subtitle: 'Building the product',
    desc: 'Once the approach is clear, I move into the build: interfaces, systems, and the details that make the work usable.',
    details: 'Manipal, Karnataka'
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

  const numSlides = SLIDES_DATA.length;
  const trackWidth = numSlides * 100; // in vw
  const sectionHeight = (numSlides + 3) * 100; // fewer extra viewports for tighter control
  const totalOffset = (numSlides - 1) * 100;
  const scrollFinish = 0.62;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Horizontal translate: delay start to 30%, move across track fully by 72%, then hold until 95%.
  const xTranslate = useTransform(
    scrollYProgress,
    [0.3, scrollFinish, 0.95],
    ['0vw', `-${totalOffset}vw`, `-${totalOffset}vw`]
  );
  
  // Parallax elements translations
  const labelX = useTransform(scrollYProgress, [0.0, 1.0], ['0px', '-100px']);

  // Scrollbar progress indicator stays full after the motion completes.
  const progressWidth = useTransform(scrollYProgress, [0.3, scrollFinish, 0.95], ['0%', '100%', '100%']);

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
    <div ref={containerRef} style={{ height: `${sectionHeight}vh` }} className="relative w-full bg-transparent select-none z-20">
      {/* Sticky Scroll Lock Window — stays pinned for the full horizontal section scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-transparent">
        
        {/* Parallax layer: large monospaced label in background */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-[0.02] z-0 flex flex-col justify-between p-16 font-mono-tech"
          style={{ x: labelX }}
        >
          <div className="text-[120px] font-extrabold leading-none">FIELDWORK</div>
          <div className="text-[120px] font-extrabold leading-none self-center">REVIEW</div>
          <div className="text-[120px] font-extrabold leading-none self-end">BUILD</div>
        </motion.div>

        {/* Horizontal Track — full width scales with slide count */}
        <motion.div
          className="horizontal-scroll-container h-full items-center relative z-10"
          style={{ x: xTranslate, width: `${trackWidth}vw` }}
        >
          {SLIDES_DATA.map((slide) => (
            <div 
              key={slide.num}
              className="w-screen box-border flex-shrink-0 h-full flex items-center justify-center px-16 sm:px-24 md:px-32"
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
                  
                  <div className="pt-4 text-xs font-mono-tech text-gray-500">
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
