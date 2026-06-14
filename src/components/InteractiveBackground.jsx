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
    const numStars = 220;
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

    // Pre-build ocean particles (bubbles/bioluminescence for sea level zone)
    const oceanParticles = [];
    const numOceanParticles = 35;
    for (let i = 0; i < numOceanParticles; i++) {
      oceanParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.6 + Math.random() * 1.5,
        speedY: 0.15 + Math.random() * 0.35,
        wobbleSpeed: 0.01 + Math.random() * 0.02,
        wobbleAmp: 4 + Math.random() * 8,
        phase: Math.random() * Math.PI * 2,
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

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;
    let researcherFade = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // Interpolate mouse coordinates (smooth lag)
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      if (mouse.pulse > 0.01) {
        mouse.pulse -= 0.02;
      }

      // Smooth fade state for researcher background transitions
      if (focus === 'researcher') {
        researcherFade += (1 - researcherFade) * 0.045;
      } else {
        researcherFade = 0;
      }

      // Mode-specific canvas render operations
      if (focus === 'developer') {
        // ─── Developer Layer: Blueprint Node Schema (No Parallax, strictly static floating) ───
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
        // ─── Researcher Layer: Unified Scenic Landscape ───
        
        ctx.save();
        ctx.globalAlpha = researcherFade;

        const totalScrollable = (document.documentElement.scrollHeight - window.innerHeight) || 3000;
        const scrollProgress = Math.min(1, Math.max(0, currentScroll / totalScrollable));

        // 1. Unified Scenic Scroll Range (World Height = 2.25 * Viewport Height)
        const landscapeScrollRange = height * 1.25;
        const getScreenY = (worldY) => {
          return worldY - scrollProgress * landscapeScrollRange;
        };

        // Sky and galactic elements opacity fading
        const skyOpacity = Math.max(0, 1 - scrollProgress * 1.85); 

        // 2. Milky Way Galaxy Nebular Dust Lane (Slow Parallax)
        if (skyOpacity > 0.01) {
          const mwGrad = ctx.createLinearGradient(0, height * 0.2 - scrollProgress * height * 0.1, width, height * 0.8 - scrollProgress * height * 0.1);
          mwGrad.addColorStop(0, 'rgba(111, 129, 103, 0.0)');
          mwGrad.addColorStop(0.3, `rgba(111, 129, 103, ${0.025 * skyOpacity})`);
          mwGrad.addColorStop(0.5, `rgba(166, 138, 109, ${0.065 * skyOpacity})`);
          mwGrad.addColorStop(0.7, `rgba(111, 129, 103, ${0.025 * skyOpacity})`);
          mwGrad.addColorStop(1, 'rgba(111, 129, 103, 0.0)');
          
          ctx.fillStyle = mwGrad;
          ctx.fillRect(0, 0, width, height);

          // 3. Twinkling Stars (Parallax Scroll)
          stars.forEach((star) => {
            const starY = star.y - scrollProgress * (height * 0.35);
            if (starY < -20 || starY > height + 20) return;

            const alpha = (0.25 + 0.65 * Math.abs(Math.sin(time * star.speed + star.phase))) * skyOpacity;
            ctx.fillStyle = star.phase > Math.PI 
              ? `rgba(184, 199, 194, ${alpha})` 
              : `rgba(210, 193, 168, ${alpha})`;
            ctx.beginPath();
            ctx.arc(star.x, starY, star.radius, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        // 4. Shared Snowcap Line Calculator
        const getSnowBase = (x, worldSnowLineY, wy) => {
          // Subtle natural variation in the snow line (less wavy as requested)
          const noise = Math.sin(x * 0.04) * 3 + Math.cos(x * 0.02) * 1.5;
          // Glacier troughs/snow tongues extend further down in the valleys (larger wy)
          const gullyBonus = Math.max(0, wy - worldSnowLineY) * 0.22;
          return worldSnowLineY + gullyBonus + noise;
        };

        // 5. Mountain Ridges (Distant, Mid, Foreground)
        // Background ridges in unified world coordinate systems (shifted down for text visibility)
        const ridges = [
          { base: height * 0.82, scale: 0.75, stroke: 'rgba(111, 129, 103, 0.12)', fill: 'rgba(13, 18, 15, 0.55)', seed: 50, hasSnow: true },
          { base: height * 0.89, scale: 0.95, stroke: 'rgba(111, 129, 103, 0.22)', fill: 'rgba(13, 18, 15, 0.78)', seed: -120, hasSnow: true },
          { base: height * 0.96, scale: 1.15, stroke: 'rgba(111, 129, 103, 0.40)', fill: 'rgba(13, 18, 15, 0.96)', seed: 230, hasSnow: true }
        ];

        ridges.forEach((r) => {
          const rBaseScreenY = getScreenY(r.base);
          if (rBaseScreenY + r.scale * height * 0.4 < -100) return; // Completely scrolled off screen

          // 5.1 Draw Solid Mountain Shape
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 6) {
            let wy = getKanchenjunghaHeight(x, width, height, r.base, r.scale, r.seed);
            const sy = getScreenY(wy);
            
            // Cursor deflection
            const dx = x - mouse.x;
            const dy = sy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            let finalSy = sy;
            if (dist < 180) {
              const push = (180 - dist) / 180 * 12 * (dy / dist);
              finalSy += push;
            }
            ctx.lineTo(x, finalSy);
          }
          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fillStyle = r.fill;
          ctx.fill();

          // 5.2 Draw Snowcaps — Isolated Per-Peak Segments with Off-White Tones
          if (r.hasSnow) {
            const worldSnowLineY = r.base - r.scale * height * 0.17;
            const step = 3;

            // Helper: deflected screen Y (mouse interaction)
            const getDeflectedScreenY = (x, wy) => {
              const sy = getScreenY(wy);
              const dx = x - mouse.x;
              const dy = sy - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              let deflection = 0;
              if (dist < 180) {
                deflection = (180 - dist) / 180 * 12 * (dy / dist);
              }
              return sy + deflection;
            };

            // --- A. Collect snow points, splitting into separate segments per peak ---
            const snowSegments = []; // Array of { top: [], bot: [] }
            let currentSeg = null;

            for (let x = 0; x <= width; x += step) {
              const wy = getKanchenjunghaHeight(x, width, height, r.base, r.scale, r.seed);
              const snowBase = getSnowBase(x, worldSnowLineY, wy);
              if (wy < snowBase) {
                // This point has snow
                const peakY = getDeflectedScreenY(x, wy);
                const baseY = getScreenY(snowBase) + (peakY - getScreenY(wy));
                if (!currentSeg) {
                  currentSeg = { top: [], bot: [] };
                }
                currentSeg.top.push({ x, y: peakY });
                currentSeg.bot.push({ x, y: baseY });
              } else {
                // No snow — close current segment if it exists
                if (currentSeg && currentSeg.top.length > 2) {
                  snowSegments.push(currentSeg);
                }
                currentSeg = null;
              }
            }
            // Don't forget the last segment
            if (currentSeg && currentSeg.top.length > 2) {
              snowSegments.push(currentSeg);
            }

            // --- B. Draw each snow segment independently ---
            snowSegments.forEach((seg) => {
              // Main off-white snow polygon
              ctx.beginPath();
              ctx.moveTo(seg.top[0].x, seg.top[0].y);
              for (let i = 1; i < seg.top.length; i++) {
                ctx.lineTo(seg.top[i].x, seg.top[i].y);
              }
              for (let i = seg.bot.length - 1; i >= 0; i--) {
                ctx.lineTo(seg.bot[i].x, seg.bot[i].y);
              }
              ctx.closePath();

              // Off-white gradient that fades smoothly at the snowline
              const snowGrad = ctx.createLinearGradient(0, seg.top[0].y, 0, seg.bot[0].y);
              snowGrad.addColorStop(0, 'rgba(245, 243, 238, 0.92)');
              snowGrad.addColorStop(0.35, 'rgba(235, 234, 228, 0.88)');
              snowGrad.addColorStop(0.65, 'rgba(220, 225, 232, 0.55)');
              snowGrad.addColorStop(0.85, 'rgba(200, 210, 222, 0.2)');
              snowGrad.addColorStop(1, 'rgba(180, 195, 210, 0.0)');
              ctx.fillStyle = snowGrad;
              ctx.fill();

              // Soft feather at the snowline: draw a blurred duplicate of just the bottom edge zone
              ctx.save();
              // Clip to only the bottom 40% of the snow region for the blur pass
              const blurZoneTop = seg.top[0].y + (seg.bot[0].y - seg.top[0].y) * 0.6;
              ctx.beginPath();
              ctx.rect(seg.top[0].x - 5, blurZoneTop, seg.top[seg.top.length - 1].x - seg.top[0].x + 10, seg.bot[0].y - blurZoneTop + 20);
              ctx.clip();
              ctx.filter = 'blur(6px)';
              // Redraw just the snow polygon in the blur zone
              ctx.beginPath();
              ctx.moveTo(seg.top[0].x, seg.top[0].y);
              for (let i = 1; i < seg.top.length; i++) {
                ctx.lineTo(seg.top[i].x, seg.top[i].y);
              }
              for (let i = seg.bot.length - 1; i >= 0; i--) {
                ctx.lineTo(seg.bot[i].x, seg.bot[i].y);
              }
              ctx.closePath();
              const blurGrad = ctx.createLinearGradient(0, blurZoneTop, 0, seg.bot[0].y);
              blurGrad.addColorStop(0, 'rgba(230, 230, 225, 0.3)');
              blurGrad.addColorStop(1, 'rgba(200, 210, 220, 0.0)');
              ctx.fillStyle = blurGrad;
              ctx.fill();
              ctx.filter = 'none';
              ctx.restore();

              // Shadow overlay on right-facing (descending) slopes
              let shadowStartIdx = -1;
              for (let i = 0; i < seg.top.length - 1; i++) {
                const slope = (seg.top[i + 1].y - seg.top[i].y) / step;
                if (slope > 0.05) {
                  if (shadowStartIdx < 0) shadowStartIdx = i;
                } else if (shadowStartIdx >= 0) {
                  // Draw completed shadow segment
                  ctx.beginPath();
                  for (let j = shadowStartIdx; j <= i; j++) {
                    if (j === shadowStartIdx) ctx.moveTo(seg.top[j].x, seg.top[j].y);
                    else ctx.lineTo(seg.top[j].x, seg.top[j].y);
                  }
                  for (let j = i; j >= shadowStartIdx; j--) {
                    ctx.lineTo(seg.bot[j].x, seg.bot[j].y);
                  }
                  ctx.closePath();
                  ctx.fillStyle = 'rgba(175, 190, 210, 0.35)';
                  ctx.fill();
                  shadowStartIdx = -1;
                }
              }
              // Close any trailing shadow
              if (shadowStartIdx >= 0) {
                const endI = seg.top.length - 1;
                ctx.beginPath();
                for (let j = shadowStartIdx; j <= endI; j++) {
                  if (j === shadowStartIdx) ctx.moveTo(seg.top[j].x, seg.top[j].y);
                  else ctx.lineTo(seg.top[j].x, seg.top[j].y);
                }
                for (let j = endI; j >= shadowStartIdx; j--) {
                  ctx.lineTo(seg.bot[j].x, seg.bot[j].y);
                }
                ctx.closePath();
                ctx.fillStyle = 'rgba(175, 190, 210, 0.35)';
                ctx.fill();
              }

              // Snow texture: speckle dots, wind streaks, and grain
              // Dense speckle dots across the snow surface
              for (let i = 0; i < seg.top.length; i += 6) {
                const midY = (seg.top[i].y + seg.bot[i].y) / 2;
                const dotSeed = ((i * 31 + 7) * 7919) % 1000 / 1000;
                const dotSeed2 = ((i * 43 + 11) * 7919) % 1000 / 1000;
                const dotX = seg.top[i].x + (dotSeed - 0.5) * 8;
                const dotY = midY + (dotSeed2 - 0.4) * (seg.bot[i].y - seg.top[i].y) * 0.6;
                ctx.fillStyle = `rgba(195, 200, 210, ${0.15 + dotSeed * 0.12})`;
                ctx.beginPath();
                ctx.arc(dotX, dotY, 0.5 + dotSeed * 0.7, 0, Math.PI * 2);
                ctx.fill();
              }
              // Wind-streak lines (horizontal wispy marks)
              ctx.strokeStyle = 'rgba(210, 215, 225, 0.14)';
              ctx.lineWidth = 0.4;
              for (let i = 3; i < seg.top.length - 3; i += 18) {
                const streakSeed = ((i * 53 + 19) * 7919) % 1000 / 1000;
                const sy = seg.top[i].y + (seg.bot[i].y - seg.top[i].y) * (0.2 + streakSeed * 0.5);
                ctx.beginPath();
                ctx.moveTo(seg.top[i].x, sy);
                ctx.lineTo(seg.top[i].x + 8 + streakSeed * 12, sy + (streakSeed - 0.5) * 2);
                ctx.stroke();
              }
              // Subtle grain marks (tiny diagonal hatches for snow crystal texture)
              ctx.strokeStyle = 'rgba(185, 195, 210, 0.10)';
              ctx.lineWidth = 0.3;
              for (let i = 1; i < seg.top.length; i += 10) {
                const grainSeed = ((i * 67 + 23) * 7919) % 1000 / 1000;
                const gy = seg.top[i].y + (seg.bot[i].y - seg.top[i].y) * (0.3 + grainSeed * 0.4);
                ctx.beginPath();
                ctx.moveTo(seg.top[i].x, gy);
                ctx.lineTo(seg.top[i].x + 3, gy - 2 + grainSeed * 4);
                ctx.stroke();
              }
            });

            // --- C. Rock Texture between snow segments (scree and ledge lines) ---
            // Draw rock dots and short ledge lines in snow-free high-altitude zones
            for (let x = 0; x < width; x += 8) {
              const wy = getKanchenjunghaHeight(x, width, height, r.base, r.scale, r.seed);
              const snowBase = getSnowBase(x, worldSnowLineY, wy);
              // Only draw rock texture in the zone just below snowline but above the base
              const rockZoneTop = worldSnowLineY + 15;
              const rockZoneBot = worldSnowLineY + height * r.scale * 0.08;
              if (wy >= snowBase && wy < rockZoneBot && wy > r.base - r.scale * height * 0.35) {
                const sy = getScreenY(wy);
                const rockSeed = ((x * 17 + 3) * 7919) % 1000 / 1000;
                // Scree dots
                ctx.fillStyle = `rgba(90, 80, 70, ${0.12 + rockSeed * 0.08})`;
                ctx.beginPath();
                ctx.arc(x + rockSeed * 4, sy + rockSeed * 3, 0.6 + rockSeed * 0.5, 0, Math.PI * 2);
                ctx.fill();
                // Short ledge line (every 3rd)
                if (x % 24 === 0) {
                  ctx.strokeStyle = 'rgba(80, 75, 65, 0.10)';
                  ctx.lineWidth = 0.5;
                  ctx.beginPath();
                  ctx.moveTo(x, sy);
                  ctx.lineTo(x + 6 + rockSeed * 5, sy + 1);
                  ctx.stroke();
                }
              }
            }


          }

          // 5.3 Draw Ridge Outline
          ctx.strokeStyle = r.stroke;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let x = 0; x <= width; x += 10) {
            let wy = getKanchenjunghaHeight(x, width, height, r.base, r.scale, r.seed);
            const sy = getScreenY(wy);
            const dx = x - mouse.x;
            const dy = sy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            let finalSy = sy;
            if (dist < 180) {
              finalSy += (180 - dist) / 180 * 12 * (dy / dist);
            }
            if (x === 0) ctx.moveTo(x, finalSy);
            else ctx.lineTo(x, finalSy);
          }
          ctx.stroke();
        });



        // 7. Core positions setup for lakes and river meanders
        const lakeWorldY = height * 0.82;
        const lakeScreenY = getScreenY(lakeWorldY);
        const lakeX = width * 0.57 + Math.sin(lakeWorldY * 0.05) * 6;

        const fhLakeWorldY = height * 1.2;
        const fhLakeScreenY = getScreenY(fhLakeWorldY);
        const fhLakeX = width * 0.6;

        // 8. Draw Smooth Hills (Foothills zone, Sikkim tea gardens style)
        const drawHills = () => {
          const hillLayers = [
            { base: height * 1.08, scale: 35, freq: 0.003, fill: 'rgba(15, 25, 18, 0.82)', stroke: 'rgba(95, 119, 88, 0.16)' },
            { base: height * 1.25, scale: 22, freq: 0.005, fill: 'rgba(12, 22, 15, 0.95)', stroke: 'rgba(75, 100, 68, 0.28)' }
          ];
          
          hillLayers.forEach((hl) => {
            const hillBaseScreenY = getScreenY(hl.base);
            if (hillBaseScreenY + hl.scale * 1.5 < -100 || getScreenY(hl.base + 100) > height + 100) return;

            ctx.beginPath();
            ctx.moveTo(0, height);
            for (let x = 0; x <= width; x += 10) {
              let wy = hl.base + Math.sin(x * hl.freq) * hl.scale + Math.cos(x * 0.007) * (hl.scale * 0.4);
              const sy = getScreenY(wy);
              ctx.lineTo(x, sy);
            }
            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fillStyle = hl.fill;
            ctx.fill();
            
            ctx.strokeStyle = hl.stroke;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            for (let x = 0; x <= width; x += 10) {
              let wy = hl.base + Math.sin(x * hl.freq) * hl.scale + Math.cos(x * 0.007) * (hl.scale * 0.4);
              const sy = getScreenY(wy);
              if (x === 0) ctx.moveTo(x, sy);
              else ctx.lineTo(x, sy);
            }
            ctx.stroke();
          });
        };
        drawHills();

        // 9. Draw Low-Altitude Plains Terrain Patches
        const drawTerrainPatches = () => {
          const patches = [
            { wy: height * 1.45, wx: width * 0.25, rx: 70, ry: 35, color: 'rgba(85, 115, 80, 0.08)' },
            { wy: height * 1.52, wx: width * 0.75, rx: 85, ry: 45, color: 'rgba(105, 125, 90, 0.08)' },
            { wy: height * 1.68, wx: width * 0.35, rx: 95, ry: 50, color: 'rgba(95, 120, 85, 0.07)' },
            { wy: height * 1.82, wx: width * 0.65, rx: 115, ry: 55, color: 'rgba(80, 110, 75, 0.08)' }
          ];
          
          patches.forEach((p) => {
            const sy = getScreenY(p.wy);
            if (sy > -100 && sy < height + 100) {
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.ellipse(p.wx, sy, p.rx * (width / 1440), p.ry * (height / 900), Math.PI * 0.05, 0, Math.PI * 2);
              ctx.fill();
            }
          });
        };
        drawTerrainPatches();

        // 10. Draw River Body (Filled polygon tracing left & right banks, winding widely from side to side)
        const riverPoints = [
          { wy: height * 0.82, wx: lakeX },                  // Glacial Lake source (starts precisely here)
          { wy: height * 0.94, wx: width * 0.25 },           // Wide meander left
          { wy: height * 1.06, wx: width * 0.75 },           // Wide meander right
          { wy: height * 1.2, wx: fhLakeX },                 // Foothills Lake
          { wy: height * 1.34, wx: width * 0.15 },           // Wide meander left
          { wy: height * 1.52, wx: width * 0.82 },           // Wide meander right
          { wy: height * 1.7, wx: width * 0.12 },            // Wide meander left
          { wy: height * 1.85, wx: width * 0.78 },           // Wide meander right
          { wy: height * 1.95, wx: width * 0.5 }             // Ocean delta apex
        ];

        const getRiverX = (wy) => {
          if (wy <= riverPoints[0].wy) return riverPoints[0].wx;
          if (wy >= riverPoints[riverPoints.length - 1].wy) return riverPoints[riverPoints.length - 1].wx;
          
          let idx = 0;
          for (let j = 0; j < riverPoints.length - 1; j++) {
            if (wy >= riverPoints[j].wy && wy < riverPoints[j + 1].wy) {
              idx = j;
              break;
            }
          }
          
          const p1 = riverPoints[idx];
          const p2 = riverPoints[idx + 1];
          const t = (wy - p1.wy) / (p2.wy - p1.wy);
          const smoothT = (1 - Math.cos(t * Math.PI)) / 2;
          
          const waveFreq = wy < height * 1.35 ? 0.05 : 0.015;
          const waveAmp = wy < height * 1.35 ? 3.5 : 7.0;
          const microNoise = Math.sin(wy * waveFreq - time * 0.08) * waveAmp + Math.cos(wy * 0.02) * 2.5;
          
          return p1.wx + (p2.wx - p1.wx) * smoothT + microNoise;
        };

        const drawRiver = () => {
          const startWY = height * 0.82;
          const endWY = height * 1.95;
          const startScreenY = getScreenY(startWY);
          const endScreenY = getScreenY(endWY);
          
          if (endScreenY < -100 || startScreenY > height + 100) return;

          ctx.beginPath();
          // Left bank going down
          for (let wy = startWY; wy <= endWY; wy += 4) {
            const rx = getRiverX(wy);
            const progress = (wy - startWY) / (endWY - startWY);
            const rWidth = (2.2 + progress * 7.5) * (width / 1440);
            ctx.lineTo(rx - rWidth / 2, getScreenY(wy));
          }
          // Right bank going up
          for (let wy = endWY; wy >= startWY; wy -= 4) {
            const rx = getRiverX(wy);
            const progress = (wy - startWY) / (endWY - startWY);
            const rWidth = (2.2 + progress * 7.5) * (width / 1440);
            ctx.lineTo(rx + rWidth / 2, getScreenY(wy));
          }
          ctx.closePath();
          ctx.fillStyle = 'rgba(72, 132, 122, 0.46)'; // Glacial teal water
          ctx.fill();
          ctx.strokeStyle = 'rgba(111, 129, 103, 0.32)';
          ctx.lineWidth = 1.0;
          ctx.stroke();
        };
        drawRiver();

        // 11. Draw Glacial Lake on top of river start to mask junction
        if (lakeScreenY > -50 && lakeScreenY < height + 50) {
          ctx.fillStyle = 'rgba(72, 209, 204, 0.75)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(lakeX, lakeScreenY, 32 * (width / 1440), 12 * (height / 900), 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        // 12. Draw Foothills Lake on top of hills and river start/ends to mask junction
        if (fhLakeScreenY > -50 && fhLakeScreenY < height + 50) {
          ctx.fillStyle = 'rgba(46, 120, 95, 0.72)'; // Forest Green/Teal
          ctx.strokeStyle = 'rgba(75, 100, 68, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(fhLakeX, fhLakeScreenY, 44 * (width / 1440), 16 * (height / 900), 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        // 13. Draw Organic GIS Isotherms & NDVI Contours (Plains Altitude overlays)
        const drawGISOverlays = () => {
          gisContours.forEach((c, idx) => {
            const cx = idx === 0 ? width * 0.35 : width * 0.7;
            const cy = getScreenY(height * (idx === 0 ? 1.55 : 1.7));
            
            if (cy > -100 && cy < height + 100) {
              ctx.strokeStyle = c.color.replace('0.22', '0.12');
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
              ctx.setLineDash([]);
              
              ctx.font = '400 10px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
              ctx.fillStyle = c.color.replace('0.22', '0.45');
              ctx.textAlign = 'center';
              ctx.fillText(c.label, cx, cy - c.radius * 0.5 - 12);
            }
          });
        };
        drawGISOverlays();

        // 14. Draw Delta Estuary (River mouth splits into 3 branches entering the ocean)
        const drawDelta = () => {
          const deltaStartY = height * 1.95;
          const deltaStartScreenY = getScreenY(deltaStartY);
          const deltaStartX = getRiverX(deltaStartY);
          
          if (deltaStartScreenY < height && deltaStartScreenY > -150) {
            ctx.strokeStyle = 'rgba(72, 132, 122, 0.58)';
            ctx.lineWidth = 1.6;
            
            const numBranches = 3;
            for (let b = 0; b < numBranches; b++) {
              ctx.beginPath();
              ctx.moveTo(deltaStartX, deltaStartScreenY);
              
              for (let wy = deltaStartY; wy <= height * 2.2; wy += 6) {
                const sy = getScreenY(wy);
                const t = (wy - deltaStartY) / (height * 0.25);
                const spreadX = (b - 1) * 65 * t * (width / 1440);
                const winding = Math.sin(wy * 0.05 - time * 0.05 + b) * 10;
                
                ctx.lineTo(deltaStartX + spreadX + winding, sy);
              }
              ctx.stroke();
            }
          }
        };
        drawDelta();

        // 15. Draw Sea-Level Ocean Zone (Rises up during scroll progress)
        const oceanWorldY = height * 1.95;
        const oceanScreenY = getScreenY(oceanWorldY);
        
        if (oceanScreenY < height) {
          const oceanHeight = height - oceanScreenY;
          const oceanOpacity = Math.min(1, Math.max(0, oceanHeight / (height * 0.55)));
          
          if (oceanOpacity > 0.01) {
            const waveLayers = [
              { base: oceanScreenY, amp: 16, freq: 0.008, speed: 0.025, fill: `rgba(12, 30, 48, ${0.45 * oceanOpacity})`, stroke: `rgba(56, 120, 180, ${0.35 * oceanOpacity})` },
              { base: oceanScreenY + 35, amp: 12, freq: 0.012, speed: -0.035, fill: `rgba(9, 24, 42, ${0.65 * oceanOpacity})`, stroke: `rgba(56, 120, 180, ${0.5 * oceanOpacity})` },
              { base: oceanScreenY + 70, amp: 8, freq: 0.018, speed: 0.02, fill: `rgba(5, 15, 30, ${0.92 * oceanOpacity})`, stroke: `rgba(56, 120, 180, ${0.65 * oceanOpacity})` }
            ];

            waveLayers.forEach((w) => {
              ctx.beginPath();
              ctx.moveTo(0, height);
              for (let x = 0; x <= width; x += 10) {
                const y = w.base + Math.sin(x * w.freq + time * w.speed) * w.amp;
                ctx.lineTo(x, y);
              }
              ctx.lineTo(width, height);
              ctx.closePath();
              ctx.fillStyle = w.fill;
              ctx.fill();
              ctx.strokeStyle = w.stroke;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            });

            // Bioluminescent bubbles
            oceanParticles.forEach((p) => {
              if (!reducedMotion) {
                p.y -= p.speedY;
                if (p.y < oceanScreenY) p.y = height + 10;
              }
              const px = p.x + Math.sin(time * p.wobbleSpeed + p.phase) * p.wobbleAmp;
              if (p.y > oceanScreenY) {
                ctx.fillStyle = `rgba(56, 180, 200, ${0.2 * oceanOpacity * Math.abs(Math.sin(time * 0.03 + p.phase))})`;
                ctx.beginPath();
                ctx.arc(px, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
              }
            });
          }
        }
        ctx.restore();
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
      window.removeEventListener('scroll', handleScroll);
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
