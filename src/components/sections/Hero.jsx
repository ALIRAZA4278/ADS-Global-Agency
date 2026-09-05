"use client";

import { useEffect, useRef } from "react";
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
 * The hero centrepiece: glass panes sitting on separate Z planes inside a real
 * 3D scene, so the assembly has actual parallax rather than a painted-on
 * illusion. It drifts on its own and leans toward the cursor.
 *
 * Nothing in this subtree may use `overflow: hidden` — that forces
 * `transform-style: flat` and collapses every layer onto one plane.
 */
function GlassStack() {
  const sceneRef = useRef(null);
  const frame = useRef(0);
  const interactive = useRef(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      interactive.current = !reduce.matches && fine.matches;
    };

    sync();
    reduce.addEventListener("change", sync);
    fine.addEventListener("change", sync);

    // The scene leans toward the pointer anywhere on the hero, not just when
    // the cursor is over the panes themselves.
    const handleMove = (event) => {
      if (!interactive.current) return;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const node = sceneRef.current;
        if (!node) return;
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        node.style.setProperty("--scene-x", `${-y * 18}deg`);
        node.style.setProperty("--scene-y", `${x * 22}deg`);
      });
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      reduce.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  // z: how far each pane floats toward the viewer.
  const panes = [
    { rotate: -16, scale: 0.82, opacity: 0.22, z: -120 },
    { rotate: -8, scale: 0.91, opacity: 0.38, z: -60 },
    { rotate: 0, scale: 1, opacity: 1, z: 0 },
  ];

  return (
    <div
      className="relative h-72 w-72 sm:h-80 sm:w-80 xl:h-96 xl:w-96"
      style={{ perspective: "1200px" }}
    >
      {/* Motion owns `transform` on any element it animates, so the float, the
          cursor lean and each layer's translateZ each get their own element
          rather than fighting over one transform property. */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={sceneRef}
          className="relative h-full w-full transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform:
              "rotateX(var(--scene-x, 0deg)) rotateY(var(--scene-y, 0deg))",
          }}
        >
          {panes.map((pane) => (
            <div
              key={pane.rotate}
              aria-hidden="true"
              className="absolute inset-0 rounded-[2rem] border border-line-strong bg-white/[0.02]"
              style={{
                transform: `translateZ(${pane.z}px) rotate(${pane.rotate}deg) scale(${pane.scale})`,
                opacity: pane.opacity,
              }}
            />
          ))}

          {/* Bloom sits behind the mark. */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-44 w-44 sm:h-52 sm:w-52"
            style={{ transform: "translate3d(-50%,-50%,-30px)" }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--color-brand),transparent_70%)] blur-2xl"
            />
          </div>

          {/* Dashed orbit, laid flat into the scene like a ring around a planet. */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-60 w-60 sm:h-72 sm:w-72"
            style={{
              transform: "translate3d(-50%,-50%,20px) rotateX(68deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="h-full w-full rounded-full border border-dashed border-line-strong"
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
            </motion.div>
          </div>

          {/* The mark floats furthest forward, so it parallaxes most. */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{ transform: "translate3d(-50%,-50%,90px)" }}
          >
            <Logo className="h-24 w-24 drop-shadow-[0_0_28px_var(--color-brand)] sm:h-28 sm:w-28" />
          </div>
        </div>
      </motion.div>
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
