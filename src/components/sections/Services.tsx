"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Web Development",
    tags: ["Next.js", "React", "TypeScript", "SEO", "Performance"],
    desc: "High-performance websites built for speed and visibility. We create blazing-fast, SEO-optimized web experiences using cutting-edge technologies. From landing pages to complex web applications, we ensure your digital presence stands out with pixel-perfect design and exceptional performance.",
    color: "from-lime-500 to-emerald-500",
    gradient: "bg-gradient-to-br from-lime-500/20 to-emerald-500/20",
    features: ["Server-Side Rendering", "Progressive Web Apps", "Core Web Vitals Optimization"],
  },
  {
    id: "02",
    title: "Custom Web Apps",
    tags: ["SaaS", "Internal Tools", "API Integration", "Database Design"],
    desc: "Scalable platforms tailored to your specific workflow. We build robust custom applications that streamline your business operations, from CRM systems to data dashboards. Our solutions are designed to grow with your business, featuring secure authentication, real-time data, and seamless third-party integrations.",
    color: "from-lime-500 to-emerald-500",
    gradient: "bg-gradient-to-br from-lime-500/20 to-emerald-500/20",
    features: ["Microservices Architecture", "Real-time Collaboration", "Advanced Analytics"],
  },
  {
    id: "03",
    title: "UI/UX Design",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    desc: "Intuitive interfaces that drive user engagement. We craft beautiful, user-centered designs that combine aesthetics with functionality. Through extensive research and iterative testing, we create experiences that users love and remember, backed by comprehensive design systems for consistency.",
    color: "from-lime-500 to-emerald-500",
    gradient: "bg-gradient-to-br from-lime-500/20 to-emerald-500/20",
    features: ["User Journey Mapping", "Interactive Prototypes", "Accessibility Compliance"],
  },
  {
    id: "04",
    title: "Mobile Solutions",
    tags: ["iOS", "Android", "React Native", "Flutter", "App Store"],
    desc: "Native-feel applications for every device. We develop cross-platform mobile apps that deliver seamless experiences on iOS and Android. From concept to app store deployment, we handle everything - ensuring your app performs flawlessly while providing an intuitive interface that keeps users engaged.",
    color: "from-lime-500 to-emerald-500",
    gradient: "bg-gradient-to-br from-lime-500/20 to-emerald-500/20",
    features: ["Offline Support", "Push Notifications", "App Store Optimization"],
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
    });

    // Set initial state for third and fourth cards (hidden, off to the right)
    gsap.set(".service-card:nth-child(3), .service-card:nth-child(4)", {
      x: "100%",
      opacity: 0,
      visibility: "hidden",
    });

    // Set up z-index and pointer events control
    const cards1and2 = gsap.utils.toArray<HTMLElement>(".service-card:nth-child(1), .service-card:nth-child(2)");
    cards1and2.forEach(card => {
      card.style.zIndex = '5';
      card.style.pointerEvents = 'auto';
    });

    const cards3and4 = gsap.utils.toArray<HTMLElement>(".service-card:nth-child(3), .service-card:nth-child(4)");
    cards3and4.forEach(card => {
      card.style.zIndex = '1';
      card.style.pointerEvents = 'none';
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        start: "top top",
        end: "+=5000",
        scrub: 1.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Dynamic pointer events based on scroll progress
          if (self.progress < 0.5) {
            // First half: cards 1 & 2 are active
            cards1and2.forEach(card => {
              card.style.pointerEvents = 'auto';
              card.style.zIndex = '5';
            });
            cards3and4.forEach(card => {
              card.style.pointerEvents = 'none';
              card.style.zIndex = '1';
            });
          } else {
            // Second half: cards 3 & 4 are active
            cards1and2.forEach(card => {
              card.style.pointerEvents = 'none';
              card.style.zIndex = '1';
            });
            cards3and4.forEach(card => {
              card.style.pointerEvents = 'auto';
              card.style.zIndex = '5';
            });
          }
        }
      }
    });

    // Animate title to top and scale down
    tl.to(titleRef.current, {
      scale: 0.35,
      top: "8%",
      yPercent: 0,
      xPercent: -50,
      left: "50%",
      color: "#a3e635",
      ease: "power2.inOut",
    }, "start");

    // Quickly show first two cards
    tl.from(".service-card:nth-child(1), .service-card:nth-child(2)", {
      opacity: 0,
      y: 40,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
    }, "start+=0.3");

    // Fade out cards 1 and 2
    tl.to(".service-card:nth-child(1), .service-card:nth-child(2)", {
      opacity: 0,
      x: -100,
      scale: 0.95,
      visibility: "hidden",
      stagger: 0.1,
      duration: 1.2,
      ease: "power2.in",
    }, "start+=1.8");

    // Slide third and fourth cards from right
    tl.to(".service-card:nth-child(3), .service-card:nth-child(4)", {
      x: 0,
      opacity: 1,
      visibility: "visible",
      stagger: 0.25,
      duration: 1.8,
      ease: "power2.out",
    }, "start+=2.0");

  }, { scope: container });

  return (
    <section
      ref={container}
      id="services"
      className="relative min-h-screen w-full overflow-hidden pb-32"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Title - starts centered, moves to top */}
      <h2 ref={titleRef} className="z-10 text-[12vw] leading-none font-black font-oswald text-white whitespace-nowrap select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] will-change-transform pointer-events-none">
        OUR EXPERTISE
      </h2>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-[35vh]">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto relative md:min-h-[600px]">
          {services.map((service, index) => (
            <article
              key={service.id}
              className={`service-card group relative ${index >= 2 ? 'md:absolute md:inset-0 md:top-0' : ''} ${
                index === 2 ? 'md:left-0 md:right-1/2 md:mr-6' : ''
              } ${
                index === 3 ? 'md:left-1/2 md:right-0 md:ml-6' : ''
              } overflow-visible`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                perspective: "1000px",
              }}
            >
              {/* Card container with 3D transform */}
              <div className="relative h-full transition-all duration-500 ease-out transform-gpu group-hover:scale-[1.02] group-hover:-translate-y-2 overflow-visible" style={{ transformStyle: "preserve-3d" }}>
                {/* Animated gradient border - positioned outside the card */}
                <div className="absolute -inset-[3px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ zIndex: -1 }}>
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} blur-xl opacity-75`} />
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} animate-spin-slow`} />
                </div>

                {/* Main card */}
                <div className="relative h-full bg-zinc-900/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/5 transition-all duration-500 group-hover:border-lime-400/50">
                  
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="relative">
                        <span className={`text-7xl md:text-8xl font-black font-oswald bg-gradient-to-br ${service.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-500`}>
                          {service.id}
                        </span>
                        <div className={`absolute -inset-2 bg-gradient-to-r ${service.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                      </div>
                      <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:rotate-45 transform">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black font-oswald uppercase text-white mb-6 leading-tight group-hover:translate-x-2 transition-transform duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors duration-300">
                      {service.desc}
                    </p>

                    {/* Features */}
                    <div className="mb-6 space-y-2">
                      {service.features.map((feature, index) => (
                        <div 
                          key={feature} 
                          className="flex items-center gap-2 text-zinc-500 group-hover:text-lime-400 transition-all duration-300"
                          style={{
                            transitionDelay: hoveredCard === service.id ? `${index * 75}ms` : '0ms'
                          }}
                        >
                          <div className="p-1 rounded-full bg-lime-500/10 border border-lime-500/20">
                            <Check className="w-3 h-3 text-lime-400" />
                          </div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, tagIndex) => (
                        <span 
                          key={tag} 
                          className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                            hoveredCard === service.id
                              ? `bg-white/10 border-white/30 text-white`
                              : 'bg-white/5 border-white/10 text-zinc-500'
                          }`}
                          style={{
                            transitionDelay: hoveredCard === service.id ? `${tagIndex * 50}ms` : '0ms'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Animated corner accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-full transform translate-x-16 -translate-y-16`} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}