"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Clouds, Cloud } from "@react-three/drei";
import * as THREE from "three";

// --- 1. INTERACTIVE MOUSE LIGHT (The "Flashlight") ---
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null!);
  
  useFrame((state) => {
    // state.pointer.x / .y are normalized (-1 to 1)
    // We map them to the 3D world coordinates
    // z=5 places the light slightly in front of the clouds
    if (lightRef.current) {
        // Smoothly lerp (interpolate) the light position for a lag-free feel
        lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, state.pointer.x * 20, 0.1);
        lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, state.pointer.y * 10, 0.1);
        lightRef.current.position.z = 5; 
    }
  });

  return (
    <pointLight 
      ref={lightRef} 
      distance={20} 
      decay={2} 
      intensity={8} // High intensity to make the clouds glow
      color="#ffffff" 
    />
  );
}

// --- 2. BALANCED ATMOSPHERE (With Tilt) ---
function BalancedAtmosphere() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
       // A. Constant gentle flow
       groupRef.current.rotation.z = Math.sin(t * 0.05) * 0.02;

       // B. Mouse Interaction (Tilt)
       // We tilt the whole cloud group slightly towards the mouse
       const targetX = -state.pointer.y * 0.1; // Tilt up/down
       const targetY = state.pointer.x * 0.1;  // Tilt left/right
       
       groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
       groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Clouds material={THREE.MeshBasicMaterial}>
        
        {/* Base Mist */}
        <Cloud 
          seed={1}
          segments={30} 
          bounds={[30, 10, 5]} 
          volume={20} 
          color="#ffffff" 
          opacity={0.05}
          position={[0, 0, -10]}
          speed={0.1} 
        />

        {/* Left Anchor */}
        <Cloud 
          seed={2}
          segments={30} 
          bounds={[10, 5, 2]} 
          volume={8} 
          color="#eaeaea" 
          opacity={0.12}
          position={[-12, 2, -8]} 
          speed={0.5} 
        />

        {/* Right Anchor */}
        <Cloud 
          seed={3}
          segments={30} 
          bounds={[10, 5, 2]} 
          volume={8} 
          color="#eaeaea" 
          opacity={0.12}
          position={[12, -2, -8]} 
          speed={0.5} 
        />

        {/* Central Flow */}
        <Cloud 
          seed={4}
          segments={40} 
          bounds={[20, 4, 2]} 
          volume={12} 
          color="#ffffff" 
          opacity={0.15}
          position={[0, 0, -5]} 
          speed={1.0} 
          scale={1.2}
        />

      </Clouds>
    </group>
  );
}

// --- MAIN SCENE ---
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.z = 18 + Math.sin(t * 0.1) * 1;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D() {
  // We need to grab the window/body to listen for events, 
  // since the canvas is behind everything and has pointer-events-none.
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 55 }}
        gl={{ antialias: false }}
        // IMPORTANT: Tells the canvas to listen to mouse events on the BODY,
        // ignoring the fact that the canvas itself is covered by other divs.
        eventSource={eventSource}
        eventPrefix="client"
      >
        <CameraRig />
        
        {/* Base Ambient Light */}
        <ambientLight intensity={0.5} color="#ffffff" />
        
        {/* The New Interactive "Flashlight" */}
        <MouseLight />
        
        {/* The Responsive Clouds */}
        <BalancedAtmosphere />

      </Canvas>
    </div>
  );
}