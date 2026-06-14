'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor({ mode = 'home' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics config for lag ring
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on fine pointer hover devices (desktops)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      
      // Auto-detect hover on links/buttons
      const target = e.target;
      const hoverable = target.closest('a, button, [role="button"], .interactive-node, button *');
      setIsHovered(!!hoverable);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Determine cursor color based on focus mode
  let activeColor = 'rgba(163, 163, 163, '; // default neutral gray
  if (mode === 'developer') {
    activeColor = 'rgba(155, 107, 78, '; // burnished copper
  } else if (mode === 'researcher') {
    activeColor = 'rgba(111, 129, 103, '; // terrain green
  }

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: '#ffffff',
        }}
      />
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 border"
        animate={{
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? activeColor + '0.8)' : activeColor + '0.35)',
          backgroundColor: isHovered ? activeColor + '0.04)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-12px',
          translateY: '-12px',
        }}
      />
    </>
  );
}
