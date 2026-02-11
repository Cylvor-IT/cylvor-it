import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Scene3D_V2 from "@/components/ui/Scene3D_V2";
import { Preload } from "@react-three/drei";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransitionProvider from "@/components/layout/PageTransitionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Cylvor IT | Modern Digital Solutions",
  description: "Web development, UI/UX, and digital services.",
  icons: {
    icon: "/assets/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} font-sans bg-black text-white antialiased`}>
        <PageTransitionProvider>
        {/* GLOBAL 3D BACKGROUND 
            - Fixed: Stays in place while scrolling
            - z-0: Behind content
        */}
        <Preloader />
        <CustomCursor />
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Scene3D_V2 />
        </div>

        <SmoothScroll>
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-1 md:inset-2 z-[9999] rounded-md border border-zinc-900/20 shadow-[0_0_0_9999px_white]"
          />

          <Navbar />

          {/* Ensure children have a relative z-index to sit ON TOP of the background */}
          <div className="relative z-10">
            {children}
          </div>

        </SmoothScroll>
        </PageTransitionProvider>
      </body>
    </html>
  );
}