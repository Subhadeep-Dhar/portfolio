'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import SkillBadge from '@/components/SkillBadge';
import { skillCategories } from '@/data/skills';

/**
 * Skills / Tech Arsenal Section
 * ──────────────────────────────
 * Fully data-driven from src/data/skills.js
 * Add/remove skills by editing that file only.
 */
export default function Skills() {
  return (
    <section id="arsenal" className="py-24">
      {/* Subtle divider line at top */}
      <div className="section-container">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-lab-line to-transparent mb-24" />

        <SectionHeader
          label="Tools and Technologies"
          title="Tools that I used/learning."
          // subtitle="Grouped by domain. Dot = core skill. No dot = proficient. ~ = actively learning."
        />

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.08, duration: 0.4 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="font-mono text-base"
                  style={{ color: category.color === 'cyan' ? '#00e5ff' : '#a855f7' }}
                >
                  {category.icon}
                </span>
                <span className="font-display font-semibold text-lab-text text-sm">
                  {category.label}
                </span>
                <span className="ml-auto font-mono text-xs text-lab-muted opacity-50">
                  {category.skills.length}
                </span>
              </div>

              {/* Skills list */}
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: catIndex * 0.06 + skillIndex * 0.04,
                      duration: 0.3,
                    }}
                  >
                    <SkillBadge
                      name={skill.name}
                      level={skill.level}
                      accent={category.color}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-lab-line"
        >
          {[
            { dot: '#00e5ff', label: 'Core (daily use)' },
            { dot: '#00e5ff50', label: 'Proficient' },
            { dot: '#64748b', label: 'Learning (~)' },
          ].map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: dot }}
              />
              <span className="font-mono text-xs text-lab-muted">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
