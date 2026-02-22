"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: "01",
        title: "PLAN",
        text: "We study your business. We make a clear roadmap.",
        bg: "bg-zinc-900"
    },
    {
        id: "02",
        title: "DESIGN",
        text: "We create visuals that look great and work everywhere.",
        bg: "bg-zinc-900"
    },
    {
        id: "03",
        title: "BUILD",
        text: "We write clean code so your site is fast and safe.",
        bg: "bg-zinc-900"
    },
    {
        id: "04",
        title: "GROW",
        text: "We help you launch and reach more customers.",
        bg: "bg-zinc-900"
    },
];

export default function AboutDetails() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // DESKTOP & TABLET: Pinned Horizontal Scroll
        mm.add("(min-width: 768px)", () => {
            const track = trackRef.current;
            if (!track) return;

            // Calculate exactly how far to slide left
            // We add ~350px of extra scroll so the last card comes into the view more naturally 
            // without leaving a massive empty gap on the right.
            const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 350);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    // Scroll distance proportional to the width + extra for the text reveal phase
                    end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight}`,
                    pin: true,
                    scrub: 1, // Smooth scrub for Lenis
                    invalidateOnRefresh: true, // Recalculate if window resizes
                    anticipatePin: 1,
                }
            });

            // 1. Text Reveal Animation (Starts immediately upon pinning)
            tl.to(".reveal-text", {
                y: "0%",
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });

            // 2. Tiny pause so the user registers the text before it moves away
            tl.to({}, { duration: 0.3 });

            // 3. Horizontal Scroll of the track
            tl.to(track, {
                x: getScrollAmount,
                duration: 4, // Higher duration relative to text reveal so sliding takes up most of the scroll
                ease: "none",
            });
        });

        // MOBILE: Vertical Scroll (No pinning, stacked layout)
        mm.add("(max-width: 767px)", () => {
            // Instantly show the text on mobile (no complex reveal needed)
            gsap.set(".reveal-text", { y: "0%" });

            // Fade in each step card as it enters the viewport
            gsap.utils.toArray(".mobile-step-card").forEach((card: any) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });
        });

        return () => mm.revert(); // Clean up on unmount or resize
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="about-details"
            className="relative w-full md:h-screen bg-transparent flex flex-col justify-center overflow-hidden"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />

            {/* Track Container 
                - Desktop: flex-row, h-full, w-max (allows horizontal scroll)
                - Mobile: flex-col, h-auto, w-full, stacked naturally with padding
            */}
            <div
                ref={trackRef}
                className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 w-full md:w-max h-auto md:h-full px-6 py-20 md:py-0 md:px-10 items-center will-change-transform"
            >
                {/* Intro Card: "HOW WE WORK" */}
                <div className="w-full md:w-[45vw] lg:w-[40vw] h-auto md:h-[60vh] shrink-0 flex flex-col justify-end md:p-8 md:border-l border-white/20 mb-12 md:mb-0">
                    <div className="flex flex-col gap-0 md:gap-2">
                        {/* Line 1 */}
                        <div className="overflow-hidden pb-2 md:pb-0">
                            <h2 className="reveal-text text-[15vw] md:text-8xl lg:text-9xl font-black text-white font-oswald uppercase leading-[0.85] md:translate-y-[110%] will-change-transform">
                                HOW
                            </h2>
                        </div>
                        {/* Line 2 */}
                        <div className="overflow-hidden pb-2 md:pb-0">
                            <h2 className="reveal-text text-[15vw] md:text-8xl lg:text-9xl font-black text-white font-oswald uppercase leading-[0.85] md:translate-y-[110%] will-change-transform">
                                WE
                            </h2>
                        </div>
                        {/* Line 3 - Green */}
                        <div className="overflow-hidden pb-2 md:pb-0">
                            <h2 className="reveal-text text-[15vw] md:text-8xl lg:text-9xl font-black text-lime-400 font-oswald uppercase leading-[0.85] md:translate-y-[110%] will-change-transform">
                                WORK
                            </h2>
                        </div>
                    </div>
                </div>

                {/* The Step Cards */}
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="mobile-step-card relative w-full md:w-[400px] lg:w-[450px] h-[300px] md:h-[60vh] lg:h-[70vh] shrink-0 bg-zinc-950/80 border border-white/10 p-8 md:p-12 flex flex-col justify-between group hover:border-lime-400/50 transition-colors duration-500 backdrop-blur-md"
                    >
                        {/* Step Number Background */}
                        <div className="text-8xl md:text-[10rem] lg:text-[12rem] font-black text-white/5 font-oswald leading-none absolute top-4 right-4 md:top-0 md:right-0 md:p-4 select-none group-hover:text-lime-400/10 transition-colors duration-500 pointer-events-none">
                            {step.id}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 mt-auto">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-oswald mb-4 md:mb-6 uppercase tracking-wide group-hover:text-lime-300 transition-colors">
                                {step.title}
                            </h3>
                            <div className="h-1 w-16 md:w-20 bg-lime-400 mb-4 md:mb-6" />
                            <p className="text-base md:text-lg lg:text-xl text-zinc-400 font-sans leading-relaxed max-w-sm">
                                {step.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}