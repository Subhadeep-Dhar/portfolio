'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef();
  const { mouse, viewport } = useThree();
  const scrollRef = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once to set initial position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate a realistic 3D spiral galaxy
  const { positions, colors } = useMemo(() => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const count = isMobile ? 600 : 1500; // Drastically reduced for mobile
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Core color: warm starlight, Outer color: deep space blue
    const colorInside = new THREE.Color("#ffb380"); 
    const colorOutside = new THREE.Color("#1b3984"); 

    const radius = 30;
    const branches = 4; // 4 arms for a fuller galaxy
    const spin = 1.5; // More twist
    const randomness = 6; // Much more scattered
    const randomnessPower = 2; // Less crushed to the perfect line

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // 25% of particles are ambient deep space stars completely surrounding the galaxy
      const isAmbient = i > count * 0.75; 

      if (isAmbient) {
        // Widely scattered deep space stars
        positions[i3] = (Math.random() - 0.5) * radius * 4;
        positions[i3 + 1] = (Math.random() - 0.5) * radius * 4;
        positions[i3 + 2] = (Math.random() - 0.5) * radius * 4;

        // Dimmer, deep blue stars for the background
        colors[i3] = colorOutside.r * 0.8;
        colors[i3 + 1] = colorOutside.g * 0.8;
        colors[i3 + 2] = colorOutside.b * 0.8;
      } else {
      // Math.sqrt pulls more particles towards the outer edges instead of grouping at the center
      const r = Math.sqrt(Math.random()) * radius;
      const spinAngle = r * spin;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      // Curve the randomness so dust clusters closer to the arms but remains scattered
      // Massively increase the Y scatter (thickness) so particles float up around the camera
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * (r / radius + 0.5);
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * (randomness * 2.5) * (r / radius + 0.5); 
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * (r / radius + 0.5);

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY; 
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

        // Interpolate color based on distance from core
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, r / radius);
        
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }
    }
    
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Base slow rotation
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      // Gentle parallax reacting to mouse pointer (GSAP-like buttery smooth target easing)
      const targetX = (mouse.x * viewport.width) / 100;
      const targetY = (mouse.y * viewport.height) / 100;
      
      // Link scroll position to Z-axis rotation for a spinning galaxy effect
      const targetZ = scrollRef.current * Math.PI * 3; // Spin 1.5 times over full page scroll
      
      ref.current.rotation.x += 0.02 * (targetY - ref.current.rotation.x);
      ref.current.rotation.y += 0.02 * (targetX - ref.current.rotation.y);
      ref.current.rotation.z += 0.03 * (targetZ - ref.current.rotation.z);
    }
  });

  return (
    <group rotation={[Math.PI * 0.15, 0, Math.PI / 4]}>
      <points ref={ref} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            count={positions.length / 3} 
            array={positions} 
            itemSize={3} 
          />
          <bufferAttribute 
            attach="attributes-color" 
            count={colors.length / 3} 
            array={colors} 
            itemSize={3} 
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
        />
      </points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-transparent">
      <Canvas 
        camera={{ position: [0, 0, 10] }} 
        dpr={1} 
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <ParticleField />
      </Canvas>
      {/* Vignette Overlay for cinematic feel, completely neutral black alpha */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
