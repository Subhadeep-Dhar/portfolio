/**
 * +--------------------------------------------------------------+
 * ¦  SKILLS DATA FILE                                            ¦
 * ¦  Edit ONLY this file to add, remove, or update skills.      ¦
 * +--------------------------------------------------------------+
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
    icon: '?',
    color: 'cyan',
    skills: [
      { name: 'JavaScript', level: 'core' },
      { name: 'TypeScript', level: 'proficient' },
      { name: 'Dart', level: 'proficient' },
      { name: 'Python', level: 'core' },
      { name: 'Kotlin', level: 'proficient' },
      { name: 'NumPy', level: 'proficient' },
    ],
  },
  {
    label: 'Mobile & Frontend',
    icon: '?',
    color: 'purple',
    skills: [
      { name: 'React', level: 'core' },
      { name: 'Next.js', level: 'core' },
      { name: 'Flutter', level: 'core' },
      { name: 'React Native', level: 'proficient' },
      { name: 'Expo', level: 'proficient' },
      { name: 'Expo Router', level: 'proficient' },
      { name: 'Provider', level: 'proficient' },
      { name: 'Jetpack Compose', level: 'core' },
      { name: 'Tailwind CSS', level: 'core' },
      { name: 'Framer Motion', level: 'proficient' },
      { name: 'Shadcn UI', level: 'proficient' },
      { name: 'Responsive UI Design', level: 'core' },
      { name: 'Zustand', level: 'proficient' },
      { name: 'Kotlin Coroutines', level: 'core' },
      { name: 'StateFlow', level: 'proficient' },
      { name: 'Vite', level: 'proficient' },
    ],
  },
  {
    label: 'Backend & APIs',
    icon: '?',
    color: 'cyan',
    skills: [
      { name: 'Node.js', level: 'core' },
      { name: 'Express', level: 'proficient' },
      { name: 'REST API', level: 'core' },
      { name: 'Authentication Systems', level: 'proficient' },
      { name: 'JWT Auth', level: 'proficient' },
      { name: 'Vercel AI SDK', level: 'proficient' },
      { name: 'Google Gemini API', level: 'proficient' },
      { name: 'RAG', level: 'proficient' },
      { name: 'Google Maps API', level: 'core' },
      { name: 'Open-Meteo API', level: 'proficient' },
      { name: 'Expo Notifications', level: 'proficient' },
    ],
  },
  {
    label: 'Media & Location Tools',
    icon: '?',
    color: 'purple',
    skills: [
      { name: 'TensorFlow Lite', level: 'core' },
      { name: 'MobileNet V2', level: 'proficient' },
      { name: 'OpenCV', level: 'core' },
      { name: 'MediaPipe', level: 'core' },
      { name: 'Face Tracking', level: 'proficient' },
      { name: 'FFmpeg', level: 'proficient' },
      { name: 'Gesture Controls', level: 'proficient' },
      { name: 'PyAutoGUI', level: 'proficient' },
      { name: 'Image Matching', level: 'proficient' },
      { name: 'Geofencing', level: 'core' },
      { name: 'GPS Tracking', level: 'core' },
      { name: 'Expo Location', level: 'proficient' },
      { name: 'Google Maps', level: 'core' },
      { name: 'Location-based features', level: 'core' },
      { name: 'User reminders', level: 'proficient' },
    ],
  },
  {
    label: 'Databases & Caching',
    icon: '??',
    color: 'purple',
    skills: [
      { name: 'MongoDB Atlas', level: 'core' },
      { name: 'MongoDB Atlas Vector Search', level: 'proficient' },
      { name: 'Mongoose', level: 'proficient' },
      { name: 'Redis', level: 'proficient' },
      { name: 'Firebase', level: 'core' },
      { name: 'Firestore', level: 'core' },
      { name: 'Firebase Storage', level: 'proficient' },
      { name: 'Room Database', level: 'core' },
      { name: 'Android DataStore', level: 'proficient' },
      { name: 'Shared Preferences', level: 'proficient' },
      { name: 'Offline Data', level: 'proficient' },
    ],
  },
  {
    label: 'DevOps & Tools',
    icon: '?',
    color: 'cyan',
    skills: [
      { name: 'Git', level: 'core' },
      { name: 'Vercel', level: 'core' },
      { name: 'Render', level: 'proficient' },
      { name: 'Upstash', level: 'proficient' },
      { name: 'EAS Build', level: 'core' },
      { name: 'Expo CLI', level: 'core' },
      { name: 'Android Debugging', level: 'proficient' },
      { name: 'Kotlinx Serialization', level: 'proficient' },
      { name: 'yt-dlp', level: 'proficient' },
      { name: 'ZXing (planned for QR)', level: 'proficient' },
      { name: 'PDF Generation', level: 'proficient' },
    ],
  },
  {
    label: 'Geospatial & Remote Sensing',
    icon: '??',
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

