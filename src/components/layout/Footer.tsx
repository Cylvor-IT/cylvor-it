"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- FLIP LINK COMPONENT ---
const FooterFlipLink = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link
      href={href}
      className="relative h-5 overflow-hidden block text-sm font-medium font-sans text-zinc-500 group w-fit"
    >
      <div className="relative transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        <span className="block group-hover:text-white transition-colors duration-500 whitespace-nowrap">
          {children}
        </span>
        <span className="absolute top-full left-0 block text-lime-400 font-bold drop-shadow-[0_0_5px_rgba(163,230,53,0.8)] whitespace-nowrap">
          {children}
        </span>
      </div>
      {/* Invisible bold text to stretch container width for the hover state */}
      <span className="block font-bold invisible whitespace-nowrap h-0 overflow-hidden" aria-hidden="true">
        {children}
      </span>
    </Link>
  );
};

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      }
    });

    // Animate Columns & Dividers
    tl.from(".footer-anim", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
    });

    // Animate Vertical Dividers (Scale Y)
    tl.from(".footer-divider", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1,
      ease: "expo.out",
    }, "-=0.5");

  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-zinc-950 border-t border-white/10 overflow-hidden"
    >
      {/* --- GRID REMOVED (Background Texture) --- */}

      <div className="container relative z-10 max-w-7xl mx-auto px-6">

        {/* --- TOP SECTION: GRID LAYOUT --- */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 min-h-[350px]">

          {/* COL 1: BRAND IDENTITY (4 Cols) */}
          <div className="md:col-span-4 py-12 md:py-16 md:pr-12 flex flex-col justify-between relative items-center text-center md:items-start md:text-left border-b border-white/5 md:border-b-0">
            <div className="footer-anim flex flex-col items-center md:items-start">
              <Link href="#hero" className="flex items-center gap-3 group w-fit mb-8">
                <Image
                  src="/assets/logo.svg"
                  alt="Cylvor IT"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
                />
                <span className="font-oswald font-bold text-white uppercase tracking-wider text-2xl leading-none">
                  Cylvor IT
                </span>
              </Link>

              <p className="text-zinc-500 font-sans text-sm leading-relaxed max-w-sm mb-8">
                We don&apos;t just write code; we architect digital dominance. Precision-engineered solutions for the next generation of business.
              </p>

              {/* SOCIAL ICONS (Moved Here) */}
              <div className="flex gap-3">
                {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="relative w-9 h-9 flex items-center justify-center bg-zinc-900 border border-white/10 text-zinc-400 overflow-hidden group transition-all hover:border-lime-400"
                  >
                    <div className="absolute inset-0 bg-lime-400 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                    <Icon size={14} className="relative z-10 transition-colors duration-300 group-hover:text-black" />
                  </a>
                ))}
              </div>
            </div>

            {/* REMOVED: ID Text */}

            {/* Vertical Divider (Right Side) */}
            <div className="footer-divider absolute right-0 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
          </div>


          {/* COL 2 & 3 Mobile Wrapper (Side by Side) */}
          <div className="col-span-1 md:col-span-5 grid grid-cols-2 md:flex md:w-full">

            {/* COL 2: SITEMAP (2 Cols) */}
            <div className="py-8 md:py-16 md:px-8 relative flex flex-col items-center text-center md:items-start md:text-left w-full border-r border-white/5 md:border-r-0">
              <h4 className="footer-anim text-white font-oswald uppercase text-xs md:text-sm mb-6 md:mb-8 tracking-widest flex items-center w-fit gap-2">
                <span className="w-1 h-1 bg-lime-400 rounded-full" /> Explore
              </h4>
              <ul className="space-y-4 flex flex-col items-center md:items-start text-xs md:text-sm">
                {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                  <li key={item} className="footer-anim">
                    <FooterFlipLink href={`#${item.toLowerCase()}`}>
                      {item}
                    </FooterFlipLink>
                  </li>
                ))}
              </ul>
              {/* Vertical Divider (Right Side) */}
              <div className="footer-divider absolute right-0 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
            </div>

            {/* COL 3: CAPABILITIES (3 Cols) */}
            <div className="py-8 md:py-16 md:px-8 relative flex flex-col items-center text-center md:items-start md:text-left w-full">
              <h4 className="footer-anim text-white font-oswald uppercase text-xs md:text-sm mb-6 md:mb-8 tracking-widest flex items-center w-fit gap-2">
                <span className="w-1 h-1 bg-lime-400 rounded-full" /> Capabilities
              </h4>
              <ul className="space-y-4 flex flex-col items-center md:items-start text-xs md:text-sm">
                {['Web Development', 'UI/UX Design', 'Mobile Apps', 'Cloud Architecture', 'SEO Optimization'].map((item) => (
                  <li key={item} className="footer-anim">
                    <FooterFlipLink href="#services">
                      {item}
                    </FooterFlipLink>
                  </li>
                ))}
              </ul>
              {/* Vertical Divider (Right Side) */}
              <div className="footer-divider absolute right-0 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
            </div>

          </div>


          {/* COL 4: ACTION & LOCATION (3 Cols) */}
          <div className="md:col-span-3 py-12 md:py-16 md:pl-8 flex flex-col justify-between items-center text-center md:items-start md:text-left border-t border-white/5 md:border-t-0">

            {/* Location Data */}
            <div className="footer-anim flex flex-col items-center md:items-start">
              <h4 className="text-white font-oswald uppercase text-sm mb-8 tracking-widest flex items-center w-fit gap-2">
                <span className="w-1 h-1 bg-lime-400 rounded-full" /> Location
              </h4>
              <div className="group cursor-default">
                <p className="text-white font-oswald uppercase text-xl group-hover:text-lime-400 transition-colors">Colombo, LK</p>
                {/* REMOVED: Coordinates */}
              </div>
            </div>

            {/* Back to Top Button */}
            <div className="footer-anim mt-12 md:mt-0">
              <button
                onClick={scrollToTop}
                className="relative w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-white/10 text-zinc-400 hover:text-black hover:border-lime-400 transition-all font-oswald uppercase tracking-wider text-xs font-bold overflow-hidden group"
              >
                {/* Sliding Background (Lime) */}
                <div className="absolute inset-0 bg-lime-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />

                <span className="relative z-10">Back to Top</span>
                <ArrowUp size={16} className="relative z-10 transition-transform group-hover:-translate-y-1" />
              </button>
            </div>
          </div>

        </div>


        {/* --- BOTTOM SECTION: LEGAL --- */}
        <div className="border-t border-white/5 py-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-center">

          {/* Copyright */}
          <div className="footer-anim text-[10px] font-mono uppercase tracking-widest text-zinc-600">
            © 2026 Cylvor IT. All Rights Reserved.
          </div>

          {/* Legal Links (Updated Text) */}
          <div className="footer-anim flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] font-mono uppercase tracking-widest text-zinc-600 items-center">
            <Link href="/privacy-policy" className="hover:text-lime-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-lime-400 transition-colors">Terms and Conditions</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}