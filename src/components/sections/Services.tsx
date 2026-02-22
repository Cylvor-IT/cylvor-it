"use client";

import { useRef, useState, useEffect } from "react";
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
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Set initially on client
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      id="services-list"
      className="relative w-full bg-transparent pt-32 pb-16 md:pt-[35vh] md:pb-32"
    >
      {/* Subtle background glow */}
      <div className="glow-orb absolute top-0 right-0 w-[60vw] h-[60vh] bg-lime-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col justify-start">
        {/* Interactive List */}
        <div className="flex flex-col w-full max-w-7xl mx-auto">
          {services.map((service, index) => {
            const isActive = isMobile ? expandedIndices.includes(index) : hoveredIndex === index;

            return (
              <div
                key={service.id}
                className="service-row group relative border-b border-white/10 py-10 md:py-16 cursor-pointer transition-colors duration-500 hover:border-lime-500/30"
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                onClick={() => {
                  if (isMobile) {
                    setExpandedIndices((prev) =>
                      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
                    );
                  }
                }}
              >
                {/* Hover Background Fill */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/0 via-zinc-900/40 to-zinc-900/0 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-all duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-16">
                  {/* Left: Number & Title */}
                  <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto">
                    <span className="text-3xl md:text-5xl font-light font-oswald text-zinc-600 group-hover:text-lime-500 transition-colors duration-500">
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

                {/* Expanding Content Container */}
                <div
                  className="relative z-10 grid transition-all duration-500 ease-in-out"
                  style={{
                    gridTemplateRows: isActive ? "1fr" : "0fr",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pt-10 md:pt-14 flex flex-col md:flex-row gap-8 md:gap-24 pl-[4.5rem] md:pl-[6.5rem]">
                      {/* Description */}
                      <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-xl">
                        {service.desc}
                      </p>

                      {/* Features & Tags */}
                      <div className="flex flex-col gap-4">
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-zinc-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                              <span className="text-sm font-medium tracking-wide">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-white/10 text-zinc-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Icon */}
                <div className="md:hidden mt-4 flex justify-center">
                  <div className="flex items-center gap-2 text-lime-400 text-xs uppercase tracking-widest font-bold">
                    Explore <ArrowUpRight className="w-3 h-3 transition-transform duration-300" style={{ transform: isActive ? "rotate(90deg)" : "rotate(0deg)" }} />
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