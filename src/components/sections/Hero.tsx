"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../ui/Button";

export default function Hero() {
  const container = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
      .from(subRef.current, { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
      .from(btnRef.current, { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");
      
  }, { scope: container });

  return (
    <section id="hero" ref={container} className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 sm:pt-28 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-black to-black">
      
      {/* Background Glow Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/20 blur-[100px] rounded-full pointer-events-none" />

      <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight relative z-10">
        Transforming Ideas into <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-red-500">
          Digital Reality
        </span>
      </h1>

      <p ref={subRef} className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-10 relative z-10">
        We are Cylvor IT. We build high-performance websites, web apps, and digital experiences that drive growth for startups and enterprises.
      </p>

      <div ref={btnRef} className="flex gap-4 relative z-10">
        <Button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
          Start a Project
        </Button>
        <Button variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}>
          Explore Services
        </Button>
      </div>
    </section>
  );
}