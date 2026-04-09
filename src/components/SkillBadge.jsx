'use client';

/**
 * SkillBadge
 * ----------
 * Renders a single skill badge.
 * Props: name (string), level ('core' | 'proficient' | 'learning'), accent ('cyan' | 'purple')
 */
export default function SkillBadge({ name, level, accent = 'cyan' }) {
  const isCore = level === 'core';
  const isLearning = level === 'learning';

  const accentColor = accent === 'cyan' ? '#00e5ff' : '#a855f7';

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 group"
      style={{
        borderColor: isCore ? `${accentColor}30` : 'rgba(26,34,53,1)',
        background: isCore ? `${accentColor}08` : 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${accentColor}50`;
        e.currentTarget.style.background = `${accentColor}10`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isCore ? `${accentColor}30` : 'rgba(26,34,53,1)';
        e.currentTarget.style.background = isCore ? `${accentColor}08` : 'transparent';
      }}
    >
      {/* Level indicator dot */}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{
          backgroundColor: isLearning
            ? '#64748b'
            : accentColor,
          opacity: isCore ? 1 : 0.5,
        }}
      />
      <span className="font-mono text-sm text-lab-text leading-none">{name}</span>
      {isLearning && (
        <span className="ml-auto font-mono text-xs text-lab-muted opacity-60">~</span>
      )}
    </div>
  );
}
