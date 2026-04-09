'use client';

import SectionHeader from '@/components/SectionHeader';
import TimelineItem from '@/components/TimelineItem';
import { timeline } from '@/data/timeline';

/**
 * Timeline / Evolution Log Section
 * ──────────────────────────────────
 * Fully data-driven from src/data/timeline.js
 * Clean vertical layout with colored type dots.
 */
export default function Timeline() {
  return (
    <section id="evolution" className="py-24">
      <div className="section-container">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-lab-line to-transparent mb-24" />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* ── Left: Header + context ────────────────────────── */}
          <div>
            <SectionHeader
              label="Education & Evolution"
              title="How I got here."
              subtitle="Not a resume. A log of what I learned — in order."
            />

            {/* Legend */}
            <div className="space-y-2 mt-8">
              {[
                { dot: '#00e5ff', label: 'Education' },
                { dot: '#a855f7', label: 'Project milestone' },
                // { dot: '#00e5ff', label: 'Achievement / recognition' },
                // { dot: '#64748b', label: 'Personal milestone' },
              ].map(({ dot, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-offset-2 ring-offset-lab-bg"
                    style={{ backgroundColor: dot }}
                  />
                  <span className="font-mono text-xs text-lab-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Timeline items ─────────────────────────── */}
          <div className="pt-2">
            {timeline.map((item, index) => (
              <TimelineItem
                key={`${item.year}-${item.title}`}
                item={item}
                index={index}
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
