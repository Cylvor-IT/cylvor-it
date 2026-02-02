"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const container = useRef(null);
  const equalizerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // --- 1. SETUP ---
    gsap.set(".shutter", { yPercent: 0 });
    
    // Setup Spinner: 
    // Radius 48 -> Circumference ~= 301.59 (use 302)
    // Rotate -90 to start filling from the top center
    gsap.set(".spinner-active", { 
        transformOrigin: "50% 50%", 
        strokeDasharray: 302,
        strokeDashoffset: 302, // Start completely empty
        rotation: -90 
    });
    
    // --- 2. LOADING ANIMATIONS ---
    
    // 2a. Spinner Fill (Draws the circle)
    tl.to(".spinner-active", {
        strokeDashoffset: 0, // Animate to full
        duration: 2.5,
        ease: "power2.inOut",
    }, "start");

    // 2b. Equalizer Animation (Data processing effect)
    const bars = equalizerRef.current ? (equalizerRef.current as HTMLDivElement).children : [];
    
    // Independent animation for bars so it doesn't block the timeline
    gsap.to(bars, {
      scaleY: "random(0.4, 1.5)",
      duration: 0.15,
      repeat: 16, // Runs for about 2.5s to match fill
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        amount: 0.2,
        from: "center",
      }
    });

    // --- 3. EXIT SEQUENCE ---
    // Start exit just as fill completes
    const exitLabel = "exit";

    // Flatten equalizer bars
    tl.to(bars, {
      scaleY: 0.1,
      duration: 0.3,
      ease: "power2.out",
    }, exitLabel);
    
    // Fade out Logo & Spinner
    tl.to(".preloader-logo-container", {
      opacity: 0,
      scale: 0.8,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
    }, exitLabel);

    // Expand equalizer line then fade
    tl.to(equalizerRef.current, {
      gap: 0,
      scaleX: 5,
      opacity: 0,
      duration: 0.4,
      ease: "expo.in",
    }, exitLabel);

    // --- 4. THE SHUTTER REVEAL ---
    // Slide shutters UP
    tl.to(".shutter", {
      yPercent: -100,
      duration: 1.2,
      stagger: 0.06,
      ease: "expo.inOut",
    }, "+=0.1");

    // --- 5. CLEANUP ---
    tl.set(container.current, { display: "none" });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* --- BACKGROUND SHUTTERS --- */}
      <div className="absolute inset-0 flex h-full w-full pointer-events-auto">
        {[...Array(5)].map((_, i) => (
           <div 
             key={i} 
             // UPDATED: Much Darker Gradient.
             // From Black (zinc-950) to very dark green (lime-950/20) back to Black.
             className="shutter h-full w-1/5 bg-gradient-to-b from-zinc-950 via-[#0a1200] to-zinc-950 relative border-r border-white/5 last:border-r-0"
           >
             {/* Subtle Texture overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:100%_40px] opacity-20" />
           </div>
        ))}
      </div>
      
      {/* --- FOREGROUND CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
        
        {/* LOGO & LOADING RING CONTAINER */}
        <div className="preloader-logo-container mb-16 relative w-32 h-32 flex items-center justify-center">
           
           {/* Subtle center glow */}
           <div className="absolute inset-0 bg-lime-400 blur-3xl opacity-10 rounded-full" />
           
           {/* SVG Loading Ring */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100">
               <defs>
                   <linearGradient id="spinner-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="#a3e635" stopOpacity="0.2" />
                       <stop offset="100%" stopColor="#a3e635" stopOpacity="1" />
                   </linearGradient>
               </defs>
               
               {/* Background Track (Dark Grey) */}
               <circle cx="50" cy="50" r="48" fill="none" stroke="#ffffff10" strokeWidth="1" />
               
               {/* Active Filling Ring */}
               <circle 
                 className="spinner-active"
                 cx="50" cy="50" r="48" 
                 fill="none" 
                 stroke="url(#spinner-grad)" 
                 strokeWidth="2"
                 strokeLinecap="round"
                 // strokeDasharray & offset set in GSAP
                 style={{ filter: "drop-shadow(0 0 8px rgba(163,230,53,0.4))" }}
               />
           </svg>

           {/* The Logo */}
           <Image
             src="/assets/logo.svg"
             alt="Cylvor IT"
             width={80}
             height={80}
             className="w-16 h-16 md:w-20 md:h-20 object-contain relative z-10"
             priority
           />
        </div>

        {/* --- THE EQUALIZER LOADER --- */}
        <div ref={equalizerRef} className="flex gap-2 h-16 items-center justify-center">
          {[...Array(5)].map((_, i) => (
             <div 
               key={i} 
               className="w-2 md:w-3 bg-lime-400 h-full rounded-sm shadow-[0_0_10px_rgba(163,230,53,0.6)]"
               style={{ height: '40px' }}
             />
          ))}
        </div>

      </div>

    </div>
  );
}