"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Check, Star } from "lucide-react";
import { hero } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Starfield } from "@/components/ui/Starfield";

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Only the backdrop parallaxes. The copy and the form hold still — drifting
  // or fading a form while someone is filling it in is hostile.
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-28"
    >
      <Backdrop y={glowY} />

      <div className="shell relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          className="grid gap-12 lg:grid-cols-[1fr_minmax(0,29rem)] lg:items-start lg:gap-x-16 lg:gap-y-10 xl:gap-x-20"
        >
          {/* Pitch */}
          <div className="lg:col-start-1 lg:row-start-1">
            <motion.div variants={rise} className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.34em] text-muted sm:text-sm">
                {hero.eyebrow}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted">
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-3 w-3 fill-accent text-accent" />
                  ))}
                </span>
                50+ happy clients
              </span>
            </motion.div>

            <h1 className="mt-7 text-4xl leading-[1.06] tracking-tight sm:text-5xl xl:text-6xl">
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
              className="mt-7 max-w-lg text-pretty leading-relaxed text-muted"
            >
              {hero.description}
            </motion.p>

            <motion.ul variants={rise} className="mt-8 flex flex-col gap-3">
              {hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-body/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-accent">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={rise} className="mt-9">
              <Button href={hero.secondaryCta.href} variant="outline" size="lg">
                {hero.secondaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* The form keeps the #contact anchor, so every existing CTA on the
              page still lands on it now that the contact section is gone.
              It is ordered ahead of the stats on mobile — on a landing page the
              form should not sit a full screen below the fold. */}
          <motion.div
            variants={rise}
            id="contact"
            className="order-2 scroll-mt-32 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-32"
          >
            <div className="relative rounded-3xl border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-6 shadow-[0_40px_120px_-50px_var(--color-brand)] sm:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-brand),var(--color-accent),transparent)]"
              />

              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                {hero.formTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {hero.formSubtitle}
              </p>

              <div className="mt-6">
                <InquiryForm idPrefix="hero" />
              </div>
            </div>
          </motion.div>

          <motion.dl
            variants={rise}
            className="order-3 grid max-w-lg grid-cols-3 divide-x divide-line border-t border-line pt-7 lg:order-none lg:col-start-1 lg:row-start-2"
          >
            {hero.quickStats.map((stat) => (
              <div key={stat.label} className="px-2 first:pl-0 sm:px-5">
                <dt className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}

/** Starfield, drifting colour blobs and a fade into the next section. */
function Backdrop({ y }) {
  return (
    <motion.div style={{ y }} aria-hidden="true" className="absolute inset-0">
      <Starfield count={110} seed={11} />

      <div className="absolute right-[6%] top-[4%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-brand)_20%,transparent),transparent_65%)] blur-3xl animate-drift" />
      <div className="absolute left-[-12%] bottom-[-10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent)_14%,transparent),transparent_65%)] blur-3xl animate-drift-slow" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-ink),transparent)]" />
    </motion.div>
  );
}
