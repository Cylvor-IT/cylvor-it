"use client";

import { useRef, useState } from "react";
import { 
  Layers, 
  Smartphone, 
  Database, 
  Share2, 
  CheckCircle2,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const services = [
  {
    id: "01",
    tagline: "Full Stack",
    title: "Enterprise Web Solutions",
    desc: "Scalable, secure, and robust web architectures tailored to your business logic.",
    projectTypes: [
      "Custom SaaS Platforms",
      "E-Commerce Marketplaces",
      "CRM / ERP Systems",
      "Booking Engines"
    ],
    icon: <Layers className="w-10 h-10" />,
    tech: ["Next.js", "React", "Node.js", "AWS"],
    className: "md:col-span-8", 
  },
  {
    id: "02",
    tagline: "Mobile Apps",
    title: "Native & Cross-Platform",
    desc: "Seamless experiences on iOS and Android.",
    projectTypes: [
      "On-Demand Delivery",
      "Health & Fitness",
      "Social Networking"
    ],
    icon: <Smartphone className="w-10 h-10" />,
    tech: ["Flutter", "React Native", "Swift"],
    className: "md:col-span-4", 
  },
  {
    id: "03",
    tagline: "Data Driven",
    title: "Intelligent Data Systems",
    desc: "Turn raw numbers into actionable insights.",
    projectTypes: [
      "BI Dashboards",
      "Predictive Analytics",
      "Automation Bots"
    ],
    icon: <Database className="w-10 h-10" />,
    tech: ["Python", "SQL", "PowerBI"],
    className: "md:col-span-4", 
  },
  {
    id: "04",
    tagline: "Marketing",
    title: "Digital Growth & Branding",
    desc: "Strategic social campaigns that put your digital product in front of the right audience.",
    projectTypes: [
      "Social Media Management",
      "Paid Ad Campaigns",
      "SEO Strategy",
      "Brand Identity"
    ],
    icon: <Share2 className="w-10 h-10" />,
    tech: ["Strategy", "Ads", "Content", "SEO"],
    className: "md:col-span-8", 
  },
];

export default function Services() {
  const container = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const interactiveRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef(null);
  const activeIndexRef = useRef(0);
  const stRef = useRef<ScrollTrigger | null>(null);
  const navLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    gsap.set(titleRef.current, {
      position: "absolute",
      top: "50vh",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      color: "#ffffff",
      zIndex: 50,
    });

    gsap.set(gridRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.98,
      force3D: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        start: "top top",
        end: `+=${(services.length + 1) * 650}`,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const switchStart = 0.25;
          const switchProgress = Math.max(0, (self.progress - switchStart) / (1 - switchStart));
          const nextIndex = Math.min(
            services.length - 1,
            Math.floor(switchProgress * services.length)
          );

          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }
        },
      },
    });

    stRef.current = tl.scrollTrigger ?? null;

    tl.to(
      titleRef.current,
      {
        scale: 0.4,
        top: "5vh",
        yPercent: 0,
        xPercent: -50,
        left: "50%",
        color: "#ef4444",
        ease: "power2.inOut",
      },
      "start"
    );

    tl.to(
      gridRef.current,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "start+=0.2"
    );

    const sectionEl = container.current as HTMLElement | null;
    if (!sectionEl) return;

    const onWheel = (e: WheelEvent) => {
      const st = stRef.current;
      if (!st || !st.isActive) return;

      const interactiveEl = interactiveRef.current;
      const targetNode = e.target as Node | null;

      // If wheel happens inside a scrollable panel, let that panel scroll
      // and prevent the pinned ScrollTrigger from consuming the wheel.
      const targetEl = (e.target as HTMLElement | null);
      if (targetEl) {
        const scrollPanel = targetEl.closest('[data-services-scroll="true"]') as HTMLElement | null;
        if (scrollPanel) {
          const canScroll = scrollPanel.scrollHeight > scrollPanel.clientHeight + 1;
          if (canScroll) {
            const atTop = scrollPanel.scrollTop <= 0;
            const atBottom = scrollPanel.scrollTop + scrollPanel.clientHeight >= scrollPanel.scrollHeight - 1;
            const down = e.deltaY > 0;
            const up = e.deltaY < 0;

            if ((down && !atBottom) || (up && !atTop)) {
              e.stopPropagation();
              return;
            }
          }
        }
      }

      // If the user is interacting with the services UI, keep the pinned experience.
      if (interactiveEl && targetNode && interactiveEl.contains(targetNode)) return;

      // If they scroll on the background/empty space, only skip when the pinned
      // sequence is effectively finished (or hasn't started when scrolling up).
      const down = e.deltaY > 0;
      const up = e.deltaY < 0;

      const nearEnd = st.progress >= 0.98;
      const nearStart = st.progress <= 0.02;

      if ((down && nearEnd) || (up && nearStart)) {
        e.preventDefault();
        e.stopPropagation();

        if (navLockRef.current) return;
        navLockRef.current = true;
        window.setTimeout(() => {
          navLockRef.current = false;
        }, 450);

        if (down) {
          window.scrollTo({ top: st.end + 2, behavior: "auto" });
        } else if (up) {
          window.scrollTo({ top: Math.max(0, st.start - 2), behavior: "auto" });
        }
      }
    };

    sectionEl.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      sectionEl.removeEventListener("wheel", onWheel as EventListener, true);
    };
  }, { scope: container });

  useGSAP(() => {
    if (!detailRef.current) return;
    gsap.fromTo(
      detailRef.current,
      { opacity: 0, y: 14, scale: 0.995 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }
    );
  }, { scope: container, dependencies: [activeIndex] });

  const activeService = services[activeIndex];

  return (
    <section 
      ref={container} 
      id="services" 
      className="relative h-screen w-full overflow-hidden bg-transparent flex flex-col items-center"
      style={{ isolation: 'isolate' }}
    >
      {/* --- TITLE --- */}
      <h2 
        ref={titleRef}
        className="z-10 text-[12vw] leading-none font-black font-oswald text-white whitespace-nowrap select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] will-change-transform pointer-events-none"
      >
        OUR EXPERTISE
      </h2>

      {/* --- GRID --- */}
      <div 
        ref={gridRef}
        className="relative z-20 container mx-auto px-4 md:px-8 pt-[26vh] md:pt-[28vh] pb-8 h-full flex flex-col justify-start transform-gpu"
      >
        <div ref={interactiveRef} className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8 md:gap-10 h-full min-h-0">
          {/* Mobile: accordion list */}
          <div className="md:hidden space-y-4">
            {services.map((service) => (
              <details
                key={service.id}
                className="group bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden"
              >
                <summary className="cursor-pointer select-none p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-2xl text-white">
                      {service.icon}
                    </div>
                    <div>
                      <span className="block text-red-500 text-[10px] font-bold tracking-[0.25em] uppercase mb-1">
                        {service.tagline}
                      </span>
                      <div className="text-lg font-bold text-white font-oswald uppercase leading-tight">
                        {service.title}
                      </div>
                    </div>
                  </div>
                  <span className="font-oswald text-3xl font-bold text-white/15">{service.id}</span>
                </summary>

                <div className="px-5 pb-5 pt-0">
                  <p className="text-zinc-300 text-sm font-sans leading-relaxed border-l-2 border-red-600/30 pl-4 mb-5">
                    {service.desc}
                  </p>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      What We Build
                    </p>
                    <ul className="space-y-2">
                      {service.projectTypes.map((project) => (
                        <li key={project} className="flex items-start gap-3 text-sm text-zinc-200 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap gap-2">
                    {service.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-300 bg-white/5 rounded-lg border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* Desktop: nav + detail */}
          <aside className="hidden md:flex flex-col w-[380px] shrink-0">
            <div data-services-scroll="true" className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 max-h-full overflow-y-auto">
              <p className="px-3 pt-3 pb-2 text-xs text-zinc-500 uppercase tracking-[0.25em] font-bold">
                Services
              </p>
              <div className="flex flex-col">
                {services.map((service, idx) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      activeIndexRef.current = idx;
                      setActiveIndex(idx);
                    }}
                    className={cn(
                      "text-left w-full px-3 py-4 rounded-xl transition-all border border-transparent",
                      idx === activeIndex
                        ? "bg-red-600/10 border-red-600/30"
                        : "hover:bg-white/5 hover:border-white/10"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-red-500">
                          {service.tagline}
                        </div>
                        <div className="mt-1 text-lg font-bold text-white font-oswald uppercase leading-tight">
                          {service.title}
                        </div>
                      </div>
                      <div className={cn(
                        "font-oswald text-4xl font-bold",
                        idx === activeIndex ? "text-white/20" : "text-white/10"
                      )}>
                        {service.id}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <p className="px-3 pb-3 pt-2 text-[10px] text-zinc-600 uppercase tracking-[0.25em]">
                Scroll to switch
              </p>
            </div>
          </aside>

          <div className="hidden md:block flex-1 min-w-0">
            <div
              ref={detailRef}
              data-services-scroll="true"
              className="h-full min-h-0 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-9 overflow-y-auto overflow-x-hidden shadow-2xl"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="p-4 bg-red-600 rounded-2xl text-white shadow-lg">
                    {activeService.icon}
                  </div>
                  <div>
                    <span className="block text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                      {activeService.tagline}
                    </span>
                    <h3 className="text-2xl lg:text-4xl font-bold text-white font-oswald uppercase leading-tight">
                      {activeService.title}
                    </h3>
                  </div>
                </div>
                <span className="font-oswald text-7xl lg:text-8xl font-bold text-white/10 select-none">
                  {activeService.id}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-1 xl:grid-cols-12 gap-7">
                <div className="xl:col-span-6">
                  <p className="text-zinc-200 text-lg lg:text-xl font-sans leading-relaxed border-l-2 border-red-600/30 pl-6">
                    {activeService.desc}
                  </p>

                  <div className="mt-6 bg-black/40 p-6 rounded-2xl border border-white/5">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      What We Build
                    </p>
                    <ul className="grid grid-cols-1 gap-y-3">
                      {activeService.projectTypes.map((project) => (
                        <li key={project} className="flex items-start gap-3 text-base text-zinc-100 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="xl:col-span-6">
                  <div className="bg-gradient-to-br from-red-900/20 to-black/40 p-6 rounded-2xl border border-red-600/15">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 font-bold">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {activeService.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider text-zinc-200 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">Delivery</p>
                      <p className="mt-2 text-white font-oswald text-2xl uppercase">Fast</p>
                      <p className="mt-2 text-sm text-zinc-400">Clear milestones & weekly updates.</p>
                    </div>
                    <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">Quality</p>
                      <p className="mt-2 text-white font-oswald text-2xl uppercase">Solid</p>
                      <p className="mt-2 text-sm text-zinc-400">Performance + security best practices.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}