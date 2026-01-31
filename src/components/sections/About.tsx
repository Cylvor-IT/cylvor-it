"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".about-item", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1
    });
  }, { scope: container });

  return (
    <section id="about" ref={container} className="py-24 px-6 bg-black">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="about-item">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Cylvor IT is a forward-thinking technology partner. We don't just write code; we architect solutions. 
            From Next.js web applications to custom branding, we bridge the gap between complex technology and user-friendly design.
          </p>
        </div>
        <div className="about-item p-8 bg-white/5 rounded-2xl border border-white/10">
          <div className="text-4xl font-bold text-red-500 mb-2">100%</div>
          <div className="text-white/75 mb-6">Client Satisfaction</div>
          <div className="text-4xl font-bold text-red-500 mb-2">24/7</div>
          <div className="text-white/75">Support & Maintenance</div>
        </div>
      </div>
    </section>
  );
}