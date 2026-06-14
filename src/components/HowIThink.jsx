'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const THINK_STEPS = [
  {
    phase: '01',
    title: 'Observe',
    subtitle: 'Identify System Patterns',
    desc: 'Monitoring friction or structural anomalies. In GIS, this manifests as monitoring vegetation temperature shifts in coastal zones or glacier velocity metrics. In development, it means auditing slow query cycles or consistency friction.',
    application: 'Real-world application: Landsat spectral anomalies study and client log metrics analyses.'
  },
  {
    phase: '02',
    title: 'Hypothesize',
    subtitle: 'Formulate Parameters',
    desc: 'Defining clean, testable parameters. For example: "A local, geofenced routine verification app will elevate habit discipline rates," or "Seasonal monsoonal precipitation dominates LST changes rather than urban sprawl gradients."',
    application: 'Real-world application: Modeling challenge validation logic for Grounded App.'
  },
  {
    phase: '03',
    title: 'Analyze',
    subtitle: 'Synthesize Data Bands',
    desc: 'Processing geospatial data in Google Earth Engine, classifying velocity models using K-means, or diffing DB response curves. We build the factual foundation before deploying production assets.',
    application: 'Real-world application: Running pixel-based temporal regressions on Sikkim Glacier models.'
  },
  {
    phase: '04',
    title: 'Build',
    subtitle: 'Deploy Clean Pipelines',
    desc: 'Writing structured, scalable, and responsive assets. Writing Kotlin databases, Expo mobile apps, or Python computer vision hooks. Implementation aligns directly with mathematical parameters.',
    application: 'Real-world application: Translating model formulas to high-performance C++ and JavaScript engines.'
  },
  {
    phase: '05',
    title: 'Refine',
    subtitle: 'Measure & Calibrate',
    desc: 'Analyzing output. Comparing latency drops, measuring prediction accuracy, checking validation rates, and correcting drift. A project does not end at shipment; it scales through verification.',
    application: 'Real-world application: Fine-tuning caching TTL rates and model threshold indexes.'
  }
];

export default function HowIThink() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full border border-gray-900 bg-[#070b15]/40 p-6 sm:p-8 rounded-lg select-none">
      <div className="flex flex-col gap-1 mb-8">
        <span className="mono-label">Cognitive Pipeline</span>
        <h3 className="font-semibold text-lg text-gray-200">How I approach complex tasks</h3>
      </div>

      {/* Horizontal step indicator */}
      <div className="grid grid-cols-5 gap-2 relative mb-8">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-900 -translate-y-1/2 z-0" />
        
        {THINK_STEPS.map((step, index) => {
          const isActive = index === activeStep;
          const isPassed = index < activeStep;

          return (
            <button
              key={step.title}
              onClick={() => setActiveStep(index)}
              className="flex flex-col items-center relative z-10 group"
            >
              {/* Dot indicator */}
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : 1,
                  borderColor: isActive ? 'var(--dev-teal)' : isPassed ? 'var(--gis-olive)' : 'rgba(75, 85, 99, 0.4)',
                }}
                className={`w-7 h-7 rounded-full bg-[#030712] border-2 flex items-center justify-center text-[10px] font-mono-tech transition-colors duration-300`}
                style={{
                  color: isActive ? 'var(--dev-teal)' : 'var(--color-text-dim)',
                }}
              >
                {step.phase}
              </motion.div>
              
              {/* Label */}
              <span
                className={`text-[10px] font-mono-tech mt-2 tracking-wide hidden sm:inline-block transition-colors duration-300 ${
                  isActive ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active step description panel */}
      <div className="min-h-56 bg-[#030712]/50 border border-gray-900/60 p-5 rounded relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div>
              <span className="font-mono text-xs text-gray-500 block mb-0.5">
                STAGE_{THINK_STEPS[activeStep].phase} // METHODOLOGY
              </span>
              <h4 className="text-base font-semibold text-gray-200">
                {THINK_STEPS[activeStep].title} — <span className="text-teal-500 text-sm font-medium">{THINK_STEPS[activeStep].subtitle}</span>
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl">
              {THINK_STEPS[activeStep].desc}
            </p>

            <div className="border-t border-gray-950 pt-3 flex gap-2 items-start">
              <span className="font-mono text-[9px] text-gray-600 shrink-0 mt-0.5">EXECUTION:</span>
              <span className="font-mono text-[10px] text-lime-600/90 leading-snug">
                {THINK_STEPS[activeStep].application}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
