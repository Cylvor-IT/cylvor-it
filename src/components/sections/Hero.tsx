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
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(titleRef.current, { y: 100, opacity: 0, duration: 1.2, delay: 0.2 })
      .from(subRef.current, { y: 40, opacity: 0, duration: 1 }, "-=0.8")
      .from(btnRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");
      
  }, { scope: container });

  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={container} className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden bg-black">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl">
        <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.95]">
          Transforming Ideas <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-red-600">
            Into Reality
          </span>
        </h1>

        <p ref={subRef} className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          We build high-performance digital experiences that drive growth for modern brands and enterprises.
        </p>

        <div ref={btnRef} className="flex flex-wrap justify-center gap-4">
          <Button onClick={() => scroll('contact')}>
            Start a Project
          </Button>
          <Button variant="outline" onClick={() => scroll('services')}>
            Explore Services
          </Button>
        </div>
      </div>
    </section>
  );
}