"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
];

const FlipLink = ({ href, children, onClick }: { href: string; children: string; onClick: (h: string) => void }) => {
  return (
    <button
      onClick={() => onClick(href)}
      className="relative h-4 overflow-hidden block text-xs font-bold uppercase tracking-[0.2em] font-sans group"
    >
      <div className="relative transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        <span className="block text-zinc-400 group-hover:text-white transition-colors duration-500">
          {children}
        </span>
        <span className="absolute top-full left-0 block text-lime-400 font-bold drop-shadow-[0_0_5px_rgba(163,230,53,0.8)]">
          {children}
        </span>
      </div>
    </button>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });
  });

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-0 md:px-8 py-4"
    >
      <div className="relative mx-auto max-w-7xl md:rounded-lg overflow-hidden p-[1px] transition-all duration-300">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,#a3e635_360deg)] opacity-100" />
        
        <div className="relative h-full w-full bg-black/90 backdrop-blur-xl md:rounded-lg flex items-center justify-between px-6 py-2">
          
          {/* --- LEFT: LOGO --- */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}
            className="flex items-center gap-3 group z-20"
          >
            <Image
              src="/assets/logo.svg"
              alt="Cylvor IT"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10 object-contain transition-transform group-hover:scale-110"
            />
            <span className="font-oswald font-bold text-white uppercase tracking-wider text-lg leading-none">
              Cylvor IT
            </span>
          </a>

          {/* --- CENTER: LINKS --- */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-12">
            {navItems.map((item) => (
              <FlipLink 
                key={item.name} 
                href={item.href} 
                onClick={handleLinkClick}
              >
                {item.name}
              </FlipLink>
            ))}
          </div>

          {/* --- RIGHT: ANIMATED BUTTON --- */}
          <div className="flex items-center gap-4 z-20">
            <button
              onClick={() => handleLinkClick('#contact')}
              className="hidden md:flex relative items-center gap-2 px-8 py-3 bg-lime-400 text-black text-sm font-bold uppercase tracking-wider transition-all font-oswald clip-path-slant shadow-[0_0_15px_rgba(163,230,53,0.4)] hover:shadow-[0_0_25px_rgba(163,230,53,0.6)] overflow-hidden group"
              style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
            >
              {/* 1. SLIDING BACKGROUND (Red -> White) */}
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              
              {/* 2. CONTENT (Text color change + Icon Swap) */}
              <div className="relative z-10 flex items-center gap-2 group-hover:text-lime-400 transition-colors duration-300">
                <span>Let's Talk</span>
                
                {/* ICON CONTAINER: Increased size to w-5 h-5 and added flex centering to prevent cropping */}
                <div className="relative w-5 h-5 overflow-hidden flex items-center justify-center">
                  {/* Icon 1: Slides Top-Right. Used percentage for cleaner exit. */}
                  <ArrowUpRight className="w-4 h-4 absolute transition-transform duration-300 group-hover:-translate-y-[150%] group-hover:translate-x-[150%]" />
                  
                  {/* Icon 2: Slides In from Bottom-Left. Used percentage for cleaner entry. */}
                  <ArrowUpRight className="w-4 h-4 absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>
              </div>
            </button>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-white hover:bg-white/10 rounded transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* --- MOBILE DROPDOWN --- */}
        <div className={cn(
          "absolute top-full left-0 right-0 mt-2 mx-4 bg-[#0a0a0a] border border-lime-400/20 rounded-lg shadow-2xl overflow-hidden md:hidden flex flex-col transition-all duration-300 origin-top z-50",
          isOpen ? "opacity-100 scale-100 translate-y-0 max-h-[400px]" : "opacity-0 scale-95 -translate-y-2 max-h-0 pointer-events-none"
        )}>
           <div className="p-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleLinkClick(item.href)}
                className="w-full text-left px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded border border-transparent hover:border-white/5 transition-all text-xs uppercase tracking-widest font-sans"
              >
                {item.name}
              </button>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <button
              onClick={() => handleLinkClick("#contact")}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-lime-400 hover:bg-lime-500 text-black font-bold text-xs uppercase tracking-widest rounded transition-colors font-oswald shadow-[0_0_15px_rgba(163,230,53,0.5)]"
            >
              Start Project <ArrowUpRight className="w-3 h-3" />
            </button>
           </div>
        </div>

      </div>
    </nav>
  );
}