'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    // Set canvas to full screen
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    let mouse = { x: -100, y: -100 };
    let points = [];
    const maxPoints = 20;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.push({ x: mouse.x, y: mouse.y, age: 0 });

      // Draw the trail
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Fading effect
        const opacity = 1 - (p.age / maxPoints);
        ctx.lineWidth = opacity * 8; // thicker at the front, thinner at tail
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = `rgba(155, 107, 78, ${opacity * 0.5})`; // burnished copper glow

        if (i === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          // Smooth bezier interpolation could be used here, but linear is fast and looks fine with small segments
          ctx.lineTo(p.x, p.y);
        }
        
        p.age++;
      }
      ctx.stroke();

      // Remove old points
      points = points.filter(p => p.age < maxPoints);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
