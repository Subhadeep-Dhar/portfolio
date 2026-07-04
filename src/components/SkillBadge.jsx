'use client';

/**
 * SkillBadge
 * ----------
 * Renders a single skill badge.
 * Props: name (string), level ('core' | 'proficient' | 'learning'), accent ('cyan' | 'purple')
 */
export default function SkillBadge({ name, level, accent }) {
  const isCore = level === 'core';
  const isLearning = level === 'learning';

  const activeDot = isCore 
    ? 'var(--active-accent)' 
    : isLearning 
    ? 'var(--color-text-dim)' 
    : 'rgba(var(--active-accent-rgb), 0.4)';

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border)] hover:border-[var(--active-accent)] bg-transparent hover:bg-[var(--color-surface)]/30 transition-all duration-200"
    >
      <span className="font-mono text-sm text-[var(--color-text-main)] leading-none">{name}</span>
      {isLearning && (
        <span className="ml-auto font-mono text-xs text-neutral-500 opacity-60">~</span>
      )}
    </div>
  );
}
