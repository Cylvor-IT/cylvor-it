"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Zap, Target, CheckCircle, Clock, Users, ShieldCheck, Activity, Timer } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cubeStyles = `
  @keyframes rotateCubeVertical {
    0%, 20% { transform: translateZ(-120px) rotateX(0deg); }
    25%, 45% { transform: translateZ(-120px) rotateX(-90deg); }
    50%, 70% { transform: translateZ(-120px) rotateX(-180deg); }
    75%, 95% { transform: translateZ(-120px) rotateX(-270deg); }
    100% { transform: translateZ(-120px) rotateX(-360deg); }
  }
  .cube-container {
    perspective: 1000px;
  }
  .cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: rotateCubeVertical 12s infinite ease-in-out;
  }
  .cube-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    /* Improved Blur: Increased opacity slightly to ground the blur during pinning */
    background: rgba(15, 15, 15, 0.7); 
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform-origin: center center;
  }
`;

const PerformanceCube = () => {
  return (
    <div className="cube-container w-full h-full rounded-lg overflow-visible z-30">
      <style>{cubeStyles}</style>
      <div className="cube">
        <div className="cube-face rounded-lg" style={{ transform: "rotateX(0deg) translateZ(120px)" }}>
           <Target className="w-10 h-10 text-lime-400 mb-2" />
           <div className="text-5xl font-black text-white font-oswald flex items-baseline">100%</div>
           <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-2">Success Rate</span>
        </div>
        <div className="cube-face rounded-lg" style={{ transform: "rotateX(-90deg) translateZ(120px)" }}>
           <CheckCircle className="w-10 h-10 text-lime-400 mb-2" />
           <div className="text-5xl font-black text-white font-oswald flex items-baseline">50+</div>
           <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-2">Projects Done</span>
        </div>
        <div className="cube-face rounded-lg" style={{ transform: "rotateX(-180deg) translateZ(120px)" }}>
           <Clock className="w-10 h-10 text-lime-400 mb-2" />
           <div className="text-4xl font-black text-white font-oswald uppercase text-center leading-none">On<br/>Time</div>
           <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-2">Delivery</span>
        </div>
        <div className="cube-face rounded-lg" style={{ transform: "rotateX(-270deg) translateZ(120px)" }}>
           <Users className="w-10 h-10 text-lime-400 mb-2" />
           <div className="text-5xl font-black text-white font-oswald flex items-baseline">100%</div>
           <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-2">Happy Clients</span>
        </div>
      </div>
    </div>
  );
};

const SupportCube = () => {
    return (
      <div className="cube-container w-full h-full rounded-lg overflow-visible z-30">
        <div className="cube"> 
          <div className="cube-face rounded-lg" style={{ transform: "rotateX(0deg) translateZ(120px)" }}>
             <Zap className="w-10 h-10 text-lime-400 mb-2" />
             <div className="text-5xl font-black text-white font-oswald flex items-baseline">24/7</div>
             <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-2">Live Support</span>
          </div>
          <div className="cube-face rounded-lg" style={{ transform: "rotateX(-90deg) translateZ(120px)" }}>
             <Timer className="w-10 h-10 text-lime-400 mb-2" />
             <div className="text-5xl font-black text-white font-oswald flex items-baseline">&lt;15m</div>
             <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-2">Response Time</span>
          </div>
          <div className="cube-face rounded-lg" style={{ transform: "rotateX(-180deg) translateZ(120px)" }}>
             <Activity className="w-10 h-10 text-lime-400 mb-2" />
             <div className="text-5xl font-black text-white font-oswald uppercase text-center leading-none">100%</div>
             <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-2">Server Uptime</span>
          </div>
          <div className="cube-face rounded-lg" style={{ transform: "rotateX(-270deg) translateZ(120px)" }}>
             <ShieldCheck className="w-10 h-10 text-lime-400 mb-2" />
             <div className="text-4xl font-black text-white font-oswald flex items-baseline">PRO</div>
             <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-2">Expert Team</span>
          </div>
        </div>
      </div>
    );
  };

export default function About() {
  const container = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    gsap.set(titleRef.current, {
      position: "absolute",
      top: "50%", 
      left: "50%", 
      xPercent: -50, 
      yPercent: -50, 
      scale: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        start: "top top",
        end: "+=1000",
        scrub: 1,
        anticipatePin: 1,
      }
    });

    tl.to(titleRef.current, {
      scale: 0.4,        
      top: "5%",         
      yPercent: 0,       
      xPercent: -50,     
      left: "50%",       
      color: "#a3e635",  
      ease: "power2.inOut",
    }, "start");

    tl.fromTo(gridRef.current, 
      { 
        y: 50, 
        opacity: 0, 
        scale: 0.98,
        // Force rendering context during animation
        force3D: true 
      },
      { 
        y: 0,   
        opacity: 1, 
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, 
      "start+=0.2"
    );

  }, { scope: container });

  return (
    <section 
      ref={container} 
      id="about" 
      className="relative h-screen w-full overflow-hidden bg-transparent flex flex-col items-center"
      style={{ isolation: 'isolate' }} // Creates a new stacking context
    >
      <h2 
        ref={titleRef}
        className="z-10 text-[12vw] leading-none font-black font-oswald text-white whitespace-nowrap select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] will-change-transform pointer-events-none"
      >
        WHO WE ARE
      </h2>

      <div 
        ref={gridRef}
        className="relative z-20 container mx-auto px-6 pt-[25vh] h-full flex flex-col justify-start transform-gpu"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[240px] gap-6 w-full max-w-7xl mx-auto">

          {/* Narrative Card */}
          <div className="md:col-span-8 h-full p-8 bg-zinc-900/70 backdrop-blur-2xl border border-white/10 rounded-lg relative overflow-hidden group hover:border-lime-400/30 transition-all shadow-2xl flex flex-col justify-center transform-gpu">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
               <Cpu className="w-20 h-20 text-lime-400" />
            </div>
            <h3 className="text-xl md:text-3xl font-bold text-white mb-3 font-oswald uppercase tracking-wide">
              The <span className="text-lime-400">New Wave</span> of Innovation
            </h3>
            <p className="text-zinc-300 text-sm md:text-lg leading-relaxed font-sans mb-2 line-clamp-3">
              We are not just another IT firm. We are a dynamic startup born from the idea that technology should be intuitive and beautiful. We deliver pure, high-performance digital solutions.
            </p>
            <p className="text-zinc-500 font-sans text-[10px] uppercase tracking-widest mt-2">
              Fresh developers. Pure performance.
            </p>
          </div>

          <div className="md:col-span-4 h-full w-full">
             <PerformanceCube />
          </div>

          <div className="md:col-span-4 h-full w-full">
             <SupportCube />
          </div>

          {/* Vision Card */}
          <div className="md:col-span-8 h-full p-8 bg-gradient-to-r from-lime-900/40 to-black/70 backdrop-blur-2xl border border-lime-400/20 rounded-lg flex items-center justify-between shadow-2xl transform-gpu">
            <div>
              <span className="text-lime-300 font-mono text-xs tracking-[0.2em] uppercase mb-2 block">Our Vision</span>
              <h3 className="text-xl md:text-3xl font-bold text-white font-oswald uppercase leading-tight">
                Architecting the <br/> Digital Future
              </h3>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/20 mx-8" />
            <p className="hidden md:block text-sm text-zinc-400 max-w-xs font-sans">
              From MVP to Enterprise scale, we build systems that grow with your ambition. We focus on scalable code and future-proof design.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}