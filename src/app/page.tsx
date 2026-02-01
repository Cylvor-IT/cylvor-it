import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    // UPDATED: bg-transparent so the layout's global 3D background shows through
    <main className="w-full bg-transparent relative">
      <div className="relative z-10">
        <Hero />
      </div>
      
      <div className="relative z-0">
        <About />
        <Services />
        <Contact />
      </div>
    </main>
  );
}