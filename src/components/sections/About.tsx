"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".about-text", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    const items = gsap.utils.toArray(".stat-item");
    items.forEach((item: any) => {
      const num = item.querySelector(".stat-num");
      const targetVal = parseInt(num.innerText);
      
      gsap.fromTo(num, 
        { innerText: 0 }, 
        {
          innerText: targetVal,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          }
        }
      );
    });

  }, { scope: container });

  return (
    <section id="about" ref={container} className="py-24 md:py-32 px-6 bg-black relative">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="about-text">
          <span className="text-red-600 font-mono text-xs tracking-[0.2em] uppercase mb-4 block">Who We Are</span>
          {/* UPDATED: Header font */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight font-oswald uppercase">
            Architects of the <br/> Digital Future
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed font-sans">
            Cylvor IT goes beyond code. We are a strategic technology partner dedicated to bridging the gap between complex engineering and intuitive design. We don't just build websites; we build ecosystems.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-item p-8 bg-zinc-900/30 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-red-600/30 transition-colors">
            {/* UPDATED: Numbers are Oswald */}
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-baseline font-oswald">
              <span className="stat-num">100</span>%
            </div>
            <div className="text-zinc-500 text-xs uppercase tracking-widest font-sans">Client Satisfaction</div>
          </div>
          <div className="stat-item p-8 bg-zinc-900/30 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-red-600/30 transition-colors">
            {/* UPDATED: Numbers are Oswald */}
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-baseline font-oswald">
              <span className="stat-num">24</span>/7
            </div>
            <div className="text-zinc-500 text-xs uppercase tracking-widest font-sans">Support System</div>
          </div>
        </div>
      </div>
    </section>
  );
}