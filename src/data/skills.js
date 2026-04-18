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
      { name: 'Python', level: 'core' },
      { name: 'JavaScript', level: 'core' },
      { name: 'C++', level: 'proficient' },
      { name: 'TypeScript', level: 'proficient' },
      { name: 'SQL', level: 'core' },
      { name: 'Java', level: 'proficient' },
      // { name: 'Bash',        level: 'proficient' },
    ],
  },
  {
    label: 'Frontend',
    icon: '◻',
    color: 'purple',
    skills: [
      { name: 'React', level: 'core' },
      { name: 'Next.js', level: 'core' },
      { name: 'Vite', level: 'core' },
      { name: 'Tailwind CSS', level: 'core' },
      { name: 'Framer Motion', level: 'proficient' },
      // { name: 'React Native',   level: 'proficient' },
      // { name: 'Figma',          level: 'proficient' },
    ],
  },
  {
    label: 'Backend & APIs',
    icon: '◈',
    color: 'cyan',
    skills: [
      // { name: 'FastAPI',     level: 'core' },
      { name: 'Node.js', level: 'core' },
      { name: 'Express', level: 'proficient' },
      { name: 'REST APIs', level: 'core' },
      // { name: 'GraphQL',     level: 'proficient' },
      // { name: 'Supabase',    level: 'proficient' },
    ],
  },
  {
    label: 'Data & ML',
    icon: '◑',
    color: 'purple',
    skills: [
      // Data / ML
      { name: 'Pandas', level: 'core' },
      { name: 'Scikit-learn', level: 'core' },
      { name: 'Matplotlib', level: 'core' },

      // Computer Vision
      { name: 'OpenCV', level: 'core' },
      { name: 'MediaPipe', level: 'core' },
      { name: 'Computer Vision', level: 'core' },
      { name: 'Face Tracking', level: 'proficient' },
      { name: 'Gesture Recognition', level: 'proficient' },
    ],
  },
  {
    label: 'DevOps & Tools',
    icon: '◎',
    color: 'cyan',
    skills: [
      { name: 'Git', level: 'core' },
      { name: 'Docker', level: 'proficient' },
      { name: 'Render', level: 'proficient' },
      { name: 'Upstash', level: 'proficient' },
      { name: 'GitHub CI', level: 'core' },
      { name: 'Vercel', level: 'core' },
      { name: 'Postman', level: 'proficient' },
      { name: 'Node-cron', level: 'proficient' },
    ],
  },
  {
    label: 'Databases & Caching',
    icon: '🗄',
    color: 'purple',
    skills: [
      { name: 'MongoDB', level: 'core' },
      { name: 'MongoDB Atlas', level: 'core' },
      { name: 'Mongoose', level: 'proficient' },
      { name: 'Redis', level: 'proficient' },
      { name: 'MySql', level: 'core' },
    ],
  },
];
