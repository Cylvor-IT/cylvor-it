"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Instagram, Linkedin, Mail, ArrowUpRight, MapPin, Clock } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- SCRAMBLE TEXT HOOK ---
const useScrambleText = (originalText: string) => {
  const [text, setText] = useState(originalText);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#________";
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
    }, 30);
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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    tl.from(".contact-anim", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

  }, { scope: container });

  return (
    <section
      ref={container}
      id="contact"
      className="relative min-h-screen py-24 md:py-32 px-6 flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      {/* --- BACKGROUND AMBIENCE --- */}
      {/* Removed the subtle grid pattern for a completely clean background */}
      {/* Removed the large lime blur tint div */}

      <div className="container relative z-10 max-w-6xl">

        {/* --- HEADER --- */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="contact-anim text-4xl md:text-7xl font-black uppercase leading-[0.9] font-oswald text-white mb-6">
            <span className="block mb-2">Let&apos;s Build</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-lime-300 to-lime-600">
              <ScrambleItem>Something Great</ScrambleItem>
            </span>
          </h2>

          <p className="contact-anim text-zinc-400 font-sans text-sm md:text-base max-w-md leading-relaxed">
            Ready to start your digital transformation? Drop us a line.
          </p>
        </div>

        {/* --- SPLIT LAYOUT (Grid 12) --- */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">

          {/* LEFT: FORM (8 columns) */}
          <form
            ref={formRef}
            className="contact-anim md:col-span-8 w-full bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-xl relative group overflow-hidden"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-lime-400/0 via-lime-400/5 to-lime-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl" />

            <div className="relative z-10 flex flex-col gap-5 mb-8">
              <div className="group/input">
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 group-focus-within/input:text-lime-400 transition-colors">Name</label>
                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-4 text-white text-sm focus:border-lime-400/50 focus:bg-lime-400/5 focus:outline-none transition-all placeholder-zinc-700 font-sans" placeholder="John Doe" />
              </div>
              <div className="group/input">
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 group-focus-within/input:text-lime-400 transition-colors">Email</label>
                <input type="email" className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-4 text-white text-sm focus:border-lime-400/50 focus:bg-lime-400/5 focus:outline-none transition-all placeholder-zinc-700 font-sans" placeholder="john@example.com" />
              </div>
              <div className="group/input">
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 group-focus-within/input:text-lime-400 transition-colors">Message</label>
                <textarea rows={5} className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-4 text-white text-sm focus:border-lime-400/50 focus:bg-lime-400/5 focus:outline-none transition-all placeholder-zinc-700 font-sans resize-none" placeholder="Tell us about your project goals..." />
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className="relative w-full flex items-center justify-center gap-3 px-12 py-4 bg-lime-400 text-black text-sm font-bold uppercase tracking-wider transition-all font-oswald shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_35px_rgba(163,230,53,0.5)] overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" />
                <div className="relative z-10 flex items-center gap-3 group-hover/btn:text-lime-500 transition-colors duration-300">
                  <span>Send Message</span>
                  <div className="relative w-5 h-5 overflow-hidden flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 absolute transition-transform duration-300 group-hover/btn:-translate-y-[150%] group-hover/btn:translate-x-[150%]" />
                    <ArrowUpRight className="w-5 h-5 absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                  </div>
                </div>
              </button>
            </div>
          </form>

          {/* RIGHT: CONTACT DETAILS (4 columns) */}
          <div className="contact-anim md:col-span-4 flex flex-col justify-center h-full space-y-10 py-2">

            {/* Info Block */}
            <div className="space-y-8">
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                <div className="p-3 bg-zinc-900 border border-white/10 rounded-full text-lime-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-white font-oswald uppercase text-base mb-1">Email Us</h4>
                  <a href="mailto:hello@cylvor.it" className="text-zinc-400 font-sans text-sm hover:text-lime-400 transition-colors">hello@cylvorit.com</a>
                </div>
              </div>
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                <div className="p-3 bg-zinc-900 border border-white/10 rounded-full text-lime-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-white font-oswald uppercase text-base mb-1">Location</h4>
                  <p className="text-zinc-400 font-sans text-sm">Colombo, Sri Lanka</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                <div className="p-3 bg-zinc-900 border border-white/10 rounded-full text-lime-400 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-white font-oswald uppercase text-base mb-1">Working Hours</h4>
                  <p className="text-zinc-400 font-sans text-sm">Mon - Fri: 9am - 6pm (IST)</p>
                </div>
              </div>
            </div>

            {/* Social Divider */}
            <div className="w-full h-px bg-white/10" />

            {/* Social Icons Row */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-6 text-center md:text-left">Follow Us</h4>
              <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                {[
                  { name: "Facebook", icon: Facebook, href: "#" },
                  { name: "Instagram", icon: Instagram, href: "#" },
                  { name: "LinkedIn", icon: Linkedin, href: "#" },
                  { name: "Email", icon: Mail, href: "mailto:hello@cylvor.it" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="relative p-4 rounded-full border border-white/10 bg-zinc-900/50 text-zinc-400 group overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-lime-400"
                    title={social.name}
                  >
                    {/* Sliding Background */}
                    <div className="absolute inset-0 bg-lime-400 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                    {/* Icon */}
                    <social.icon size={22} className="relative z-10 transition-colors duration-300 group-hover:text-black" />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}