"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: "EcoFin Dashboard",
    category: "Fintech Platform",
    description: "A comprehensive financial dashboard focusing on eco-friendly investments. Features real-time market data visualization, portfolio tracking, and AI-driven investment recommendations.",
    tags: ["Next.js", "TypeScript", "D3.js", "Supabase"],
    image: "/assets/project-1.jpg", 
    color: "from-emerald-400 to-teal-500",
    link: "#",
  },
  {
    id: 2,
    title: "Nebula Stream",
    category: "Media Streaming",
    description: "High-performance video streaming platform built for scalability. Includes adaptive bitrate streaming, social features like watch parties, and a custom recommendation engine.",
    tags: ["React", "Node.js", "WebRTC", "Redis"],
    image: "/assets/project-2.jpg",
    color: "from-purple-500 to-indigo-500",
    link: "#",
  },
  {
    id: 3,
    title: "Aether Archi",
    category: "3D Visualization",
    description: "Interactive 3D architectural visualization tool allowing clients to walk through rendered spaces directly in the browser using WebGL technologies.",
    tags: ["Three.js", "React Three Fiber", "Blender", "GLSL"],
    image: "/assets/project-3.jpg",
    color: "from-orange-400 to-rose-500",
    link: "#",
  },
  {
    id: 4,
    title: "Zenith Health",
    category: "Healthcare App",
    description: "Telemedicine application connecting patients with specialists. Encrypted video calls, secure medical record storage, and automated appointment scheduling.",
    tags: ["Flutter", "Firebase", "WebRTC", "Python"],
    image: "/assets/project-4.jpg",
    color: "from-blue-400 to-cyan-500",
    link: "#",
  }
];

export default function ProjectsPage() {
  const container = useRef(null);
  const scrollContainer = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray(".project-panel");
    
    // Horizontal Scroll Animation
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1,
        // Adjust the end value to control the speed of the horizontal scroll
        end: () => "+=" + (scrollContainer.current as any)?.offsetWidth, 
        snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.2, max: 0.3 },
            delay: 0,
            ease: "power1.inOut"
        }
      }
    });

  }, { scope: container });

  return (
    <main className="w-full bg-transparent min-h-screen relative">
      <div className="pt-20"> {/* Add padding top for fixed navbar */}
        <section id="projects" ref={container} className="relative overflow-hidden bg-transparent">
          
          {/* Horizontal Scroll Container */}
          <div ref={scrollContainer} className="flex h-screen w-[400%]">
            
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-panel w-screen h-full flex items-center justify-center p-6 md:p-20 relative border-r border-white/5 last:border-r-0"
              >
                 {/* Background Gradient Object (Visual Flair) */}
                 <div className={cn(
                   "absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br opacity-5 blur-[120px] rounded-full pointer-events-none",
                   project.color
                 )} />

                 <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
                    
                    {/* Text Content */}
                    <div className="space-y-8 order-2 md:order-1">
                       <div className="space-y-2">
                           <h4 className="text-lime-400 font-mono text-sm tracking-widest uppercase">
                              {project.id < 10 ? `0${project.id}` : project.id} — {project.category}
                           </h4>
                           <h2 className="text-4xl md:text-6xl font-black font-oswald text-white uppercase leading-none">
                              {project.title}
                           </h2>
                       </div>

                       <p className="text-zinc-400 font-sans leading-relaxed max-w-md">
                          {project.description}
                       </p>

                       <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-300 font-mono uppercase">
                              {tag}
                            </span>
                          ))}
                       </div>

                       <div className="pt-4 flex gap-4">
                          <a href={project.link} className="flex items-center gap-2 text-white border-b border-lime-400 pb-1 hover:text-lime-400 transition-colors group">
                             <span className="uppercase font-bold tracking-wider text-sm">View Case Study</span>
                             <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                       </div>
                    </div>

                    {/* Project Visual/Image */}
                    <div className="order-1 md:order-2 relative group overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 aspect-video md:aspect-square flex items-center justify-center">
                        {/* Placeholder for actual image */}
                        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10", project.color)} />
                        <div className="p-10 text-center">
                           <span className="text-zinc-600 font-oswald text-2xl uppercase">Project Preview</span>
                           <br />
                           <span className="text-zinc-700 text-sm">Image Asset Placeholder</span>
                        </div>
                    </div>

                 </div>
              </div>
            ))}

          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
             <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Scroll to explore</span>
          </div>

        </section>
      </div>
      <Footer />
    </main>
  );
}
