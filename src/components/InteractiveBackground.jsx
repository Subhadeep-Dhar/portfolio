'use client';

import { useEffect, useRef, useState } from 'react';

export default function InteractiveBackground({ focus = 'unified' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000, pulse: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse
    const handleMouseMove = (e) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.tx = -1000;
      mouseRef.current.ty = -1000;
    };
    const handleMouseDown = () => {
      mouseRef.current.pulse = 1; // Trigger a ripple pulse
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);

    // Grid coordinates, lines, and system diagrams configuration
    // We design clean, mathematical structures that don't float randomly
    const points = [];
    const numPoints = 25;
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 2 + 1,
      });
    }

    // Topographical contour lines - pre-generated curves
    const contours = [];
    const numContours = 5;
    for (let c = 0; c < numContours; c++) {
      const cx = width * (0.3 + c * 0.1);
      const cy = height * (0.4 + (c % 2) * 0.1);
      const radius = 80 + c * 40;
      contours.push({ cx, cy, radius });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinates interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      if (mouse.pulse > 0.01) {
        mouse.pulse -= 0.03; // Fade pulse
      }

      // Draw subtle spatial grid
      ctx.strokeStyle = 'rgba(31, 41, 55, 0.06)';
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Context colors based on experienceFocus
      let colorAccent = 'rgba(13, 148, 136, '; // Teal default
      let colorSecondary = 'rgba(59, 130, 246, '; // Blue
      let contourColor = 'rgba(63, 98, 18, '; // Olive green for GIS

      if (focus === 'developer') {
        colorAccent = 'rgba(13, 148, 136, '; // Teal
        colorSecondary = 'rgba(79, 70, 229, '; // Indigo
        contourColor = 'rgba(30, 41, 59, '; // Slate
      } else if (focus === 'researcher') {
        colorAccent = 'rgba(107, 114, 128, '; // Neutral grey
        colorSecondary = 'rgba(8, 145, 178, '; // Glacier blue
        contourColor = 'rgba(63, 98, 18, '; // Olive
      }

      // ─── 1. GIS Layer: Contour Lines ───
      ctx.lineWidth = 0.8;
      contours.forEach((contour, idx) => {
        ctx.strokeStyle = contourColor + (0.05 - idx * 0.006) + ')';
        ctx.beginPath();
        
        const segments = 60;
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          // Create organic noise using time
          const noiseFactor = reducedMotion ? 0 : Math.sin(angle * 4 + time * 0.1) * 6 + Math.cos(angle * 2 - time * 0.05) * 4;
          
          let px = contour.cx + Math.cos(angle) * (contour.radius + noiseFactor);
          let py = contour.cy + Math.sin(angle) * (contour.radius + noiseFactor);

          // Mouse distortion interaction (Terrain ripple)
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            // Push coordinates out to simulate terrain ripple
            px += (dx / dist) * force * 15;
            py += (dy / dist) * force * 15;
          }

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      });

      // ─── 2. Developer Layer: Structured System Lines ───
      ctx.lineWidth = 0.6;
      points.forEach((p, i) => {
        // Move points unless reduced motion
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        // Draw node
        ctx.fillStyle = colorAccent + '0.08)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Check distance to draw system links
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            // Draw system line
            ctx.strokeStyle = colorAccent + (0.04 * (1 - dist / 160)) + ')';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // ─── 3. Research Layer: Signal pulses ───
      // Add crosshairs/radar overlays in corners
      ctx.strokeStyle = 'rgba(75, 85, 99, 0.05)';
      ctx.lineWidth = 0.5;

      // Draw coordinate indicators dynamically
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(156, 163, 175, 0.2)';
      ctx.fillText('REF_SYS: WS-84', 40, 40);
      ctx.fillText(`GEO_POS: [${(27.78 + (mouse.x - width / 2) * 0.001).toFixed(4)}° N, ${(88.63 + (mouse.y - height / 2) * 0.001).toFixed(4)}° E]`, 40, 55);

      // Radar scan pulse (subtle)
      if (!reducedMotion) {
        time += 0.05;
        const scanY = (time * 15) % height;
        ctx.strokeStyle = colorAccent + '0.015)';
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.stroke();
      }

      // Draw mouse ripple pulse if triggered
      if (mouse.pulse > 0.01) {
        ctx.strokeStyle = colorSecondary + (mouse.pulse * 0.1) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, (1 - mouse.pulse) * 120, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (!reducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationId);
    };
  }, [focus, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
    />
  );
}
