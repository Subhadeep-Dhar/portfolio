'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Generate safe unicode characters dynamically
const generateUniqueSymbols = () => {
  const ranges = [
    [0x0985, 0x09B9], // Bengali
    [0x0904, 0x0939], // Devanagari (Hindi)
    [0x0B85, 0x0BB9], // Tamil
    [0x0C05, 0x0C39], // Telugu
    [0x0D05, 0x0D39], // Malayalam
    [0x0C85, 0x0CB9], // Kannada
    [0x0A85, 0x0AB9], // Gujarati
    [0x0A05, 0x0A39], // Gurmukhi (Punjabi)
    [0x0B05, 0x0B39], // Odia
    [0x03B1, 0x03C9], // Greek
    [0x0410, 0x042F], // Cyrillic
    [0x3041, 0x3096], // Hiragana
    [0x4E00, 0x4E50]  // Chinese/Kanji
  ];
  let chars = [];
  for (const [start, end] of ranges) {
    for (let code = start; code <= end; code++) {
      chars.push(String.fromCharCode(code));
    }
  }
  // Shuffle to randomize
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.slice(0, 500); // Limit exactly to 500 for safety
};

const allSymbols = generateUniqueSymbols();

function ParticleField() {
  const ref = useRef();

  // 1. Generate OS-native font textures asynchronously (Zero main-thread lag)
  const [symbolTextures, setSymbolTextures] = useState([]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const textures = [];
    let i = 0;
    
    // Chunk generation into 25 canvas creations per frame to keep the bootloader 60fps
    const generateChunk = () => {
      const end = Math.min(i + 25, allSymbols.length);
      for (; i < end; i++) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 40px sans-serif'; 
        ctx.fillText(allSymbols[i], 32, 34);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        textures.push(texture);
      }
      
      if (i < allSymbols.length) {
        requestAnimationFrame(generateChunk); // Yield to browser to draw frame
      } else {
        setSymbolTextures(textures);
      }
    };
    
    // Start generating asynchronously
    requestAnimationFrame(generateChunk);
  }, []);

  // 2. Generate 3D Positions & Colors
  const { positions, colors, textData } = useMemo(() => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const count = isMobile ? 400 : 1000; 
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const textData = [];
    
    const colorInside = new THREE.Color("#ffb380"); 
    const colorOutside = new THREE.Color("#d4a373"); 

    const radius = 30;
    const branches = 4;
    const spin = 1.5;
    const randomness = 6;
    const randomnessPower = 2;

    const generatePos = (i, totalCount) => {
      const isAmbient = i > totalCount * 0.75;
      if (isAmbient) {
        return [
          (Math.random() - 0.5) * radius * 4,
          (Math.random() - 0.5) * radius * 4,
          (Math.random() - 0.5) * radius * 4
        ];
      } else {
        const r = Math.sqrt(Math.random()) * radius;
        const spinAngle = r * spin;
        const branchAngle = ((i % branches) / branches) * Math.PI * 2;
        const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * (r / radius + 0.5);
        const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * (randomness * 2.5) * (r / radius + 0.5); 
        const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * (r / radius + 0.5);
        return [
          Math.cos(branchAngle + spinAngle) * r + randomX,
          randomY,
          Math.sin(branchAngle + spinAngle) * r + randomZ
        ];
      }
    };

    const getColor = (r) => {
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, r / radius);
      return mixedColor;
    };

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const [x, y, z] = generatePos(i, count);
      const isAmbient = i > count * 0.75;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      if (isAmbient) {
        colors[i3] = colorOutside.r * 0.8;
        colors[i3 + 1] = colorOutside.g * 0.8;
        colors[i3 + 2] = colorOutside.b * 0.8;
      } else {
        const r = Math.sqrt(x*x + z*z);
        const col = getColor(r);
        colors[i3] = col.r;
        colors[i3 + 1] = col.g;
        colors[i3 + 2] = col.b;
      }
    }

    const textCount = isMobile ? 250 : 500;
    for (let i = 0; i < textCount; i++) {
      const [x, y, z] = generatePos(i, textCount);
      const isAmbient = i > textCount * 0.75;
      
      const r = Math.sqrt(x*x + z*z);
      const col = isAmbient ? new THREE.Color(colorOutside).multiplyScalar(0.8) : getColor(r);
      
      textData.push({
        position: [x, y, z],
        color: col,
        scale: 0.4 + Math.random() * 0.6
      });
    }
    
    return { positions, colors, textData };
  }, []);

  

  // Deterministic damping states
  const maxScrollRef = useRef(1);
  const dampedScroll = useRef(0);
  const dampedMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    // Zero-overhead resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === document.body) {
          const newHeight = entry.contentRect.height - window.innerHeight;
          maxScrollRef.current = newHeight > 0 ? newHeight : 1;
        }
      }
    });

    resizeObserver.observe(document.body);
    
    const handleResize = () => {
      const height = document.body.scrollHeight - window.innerHeight;
      maxScrollRef.current = height > 0 ? height : 1;
    };
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // 1. Read scroll directly without firing DOM events (100% zero latency)
      const currentScrollRaw = window.scrollY / maxScrollRef.current;
      
      // 2. Frame-independent mathematical damping (removes all variable refresh rate jitter)
      dampedScroll.current = THREE.MathUtils.damp(dampedScroll.current, currentScrollRaw, 25, delta);
      
      const mx = state.pointer ? state.pointer.x : state.mouse.x || 0;
      const my = state.pointer ? state.pointer.y : state.mouse.y || 0;
      dampedMouse.current.x = THREE.MathUtils.damp(dampedMouse.current.x, mx, 4, delta);
      dampedMouse.current.y = THREE.MathUtils.damp(dampedMouse.current.y, my, 4, delta);

      // 3. Absolute deterministic rotation
      const time = state.clock.elapsedTime;
      
      ref.current.rotation.x = (-time / 10) + ((dampedMouse.current.y * state.viewport.height) / 100);
      ref.current.rotation.y = (-time / 15) + ((dampedMouse.current.x * state.viewport.width) / 100);
      ref.current.rotation.z = dampedScroll.current * Math.PI * 3;
    }
  });

  return (
    <group rotation={[Math.PI * 0.15, 0, Math.PI / 4]}>
      <group ref={ref}>
        {/* Core Galaxy Particles */}
        <points frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.15} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} vertexColors={true} transparent={true} opacity={0.6} />
        </points>

        {/* 500 Beautiful OS-Native Sprites representing global languages */}
        {symbolTextures.length > 0 && textData.map((data, idx) => (
          <sprite key={idx} position={data.position} scale={[data.scale, data.scale, 1]}>
            <spriteMaterial 
              map={symbolTextures[idx % symbolTextures.length]} 
              color={data.color} 
              transparent={true} 
              opacity={0.8} 
              depthWrite={false} 
              blending={THREE.AdditiveBlending} 
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-transparent">
      <Canvas camera={{ position: [0, 0, 10] }} dpr={1} gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}>
        <ParticleField />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
