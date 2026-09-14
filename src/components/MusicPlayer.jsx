'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // Handle first interaction to auto-start if allowed by user
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.volume = 0.3; // Gentle volume
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(e => console.log('Autoplay prevented', e));
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevent global click handlers
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Play failed', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src="/ambient.mp3" loop />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors duration-300 ${
          isPlaying ? 'bg-[#d4a373]/20 shadow-[0_0_15px_rgba(212,163,115,0.3)]' : 'bg-black/30'
        }`}
      >
        <div className="flex items-end justify-center gap-1 w-5 h-4">
          <motion.div 
            animate={{ height: isPlaying ? ['4px', '16px', '8px', '14px', '4px'] : '4px' }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className={`w-1 rounded-full ${isPlaying ? 'bg-[#d4a373]' : 'bg-white/40'}`} 
          />
          <motion.div 
            animate={{ height: isPlaying ? ['12px', '4px', '16px', '6px', '12px'] : '4px' }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut", delay: 0.2 }}
            className={`w-1 rounded-full ${isPlaying ? 'bg-[#d4a373]' : 'bg-white/40'}`} 
          />
          <motion.div 
            animate={{ height: isPlaying ? ['8px', '14px', '6px', '16px', '8px'] : '4px' }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut", delay: 0.4 }}
            className={`w-1 rounded-full ${isPlaying ? 'bg-[#d4a373]' : 'bg-white/40'}`} 
          />
        </div>
      </motion.button>
    </div>
  );
}
