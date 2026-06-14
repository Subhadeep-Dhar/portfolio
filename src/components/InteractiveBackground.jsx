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

    // Pre-build star coordinates for Milky Way Galaxy (Researcher Mode)
    const stars = [];
    const numStars = 80;
    for (let i = 0; i < numStars; i++) {
      const isMilkyWay = Math.random() < 0.75; // 75% of stars lie in the Milky Way band
      let x, y;
      if (isMilkyWay) {
        x = Math.random() * width;
        const centerLineY = height - (x / width) * height; // Diagonal line
        y = centerLineY + (Math.random() - 0.5) * (height * 0.4); // Concentrate in band
      } else {
        x = Math.random() * width;
        y = Math.random() * height * 0.8;
      }
      stars.push({
        x,
        y,
        radius: 0.5 + Math.random() * 1.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.015,
      });
    }

    // Pre-build organic GIS isotherm contours (representing LST & NDVI profiles)
    const gisContours = [
      {
        cx: width * 0.35,
        cy: height * 0.78,
        radius: 140,
        label: 'NDVI vegetation threshold: 0.65',
        color: 'rgba(111, 129, 103, 0.22)',
        dash: [4, 4]
      },
      {
        cx: width * 0.7,
        cy: height * 0.82,
        radius: 180,
        label: 'LST isotherm contour: 14.2°C',
        color: 'rgba(155, 107, 78, 0.22)',
        dash: [6, 3]
      }
    ];

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

    // Pre-build coordinates for topographic contour layers (Original Circle design for Home screen)
    const contours = [];
    const numContours = 7;
    for (let c = 0; c < numContours; c++) {
      contours.push({
        cx: width * (0.4 + c * 0.03),
        cy: height * (0.5 - (c % 2) * 0.03),
        radius: 120 + c * 45,
      });
    }
    // Procedural multi-peak height function for Kanchenjungha Massif
    const getKanchenjunghaHeight = (x, w, h, baseHeight, scale, seedOffset) => {
      // Yalung Kang (~0.41), Main Peak (~0.52), Central/South Peak (~0.63)
      const peaks = [
        { pos: 0.28, ht: 0.18, wd: 0.15 }, // Kangbachen
        { pos: 0.41, ht: 0.28, wd: 0.12 }, // Yalung Kang
        { pos: 0.52, ht: 0.38, wd: 0.18 }, // Main Peak (highest)
        { pos: 0.63, ht: 0.30, wd: 0.14 }, // Central/South Peak
        { pos: 0.74, ht: 0.22, wd: 0.16 }, // South Ridge
      ];
      
      let maxVal = 0;
      for (let i = 0; i < peaks.length; i++) {
        const p = peaks[i];
        const px = p.pos * w + seedOffset;
        const ph = p.ht * h * scale;
        const pw = p.wd * w;
        const dx = Math.abs(x - px);
        if (dx < pw) {
          const val = ph * (1 - dx / pw);
          if (val > maxVal) maxVal = val;
        }
      }
      
      // Rugged ridge detail (fractal sin/cos waves)
      const roughness = Math.sin(x * 0.04 + seedOffset) * 4 
                      + Math.sin(x * 0.15 + seedOffset * 1.5) * 2 
                      + Math.cos(x * 0.006) * 6;
      
      return maxVal > 0 ? baseHeight - (maxVal + roughness) : baseHeight;
    };

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
      if (focus === 'developer') {
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

          ctx.fillStyle = 'rgba(155, 107, 78, 0.4)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 1.5, 0, Math.PI * 2);
          ctx.fill();

          for (let j = idx + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dist = Math.sqrt((n.x - n2.x) ** 2 + (n.y - n2.y) ** 2);
            if (dist < 180) {
              ctx.strokeStyle = `rgba(155, 107, 78, ${0.35 * (1 - dist / 180)})`;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          }
        });
      }

      if (focus === 'researcher') {
        // ─── Researcher Layer: Milky Way, Twinkling Stars, Kanchenjungha Peaks, Glacier River & GIS Patterns ───
        
        // 1. Milky Way Galaxy Nebular Dust Lane
        const mwGrad = ctx.createLinearGradient(0, height * 0.2, width, height * 0.8);
        mwGrad.addColorStop(0, 'rgba(111, 129, 103, 0.0)');
        mwGrad.addColorStop(0.3, 'rgba(111, 129, 103, 0.025)');
        mwGrad.addColorStop(0.5, 'rgba(166, 138, 109, 0.065)'); // soft golden-brown galaxy dust lane
        mwGrad.addColorStop(0.7, 'rgba(111, 129, 103, 0.025)');
        mwGrad.addColorStop(1, 'rgba(111, 129, 103, 0.0)');
        
        ctx.fillStyle = mwGrad;
        ctx.fillRect(0, 0, width, height);

        // 2. Twinkling Stars (with slight color variations)
        stars.forEach((star) => {
          const alpha = 0.25 + 0.65 * Math.abs(Math.sin(time * star.speed + star.phase));
          // Alternate star colors between glacier green-blue and soft cream
          ctx.fillStyle = star.phase > Math.PI 
            ? `rgba(184, 199, 194, ${alpha})` 
            : `rgba(210, 193, 168, ${alpha})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // 3. Kanchenjungha Massif Ridges (3 Layered Solid Mountain Ridges)
        const ridges = [
          { base: height * 0.72, scale: 0.75, stroke: 'rgba(111, 129, 103, 0.12)', fill: 'rgba(13, 18, 15, 0.55)', seed: 50 },
          { base: height * 0.80, scale: 0.95, stroke: 'rgba(111, 129, 103, 0.22)', fill: 'rgba(13, 18, 15, 0.78)', seed: -120 },
          { base: height * 0.87, scale: 1.15, stroke: 'rgba(111, 129, 103, 0.40)', fill: 'rgba(13, 18, 15, 0.96)', seed: 230 }
        ];

        ridges.forEach((r) => {
          ctx.beginPath();
          ctx.moveTo(0, height);
          
          for (let x = 0; x <= width; x += 10) {
            let y = getKanchenjunghaHeight(x, width, height, r.base, r.scale, r.seed);
            
            // Cursor deflection
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const push = (180 - dist) / 180 * 12;
              y += (dy / dist) * push;
            }
            
            ctx.lineTo(x, y);
          }
          
          ctx.lineTo(width, height);
          ctx.closePath();
          
          // Fill first
          ctx.fillStyle = r.fill;
          ctx.fill();
          
          // Stroke the ridge outline only
          ctx.strokeStyle = r.stroke;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let x = 0; x <= width; x += 10) {
            let y = getKanchenjunghaHeight(x, width, height, r.base, r.scale, r.seed);
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const push = (180 - dist) / 180 * 12;
              y += (dy / dist) * push;
            }
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });

        // 4. Glacier Melt Winding River (emerging from the valley center)
        ctx.strokeStyle = 'rgba(111, 129, 103, 0.45)';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        const riverStartY = height * 0.76;
        
        for (let y = riverStartY; y <= height; y += 6) {
          const progress = (y - riverStartY) / (height - riverStartY);
          const windOffset = Math.sin(y * 0.015 - time * 0.1) * 40 * progress 
                           + Math.cos(y * 0.03 + time * 0.05) * 15 * progress;
          let x = width * 0.52 + windOffset;

          // Cursor deflection
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const push = (120 - dist) / 120 * 15;
            x += (dx / dist) * push;
          }

          if (y === riverStartY) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // 5. GIS Isoline Contours & Text Labels (NDVI vegetation & LST isotherm)
        gisContours.forEach((c, idx) => {
          const cx = idx === 0 ? width * 0.35 : width * 0.7;
          const cy = idx === 0 ? height * 0.78 : height * 0.82;

          ctx.strokeStyle = c.color;
          ctx.setLineDash(c.dash);
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          
          const segments = 60;
          for (let i = 0; i <= segments; i++) {
            const angle = Math.PI + (i / segments) * Math.PI;
            const noise = Math.sin(angle * 6 + time * 0.04) * 8 + Math.cos(angle * 3) * 4;
            
            let px = cx + Math.cos(angle) * (c.radius + noise);
            let py = cy + Math.sin(angle) * (c.radius * 0.5 + noise * 0.5);
            
            // Cursor deflection
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
              const push = (140 - dist) / 140 * 12;
              px += (dx / dist) * push;
              py += (dy / dist) * push;
            }
            
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
          ctx.setLineDash([]); // Reset dash state
          
          // Label drawing with low opacity Inter font
          ctx.font = '400 10px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
          ctx.fillStyle = c.color.replace('0.22', '0.45'); // Slightly higher opacity for text readability
          ctx.textAlign = 'center';
          ctx.fillText(c.label, cx, cy - c.radius * 0.5 - 12);
        });
      }

      if (focus === 'home') {
        // ─── Home Layer: Original Topographic Contour Map (Concentric circles) ───
        ctx.lineWidth = 1.0;
        contours.forEach((contour, idx) => {
          ctx.strokeStyle = `rgba(210, 193, 168, ${0.25 - idx * 0.03})`;
          ctx.beginPath();
          const segments = 80;
          for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const noise = reducedMotion ? 0 : Math.sin(angle * 4 + time * 0.05) * 4 + Math.cos(angle * 2 - time * 0.03) * 2;
            
            let px = contour.cx + Math.cos(angle) * (contour.radius + noise);
            let py = contour.cy + Math.sin(angle) * (contour.radius + noise);

            // Cursor deflection
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
