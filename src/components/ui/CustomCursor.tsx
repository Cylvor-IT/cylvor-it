"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // 1. Move the Main Dot Instantly (No GSAP lag)
        // using direct DOM updates for 1:1 feel
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }

            // Update GSAP follower target 
            // We still use GSAP for the smooth follower
            if (followerRef.current) {
                gsap.to(followerRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.6,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }
        };

        window.addEventListener("mousemove", moveCursor);

        // 2. Handle Hover States
        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        const addListeners = () => {
            const interactiveElements = document.querySelectorAll("a, button, input, textarea, [data-hover]");
            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", handleMouseEnter);
                el.addEventListener("mouseleave", handleMouseLeave);
            });
        }

        addListeners();

        // Observe specifically for new interactive elements
        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            {/* Main Cursor Dot - Wrapper for positioning */}
            <div
                ref={cursorRef}
                className="hidden md:block fixed top-0 left-0 z-[10000] pointer-events-none will-change-transform"
            >
                {/* Inner Dot - For styling and scaling */}
                <div
                    className={cn(
                        "w-4 h-4 bg-lime-400 rounded-full mix-blend-difference transition-all duration-200 ease-out -translate-x-1/2 -translate-y-1/2",
                        isHovering ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    )}
                />
            </div>

            {/* Cursor Follower (Ring) - Wrapper for positioning */}
            <div
                ref={followerRef}
                className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
            >
                {/* Inner Ring - For styling and scaling */}
                <div
                    className={cn(
                        "w-10 h-10 border border-lime-400 rounded-full mix-blend-difference transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2",
                        isHovering ? "scale-110 bg-lime-400/20 border-transparent" : "scale-100"
                    )}
                />
            </div>
        </>
    );
}
