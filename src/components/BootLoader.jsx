'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BOOT_LOGS = [
  { text: 'SYSTEM: Initialize portfolio audit sequence...', delay: 100 },
  { text: 'SYSTEM: Loading configuration profiles... OK', delay: 400 },
  { text: 'GEODETIC: Resolving coordinate registers...', delay: 700 },
  { text: 'GEODETIC: Resolved Sikkim Lake benchmark [27.7800° N, 88.6300° E]', delay: 1000 },
  { text: 'SYSTEM: Calibrating developer engine compiling... OK', delay: 1300 },
  { text: 'GEODETIC: Resolved Manipal Campus benchmark [13.3444° N, 74.7944° E]', delay: 1600 },
  { text: 'SYSTEM: Calibrating GIS spectral bands... OK', delay: 1900 },
  { text: 'SYSTEM: Aligning research paper index trees... OK', delay: 2100 },
  { text: 'SYSTEM: Audit completed. Boot sequence resolved.', delay: 2300 }
];

export default function BootLoader({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [isBypassed, setIsBypassed] = useState(true);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('booted');
    if (hasBooted === 'true') {
      onComplete();
    } else {
      setIsBypassed(false);
      
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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#111111] flex items-center justify-center font-mono-tech p-6 overflow-hidden select-none"
    >
      <div className="absolute inset-0 spatial-grid opacity-[0.05]" />
      
      {/* Editorial System Panel */}
      <div className="max-w-md w-full border border-neutral-800 bg-[#1a1a1a]/90 backdrop-blur-md p-6 rounded shadow-lg relative z-10 text-neutral-400">
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-neutral-850 pb-3 mb-4 text-[9px] uppercase tracking-wider text-neutral-600">
          <span>PORTFOLIO CORE BOOT</span>
          <span>SYS_VAL // 2026</span>
        </div>

        {/* Logs */}
        <div className="space-y-2 h-48 overflow-y-auto text-[10px] leading-relaxed scrollbar-none">
          {logs.map((log, index) => {
            const isLast = index === logs.length - 1;
            const isAnchor = log.includes('Resolved');
            
            return (
              <div
                key={index}
                className={`${isLast ? 'text-teal-400 font-medium' : ''} ${isAnchor ? 'text-lime-500/90' : ''} flex items-start`}
              >
                <span className="text-neutral-700 mr-2 select-none">::</span>
                <span>{log}</span>
              </div>
            );
          })}
          {logs.length < BOOT_LOGS.length && (
            <span className="inline-block w-1.5 h-3 bg-teal-500/70 ml-1 animate-pulse" />
          )}
        </div>

        {/* Panel Footer */}
        <div className="mt-4 pt-3 border-t border-neutral-850 flex justify-between text-[8px] text-neutral-600 uppercase tracking-widest">
          <span>PORT: 3000</span>
          <span>STABLE CONNECT</span>
        </div>
      </div>
    </motion.div>
  );
}
