"use client";

import { Code2, Globe, LayoutTemplate, Smartphone } from "lucide-react"; // Icons

const services = [
  {
    title: "Web Development",
    desc: "Fast, SEO-optimized websites using Next.js and React.",
    icon: <Globe className="w-10 h-10 text-red-500" />,
  },
  {
    title: "Custom Web Apps",
    desc: "Scalable SaaS platforms and internal tools tailored to your workflow.",
    icon: <Code2 className="w-10 h-10 text-red-500" />,
  },
  {
    title: "UI/UX Design",
    desc: "Modern, intuitive interfaces designed with Figma and implemented with Tailwind.",
    icon: <LayoutTemplate className="w-10 h-10 text-red-500" />,
  },
  {
    title: "Mobile Solutions",
    desc: "Responsive designs that look perfect on every device.",
    icon: <Smartphone className="w-10 h-10 text-red-500" />,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Expertise</h2>
          <p className="text-white/70">Comprehensive IT solutions for modern businesses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="mb-4 p-3 bg-black/40 rounded-lg w-fit transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}