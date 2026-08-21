'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteConfig } from '@/data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useGSAP(() => {
    // Parallax and fade for portrait
    gsap.fromTo(leftColRef.current,
      { opacity: 0, y: 100, scale: 0.95 },
      { 
        opacity: 1, y: 0, scale: 1, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 0.5,
        }
      }
    );

    // Staggered reveal for right column text elements
    gsap.fromTo(rightColRef.current.children,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0,
        duration: 1, 
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });
  const traits = [
    {
      label: 'Research',
      desc: 'I begin by understanding the problem clearly, the context around it, and the constraints that matter.'
    },
    {
      label: 'Building',
      desc: 'I prefer clear structures, careful decisions, and work that is straightforward to maintain over time.'
    },
    {
      label: 'Fieldwork',
      desc: 'I work comfortably across maps, data, and real-world conditions when a project needs that depth.'
    },
    {
      label: 'Delivery',
      desc: 'I focus on building things that are practical, well considered, and useful to the people using them.'
    }
  ];

  return (
    <section id="profile" ref={containerRef} className="py-32 md:py-48 relative z-20">
      <div className="section-container">
        {/* Separator line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-800 to-transparent mb-24 md:mb-32" />

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left Column: Portrait */}
          <div 
            ref={leftColRef}
            className="lg:col-span-5 relative aspect-[4/5] rounded bg-neutral-900 border border-neutral-800 overflow-hidden group will-change-transform"
          >
            {/* Portrait Placeholder */}
            <div className="absolute inset-0 bg-neutral-900/50 flex flex-col items-center justify-center text-neutral-600">
              <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-mono-tech text-xs uppercase tracking-widest">Portrait Placeholder</span>
              <span className="text-xs mt-2 opacity-50 font-light">Replace in /public/images/</span>
            </div>
            {/* Uncomment and use Next.js Image component when you have the portrait */}
            {/* <Image src="/images/portrait.jpg" alt="Subhadeep Dhar" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" /> */}
          </div>

          {/* Right Column: Narrative Bio */}
          <div 
            ref={rightColRef}
            className="lg:col-span-7 space-y-10"
          >
            <div>
              <span className="mono-label block mb-6 text-[var(--active-accent)]">ABOUT ME</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-100 tracking-tighter leading-tight">
                Working through problems with care and patience.
              </h2>
            </div>
            
            <div className="space-y-6 text-base md:text-lg lg:text-xl text-neutral-400 leading-relaxed font-light">
              {siteConfig.bio.map((paragraph, i) => (
                <p key={i}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-8">
              {traits.map((trait, idx) => (
                <div key={trait.label} className="border-l border-neutral-800 pl-4 py-1">
                  <h4 className="font-mono-tech text-[10px] sm:text-xs text-[var(--active-accent)] uppercase tracking-[0.2em] mb-2">
                    {trait.label}
                  </h4>
                  <p className="text-sm md:text-base leading-relaxed text-neutral-500 font-light">
                    {trait.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
