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
      { name: 'JavaScript', level: 'core' },
      { name: 'TypeScript', level: 'proficient' },
      { name: 'Dart', level: 'proficient' },
      { name: 'Python', level: 'core' },
      { name: 'C++', level: 'proficient' },
      { name: 'Java', level: 'proficient' },
      { name: 'Kotlin', level: 'proficient' },
      { name: 'SQL', level: 'core' },
    ],
  },
  {
    label: 'Mobile & Frontend',
    icon: '◻',
    color: 'purple',
    skills: [
      { name: 'React', level: 'core' },
      { name: 'Next.js', level: 'core' },
      { name: 'Flutter', level: 'core' },
      { name: 'React Native', level: 'proficient' },
      { name: 'Expo', level: 'proficient' },
      { name: 'Expo Router', level: 'proficient' },
      { name: 'Jetpack Compose', level: 'core' },
      { name: 'Tailwind CSS', level: 'core' },
      { name: 'Framer Motion', level: 'proficient' },
      { name: 'Responsive UI Design', level: 'core' },
      { name: 'Zustand', level: 'proficient' },
      { name: 'Kotlin Coroutines', level: 'core' },
      { name: 'StateFlow', level: 'proficient' },
      { name: 'Vite', level: 'proficient' },
    ],
  },
  {
    label: 'Backend & APIs',
    icon: '◈',
    color: 'cyan',
    skills: [
      { name: 'Node.js', level: 'core' },
      { name: 'Express', level: 'proficient' },
      { name: 'REST APIs', level: 'core' },
      { name: 'Authentication Systems', level: 'proficient' },
      { name: 'Google Maps API', level: 'core' },
      { name: 'Open-Meteo API', level: 'proficient' },
    ],
  },
  {
    label: 'AI, ML & Location Intelligence',
    icon: '◑',
    color: 'purple',
    skills: [
      // Computer Vision & Edge AI
      { name: 'TensorFlow Lite', level: 'core' },
      { name: 'MobileNet V2', level: 'proficient' },
      { name: 'Cosine Similarity', level: 'proficient' },
      { name: 'Computer Vision', level: 'core' },
      { name: 'OpenCV', level: 'core' },
      { name: 'MediaPipe', level: 'core' },
      { name: 'Face Tracking', level: 'proficient' },
      { name: 'Gesture Recognition', level: 'proficient' },
      
      // Location / Context
      { name: 'Geofencing', level: 'core' },
      { name: 'GPS Tracking', level: 'core' },
      { name: 'AI Integration', level: 'core' },
      { name: 'Context-Aware Systems', level: 'proficient' },
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
      { name: 'Firestore', level: 'core' },
      { name: 'Firebase Storage', level: 'proficient' },
      { name: 'MySql', level: 'core' },
      { name: 'Room Database', level: 'core' },
      { name: 'Android DataStore', level: 'proficient' },
    ],
  },
  {
    label: 'DevOps & Tools',
    icon: '◎',
    color: 'cyan',
    skills: [
      { name: 'Git', level: 'core' },
      { name: 'Docker', level: 'proficient' },
      { name: 'Vercel', level: 'core' },
      { name: 'Render', level: 'proficient' },
      { name: 'Upstash', level: 'proficient' },
      { name: 'GitHub CI', level: 'core' },
      { name: 'EAS Build', level: 'core' },
      { name: 'Expo CLI', level: 'core' },
      { name: 'Postman', level: 'proficient' },
      { name: 'Node-cron', level: 'proficient' },
      { name: 'Android Debugging', level: 'proficient' },
      { name: 'Kotlinx Serialization', level: 'proficient' },
    ],
  },
  {
    label: 'Geospatial & Remote Sensing',
    icon: '🛰',
    color: 'cyan',
    skills: [
      { name: 'Google Earth Engine', level: 'core' },
      { name: 'Geospatial Analysis', level: 'core' },
      { name: 'Remote Sensing', level: 'core' },
      { name: 'Satellite Imagery', level: 'core' },
      { name: 'Time-Series Analysis', level: 'proficient' },
      { name: 'GIS', level: 'core' },
      { name: 'QGIS', level: 'core' },
      { name: 'SNAP', level: 'proficient' },
      { name: 'Landsat 8', level: 'proficient' },
      { name: 'CHIRPS', level: 'proficient' },
    ],
  }
];
