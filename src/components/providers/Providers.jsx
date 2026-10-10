"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import { InquiryProvider } from "@/components/inquiry/InquiryContext";

/**
 * Wraps the app in inertial smooth scrolling and a single motion config.
 *
 * `reducedMotion="user"` makes every motion component drop transform and
 * layout animations when the OS asks for reduced motion, keeping only fades —
 * so individual components don't each have to check the preference.
 */
// Breathing room between the fixed header and a section landed on by a link.
const HEADER_GAP = 20;

export function Providers({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Inertial scrolling is the first thing to hurt on a reduced-motion
    // preference, so skip Lenis entirely rather than tuning it down.
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    // Hash links must go through Lenis or the page jumps and then snaps back.
    const handleAnchorClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      window.history.replaceState(null, "", hash);

      // Measure two frames later, not now. A click from the mobile menu also
      // closes it, which releases body's overflow lock and brings the
      // scrollbar back — that reflows the page, and a target measured before
      // the reflow lands tens of pixels off. Two frames lets React commit the
      // close and the browser lay out again first.
      //
      // The scroll position is computed here, from the live header height,
      // rather than left to CSS scroll offsets: a numeric target bypasses
      // Lenis's scroll-padding/scroll-margin reading, so the section's content
      // (its .shell, skipping the section's top padding) lands a fixed gap
      // under the fixed header whatever the breakpoint or header height.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const header = document.querySelector("header");
          const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
          const anchorPoint = target.querySelector(":scope > .shell") ?? target;
          const y =
            anchorPoint.getBoundingClientRect().top +
            window.scrollY -
            headerBottom -
            HEADER_GAP;
          lenis.scrollTo(Math.max(0, y));
        });
      });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <InquiryProvider>{children}</InquiryProvider>
    </MotionConfig>
  );
}
