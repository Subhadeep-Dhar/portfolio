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
    <div className="w-full border border-neutral-900 bg-[#1a211d]/5 p-6 sm:p-8 rounded select-none">
      <div className="flex flex-col gap-1 mb-8">
        <span className="mono-label text-neutral-500">Working Style</span>
        <h3 className="font-semibold text-lg text-neutral-200">How I approach complex tasks</h3>
      </div>

      {/* Horizontal step indicator */}
      <div className="grid grid-cols-5 gap-2 relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-900 -translate-y-1/2 z-0" />
        
        {THINK_STEPS.map((step, index) => {
          const isActive = index === activeStep;
          const isPassed = index < activeStep;

          return (
            <button
              key={step.title}
              onClick={() => setActiveStep(index)}
              className="flex flex-col items-center relative z-10 group focus:outline-none"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.05 : 1,
                  borderColor: isActive ? 'var(--active-accent)' : isPassed ? 'var(--color-text-dim)' : 'rgba(210, 193, 168, 0.05)',
                }}
                className={`w-8 h-8 rounded-md bg-[#111614] border flex items-center justify-center text-xs font-mono-tech transition-colors duration-300`}
                style={{
                  color: isActive ? 'var(--active-accent)' : 'rgba(210, 193, 168, 0.2)',
                }}
              >
                {step.phase}
              </motion.div>
              
              <span
                className={`text-xs font-mono-tech mt-2 tracking-wide hidden sm:inline-block transition-colors duration-300 ${
                  isActive ? 'text-neutral-300' : 'text-neutral-600'
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Description panel */}
      <div className="min-h-56 bg-[#1a211d]/10 border border-neutral-900/60 p-5 rounded relative overflow-hidden">
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
              <span className="font-mono-tech text-xs text-neutral-500 block mb-0.5">
                Stage {THINK_STEPS[activeStep].phase}
              </span>
              <h4 className="text-sm font-semibold text-neutral-200">
                {THINK_STEPS[activeStep].title} — <span className="text-[var(--active-accent)] text-sm font-mono-tech font-medium">{THINK_STEPS[activeStep].subtitle}</span>
              </h4>
            </div>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl font-light">
              {THINK_STEPS[activeStep].desc}
            </p>

            <div className="border-t border-neutral-900/40 pt-3 flex gap-2 items-start text-xs">
              <span className="font-mono-tech text-xs text-neutral-600 shrink-0 mt-0.5">APPLICATION:</span>
              <span className="font-mono-tech text-xs text-[var(--color-text-dim)] leading-snug">
                {THINK_STEPS[activeStep].application}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
