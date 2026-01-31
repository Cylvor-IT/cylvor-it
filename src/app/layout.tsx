import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a standard tech font
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-1 z-[9999] rounded-[8px] border border-white shadow-[0_0_0_9999px_rgba(255,255,255,1)] md:inset-2"
        />
        <Navbar />
        {children}
        <footer className="py-10 text-center text-white/60 text-sm bg-black">
          © {new Date().getFullYear()} Cylvor IT. All rights reserved.
        </footer>
      </body>
    </html>
  );
}