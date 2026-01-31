import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a standard tech font
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cylvor IT | Modern Digital Solutions",
  description: "Web development, UI/UX, and digital services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <footer className="py-8 text-center text-slate-600 text-sm bg-black">
          © {new Date().getFullYear()} Cylvor IT. All rights reserved.
        </footer>
      </body>
    </html>
  );
}