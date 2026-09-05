"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { hero, navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useInquiry } from "@/components/inquiry/InquiryContext";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { Logo } from "@/components/layout/Logo";
import { Starfield } from "@/components/ui/Starfield";

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  const { openInquiry } = useInquiry();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content drifts up and dims as the next section takes over.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden py-28"
    >
      <Backdrop y={glowY} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="shell relative z-10 w-full"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-10 xl:gap-16"
        >
          {/* Copy */}
          <div className="max-w-xl">
            <motion.p
              variants={rise}
              className="text-xs font-medium uppercase tracking-[0.34em] text-muted sm:text-sm"
            >
              {hero.eyebrow}
            </motion.p>

            <h1 className="mt-7 text-5xl leading-[1.06] tracking-tight sm:text-6xl xl:text-7xl">
              {hero.titleLines.map((line) => (
                <motion.span
                  key={line.text}
                  variants={rise}
                  className={cn(
                    "block",
                    line.bold ? "font-bold" : "font-light text-body/90",
                    line.gradient && "text-gradient"
                  )}
                >
                  {line.text}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={rise}
              className="mt-8 max-w-md text-pretty leading-relaxed text-muted"
            >
              {hero.description}
            </motion.p>

            <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openInquiry}>
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={hero.secondaryCta.href} variant="ghost" size="lg">
                {hero.secondaryCta.label}
              </Button>
            </motion.div>
          </div>

          {/* Centre visual */}
          <motion.div variants={rise} className="flex justify-center lg:justify-end">
            <GlassStack />
          </motion.div>

          {/* Vertical section nav — the header stays out of the hero on desktop. */}
          <motion.nav
            variants={rise}
            aria-label="Sections"
            className="hidden flex-col items-end gap-4 lg:flex xl:gap-5"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-lg text-faint transition-colors duration-300 hover:text-white xl:text-xl"
              >
                <span className="absolute top-1/2 -left-5 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {link.label}
                <span className="text-brand">.</span>
              </a>
            ))}
          </motion.nav>
        </motion.div>
      </motion.div>

      <CornerBrackets
        className="z-10 hidden text-brand/40 sm:block"
        size="4rem"
        inset="2.5rem"
      />
    </section>
  );
}

/**
 * Three rotated glass panes stacked behind a slowly orbiting core.
 * Replaces the illustration slot without pulling in an image.
 */
function GlassStack() {
  const panes = [
    { rotate: -14, scale: 0.86, opacity: 0.25 },
    { rotate: -7, scale: 0.93, opacity: 0.4 },
    { rotate: 0, scale: 1, opacity: 1 },
  ];

  return (
    <div className="relative h-72 w-72 sm:h-80 sm:w-80 xl:h-96 xl:w-96">
      {panes.map((pane) => (
        <div
          key={pane.rotate}
          aria-hidden={pane.rotate !== 0}
          className="absolute inset-0 rounded-[2rem] border border-line-strong bg-white/[0.015] backdrop-blur-[2px]"
          style={{
            transform: `rotate(${pane.rotate}deg) scale(${pane.scale})`,
            opacity: pane.opacity,
          }}
        />
      ))}

      {/* Core: a soft gradient bloom with the brand mark riding on top. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-44 w-44 rounded-full bg-[radial-gradient(circle,var(--color-brand),transparent_70%)] blur-2xl sm:h-52 sm:w-52"
        />
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <Logo className="h-24 w-24 drop-shadow-[0_0_28px_var(--color-brand)] sm:h-28 sm:w-28" />
        </motion.div>

        {/* Orbit ring. */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute h-56 w-56 rounded-full border border-dashed border-line-strong sm:h-64 sm:w-64"
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
        </motion.div>
      </div>
    </div>
  );
}

/** Starfield, drifting colour blobs and a fade into the next section. */
function Backdrop({ y }) {
  return (
    <motion.div style={{ y }} aria-hidden="true" className="absolute inset-0">
      <Starfield count={110} seed={11} />

      <div className="absolute right-[6%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-brand)_22%,transparent),transparent_65%)] blur-3xl animate-drift" />
      <div className="absolute left-[-12%] bottom-[-10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent)_14%,transparent),transparent_65%)] blur-3xl animate-drift-slow" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-ink),transparent)]" />
    </motion.div>
  );
}
