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
    const bars = equalizerRef.current ? (equalizerRef.current as HTMLDivElement).children : [];

    // --- 1. SETUP ---
    gsap.set(".shutter", { yPercent: 0 });
    gsap.set(".corner-bracket", { opacity: 0, scale: 0.8 }); // Initial state for corners

    // --- 2. ANIMATION SEQUENCE ---

    // 2a. Intro: Corners Fade In & Scale
    gsap.to(".corner-bracket", {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1
    });

    // 2b. Pulse Effect (Continuous)
    gsap.to(".pulse-ring", {
      scale: 1.5,
      opacity: 0,
      duration: 2,
      repeat: -1,
      ease: "power1.out"
    });

    // 2c. Equalizer: Continuous random movement
    gsap.to(bars, {
      scaleY: "random(0.4, 1.5)",
      duration: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        amount: 0.1,
        from: "center",
      }
    });

    // Main Loading Sequence
    tl.to(".spinner-active", {
      strokeDashoffset: 0,
      duration: 3.5,
      ease: "power2.inOut",
    })

      // Exit sequence starts
      .to([".preloader-content", ".corner-bracket"], { // Fade out content AND corners
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.in",
      }, "+=0.2");

    // --- 3. REVEAL (The 5 Columns) ---
    tl.to(".shutter", {
      yPercent: -100,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.inOut",
    }, "-=0.2");

    // Cleanup
    tl.set(container.current, { display: "none" });

  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* --- BACKGROUND SHUTTERS (5 Columns) --- */}
      <div className="absolute inset-0 flex h-full w-full pointer-events-auto">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="shutter relative h-full w-1/5 bg-zinc-950 border-r border-zinc-900/30 last:border-r-0"
          >
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
          </div>
        ))}
      </div>

      {/* --- CORNER ACCENTS --- */}
      <div className="corner-bracket absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-lime-500/50 rounded-tl-lg z-20" />
      <div className="corner-bracket absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-lime-500/50 rounded-tr-lg z-20" />
      <div className="corner-bracket absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-lime-500/50 rounded-bl-lg z-20" />
      <div className="corner-bracket absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-lime-500/50 rounded-br-lg z-20" />

      {/* --- CONTENT CONTAINER --- */}
      <div className="preloader-content relative z-10 flex flex-col items-center justify-center">

        {/* LOGO & CIRCLE */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-10">

          {/* Main Glow */}
          <div className="absolute inset-0 bg-lime-500/10 blur-3xl rounded-full" />

          {/* Animated Pulse Ring */}
          <div className="pulse-ring absolute inset-0 border border-lime-500/30 rounded-full" />

          {/* SVG Ring */}
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
            {/* Track */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="#2a2a2a" strokeWidth="1" />
            {/* Active Fill */}
            <circle
              className="spinner-active"
              cx="50" cy="50" r="45"
              fill="none"
              stroke="#84cc16"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 8px rgba(132,204,22,0.6))",
                strokeDasharray: 283,
                strokeDashoffset: 283
              }}
            />
          </svg>

          {/* Brand Logo */}
          <div className="relative z-10 w-32 h-32 bg-zinc-950 rounded-full flex items-center justify-center border border-zinc-800">
            <Image
              src="/assets/logo.svg"
              alt="Cylvor"
              width={80}
              height={80}
              className="w-20 h-20 object-contain opacity-90"
              priority
            />
          </div>
        </div>

        {/* EQUALIZER */}
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