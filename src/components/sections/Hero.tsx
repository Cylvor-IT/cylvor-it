"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current || !container.current) return;

    const getScrollAmount = () => {
      const scrollWidth = textRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      
      return -(scrollWidth - windowWidth + (windowWidth * 0.5));
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        pinSpacing: true,
        scrub: 1, 
        start: "top top",
        end: "+=4000",
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });

    tl.to(textRef.current, {
      x: () => getScrollAmount(),
      ease: "none",
    });

    gsap.to(".hero-center-visual", {
      opacity: 0,
      y: -50,
      scale: 0.95,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "300px top",
        scrub: true,
      }
    });

  }, { scope: container });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      ref={container} 
      id="hero" 
      className="h-screen w-full relative flex flex-col justify-end bg-transparent overflow-hidden pt-24 pb-4 md:pt-32 md:pb-10"
    >
      {/* --- CENTER VISUAL --- */}
      <div className="hero-center-visual absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-20 flex flex-col items-center justify-center text-center w-full max-w-2xl px-6">
        <div className="mb-16 flex flex-col items-center gap-6">
          
          <p className="font-sans text-white text-sm md:text-base uppercase tracking-[0.2em]">
            Next Generation Experience
          </p>
          
          <h2 className="text-4xl md:text-6xl font-oswald font-bold text-white uppercase leading-tight">
            We Build <br />
            <span className="text-white">
              Digital Excellence
            </span>
          </h2>
          
          {/* --- UPDATED BUTTON --- */}
          {/* Removed clipPath style to make it a standard rectangle */}
          <button
            onClick={() => scrollToSection('services')}
            className="relative flex items-center gap-3 px-10 py-4 mt-4 bg-lime-400 text-black text-sm md:text-base font-bold uppercase tracking-wider transition-all font-oswald shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:shadow-[0_0_35px_rgba(163,230,53,0.6)] overflow-hidden group"
          >
            {/* 1. SLIDING BACKGROUND (White) */}
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            
            {/* 2. CONTENT */}
            <div className="relative z-10 flex items-center gap-3 group-hover:text-lime-400 transition-colors duration-300">
              <span>Discover More</span>
              
              {/* ICON SWAP ANIMATION */}
              <div className="relative w-5 h-5 overflow-hidden flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 absolute transition-transform duration-300 group-hover:-translate-y-[150%] group-hover:translate-x-[150%]" />
                <ArrowUpRight className="w-5 h-5 absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
              </div>
            </div>
          </button>

        </div>

        <div className="flex flex-col items-center gap-3 animate-bounce opacity-80">
           <span className="text-[10px] uppercase tracking-[0.3em] text-lime-400 font-bold font-sans">Scroll</span>
           <ArrowDown className="w-4 h-4 text-lime-400" />
        </div>
      </div>

      {/* --- BOTTOM SCROLLING TEXT --- */}
      <div className="w-full relative z-10 flex items-end">
        <h1 
          ref={textRef} 
          className="text-[22vh] md:text-[30vh] leading-[0.9] font-black text-white whitespace-nowrap font-oswald uppercase tracking-tighter will-change-transform pl-[10vw] select-none flex items-end"
        >
          Transforming Ideas Into Digital Reality
        </h1>
      </div>
    </section>
  );
}