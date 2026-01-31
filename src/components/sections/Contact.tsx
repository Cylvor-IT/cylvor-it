"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Button from "../ui/Button";

/**
 * CUSTOM HOOK: useScrambleText
 * Now includes a 'stop' function to reset text immediately on unhover.
 */
const useScrambleText = (originalText: string) => {
  const [text, setText] = useState(originalText);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const frameRef = useRef<number | null>(null);

  const stopScramble = () => {
    if (frameRef.current) {
      clearInterval(frameRef.current);
      frameRef.current = null;
    }
    setText(originalText); // Reset to original text immediately
  };

  const startScramble = () => {
    let iteration = 0;
    if (frameRef.current) clearInterval(frameRef.current);

    frameRef.current = window.setInterval(() => {
      setText(
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(frameRef.current!);
      }
      
      // Increased speed slightly (1/6) so it's snappy but readable
      iteration += 1 / 6; 
    }, 40); // 40ms for a balanced flicker speed
  };

  return { text, startScramble, stopScramble };
};

// Reusable Component for Scramble Text
const ScrambleItem = ({ children, className }: { children: string, className?: string }) => {
  const { text, startScramble, stopScramble } = useScrambleText(children);
  return (
    <span 
      onMouseEnter={startScramble} 
      onMouseLeave={stopScramble} 
      className={className}
    >
      {text}
    </span>
  );
};

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15,
      });

      gsap.from(formRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.5,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.to(".neon-glow", {
        boxShadow: "0 0 20px 2px rgba(220, 38, 38, 0.2)",
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative min-h-screen py-24 md:py-32 px-6 bg-black text-white overflow-hidden flex items-center"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-600/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-16 overflow-hidden">
          <span className="inline-block text-red-500 font-mono tracking-[0.3em] uppercase text-xs mb-4 reveal-text cursor-default">
            <ScrambleItem>CONNECT WITH US</ScrambleItem>
          </span>
          <h2 
            ref={titleRef}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-6 reveal-text leading-[1.1] cursor-default uppercase"
          >
            <ScrambleItem>Ready to build</ScrambleItem> <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
               THE FUTURE?
            </span>
          </h2>
          <p className="text-zinc-500 text-base md:text-lg max-w-lg mx-auto reveal-text">
            Cylvor IT delivers modern digital solutions tailored to your vision.
          </p>
        </div>
        
        {/* Premium Form */}
        <form 
          ref={formRef}
          className="neon-glow bg-zinc-950/40 backdrop-blur-md p-8 md:p-14 rounded-2xl border border-white/5 text-left max-w-3xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="group relative">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-2 group-focus-within:text-red-500 transition-colors">
                Your Name
              </label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-red-600 transition-all text-lg font-light" 
                placeholder="Full Name" 
              />
            </div>
            <div className="group relative">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-2 group-focus-within:text-red-500 transition-colors">
                Email Address
              </label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-red-600 transition-all text-lg font-light" 
                placeholder="email@example.com" 
              />
            </div>
          </div>

          <div className="mb-10 group">
            <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-2 group-focus-within:text-red-500 transition-colors">
              Project Details
            </label>
            <textarea 
              rows={2} 
              className="w-full bg-transparent border-b border-zinc-800 py-3 focus:outline-none focus:border-red-600 transition-all text-lg font-light resize-none" 
              placeholder="Tell us about your project..."
            ></textarea>
          </div>

          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="group relative overflow-hidden px-10 py-5 bg-white text-black hover:bg-red-600 hover:text-white font-bold uppercase tracking-widest rounded-sm transition-all duration-500"
            >
              <span className="relative z-10 text-sm">Send Inquiry</span>
              <div className="absolute inset-0 bg-red-600 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
            </Button>
          </div>
        </form>

        {/* Footer Socials */}
        <div className="mt-16 flex justify-center space-x-8 text-zinc-600 font-mono text-[11px] tracking-widest">
            <a href="#" className="hover:text-white transition-colors">
              <ScrambleItem>DRIBBBLE</ScrambleItem>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <ScrambleItem>BEHANCE</ScrambleItem>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <ScrambleItem>LINKEDIN</ScrambleItem>
            </a>
        </div>
      </div>
    </section>
  );
}