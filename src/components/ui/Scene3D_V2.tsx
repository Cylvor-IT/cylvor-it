"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- THE NEURAL WAVE COMPONENT ---
function NeuralWave({ count = 8000 }) { // 8000 particles for high density
  const meshRef = useRef<THREE.Points>(null!);
  
  // 1. Generate the initial grid of particles
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Create a spread-out grid
    const side = Math.sqrt(count); 
    const spacing = 0.5; // Distance between dots
    const offset = (side * spacing) / 2;

    for (let i = 0; i < count; i++) {
      const x = (i % side) * spacing - offset;
      const z = Math.floor(i / side) * spacing - offset;
      const y = 0; // Flat initially

      // Set Positions
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;

      // Set Initial Colors (White/Grey)
      colors[i * 3] = 1;     // R
      colors[i * 3 + 1] = 1; // G
      colors[i * 3 + 2] = 1; // B
    }
    return { positions: temp, colors };
  }, [count]);

  // Reusable objects to save memory/garbage collection
  const dummyColor = useMemo(() => new THREE.Color(), []);
  
  // --- ANIMATION LOOP ---
  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const colors = meshRef.current.geometry.attributes.color.array as Float32Array;
    
    // Mouse Position in 3D space (approximate projection)
    const mx = state.pointer.x * 25;
    const my = state.pointer.y * 25;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = particles.positions[i3]; // Original X
      const z = particles.positions[i3 + 2]; // Original Z

      // 1. BASE WAVE MOTION (Mathematical Sine/Cosine flow)
      // Creates a rolling ocean-like effect
      let y = Math.sin(x * 0.3 + t) * Math.cos(z * 0.3 + t) * 2;
      
      // 2. MOUSE INTERACTION (Magnetic Pull)
      // Calculate distance from particle to mouse
      const dist = Math.sqrt(Math.pow(x - mx, 2) + Math.pow(z + my, 2)); // z + my because screen Y is inverted in 3D Z somewhat
      
      // If mouse is close, pull the particle UP
      const influenceRadius = 6;
      if (dist < influenceRadius) {
        const force = (influenceRadius - dist) / influenceRadius; // 0 to 1 strength
        y += force * 5; // Lift up by 5 units
      }

      // Update Position
      positions[i3 + 1] = y;

      // 3. COLOR DYNAMICS
      // Base color: Dim Grey/White
      // Peak/Mouse color: Brand Green (#a3e635)
      
      // If the particle is high up (either from wave or mouse), turn it green
      const height = y; // -2 to +7 range approx
      
      if (height > 2) {
         // High Point -> GREEN
         dummyColor.set("#a3e635");
         // Lerp towards green based on height
         colors[i3] = 0.64; // R (approx for #a3e635)
         colors[i3 + 1] = 0.9; // G
         colors[i3 + 2] = 0.2; // B
      } else {
         // Low Point -> WHITE/GREY fade
         // Make it darker when low for depth
         const darkness = 0.3 + ((height + 2) / 4) * 0.5; // range 0.3 to 0.8
         colors[i3] = darkness;
         colors[i3 + 1] = darkness;
         colors[i3 + 2] = darkness;
      }
    }

    // Tell Three.js the data has changed
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.12} // Dot size
        vertexColors // Use the colors array we calculated
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
}

// --- MAIN SCENE ---
export default function Scene3D_V3() {
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        // Camera looking down at an angle for a "landscape" view
        camera={{ position: [0, 15, 20], fov: 45 }} 
        gl={{ antialias: true }}
        eventSource={eventSource}
        eventPrefix="client"
      >
        {/* Fog creates the "Infinite Distance" fade effect */}
        <fog attach="fog" args={['#000000', 10, 50]} />
        
        <NeuralWave />

      </Canvas>
    </div>
  );
}