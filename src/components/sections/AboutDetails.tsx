"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    id: "1",
    title: "Strategic",
    highlight: "Core",
    simpleHeader: "FOCUS: PRECISION",
    simpleText: "We map the entire user journey before writing a single line of code to eliminate redundancy.",
    // New Line Added
    additionalText: "Precision metrics guide every architectural decision.", 
    align: "left",
  },
  {
    id: "2",
    title: "Rapid",
    highlight: "Scale",
    simpleHeader: "TECH: NEXT-GEN",
    simpleText: "Leveraging serverless computing and edge rendering for instant global availability.",
    // New Line Added
    additionalText: "Zero-downtime deployments guarantee your business never stops.",
    align: "right",
  },
  {
    id: "3",
    title: "Future",
    highlight: "Proofing",
    simpleHeader: "GOAL: LONGEVITY",
    simpleText: "Clean, well-documented codebases that your internal team can maintain and expand easily.",
    // New Line Added
    additionalText: "Scalable infrastructure that evolves alongside your user base.",
    align: "left",
  },
  {
    id: "4",
    title: "Continuous",
    highlight: "Optimization",
    simpleHeader: "ACTION: REFINE",
    simpleText: "Real-time performance tracking and iterative A/B testing to maximize conversion rates.",
    // New Line Added
    additionalText: "We turn user behavior data into actionable growth strategies.",
    align: "right",
  },
];

export default function AboutDetails() {
  const container = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    // 1. Animate the central Green Line
    gsap.fromTo(lineRef.current, 
      { height: "0%" },
      { 
        height: "100%", 
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top center",
          end: "bottom center",
          scrub: 1, 
        }
      }
    );

    // 2. Animate Cards (Slide Up)
    const cards = gsap.utils.toArray(".timeline-card");
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", 
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // 3. Animate Dots
    const dots = gsap.utils.toArray(".timeline-dot");
    dots.forEach((dot: any) => {
      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3, 
          ease: "back.out(2)", 
          scrollTrigger: {
            trigger: dot,
            start: "top 60%", 
            toggleActions: "play none none reverse",
          }
        }
      );
    });

  }, { scope: container });

  return (
    <section 
      ref={container} 
      id="about-details"
      className="relative z-40 w-full py-24 px-6 flex flex-col items-center justify-center bg-transparent pointer-events-auto overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto">
        
        {/* --- CENTRAL TIMELINE TRACK --- */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block bg-white/10">
           <div ref={lineRef} className="absolute top-0 left-0 w-full bg-lime-400 shadow-[0_0_20px_#a3e635]" />
        </div>

        {/* --- CARDS LOOP --- */}
        <div className="flex flex-col gap-16">
          {timelineData.map((item) => (
            <div 
              key={item.id}
              className={cn(
                "timeline-card relative flex w-full md:w-1/2",
                item.align === "right" ? "md:ml-auto md:pl-20" : "md:mr-auto md:pr-20 md:justify-end"
              )}
            >
              
              {/* --- CENTER INDICATOR DOT --- */}
              <div className={cn(
                "timeline-dot hidden md:block absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black border-4 border-lime-400 z-20 shadow-[0_0_15px_#a3e635] scale-0 opacity-0",
                item.align === "left" ? "-right-3" : "-left-3"
              )} />

              {/* THE CARD ITSELF */}
              <div className={cn(
                "w-full p-8 md:p-10 bg-zinc-950/90 border border-white/10 relative shadow-2xl group hover:bg-zinc-900 transition-colors duration-500",
                item.align === "left" 
                  ? "border-r-4 border-r-lime-400 rounded-l-2xl" 
                  : "border-l-4 border-l-lime-400 rounded-r-2xl"
              )}>
                
                {/* Large Background Number */}
                <span className={cn(
                  "absolute text-8xl font-black text-white/5 font-oswald select-none pointer-events-none transition-colors group-hover:text-lime-400/5",
                  item.align === "left" ? "top-2 left-4" : "top-2 right-4"
                )}>
                  {item.id}
                </span>

                {/* Content Wrapper */}
                <div className={cn(
                  "relative z-10 flex flex-col",
                  item.align === "left" ? "text-right items-end" : "text-left items-start"
                )}>
                  
                  {/* Main Title */}
                  <h4 className="text-3xl md:text-4xl font-black text-white font-oswald uppercase mb-6 leading-none">
                    {item.title} <span className="text-lime-400">{item.highlight}</span>
                  </h4>

                  {/* Content Block */}
                  <div className={cn(
                    "w-full max-w-sm",
                     item.align === "left" ? "flex flex-col items-end" : "flex flex-col items-start"
                  )}>
                    <span className="text-lime-400 font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-3">
                       {item.simpleHeader}
                    </span>
                    
                    {/* Line 1 */}
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-sans mb-3">
                       {item.simpleText}
                    </p>
                    
                    {/* Line 2 (New) */}
                    <p className="text-zinc-500 text-sm leading-relaxed font-sans border-t border-white/5 pt-3">
                       {item.additionalText}
                    </p>
                  </div>

                </div>

                {/* Mobile Connector Dot */}
                <div className="md:hidden absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black border-2 border-lime-400 rounded-full" />
              
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}