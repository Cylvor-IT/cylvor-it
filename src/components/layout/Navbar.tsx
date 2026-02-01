"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.5,
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
      // UPDATED: 'top-4' ensures the navbar looks balanced with the thinner 'inset-1' frame
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="relative flex items-center justify-between gap-2 p-2 pl-4 pr-2 rounded-full border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl w-full max-w-2xl transition-all duration-300 hover:border-white/20">
        
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}
          className="flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Image
            src="/assets/logo.svg"
            alt="Cylvor IT"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
          <span className="ml-2 font-bold text-sm tracking-wide hidden sm:block">Cylvor IT</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-1 py-1 border border-white/5">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleLinkClick(item.href)}
              className="px-5 py-2 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Contact Button */}
        <div className="hidden md:block">
          <button
            onClick={() => handleLinkClick('#contact')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors"
          >
            Contact
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Menu Dropdown */}
        <div className={cn(
          "absolute top-full mt-3 left-0 w-full bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col shadow-2xl overflow-hidden md:hidden transition-all duration-300 origin-top",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        )}>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleLinkClick(item.href)}
              className="w-full text-left px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm"
            >
              {item.name}
            </button>
          ))}
          <div className="h-px bg-white/10 my-1 mx-2" />
          <button
            onClick={() => handleLinkClick("#contact")}
            className="flex items-center justify-between w-full text-left px-4 py-3 bg-white text-black font-bold text-sm rounded-xl active:scale-95 transition-transform"
          >
            Start Project <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}