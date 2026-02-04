import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import AboutDetails from "@/components/sections/AboutDetails";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    // UPDATED: bg-transparent so the layout's global 3D background shows through
    <main className="w-full bg-transparent relative">
      <div className="relative z-10">
        <Hero />
      </div>
      
      <div className="relative z-0">
        <About />
        <AboutDetails />
        <Services />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}