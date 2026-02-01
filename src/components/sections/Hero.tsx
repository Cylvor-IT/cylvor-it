"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react"; // Import Icon

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current || !container.current) return;

    // 1. HORIZONTAL SCROLL LOGIC
    const getScrollAmount = () => {
      const scrollWidth = textRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      return -(scrollWidth - windowWidth);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        pinSpacing: true,
        scrub: 1, 
        start: "top top",
        end: "+=3000",
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });

    tl.to(textRef.current, {
      x: () => getScrollAmount(),
      ease: "none",
    });

    // 2. FADE OUT TOP ELEMENTS ON SCROLL
    gsap.to([".hero-top-content", ".hero-center-visual"], {
      opacity: 0,
      y: -100,
      scale: 0.8,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "500px top",
        scrub: true,
      }
    });

    // 3. SPINNING ANIMATION FOR BADGE
    gsap.to(".spin-text", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
    });

  }, { scope: container });

  return (
    <section 
      ref={container} 
      id="hero" 
      className="h-screen w-full relative flex flex-col justify-between bg-black overflow-hidden pt-24 pb-4 md:pt-32 md:pb-10"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- TOP HEADER (Left & Right) --- */}
      <div className="hero-top-content relative z-10 px-6 md:px-12 flex justify-between items-start w-full">
        {/* Left: Tagline */}
        <div className="flex flex-col gap-4 max-w-xs">
           <div className="h-[2px] w-12 bg-red-600" />
           <p className="font-sans text-xs md:text-sm text-zinc-400 uppercase tracking-[0.2em] leading-relaxed">
             Creative Digital Agency <br/> Est. {new Date().getFullYear()}
           </p>
        </div>

        {/* Right: Number */}
        <div className="hidden md:block">
           <span className="text-6xl md:text-8xl font-black text-transparent stroke-white/20 font-oswald select-none" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
             01
           </span>
        </div>
      </div>

      {/* --- CENTER VISUAL FILLER (NEW) --- */}
      <div className="hero-center-visual absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-0 flex flex-col items-center justify-center pointer-events-none">
        
        {/* 1. Spinning Circular Badge */}
        <div className="relative w-40 h-40 md:w-56 md:h-56 opacity-80">
          <svg className="spin-text w-full h-full" viewBox="0 0 100 100">
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="transparent"
            />
            <text className="fill-white font-oswald text-[11px] uppercase tracking-[0.25em] font-bold">
              <textPath href="#circlePath" startOffset="0%">
                • Cylvor IT • Cylvor IT
              </textPath>
            </text>
          </svg>
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
          </div>
        </div>

        {/* 2. Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 animate-bounce opacity-50">
           <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-sans">Scroll</span>
           <ArrowDown className="w-4 h-4 text-zinc-500" />
        </div>
      </div>

      {/* --- BOTTOM SCROLLING TEXT --- */}
      <div className="w-full relative z-10 flex items-end h-full pointer-events-none">
        <h1 
          ref={textRef} 
          className="text-[22vh] md:text-[30vh] leading-[0.9] font-black text-white whitespace-nowrap font-oswald uppercase tracking-tighter will-change-transform px-[10vw] select-none flex items-end"
        >
          Transforming Ideas Into Digital Reality
        </h1>
      </div>
    </section>
  );
}