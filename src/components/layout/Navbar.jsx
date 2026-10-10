"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { TopBar } from "@/components/layout/TopBar";
import { useInquiry } from "@/components/inquiry/InquiryContext";

export function Navbar() {
  const { openInquiry } = useInquiry();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY, scrollYProgress } = useScroll();

  // Highlight the nav link for the section that spans a fixed line ~35% down
  // the viewport. Computed from positions on every scroll rather than from
  // IntersectionObserver entries: the observer only reports sections whose
  // visibility *changed*, so "most visible among this batch" could name a
  // section that was merely entering while another still owned the screen.
  // Sections without a nav entry (process, reviews, FAQ) clear the highlight
  // instead of leaving the previous link lit.
  const updateActiveSection = useCallback(() => {
    const line = window.innerHeight * 0.35;
    let current = "";
    for (const link of navLinks) {
      const section = document.querySelector(link.href);
      if (!section) continue;
      const { top, bottom } = section.getBoundingClientRect();
      if (top <= line && bottom > line) {
        current = link.href;
        break;
      }
    }
    setActiveSection(current);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
    updateActiveSection();
  });

  useEffect(() => {
    // First pass on the next frame, so a page that loads mid-scroll (back
    // button, #hash URL) highlights the right link before any scroll event.
    const frame = requestAnimationFrame(updateActiveSection);
    window.addEventListener("resize", updateActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [updateActiveSection]);

  // An open mobile menu must not scroll the page behind it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <TopBar />

        <div
          className={cn(
            "transition-all duration-500",
            scrolled
              ? "border-b border-line bg-ink/85 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <nav className="shell flex h-18 items-center justify-between gap-6 py-4">
            <a href="#top" aria-label={brand.fullName} className="flex items-center">
              <Image
                src="/logo-mark.png"
                alt={brand.fullName}
                width={2172}
                height={601}
                preload
                className="h-9 w-auto sm:h-10"
              />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
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
                className="hidden sm:inline-flex"
              >
                Get a free quote
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
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            data-lenis-prevent
            className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            {/* min-h-full + justify-center centres the list when it fits and
                lets it scroll when it doesn't; the top padding clears the
                utility bar and header, which render above this overlay. */}
            <div className="shell flex min-h-full flex-col justify-center gap-1 pt-32 pb-14">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index + 0.08, duration: 0.4 }}
                  className="flex items-center justify-between border-b border-line py-4 text-2xl font-medium text-body transition-colors hover:text-accent"
                >
                  {link.label}
                  <span className="font-mono text-xs tabular-nums text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * navLinks.length + 0.08, duration: 0.4 }}
                className="pt-7"
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
                  Get a free quote
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
