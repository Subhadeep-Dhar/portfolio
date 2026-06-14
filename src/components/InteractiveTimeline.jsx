'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TIMELINE_DATA = [
  {
    year: '2022',
    type: 'EDU',
    title: 'Bachelor of Computer Applications',
    desc: 'Graduated with distinction from Sikkim Manipal Institute of Technology. Researched network parameters, compiled relational databases, and built local algorithms.',
    coords: '27.7800° N, 88.6300° E',
    location: 'Sikkim, India'
  },
  {
    year: '2024',
    type: 'WORK',
    title: 'SH1ELD Tech — InfoSec Intern',
    desc: 'Joined SH1ELD Tech Sikkim. Conducted system log audits, analyzed vulnerability metrics, and mapped early local security configurations.',
    coords: '27.7800° N, 88.6300° E',
    location: 'Gangtok, Sikkim'
  },
  {
    year: '2024',
    type: 'GIS',
    title: 'South Lhonak Glacier Health',
    desc: 'Assessed glacier velocity post-flood disaster. Processed remote sensing imagery in SNAP and Google Earth Engine, classifying anomalies via K-Means.',
    coords: '27.7800° N, 88.6300° E',
    location: 'Lhonak Lake, Sikkim'
  },
  {
    year: '2024',
    type: 'RSCH',
    title: 'ADRI — Research Intern',
    desc: 'Contributed to regional health surveillance mapping (IHIP-IDSP Bihar project). Modeled spatial trends to optimize department reporting indices.',
    coords: '25.5948° N, 85.1376° E',
    location: 'ADRI Department'
  },
  {
    year: '2024',
    type: 'WORK',
    title: 'SH1ELD Tech — Web Developer',
    desc: 'Built tailored tourism portals and local data workflows for regional agencies. Integrated API routes and optimized database access pipelines.',
    coords: '27.7800° N, 88.6300° E',
    location: 'Gangtok, Sikkim'
  },
  {
    year: '2025',
    type: 'EDU',
    title: 'Master of Computer Applications',
    desc: 'Began postgraduate studies at Manipal Institute of Technology. Focus on location analytics, systems caching, and responsive product structures.',
    coords: '13.3444° N, 74.7944° E',
    location: 'Manipal Campus, Karnataka'
  },
  {
    year: '2026',
    type: 'SYS',
    title: 'Grounded App & Location Systems',
    desc: 'Built a consistency challenge application utilizing geofencing trackers and weather indicators to audit user accountability.',
    coords: '13.3444° N, 74.7944° E',
    location: 'Manipal Campus, Karnataka'
  }
];

