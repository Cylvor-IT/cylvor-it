"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../ui/Button";

// Custom Scramble Hook
const useScrambleText = (originalText: string) => {
  const [text, setText] = useState(originalText);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const frameRef = useRef<number | null>(null);

  const stopScramble = () => {
    if (frameRef.current) {
      clearInterval(frameRef.current);
      frameRef.current = null;
    }
    setText(originalText); 
  };

  const startScramble = () => {
    let iteration = 0;
    if (frameRef.current) clearInterval(frameRef.current);

    frameRef.current = window.setInterval(() => {
      setText(
        originalText.split("").map((letter, index) => {
          if (index < iteration) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= originalText.length) clearInterval(frameRef.current!);
      iteration += 1 / 2; 
    }, 25); 
  };

  return { text, startScramble, stopScramble };
};

const ScrambleItem = ({ children, className }: { children: string, className?: string }) => {
  const { text, startScramble, stopScramble } = useScrambleText(children);
  return (
    <span onMouseEnter={startScramble} onMouseLeave={stopScramble} className={className}>
      {text}
    </span>
  );
};

export default function Contact() {
  const container = useRef(null);
  const formRef = useRef(null);

  useGSAP(() => {
    // Reveal text
    gsap.from(".reveal-text", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.1,
    });

    // Form animation
    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section ref={container} id="contact" className="relative min-h-screen py-24 md:py-32 px-6 bg-black overflow-hidden flex items-center justify-center">
      
      {/* Background FX */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[100px]" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 max-w-4xl text-center">
        <span className="inline-block text-red-600 font-mono tracking-[0.3em] uppercase text-xs mb-6 reveal-text">
          Connect With Us
        </span>
        
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 reveal-text uppercase leading-none">
          <ScrambleItem>Start Your</ScrambleItem> <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
             Project
          </span>
        </h2>

        <form 
          ref={formRef}
          className="bg-zinc-900/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 text-left w-full shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle Glow on form hover */}
          <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-6 mb-6 relative z-10">
            <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-4 focus:border-red-600 focus:outline-none transition-colors text-sm text-white placeholder-zinc-600" placeholder="Name" />
            <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-4 focus:border-red-600 focus:outline-none transition-colors text-sm text-white placeholder-zinc-600" placeholder="Email" />
          </div>
          
          <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-4 mb-8 focus:border-red-600 focus:outline-none transition-colors text-sm relative z-10 resize-none text-white placeholder-zinc-600" placeholder="Tell us about your idea..." />

          <div className="text-center relative z-10">
            <Button className="w-full md:w-auto">Send Inquiry</Button>
          </div>
        </form>
      </div>
    </section>
  );
}