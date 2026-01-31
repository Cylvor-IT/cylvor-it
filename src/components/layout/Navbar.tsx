"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Animation: Slide down from top on load
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.5, // Wait for other page elements slightly
    });
  });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Container: Centered at top. 
        Top-6 ensures it sits nicely inside your white border frame (which is at inset-2).
      */}
      <nav 
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] md:max-w-fit"
      >
        <div className="relative flex items-center justify-between gap-2 md:gap-1 p-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/20">
          
          {/* 1. The Logo */}
          <a 
            href="#hero" 
            className="flex items-center justify-center w-10 h-10 hover:scale-105 transition-transform"
          >
            <Image
              src="/assets/logo.svg"
              alt="Cylvor IT logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              priority
            />
          </a>

          {/* 2. Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center bg-white/5 rounded-full px-2 py-1 mx-2 border border-white/5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="relative px-5 py-2 text-sm text-slate-300 hover:text-white transition-colors duration-300 group overflow-hidden rounded-full"
              >
                <span className="relative z-10">{item.name}</span>
                {/* Subtle hover glow background */}
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
              </a>
            ))}
          </div>

          {/* 3. Contact Button (Distinct) */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-slate-200 transition-colors"
            >
              Contact
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown (Floating below the capsule) */}
        {isOpen && (
          <div className="absolute top-full mt-4 left-0 w-full bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-2xl overflow-hidden md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                {item.name}
              </a>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="flex items-center justify-between px-4 py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition-transform"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </nav>
    </>
  );
}