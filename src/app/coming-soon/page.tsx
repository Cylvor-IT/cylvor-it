"use client";

import Link from 'next/link';
import { useTransition } from '@/components/layout/PageTransitionProvider';
import { ArrowUpRight } from 'lucide-react';

export default function ComingSoonPage() {
    const { triggerTransition } = useTransition();

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center bg-transparent text-white overflow-hidden selection:bg-lime-400/30">
            {/* Background Effects */}
            <div className="absolute left-0 right-0 top-0 -z-0 m-auto h-[300px] w-[300px] rounded-full bg-lime-400 opacity-20 blur-[120px]"></div>

            <div className="relative z-10 flex flex-col items-center justify-center -mt-20 px-4 text-center">

                {/* Loading Animation */}
                <div className="mb-12 relative flex items-center justify-center animate-fade-in-up">
                    <div className="w-24 h-24 rounded-full border-t-2 border-r-2 border-lime-400 animate-spin"></div>
                    <div className="absolute inset-0 m-auto w-16 h-16 rounded-full border-b-2 border-l-2 border-white/20 animate-[spin_2s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-0 m-auto w-8 h-8 rounded-full border-t-2 border-r-2 border-lime-400 animate-[spin_1.5s_linear_infinite]"></div>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-oswald uppercase tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    Coming <span className="text-lime-400">Soon</span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-lg mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    We&apos;re working hard to bring you something amazing. Our new project will be launching very soon.
                </p>

                <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <Link
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            triggerTransition('/');
                        }}
                        className="relative inline-flex items-center justify-center gap-3 px-10 py-4 mt-4 bg-lime-400 text-black text-sm md:text-base font-bold uppercase tracking-wider transition-all font-oswald shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:shadow-[0_0_35px_rgba(163,230,53,0.6)] overflow-hidden group"
                    >
                        {/* 1. SLIDING BACKGROUND (White) */}
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />

                        {/* 2. CONTENT */}
                        <div className="relative z-10 flex items-center gap-3 group-hover:text-lime-400 transition-colors duration-300">
                            <span>Return Home</span>

                            {/* ICON SWAP ANIMATION */}
                            <div className="relative w-5 h-5 overflow-hidden flex items-center justify-center">
                                <ArrowUpRight className="w-5 h-5 absolute transition-transform duration-300 group-hover:-translate-y-[150%] group-hover:translate-x-[150%]" />
                                <ArrowUpRight className="w-5 h-5 absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    opacity: 0;
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
        </main>
    );
}
