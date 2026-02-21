"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Web Development",
    tags: ["Next.js", "React", "SEO"],
    desc: "High-performance websites built for speed and visibility. We craft responsive, lightning-fast web experiences optimized for search engines and conversions.",
    features: ["Responsive Design", "Performance Optimization", "SEO Strategy"],
  },
  {
    id: "02",
    title: "Custom Web Apps",
    tags: ["SaaS", "Internal Tools"],
    desc: "Scalable platforms tailored to your specific workflow. We build custom web applications that streamline operations and enhance productivity.",
    features: ["Custom Dashboards", "API Integration", "Cloud Infrastructure"],
  },
  {
    id: "03",
    title: "UI/UX Design",
    tags: ["Figma", "Design Systems"],
    desc: "Intuitive interfaces that drive user engagement. Our design process combines user research, data-driven insights, and creative innovation.",
    features: ["User Research", "Prototyping", "Design Systems"],
  },
  {
    id: "04",
    title: "Mobile Solutions",
    tags: ["iOS", "Android", "React Native"],
    desc: "Native-feel applications for every device. We develop cross-platform mobile apps that deliver seamless performance and engaging user experiences.",
    features: ["Cross-Platform Dev", "Native Features", "App Store Publishing"],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      // Elegant staggered entrance for the list items
      gsap.from(".service-row", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Simple parallax for the background glow
      gsap.to(".glow-orb", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        yPercent: 50,
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative w-full min-h-screen py-24 md:py-32 bg-transparent overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="glow-orb absolute top-0 right-0 w-[60vw] h-[60vh] bg-lime-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <h2 className="text-5xl md:text-7xl font-black font-oswald text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 uppercase tracking-tighter">
            Our Services
          </h2>
          <p className="text-zinc-400 max-w-sm text-lg font-light leading-relaxed">
            End-to-end digital solutions designed to elevate your brand and drive real business growth.
          </p>
        </div>

        {/* Interactive List */}
        <div className="flex flex-col w-full">
          {services.map((service, index) => {
            const isActive = hoveredIndex === index;

            return (
              <div
                key={service.id}
                className="service-row group relative border-b border-white/10 py-8 md:py-12 cursor-pointer transition-colors duration-500 hover:border-lime-500/30"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hover Background Fill */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/0 via-zinc-900/40 to-zinc-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">

                  {/* Left: Number & Title */}
                  <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto">
                    <span className="text-2xl md:text-4xl font-light font-oswald text-zinc-600 group-hover:text-lime-500 transition-colors duration-500">
                      {service.id}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-black font-oswald text-zinc-300 group-hover:text-white transition-colors duration-500 tracking-wide uppercase">
                      {service.title}
                    </h3>
                  </div>

                  {/* Right: Icon */}
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-black/20 group-hover:bg-lime-500 group-hover:border-lime-500 transition-all duration-500 shrink-0">
                    <ArrowUpRight className="w-8 h-8 text-white group-hover:text-black transition-colors duration-500" />
                  </div>
                </div>

                {/* Expanding Content Container (CSS Grid trick for smooth height animation) */}
                <div
                  className="grid transition-all duration-500 ease-in-out"
                  style={{
                    gridTemplateRows: isActive ? "1fr" : "0fr",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pt-8 md:pt-12 flex flex-col md:flex-row gap-8 md:gap-24 pl-[4.5rem] md:pl-[6.5rem]">

                      {/* Description */}
                      <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-xl">
                        {service.desc}
                      </p>

                      {/* Features & Tags */}
                      <div className="flex flex-col gap-6">
                        <ul className="space-y-3">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-zinc-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                              <span className="text-sm font-medium tracking-wide">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10 text-zinc-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Mobile Icon (Visible only on small screens) */}
                <div className="md:hidden mt-6 flex justify-end">
                  <div className="flex items-center gap-2 text-lime-400 text-sm uppercase tracking-widest font-bold">
                    Explore <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}