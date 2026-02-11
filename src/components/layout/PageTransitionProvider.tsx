"use client";

import { createContext, useContext, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TransitionContext = createContext({
  triggerTransition: (href: string) => {},
});

export const useTransition = () => useContext(TransitionContext);

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef(null);
  
  // State to track if we are currently handling a user-initiated transition
  // This prevents double-firing or conflicting animations
  const [isTransitioning, setIsTransitioning] = useState(false);

  // --- HANDLE PAGE ENTER (REVEAL) ---
  // Runs whenever the pathname changes (new page loaded)
  useGSAP(() => {
    
    // Animate columns AWAY (Reveal new page)
    const tl = gsap.timeline({
         onComplete: () => setIsTransitioning(false)
    });

    // We want the shutters to disappear. 
    // Effect: They slide down nicely or shrink.
    // Let's make them shrink to the bottom (wiping down finish)
    tl.to(".transition-column", {
        scaleY: 0,
        transformOrigin: "bottom center",
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.inOut",
        delay: 0.1 // Small buffer for React rendering
    });

  }, { dependencies: [pathname], scope: containerRef });


  // --- HANDLE PAGE EXIT (COVER) ---
  // Runs when user clicks a link
  const triggerTransition = (href: string) => {
    if (pathname === href || isTransitioning) return;
    
    setIsTransitioning(true);

    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                router.push(href);
                // Note: The 'pathname' change will trigger the useGSAP above 
                // to run the reveal animation.
            }
        });

        // 1. Reset columns to be at top ready to drop down
        // scaleY: 0 means they are invisible (height 0)
        tl.set(".transition-column", { 
            transformOrigin: "top center",
            scaleY: 0 
        });

        // 2. Animate columns IN (Cover screen)
        tl.to(".transition-column", {
            scaleY: 1, // Full height
            duration: 0.6,
            stagger: 0.05,
            ease: "power4.inOut",
        });

        // 3. Optional: Add a little "Loading" pause feel
        tl.to({}, { duration: 0.1 });

    }, containerRef);
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      
      {/* 
        TRANSITION OVERLAY 
        - 5 Vertical Columns
        - Fixed on top of everything
        - Pointer events none to allow clicks when hidden
      */}
      <div 
        ref={containerRef} 
        className="fixed inset-0 z-[9999] pointer-events-none flex"
      >
        {[...Array(5)].map((_, i) => (
            <div 
                key={i} 
                className="transition-column relative flex-1 bg-zinc-950 border-r border-white/5 last:border-r-0"
                style={{ transform: "scaleY(0)" }} // Initially hidden
            >
                {/* Visual Flair: Glowing Line at the tip of the shutter */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-lime-400 shadow-[0_0_15px_#a3e635]" />
            </div>
        ))}
      </div>

    </TransitionContext.Provider>
  );
}
