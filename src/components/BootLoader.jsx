'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LOGS = [
  { text: 'Initializing portfolio boot sequence...', delay: 100 },
  { text: 'System diagnostics: check package configurations... OK', delay: 400 },
  { text: 'Establishing environment anchors...', delay: 700 },
  { text: 'Anchor resolved: South Lhonak Lake, Sikkim [27.78° N, 88.63° E]', delay: 1000 },
  { text: 'Loading developer modules & compiler layers... OK', delay: 1300 },
  { text: 'Anchor resolved: MIT Campus, Manipal [13.34° N, 74.79° E]', delay: 1600 },
  { text: 'Calibrating GIS & Remote Sensing signal bands... OK', delay: 1900 },
  { text: 'Integrating research logs & analytical models... OK', delay: 2100 },
  { text: 'Systems configured. Building solutions through code & curiosity.', delay: 2300 }
];

export default function BootLoader({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [isBypassed, setIsBypassed] = useState(true);

  useEffect(() => {
    // Check session storage to see if we should skip boot sequence
    const hasBooted = sessionStorage.getItem('booted');
    if (hasBooted === 'true') {
      onComplete();
    } else {
      setIsBypassed(false);
      
      // Sequential log rendering
      const timers = BOOT_LOGS.map((log) => {
        return setTimeout(() => {
          setLogs((prev) => [...prev, log.text]);
        }, log.delay);
      });

      const completionTimer = setTimeout(() => {
        sessionStorage.setItem('booted', 'true');
        onComplete();
      }, 3000);

      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(completionTimer);
      };
    }
  }, [onComplete]);

  if (isBypassed) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#030712] flex items-center justify-center font-mono-tech p-6 overflow-hidden"
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 spatial-grid opacity-30" />
      
      {/* Scanline */}
      <div className="boot-scanline" />

      {/* Booting Terminal Panel */}
      <div className="max-w-xl w-full border border-gray-800 bg-[#070b15]/80 backdrop-blur-md p-6 rounded shadow-2xl relative z-10">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-gray-800 pb-3 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-xs text-gray-500 ml-2">SYSTEM BOOT // V2.0.26</span>
        </div>

        {/* Terminal logs list */}
        <div className="space-y-2 h-64 overflow-y-auto text-xs text-gray-400 select-none scrollbar-none">
          {logs.map((log, index) => {
            const isLast = index === logs.length - 1;
            const isAnchor = log.includes('Anchor resolved:');
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`${isLast ? 'text-teal-400 font-semibold' : ''} ${isAnchor ? 'text-lime-500' : ''} leading-relaxed flex items-start`}
              >
                <span className="text-gray-600 mr-2 shrink-0">&gt;</span>
                <span>{log}</span>
              </motion.div>
            );
          })}
          {logs.length < BOOT_LOGS.length && (
            <span className="inline-block w-1.5 h-3.5 bg-teal-400 ml-1 animate-pulse" />
          )}
        </div>

        {/* Loading Footer Info */}
        <div className="mt-6 flex justify-between items-center text-[10px] text-gray-600 border-t border-gray-850 pt-3">
          <span>PORT: 3000</span>
          <span>SYS_CALIBRATION: ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
}
