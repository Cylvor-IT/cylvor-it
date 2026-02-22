"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current || !container.current) return;

    const mm = gsap.matchMedia();

    // --- DESKTOP VIEW ONLY (Animations remain exactly the same) ---
    mm.add("(min-width: 768px)", () => {
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
          scrub: 0.5,
          start: "top top",
          end: "+=2000",
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
    });

    // Mobile has no GSAP scroll logic, it acts normally.

    return () => mm.revert();
  }, { scope: container });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={container}
      id="hero"
      // Mobile: uses h-[100svh] for full viewport height
      // Desktop: uses h-screen and justify-end (unchanged)
      className="h-[100svh] md:h-screen w-full relative flex flex-col justify-center md:justify-end bg-transparent overflow-hidden pt-32 pb-12 md:pt-32 md:pb-10"
    >
      {/* --- CENTER VISUAL --- */}
      {/* Mobile: relative flow so it centers nicely */}
      {/* Desktop: absolute positioning (unchanged) */}
      <div className="hero-center-visual relative md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-[60%] z-20 flex flex-col items-center justify-center text-center w-full max-w-2xl px-4 md:px-6 mx-auto md:mt-0">
        <div className="mb-12 md:mb-16 flex flex-col items-center gap-4 md:gap-6">

          <p className="font-sans text-white text-sm md:text-base uppercase tracking-[0.2em]">
            Next Generation Experience
          </p>

          <h2 className="text-6xl md:text-6xl font-oswald font-bold text-white uppercase leading-tight">
            We Build <br />
            <span className="text-white">
              Digital Excellence
            </span>
          </h2>

          <MagneticWrapper strength={0.4} range={100}>
            <button
              onClick={() => scrollToSection('services')}
              className="relative flex items-center gap-3 px-8 py-3 md:px-10 md:py-4 mt-2 md:mt-4 bg-lime-400 text-black text-sm md:text-base font-bold uppercase tracking-wider transition-all font-oswald shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:shadow-[0_0_35px_rgba(163,230,53,0.6)] overflow-hidden group"
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
          </MagneticWrapper>

        </div>

        <MagneticWrapper strength={0.2} range={60}>
          <div className="flex flex-col items-center gap-2 md:gap-3 animate-bounce opacity-80">
            <span className="text-[10px] uppercase tracking-[0.3em] text-lime-400 font-bold font-sans">Scroll</span>
            <ArrowDown className="w-4 h-4 text-lime-400" />
          </div>
        </MagneticWrapper>
      </div>

      {/* --- BOTTOM TEXT --- */}
      {/* Added 'hidden md:flex' to completely hide this block on mobile screens */}
      <div className="hidden md:flex w-full relative z-10 items-end px-4 md:px-0">
        <h1
          ref={textRef}
          className="md:text-[30vh] md:leading-[0.9] font-black text-white md:whitespace-nowrap md:text-left font-oswald uppercase tracking-tighter will-change-transform md:pl-[10vw] select-none items-end mx-auto md:mx-0"
        >
          Transforming Ideas Into Digital Reality
        </h1>
      </div>
    </section>
  );
}