"use client";

import { useRef } from "react";
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
  const container = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Media query to only run complex animation on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Setup: Cards 2, 3, 4 start off-screen
      const cards = gsap.utils.toArray(".service-card") as HTMLElement[];

      // Initial state for title
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          position: "absolute",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          zIndex: 10,
        });
      }

      // Initial state for cards
      cards.forEach((card, i) => {
        if (i > 0) {
          gsap.set(card, {
            yPercent: 120, // Push them further down initially
            opacity: 0,
            scale: 0.9,
            force3D: true
          });
        } else {
          gsap.set(card, {
            yPercent: 120,
            opacity: 0,
            scale: 0.9,
            force3D: true
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          start: "top top",
          end: "+=2500", // Slightly shorter scroll distance for snappier feel
          scrub: 1.5, // Creating softer catch-up for smoothness
          anticipatePin: 1,
        }
      });

      // 1. Move Title Up - Keep it visible & high
      if (titleRef.current) {
        tl.to(titleRef.current, {
          scale: 0.8, // Don't scale down too much
          top: "5%",
          yPercent: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }

      // 2. Bring in Card 1
      if (cards[0]) {
        tl.to(cards[0], {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }, "<+=0.1");
      }

      // 3. Stacking Animation for subsequent cards
      for (let i = 1; i < cards.length; i++) {
        // More subtle scale down of previous card
        if (cards[i - 1]) {
          tl.to(cards[i - 1], {
            scale: 1 - (i * 0.05), // Subtle scale down for stacking effect
            yPercent: 0, // Stay in place
            opacity: 1, // Keep visible
            filter: "brightness(0.5)", // Darken slightly to show depth
            duration: 0.8,
            ease: "power2.out",
          }, `+=0.5`); // Consistent reading time gap
        }

        // Current card slides up
        if (cards[i]) {
          tl.to(cards[i], {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          }, "<+=0.1"); // Slide in while previous one settles
        }
      }
    });

    // Mobile animation (simple vertical scroll)
    mm.add("(max-width: 767px)", () => {
      (gsap.utils.toArray(".service-card") as HTMLElement[]).forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section
      ref={container}
      id="services"
      className="relative min-h-screen w-full overflow-hidden bg-transparent"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Title - Increased z-index significantly */}
      <h2
        ref={titleRef}
        className="z-50 text-[12vw] md:text-[10vw] leading-none font-black font-oswald text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 whitespace-nowrap select-none drop-shadow-2xl will-change-transform pointer-events-none text-center"
      >
        SERVICES
      </h2>

      <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
        {/* Mobile: vertical list. Desktop: stacked container for pin animation. */}
        <div
          ref={cardsContainerRef}
          className="w-full max-w-[420px] flex flex-col gap-6 md:block md:relative md:max-w-[650px] md:h-[400px] md:mt-[250px]"
        >
          {services.map((service, index) => (
            <article
              key={service.id}
              className="service-card group relative w-full md:absolute md:inset-0 md:h-full"
              style={{ zIndex: index + 1, backfaceVisibility: "hidden", transform: "translateZ(0)" }} // Ensure natural stacking order
            >
              {/* Card - Glassmorphism */}
              <div className="relative bg-zinc-900 border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col overflow-hidden transition-all duration-300 shadow-2xl shadow-black md:h-full justify-between">

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex md:flex-row flex-col md:items-start md:justify-between gap-4">
                  <div>
                    {/* Header: Number & Icon */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl md:text-5xl font-light font-oswald text-zinc-700 select-none">
                        {service.id}
                      </span>
                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold font-oswald text-white tracking-wide group-hover:text-lime-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm leading-relaxed mb-5 md:mb-6 font-light max-w-md">
                      {service.desc}
                    </p>
                  </div>

                  {/* Action Button - Repositioned for wide layout */}
                  <div className="group/icon p-3 rounded-full bg-white/5 border border-white/10 hover:bg-lime-500 hover:border-lime-500 transition-all duration-300 self-start md:self-start">
                    <ArrowUpRight className="w-6 h-6 text-white group-hover/icon:text-black transition-colors duration-300" />
                  </div>
                </div>


                {/* Features & Tags Container */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6 border-t border-white/5">
                  {/* Features List */}
                  <div className="space-y-2">
                    {services[index].features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-zinc-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-lime-500/50" />
                        <span className="text-xs uppercase tracking-wider font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest border border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
