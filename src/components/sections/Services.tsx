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
    desc: "High-performance websites built for speed and visibility. We craft responsive, lightning-fast web experiences optimized for search engines and conversions. From landing pages to complex web platforms, we deliver solutions that drive business growth.",
    features: ["Responsive Design", "Performance Optimization", "SEO Strategy"],
  },
  {
    id: "02",
    title: "Custom Web Apps",
    tags: ["SaaS", "Internal Tools"],
    desc: "Scalable platforms tailored to your specific workflow. We build custom web applications that streamline operations, enhance productivity, and scale with your business. Enterprise-grade solutions with modern architecture.",
    features: ["Custom Dashboards", "API Integration", "Cloud Infrastructure"],
  },
  {
    id: "03",
    title: "UI/UX Design",
    tags: ["Figma", "Design Systems"],
    desc: "Intuitive interfaces that drive user engagement. Our design process combines user research, data-driven insights, and creative innovation to create beautiful, functional experiences that users love.",
    features: ["User Research", "Prototyping", "Design Systems"],
  },
  {
    id: "04",
    title: "Mobile Solutions",
    tags: ["iOS", "Android", "React Native"],
    desc: "Native-feel applications for every device. We develop cross-platform mobile apps that deliver seamless performance and engaging user experiences. From concept to App Store, we handle the entire mobile journey.",
    features: ["Cross-Platform Dev", "Native Features", "App Store Publishing"],
  },
];

export default function Services() {
  const container = useRef(null);
  const titleRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useGSAP(() => {
    // Initial Title State - centered in viewport
    gsap.set(titleRef.current, {
      position: "absolute",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      opacity: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        anticipatePin: 1,
      }
    });

    // Animate title to top and scale down
    tl.to(titleRef.current, {
      scale: 0.3,
      top: "2%",
      yPercent: 0,
      xPercent: -50,
      left: "50%",
      opacity: 0.8, // Slightly fade it out when it moves up
      ease: "power2.inOut",
      duration: 0.5,
    }, "start");

    // Animate cards with stagger
    tl.from(".service-card", {
      y: 100,
      opacity: 0,
      scale: 0.95, // Subtle scale
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
    }, "start+=0.4");

  }, { scope: container });

  return (
    <section
      ref={container}
      id="services"
      className="relative min-h-screen w-full overflow-hidden pb-24"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Title - Gradient Text Effect */}
      <h2
        ref={titleRef}
        className="z-10 text-[12vw] leading-none font-black font-oswald text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 whitespace-nowrap select-none drop-shadow-2xl will-change-transform pointer-events-none"
      >
        OUR EXPERTISE
      </h2>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-[32vh]">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto pb-16">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="service-card group relative"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card container */}
              <div className="relative h-full transition-all duration-500 ease-out group-hover:-translate-y-2">

                {/* Main card - Glassmorphism & Borders */}
                <div className="relative h-full bg-zinc-900/40 backdrop-blur-md rounded-[2rem] p-8 md:p-12 border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-lime-500/30 group-hover:bg-zinc-900/60 shadow-2xl shadow-black/50">

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">

                    {/* Header: Number & Icon */}
                    <div className="flex items-start justify-between mb-10">
                      <span className="text-6xl font-light font-oswald text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 group-hover:from-lime-500/50 group-hover:to-transparent transition-all duration-500 select-none">
                        {service.id}
                      </span>
                      <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-lime-500 group-hover:border-lime-500 transition-all duration-300 group-hover:scale-110">
                        <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold font-oswald text-white mb-6 tracking-wide group-hover:text-lime-400 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 group-hover:text-zinc-300 transition-colors duration-300 font-light block flex-grow">
                      {service.desc}
                    </p>

                    {/* Features List - Minimalist */}
                    <div className="mb-8 space-y-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-lime-500/50 group-hover:bg-lime-400 transition-colors duration-300" />
                          <span className="text-sm tracking-wide">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags - Refined Pills */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors duration-300">
                      {service.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className="px-3 py-1 scale-95 hover:scale-100 rounded-full text-[11px] font-medium uppercase tracking-widest border border-white/5 bg-white/5 text-zinc-400 transition-all duration-300 cursor-default hover:bg-white/10 hover:text-white hover:border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* Any global styles needed specific to this section */
      `}</style>
    </section>
  );
}