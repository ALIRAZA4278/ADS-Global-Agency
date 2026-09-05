"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { useInquiry } from "@/components/inquiry/InquiryContext";

export function Navbar() {
  const { openInquiry } = useInquiry();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
    // The hero carries its own vertical nav, so the header stays out of the
    // way until the visitor has scrolled past it.
    setPastHero(latest > window.innerHeight * 0.7);
  });

  // Highlight the nav link for whichever section owns the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      // The band sits in the upper-middle of the screen so a section becomes
      // "active" as it settles into view, not when its very last pixel enters.
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // An open mobile menu must not scroll the page behind it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="shell flex h-18 items-center justify-between gap-6 py-4">
          <a
            href="#top"
            aria-label={brand.fullName}
            className={cn(
              "flex items-center gap-2.5 transition-opacity duration-500",
              // On desktop the logo belongs to the hero until the header takes over.
              !pastHero && "lg:pointer-events-none lg:opacity-0"
            )}
          >
            <Logo className="h-8 w-8" />
            <span className="text-[1.05rem] font-semibold tracking-tight">
              {brand.name}
              <span className="text-gradient">.</span>
            </span>
          </a>

          <ul
            className={cn(
              "hidden items-center gap-1 transition-all duration-500 lg:flex",
              pastHero
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-3 opacity-0"
            )}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
                      isActive ? "text-white" : "text-muted hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-line-strong bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Button
              onClick={openInquiry}
              size="sm"
              className={cn(
                "hidden transition-opacity duration-500 sm:inline-flex",
                !pastHero && "lg:pointer-events-none lg:opacity-0"
              )}
            >
              Start a project
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-body transition-colors hover:border-line-strong hover:bg-white/[0.06] lg:hidden"
            >
              {menuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </nav>

        {/* Reading-progress hairline. */}
        <motion.div
          className="h-px origin-left bg-[linear-gradient(90deg,var(--color-brand),var(--color-accent))]"
          style={{ scaleX: scrollYProgress }}
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-2 pb-20">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index + 0.08, duration: 0.4 }}
                  className="border-b border-line py-5 text-2xl font-medium text-body transition-colors hover:text-accent"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * navLinks.length + 0.08, duration: 0.4 }}
                className="pt-8"
              >
                <Button
                  size="lg"
                  className="w-full"
                  magnetic={false}
                  onClick={() => {
                    setMenuOpen(false);
                    openInquiry();
                  }}
                >
                  Start a project
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
