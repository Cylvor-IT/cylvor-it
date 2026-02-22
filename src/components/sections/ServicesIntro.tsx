"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesIntro() {
    const container = useRef(null);
    const titleRef = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Desktop/tablet: keep pinned section + title transform animation
        mm.add("(min-width: 768px)", () => {
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
                    pinSpacing: false,
                    start: "top top",
                    end: "100%",
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            tl.to(
                titleRef.current,
                {
                    scale: 0.4,
                    top: "5%",
                    yPercent: 0,
                    xPercent: -50,
                    left: "50%",
                    color: "#a3e635",
                    ease: "power2.inOut",
                },
                "start"
            );

            // Simple parallax for the background glow
            tl.to(".services-glow-orb", {
                yPercent: 30,
                ease: "none",
            }, "start");
        });

        // Mobile: no pinning
        mm.add("(max-width: 767px)", () => {
            gsap.set(titleRef.current, {
                clearProps: "all",
            });

            gsap.to(".services-glow-orb", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                yPercent: 50,
                ease: "none",
            });
        });

        return () => mm.revert();
    }, { scope: container });

    return (
        <section
            ref={container}
            id="services"
            className="relative w-full bg-transparent flex flex-col items-center min-h-[50svh] md:h-screen overflow-visible md:overflow-hidden justify-center"
        >
            {/* Subtle background glow */}
            <div className="services-glow-orb absolute top-1/4 right-0 md:top-0 md:right-0 w-[80vw] md:w-[60vw] h-[60vh] bg-lime-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <h2
                ref={titleRef}
                className="z-10 text-[14vw] md:text-[12vw] leading-none font-black font-oswald text-white whitespace-nowrap select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] will-change-transform pointer-events-none"
            >
                OUR SERVICES
            </h2>
        </section>
    );
}
