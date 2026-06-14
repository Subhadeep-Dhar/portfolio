'use client';

import { useEffect, useRef, useState } from 'react';

export default function InteractiveBackground({ focus = 'home' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000, pulse: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
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

    // Track mouse coordinates
    const handleMouseMove = (e) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.tx = -1000;
      mouseRef.current.ty = -1000;
    };
    const handleMouseDown = () => {
      mouseRef.current.pulse = 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);

    // Pre-build coordinates for topographic contour layers (Researcher Mode)
    const contours = [];
    const numContours = 7;
    for (let c = 0; c < numContours; c++) {
      contours.push({
        cx: width * (0.4 + c * 0.03),
        cy: height * (0.5 - (c % 2) * 0.03),
        radius: 120 + c * 45,
      });
    }

    // Pre-build technical node coordinates (Developer Mode)
    const nodes = [];
    const numNodes = 18;
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: 1.5,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse coordinates (smooth lag)
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      if (mouse.pulse > 0.01) {
        mouse.pulse -= 0.02;
      }

      // Mode-specific canvas render operations
      if (focus === 'developer' || focus === 'home') {
        // ─── Developer Layer: Blueprint Node Schema ───
        ctx.lineWidth = 1.0;
        nodes.forEach((n, idx) => {
          if (!reducedMotion) {
            n.x += n.vx;
            n.y += n.vy;

            // Wrap edges
            if (n.x < 0) n.x = width;
            if (n.x > width) n.x = 0;
            if (n.y < 0) n.y = height;
            if (n.y > height) n.y = 0;

            // Cursor gravity interaction (attract nodes toward cursor)
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              const pull = (200 - dist) / 200 * 0.15;
              n.x += (dx / dist) * pull;
              n.y += (dy / dist) * pull;
            }
          }

          ctx.fillStyle = focus === 'developer' ? 'rgba(155, 107, 78, 0.4)' : 'rgba(210, 193, 168, 0.25)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 1.5, 0, Math.PI * 2);
          ctx.fill();

          for (let j = idx + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dist = Math.sqrt((n.x - n2.x) ** 2 + (n.y - n2.y) ** 2);
            if (dist < 180) {
              ctx.strokeStyle = focus === 'developer'
                ? `rgba(155, 107, 78, ${0.35 * (1 - dist / 180)})`
                : `rgba(210, 193, 168, ${0.2 * (1 - dist / 180)})`;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          }
        });
      }

      if (focus === 'researcher' || focus === 'home') {
        // ─── Researcher Layer: Topographic Contour Map ───
        ctx.lineWidth = 1.0;
        contours.forEach((contour, idx) => {
          ctx.strokeStyle = focus === 'researcher'
            ? `rgba(111, 129, 103, ${0.35 - idx * 0.035})`
            : `rgba(210, 193, 168, ${0.2 - idx * 0.02})`;

          ctx.beginPath();
          const segments = 80;
          for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const noise = reducedMotion ? 0 : Math.sin(angle * 4 + time * 0.05) * 4 + Math.cos(angle * 2 - time * 0.03) * 2;
            
            let px = contour.cx + Math.cos(angle) * (contour.radius + noise);
            let py = contour.cy + Math.sin(angle) * (contour.radius + noise);

            // Cursor ripple interaction (topographic wave displacement)
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 160) {
              const push = (160 - dist) / 160;
              px += (dx / dist) * push * 10;
              py += (dy / dist) * push * 10;
            }

            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        });
      }

      // Render custom geofence ripple ring on click
      if (mouse.pulse > 0.01) {
        ctx.strokeStyle = focus === 'researcher'
          ? `rgba(111, 129, 103, ${mouse.pulse * 0.5})`
          : `rgba(155, 107, 78, ${mouse.pulse * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, (1 - mouse.pulse) * 140, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (!reducedMotion) {
        time += 0.03;
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
