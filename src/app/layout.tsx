import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";

// 1. Configure Inter (Body)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

// 2. Configure Oswald (Headers)
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
        <SmoothScroll>
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-1 md:inset-2 z-[9999] rounded-md border border-zinc-900/20 shadow-[0_0_0_9999px_white]"
          />
          
          <Navbar />
          {children}
          
          <footer className="py-10 text-center text-zinc-600 text-[10px] uppercase tracking-widest bg-black relative z-10 font-sans">
            © {new Date().getFullYear()} Cylvor IT. All rights reserved.
          </footer>
        </SmoothScroll>
      </body>
    </html>
  );
}