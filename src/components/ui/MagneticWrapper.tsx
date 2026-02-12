"use client";

import { useRef, ReactElement } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticWrapperProps {
    children: ReactElement;
    strength?: number; // How strong the pull is (default: 0.5)
    range?: number;    // Distance in px to trigger effect (default: 100)
}

export default function MagneticWrapper({
    children,
    strength = 0.5,
    range = 100,
    className
}: MagneticWrapperProps & { className?: string }) {
    const magnetRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const element = magnetRef.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const distance = Math.hypot(clientX - centerX, clientY - centerY);

            if (distance < range) {
                const x = (clientX - centerX) * strength;
                const y = (clientY - centerY) * strength;
                xTo(x);
                yTo(y);
            } else {
                xTo(0);
                yTo(0);
            }
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        window.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: magnetRef, dependencies: [strength, range] });

    return (
        <div ref={magnetRef} className={className}>
            {children}
        </div>
    );
}
