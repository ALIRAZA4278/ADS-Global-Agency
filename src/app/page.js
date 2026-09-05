import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Packages } from "@/components/sections/Packages";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Careers } from "@/components/sections/Careers";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Process />
        <About />
        <Services />
        <Work />
        <Packages />
        <Testimonials />
        <Faq />
        <Contact />
        <Careers />
      </main>
      <Footer />
    </>
  );
}
