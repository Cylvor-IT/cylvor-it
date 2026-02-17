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
          zIndex: 40,
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
          end: "+=3500", // Increased scroll distance
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // 1. Move Title Up - Keep it visible & high
      if (titleRef.current) {
        tl.to(titleRef.current, {
          scale: 0.7,
          top: "15%", // Pushed to 15% to avoid header overlap
          yPercent: 0,
          duration: 0.5,
          ease: "power2.inOut",
        }, "start");
      }

      // 2. Bring in Card 1
      if (cards[0]) {
        tl.to(cards[0], {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }, "start+=0.3");
      }

      // 3. Stacking Animation for subsequent cards
      for (let i = 1; i < cards.length; i++) {
        // Previous card stays put but scales down slightly to create depth ("Card pack" effect)
        if (cards[i - 1]) {
          tl.to(cards[i - 1], {
            scale: 1 - (i * 0.05), // Subtle scale down for stacking effect
            yPercent: 0, // Stay in place
            opacity: 0.92, // Slight fade for depth without filter flicker
            duration: 0.8,
            ease: "power2.out",
            force3D: true,
          }, `+=0.5`); // Consistent reading time gap
        }

        // Current card slides up ON TOP
        if (cards[i]) {
          tl.to(cards[i], {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            force3D: true,
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
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Title - Increased z-index significantly */}
      <h2
        ref={titleRef}
        className="z-40 text-[12vw] md:text-[8vw] leading-none font-black font-oswald text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 whitespace-nowrap select-none drop-shadow-2xl will-change-transform pointer-events-none text-center"
      >
        SERVICES
      </h2>

      <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
        {/* Mobile: vertical list. Desktop: stacked container for pin animation. */}
        <div
          ref={cardsContainerRef}
          className="w-full max-w-[360px] flex flex-col gap-5 md:block md:relative md:max-w-[560px] md:h-[340px] md:mt-[230px]"
        >
          {services.map((service, index) => (
            <article
              key={service.id}
              className="service-card group relative w-full md:absolute md:inset-0 md:h-full"
              style={{ zIndex: index + 1, backfaceVisibility: "hidden", transform: "translateZ(0)" }} // Ensure natural stacking order
            >
              <div className="relative md:h-full rounded-[2rem] bg-zinc-800 p-[1px] transition-all duration-500 group-hover:bg-lime-500">
                <div className="relative bg-zinc-900 border border-zinc-700 rounded-[calc(2rem-1px)] p-5 md:p-6 flex flex-col overflow-hidden transition-all duration-500 shadow-2xl shadow-black/70 md:h-full justify-between group-hover:border-lime-400 group-hover:-translate-y-1">

                  <div className="relative z-10 flex md:flex-row flex-col md:items-start md:justify-between gap-5">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl md:text-5xl font-light font-oswald text-zinc-600 select-none leading-none">
                          {service.id}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold font-oswald text-white tracking-wide transition-colors duration-300 group-hover:text-lime-300">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-zinc-300/90 text-sm leading-relaxed font-light max-w-md">
                        {service.desc}
                      </p>
                    </div>

                    <div className="group/icon p-3 rounded-full bg-zinc-800 border border-zinc-600 transition-all duration-300 self-start group-hover:bg-lime-400 group-hover:border-lime-400">
                      <ArrowUpRight className="w-6 h-6 text-white transition-colors duration-300 group-hover/icon:text-black" />
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6 mt-6 border-t border-zinc-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {services[index].features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                          <span className="text-[11px] uppercase tracking-[0.18em] font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest border border-zinc-600 bg-zinc-800 text-zinc-300 transition-all duration-300 group-hover:border-lime-400 group-hover:text-white"
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
    </section>
  );
}
