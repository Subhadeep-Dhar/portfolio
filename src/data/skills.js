/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  SKILLS DATA FILE                                            ║
 * ║  Edit ONLY this file to add, remove, or update skills.      ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Each category has:
 *   label   — display name
 *   icon    — emoji (lightweight; swap for SVG if preferred)
 *   color   — Tailwind class for accent color
 *   skills  — array of { name, level }
 *             level: 'core' | 'proficient' | 'learning'
 */

export const skillCategories = [
  {
    label: 'Languages',
    icon: '⌨',
    color: 'cyan',
    skills: [
      { name: 'Python',      level: 'core' },
      { name: 'JavaScript',  level: 'core' },
      { name: 'c++',         level: 'proficient' },
      { name: 'TypeScript',  level: 'proficient' },
      { name: 'SQL',         level: 'core' },
      { name: 'Java',        level: 'proficient' },
      // { name: 'Bash',        level: 'proficient' },
    ],
  },
  {
    label: 'Frontend',
    icon: '◻',
    color: 'purple',
    skills: [
      { name: 'React',          level: 'core' },
      { name: 'Next.js',        level: 'core' },
      { name: 'Tailwind CSS',   level: 'core' },
      { name: 'Framer Motion',  level: 'proficient' },
      // { name: 'React Native',   level: 'proficient' },
      // { name: 'Figma',          level: 'proficient' },
    ],
  },
  {
    label: 'Backend & APIs',
    icon: '◈',
    color: 'cyan',
    skills: [
      { name: 'FastAPI',     level: 'core' },
      { name: 'Node.js',     level: 'core' },
      { name: 'Express',     level: 'proficient' },
      { name: 'REST APIs',   level: 'core' },
      { name: 'GraphQL',     level: 'proficient' },
      { name: 'Supabase',    level: 'proficient' },
    ],
  },
  {
    label: 'Data & ML',
    icon: '◑',
    color: 'purple',
    skills: [
      { name: 'Pandas',        level: 'core' },
      { name: 'Scikit-learn',  level: 'core' },
      { name: 'HuggingFace',   level: 'proficient' },
      { name: 'Matplotlib',    level: 'core' },
      { name: 'PostgreSQL',    level: 'core' },
      { name: 'Kafka',         level: 'proficient' },
    ],
  },
  {
    label: 'DevOps & Tools',
    icon: '◎',
    color: 'cyan',
    skills: [
      { name: 'Git',        level: 'core' },
      { name: 'Docker',     level: 'proficient' },
      { name: 'Linux',      level: 'proficient' },
      { name: 'GitHub CI',  level: 'proficient' },
      { name: 'Vercel',     level: 'proficient' },
      { name: 'Postman',    level: 'core' },
    ],
  },
];
