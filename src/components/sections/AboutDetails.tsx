"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";


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
    const sectionRef = useRef(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const titleContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        // Get the total scroll width (width of track - viewport width)
        const getScrollAmount = () => {
            let trackWidth = track.scrollWidth;
            return -(trackWidth - window.innerWidth);
        };

        // Create a master timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${Math.abs(getScrollAmount()) + 2500}`, // Deep scroll for distinct steps
                pin: true,
                scrub: 1, // Smooth scrub
                invalidateOnRefresh: true,
            }
        });

        // 1. Text Reveal Animation (Simultaneous)
        // We want: HOW, WE, WORK to reveal together with a slight stagger for elegance
        const chars = titleContainerRef.current?.querySelectorAll(".reveal-text");

        if (chars && chars.length > 0) {
            tl.to(chars, {
                y: "0%",
                duration: 1,
                stagger: 0.1, // Slight stagger for "wave" effect, effectively simultaneous perception
                ease: "power3.out"
            });
            tl.to({}, { duration: 0.5 }); // Gap before horizontal scroll
        }

        // 2. Horizontal Scroll
        tl.to(track, {
            x: getScrollAmount,
            ease: "none",
            duration: 10, // Much longer relative to the text reveals, so dragging feels like a proper horizontal scroll
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="about-details"
            className="relative w-full h-screen overflow-hidden bg-transparent flex flex-col justify-center pt-20"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

            {/* Horizontal Track - Uses pr-[30vw] for correct last-card centering */}
            <div
                ref={trackRef}
                className="flex gap-4 md:gap-10 px-6 md:px-10 w-fit items-center h-full pr-[20vw] md:pr-[30vw]"
            >
                {/* Intro Card */}
                <div className="w-[80vw] md:w-[40vw] h-[60vh] shrink-0 flex flex-col justify-end p-8 border-l border-white/20">

                    {/* Mask Reveal Container */}
                    <div ref={titleContainerRef} className="flex flex-col gap-0">
                        {/* Line 1 */}
                        <div className="overflow-hidden">
                            <h2 className="reveal-text text-6xl md:text-9xl font-black text-white font-oswald uppercase leading-[0.9] translate-y-full">
                                HOW
                            </h2>
                        </div>
                        {/* Line 2 */}
                        <div className="overflow-hidden">
                            <h2 className="reveal-text text-6xl md:text-9xl font-black text-white font-oswald uppercase leading-[0.9] translate-y-full">
                                WE
                            </h2>
                        </div>
                        {/* Line 3 - Green */}
                        <div className="overflow-hidden">
                            <h2 className="reveal-text text-6xl md:text-9xl font-black text-lime-400 font-oswald uppercase leading-[0.9] translate-y-full">
                                WORK
                            </h2>
                        </div>


                    </div>

                </div>

                {/* The Steps */}
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className="relative w-[85vw] md:w-[35vw] h-[60vh] md:h-[70vh] shrink-0 bg-zinc-950/80 border border-white/10 p-8 md:p-12 flex flex-col justify-between group hover:border-lime-400/50 transition-colors duration-500 backdrop-blur-md"
                    >
                        {/* Step Number */}
                        <div className="text-8xl md:text-[12rem] font-black text-white/5 font-oswald leading-none absolute top-0 right-0 p-4 select-none group-hover:text-lime-400/10 transition-colors duration-500">
                            {step.id}
                        </div>

                        <div className="relative z-10 mt-auto">
                            <h3 className="text-4xl md:text-5xl font-bold text-white font-oswald mb-6 uppercase">
                                {step.title}
                            </h3>
                            <div className="h-1 w-20 bg-lime-400 mb-6" />
                            <p className="text-lg md:text-xl text-zinc-400 font-sans leading-relaxed max-w-sm">
                                {step.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
