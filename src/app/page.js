import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Careers } from "@/components/sections/Careers";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Portfolio />
        <Services />
        <Packages />
        <About />
        <Process />
        <Testimonials />
        <Faq />
        <Careers />
      </main>
      <Footer />
    </>
  );
}
