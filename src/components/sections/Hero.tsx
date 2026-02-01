"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current || !container.current) return;

    const getScrollAmount = () => {
      const scrollWidth = textRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      
      // Calculates distance to move text so "Reality" centers in the screen
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
      {/* REMOVED: Static Gradient Ambience Div */}

      {/* --- CENTER VISUAL --- */}
      <div className="hero-center-visual absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-20 flex flex-col items-center justify-center text-center w-full max-w-2xl px-6">
        <div className="mb-16 flex flex-col items-center gap-6">
          {/* UPDATED: text-white */}
          <p className="font-sans text-white text-sm md:text-base uppercase tracking-[0.2em]">
            Next Generation Agency
          </p>
          
          {/* UPDATED: All text white, removed gradient span */}
          <h2 className="text-4xl md:text-6xl font-oswald font-bold text-white uppercase leading-tight">
            We Build <br />
            <span className="text-white">
              Digital Excellence
            </span>
          </h2>
          
          <Button 
            onClick={() => scrollToSection('services')}
            className="mt-2 font-oswald tracking-widest text-xs py-4 px-8"
          >
            Discover More
          </Button>
        </div>

        <div className="flex flex-col items-center gap-3 animate-bounce opacity-80">
           {/* UPDATED: text-red-600 */}
           <span className="text-[10px] uppercase tracking-[0.3em] text-red-600 font-bold font-sans">Scroll</span>
           {/* UPDATED: Arrow color to match */}
           <ArrowDown className="w-4 h-4 text-red-600" />
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