export default function InteractiveTimeline() {
  const scrollContainerRef = useRef(null);
  const coordsRef = useRef(null);
  const locationRef = useRef(null);
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
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Translate vertical scroll to horizontal shift of items
  const xTranslation = useTransform(scrollYProgress, [0, 1], ['0%', '-76%']);

  // Map progress to coordinate indexes for DOM updates
  const progressIndex = useTransform(scrollYProgress, [0, 0.6, 0.78, 1], [0, 1, 2, 3]);

  useEffect(() => {
    if (windowWidth < 768) return; // Disable DOM updates on mobile

    return progressIndex.onChange((latest) => {
      if (!coordsRef.current || !locationRef.current) return;
      
      if (latest < 1.4) {
        coordsRef.current.innerText = '27.7800° N, 88.6300° E';
        locationRef.current.innerText = 'Gangtok, Sikkim';
      } else if (latest < 2.5) {
        coordsRef.current.innerText = '25.5948° N, 85.1376° E';
        locationRef.current.innerText = 'ADRI Department';
      } else {
        coordsRef.current.innerText = '13.3444° N, 74.7944° E';
        locationRef.current.innerText = 'Manipal Campus, Karnataka';
      }
    });
  }, [progressIndex, windowWidth]);

  const isDesktop = windowWidth >= 768;

  if (!isDesktop) {
    // Mobile fallback: clean vertical stack
    return (
      <div className="py-20 px-6 bg-transparent space-y-12 relative z-20">
        <div className="flex flex-col gap-1 mb-8">
          <span className="mono-label text-xs text-gray-500">EVOLUTION LOG</span>
          <h3 className="text-2xl font-light text-gray-100 tracking-tight">How I Got Here</h3>
        </div>

        <div className="space-y-6">
          {TIMELINE_DATA.map((item, index) => (
            <div
              key={index}
              className="p-5 border border-neutral-900 bg-[#1a211d]/10 rounded space-y-3"
            >
              <div className="flex items-center justify-between border-b border-gray-950 pb-2">
                <span className="font-mono-tech text-xs text-neutral-500">{item.year}</span>
                <span className="font-mono-tech text-xs text-[var(--active-accent)] border border-[var(--active-accent)]/30 bg-[var(--active-accent)]/5 px-1.5 py-0.5 rounded">
                  {item.type}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-neutral-200">{item.title}</h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.desc}</p>
              <span className="font-mono-tech text-xs text-neutral-500 block">{item.coords} // {item.location}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollContainerRef} className="relative h-[350vh] w-full bg-transparent select-none z-20">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-transparent">
        
        {/* Horizontal scroll grid */}
        <div className="section-container w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Sticky Title + Coordinate updates */}
          <div className="lg:col-span-4 space-y-6 sticky left-0 z-20 bg-transparent pr-4">
            <div>
              <span className="mono-label block mb-2 text-[var(--active-accent)]">Evolution Log</span>
              <h2 className="text-3xl font-semibold text-neutral-100 tracking-tight">How I got here.</h2>
              <p className="text-sm text-neutral-450 mt-2 leading-relaxed">
                A horizontal ledger of academic steps, software builds, and location telemetry.
              </p>
            </div>

            {/* Static DOM coordinates indicator */}
            <div className="p-4 border border-neutral-900 bg-[#070b15]/60 backdrop-blur-md rounded space-y-2 max-w-xs">
              <span className="mono-label text-xs block text-neutral-500">GEODESIC LOCATOR</span>
              <div className="space-y-0.5 font-mono-tech text-neutral-300">
                <div ref={coordsRef} className="text-xs text-[var(--active-accent)] font-semibold uppercase">
                  27.7800° N, 88.6300° E
                </div>
                <div ref={locationRef} className="text-xs text-neutral-500 uppercase tracking-wider">
                  Sikkim Manipal Institute
                </div>
              </div>
              <div className="h-px bg-neutral-950 w-full pt-1" />
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--active-accent)]/80 animate-pulse" />
                <span className="text-[10px] font-mono-tech text-neutral-600">60FPS SPATIAL BIND</span>
              </div>
            </div>
          </div>

          {/* Right Column: Horizontal track */}
          <div className="lg:col-span-8 overflow-hidden h-[420px] flex items-center relative">
            <motion.div
              className="horizontal-scroll-container w-[350vw] gap-6 items-center"
              style={{ x: xTranslation }}
            >
              {TIMELINE_DATA.map((item, index) => (
                <div
                  key={index}
                  className="w-[300px] shrink-0 border border-neutral-900 bg-[#070b15]/20 p-6 rounded hover:border-neutral-800 transition-colors duration-300 space-y-4"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-gray-950 pb-2 text-xs font-mono-tech text-neutral-500">
                    <div className="flex items-center gap-2">
                      <span>{item.year}</span>
                      <span className="font-mono text-xs border border-neutral-850 text-neutral-450 px-1.5 py-0.2 rounded">
                        {item.type}
                      </span>
                    </div>
                    <span>LOG_{index + 1}</span>
                  </div>

                  <div className="space-y-2 h-36">
                    <h4 className="font-semibold text-sm text-neutral-200 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-950 flex gap-1 items-center font-mono-tech text-xs text-neutral-600">
                    <span>SYS_LOC:</span>
                    <span className="text-neutral-500">{item.coords}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
