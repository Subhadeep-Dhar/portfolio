'use client';

import { motion } from 'framer-motion';
import { 
  SiJavascript, SiTypescript, SiPython, SiDart, SiKotlin,
  SiReact, SiNextdotjs, SiFlutter, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiVercel, SiMongodb, SiFirebase, 
  SiRedis, SiGit, SiRender
} from 'react-icons/si';

const techIcons = [
  { Icon: SiReact, name: 'React' },
  { Icon: SiNextdotjs, name: 'Next.js' },
  { Icon: SiTailwindcss, name: 'Tailwind CSS' },
  { Icon: SiFramer, name: 'Framer Motion' },
  { Icon: SiNodedotjs, name: 'Node.js' },
  { Icon: SiExpress, name: 'Express' },
  { Icon: SiPython, name: 'Python' },
  { Icon: SiDart, name: 'Dart' },
  { Icon: SiFlutter, name: 'Flutter' },
  { Icon: SiKotlin, name: 'Kotlin' },
  { Icon: SiTypescript, name: 'TypeScript' },
  { Icon: SiJavascript, name: 'JavaScript' },
  { Icon: SiMongodb, name: 'MongoDB' },
  { Icon: SiFirebase, name: 'Firebase' },
  { Icon: SiRedis, name: 'Redis' },
  { Icon: SiGit, name: 'Git' },
  { Icon: SiVercel, name: 'Vercel' },
  { Icon: SiRender, name: 'Render' },
];

export default function TechMarquee() {
  // Duplicate the array so we can scroll infinitely without gaps
  const doubledIcons = [...techIcons, ...techIcons];

  return (
    <div className="w-full overflow-hidden py-10 relative select-none">
      {/* Left/Right Fade Masks */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-[200%] gap-12 sm:gap-16 md:gap-24 items-center">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust speed here
          }}
          className="flex gap-12 sm:gap-16 md:gap-24 items-center whitespace-nowrap min-w-full"
        >
          {doubledIcons.map((tech, idx) => {
            const { Icon, name } = tech;
            return (
              <div 
                key={`${name}-${idx}`} 
                className="flex flex-col items-center gap-3 text-neutral-500 hover:text-[var(--active-accent)] transition-colors duration-300 group"
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10 opacity-100 transition-opacity duration-300" />
                <span className="font-mono-tech text-[10px] md:text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-6">
                  {name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
