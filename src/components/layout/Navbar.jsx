"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { usePresence } from "@/lib/use-presence";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { TopBar } from "@/components/layout/TopBar";
import { useInquiry } from "@/components/inquiry/InquiryContext";

export function Navbar() {
  const { openInquiry } = useInquiry();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const progressRef = useRef(null);
  const pillRef = useRef(null);
  const linksRef = useRef(null);
  const menu = usePresence(menuOpen, 250);

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
    // A link can own more than one section (Portfolio covers the gallery and
    // the archive links), via its optional `sections` list.
    outer: for (const link of navLinks) {
      for (const selector of link.sections ?? [link.href]) {
        const section = document.querySelector(selector);
        if (!section) continue;
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= line && bottom > line) {
          current = link.href;
          break outer;
        }
      }
    }
    setActiveSection(current);
  }, []);

  // One scroll listener, coalesced to a frame: the header state, the active
  // link and the reading-progress bar (written straight to its transform, so
  // it never re-renders anything).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const { scrollY, innerHeight } = window;
      const max = document.documentElement.scrollHeight - innerHeight;
      setScrolled(scrollY > 24);
      updateActiveSection();
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // First pass on the next frame, so a page that loads mid-scroll (back
    // button, #hash URL) highlights the right link before any scroll event.
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [updateActiveSection]);

  // Slide the highlight pill under the active link. Positioned from the
  // link's own box, so it follows label widths without hard-coded sizes.
  useEffect(() => {
    const pill = pillRef.current;
    const list = linksRef.current;
    if (!pill || !list) return;
    const link = activeSection && list.querySelector(`a[href="${activeSection}"]`);
    if (!link) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.opacity = "1";
    pill.style.width = `${link.offsetWidth}px`;
    pill.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [activeSection]);

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
              ? "border-b border-line bg-ink/85 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <nav className="shell flex h-18 items-center justify-between gap-6 py-4">
            {/* The image alt names the link; an aria-label too would read the
                name twice. */}
            <a href="#top" className="flex items-center">
              <Image
                src="/logo-mark.webp"
                alt={brand.fullName}
                // Display size (sm:h-12), so the srcset tops out at 2x of
                // what's shown instead of the 2172px source.
                width={174}
                height={48}
                preload
                className="h-11 w-auto sm:h-12"
              />
            </a>

            <ul ref={linksRef} className="relative hidden items-center gap-1 lg:flex">
              <li
                aria-hidden="true"
                ref={pillRef}
                className="pointer-events-none absolute left-0 top-0 h-full rounded-full border border-line-strong bg-white/[0.06] opacity-0 transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]"
              />
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
          <div
            ref={progressRef}
            className="h-px origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-brand),var(--color-accent))]"
          />
        </div>
      </header>

      {menu.mounted && (
          <div
            data-lenis-prevent
            className={cn(
              "fixed inset-0 z-40 overflow-y-auto bg-ink/95 backdrop-blur-xl transition-opacity duration-250 lg:hidden",
              menu.visible ? "opacity-100" : "opacity-0"
            )}
          >
            {/* The list starts right under the header rather than centring in
                the screen, which left a dead gap above it on tall phones. The
                top padding clears the utility bar (h-12) and header (h-18),
                which render above this overlay, plus a little breathing room. */}
            <div className="shell flex flex-col gap-1 pt-34 pb-14">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menu.visible ? `${0.06 * index + 0.08}s` : "0s" }}
                  className={cn(
                    "flex items-center justify-between border-b border-line py-4 text-2xl font-medium text-body",
                    "transition-[opacity,transform,color] duration-400 hover:text-accent",
                    menu.visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                >
                  {link.label}
                  <span className="font-mono text-xs tabular-nums text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              ))}
              <div
                style={{ transitionDelay: menu.visible ? `${0.06 * navLinks.length + 0.08}s` : "0s" }}
                className={cn(
                  "pt-7 transition-[opacity,transform] duration-400",
                  menu.visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
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
              </div>
            </div>
          </div>
      )}
    </>
  );
}
