import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="w-full bg-black relative">
      {/* Hero Wrapper: High Z-Index to stay on top during pinning */}
      <div className="relative z-10">
        <Hero />
      </div>
      
      {/* Content Wrapper: Lower Z-Index so it scrolls correctly below/after */}
      <div className="relative z-0">
        <About />
        <Services />
        <Contact />
      </div>
    </main>
  );
}