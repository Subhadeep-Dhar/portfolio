'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      ro.observe(document.body);
      
      const timeout = setTimeout(() => ScrollTrigger.refresh(), 1000);
      
      return () => {
        ro.disconnect();
        clearTimeout(timeout);
      };
    }
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // OVERLAP FIX:
    // By starting ALL layers exactly at yPercent: 0, they are flawlessly aligned at the start.
    // Because they all move downwards (Layer 1 moves down the most), the background layer 
    // sinks behind the foreground layers as you scroll, guaranteeing its base is NEVER exposed!
    // We scale the ratios (70:55:10) to a max of 30% movement to prevent massive side-cropping.
    tl.fromTo('[data-parallax-layer="1"]', { yPercent: 0 }, { yPercent: 30, ease: "none" }, 0)
      .fromTo('[data-parallax-layer="2"]', { yPercent: 0 }, { yPercent: 23.5, ease: "none" }, 0)
      .fromTo('[data-parallax-layer="4"]', { yPercent: 0 }, { yPercent: 4.3, ease: "none" }, 0);
      
  }, { scope: parallaxRef });

  return (
    <div className="parallax w-full relative" ref={parallaxRef}>
      {/* Reduced height to 100vh to eliminate aggressive horizontal zoom so the person is visible */}
      <section className="relative w-full overflow-hidden parallax__header" style={{ height: '100vh' }}>
        <div className="absolute inset-0 parallax__visuals">
          <div className="absolute top-0 left-0 w-full h-2 bg-black z-50 parallax__black-line-overflow"></div>
          
          <div className="absolute inset-0 w-full h-full parallax__layers">
            {/* 
              All layers use exactly -30% top and 130% height. 
              This perfectly covers the 30% downward GSAP translation without leaving gaps,
              and aligns all their bottom edges at exactly 100% at the start of the scroll!
            */}
            
            <div data-parallax-layer="1" className="absolute inset-0 w-full h-full z-0">
              <img 
                src="/images/parallax/layer-1-base-no-person.svg" 
                loading="eager" alt="Base Layer" 
                className="absolute left-0 w-full object-cover parallax__layer-img" 
                style={{ top: '-30%', height: '130%' }}
              />
            </div>
            
            <div data-parallax-layer="2" className="absolute inset-0 w-full h-full z-10">
              <img 
                src="/images/parallax/layer-2-kanchenjunga-transparent.svg" 
                loading="eager" alt="Kanchenjunga Mountain" 
                className="absolute left-0 w-full object-cover parallax__layer-img" 
                style={{ top: '-30%', height: '130%' }}
              />
            </div>
            
            <div data-parallax-layer="4" className="absolute inset-0 w-full h-full z-30">
              <img 
                src="/images/parallax/layer-3-person-foreground-transparent1.svg" 
                loading="eager" alt="Foreground Clouds" 
                className="absolute left-0 w-full object-cover parallax__layer-img" 
                style={{ top: '-30%', height: '130%' }}
              />
            </div>
            
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-40 pointer-events-none parallax__fade"></div>
        </div>
      </section>
    </div>
  );
}
