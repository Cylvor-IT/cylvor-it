"use client";

import { useRef } from "react";
import { Code2, Globe, LayoutTemplate, Smartphone } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const services = [
  {
    title: "Web Development",
    desc: "Fast, SEO-optimized websites using Next.js and React.",
    icon: <Globe className="w-8 h-8 text-white" />,
  },
  {
    title: "Custom Web Apps",
    desc: "Scalable SaaS platforms and internal tools tailored to your workflow.",
    icon: <Code2 className="w-8 h-8 text-white" />,
  },
  {
    title: "UI/UX Design",
    desc: "Modern, intuitive interfaces designed with Figma and implemented with Tailwind.",
    icon: <LayoutTemplate className="w-8 h-8 text-white" />,
  },
  {
    title: "Mobile Solutions",
    desc: "Responsive designs that look perfect on every device.",
    icon: <Smartphone className="w-8 h-8 text-white" />,
  },
];

export default function Services() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section id="services" ref={container} className="py-32 px-6 bg-black">
      <div className="container mx-auto">
        <div className="mb-20 max-w-2xl">
          <span className="text-red-600 font-mono text-xs tracking-[0.2em] uppercase mb-4 block">Services</span>
          {/* UPDATED: Header Font */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-oswald uppercase">Our Expertise</h2>
          <p className="text-zinc-400 text-lg font-sans">Comprehensive IT solutions designed for scale, speed, and security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card p-8 bg-zinc-900/20 rounded-xl border border-white/5 hover:bg-zinc-900/50 hover:border-red-600/40 transition-all duration-500 group"
            >
              <div className="mb-6 p-4 bg-white/5 rounded-lg w-fit group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300">
                {service.icon}
              </div>
              {/* UPDATED: Card Title Font */}
              <h3 className="text-xl font-bold mb-3 text-white font-oswald uppercase tracking-wide">{service.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors font-sans">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}