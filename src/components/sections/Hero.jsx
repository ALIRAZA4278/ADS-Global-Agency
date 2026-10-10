"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
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
          <div>
            <motion.div variants={rise} className="flex flex-wrap items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.34em] text-muted sm:text-sm">
                {hero.eyebrow}
              </span>
              <TrustpilotLogo href={hero.trustpilotHref} />
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
              page still lands on it now that the contact section is gone. */}
          <motion.div
            variants={rise}
            id="contact"
            className="lg:sticky lg:top-32"
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
        </motion.div>
      </div>
    </section>
  );
}


// Trustpilot's own mark: small green tiles, each with a white star, plus the
// wordmark in the same green. Hand-drawn rather than an external logo asset,
// since that keeps the page free of outside image requests.
const TRUSTPILOT_GREEN = "#00B67A";
const STAR_PATH =
  "M0,-10 L2.9,-3.1 L10,-3.1 L4.3,1.2 L6.5,8 L0,3.8 L-6.5,8 L-4.3,1.2 L-10,-3.1 L-2.9,-3.1 Z";

function TrustpilotLogo({ href }) {
  const content = (
    <>
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg key={index} viewBox="-10 -10 20 20" className="h-4 w-4 sm:h-4.5 sm:w-4.5">
            <rect x="-10" y="-10" width="20" height="20" rx="3.5" fill={TRUSTPILOT_GREEN} />
            <path d={STAR_PATH} fill="#fff" />
          </svg>
        ))}
      </span>
      <span
        className="text-sm font-bold tracking-tight sm:text-base"
        style={{ color: TRUSTPILOT_GREEN }}
      >
        Trustpilot
      </span>
    </>
  );

  const className = "inline-flex items-center gap-2";

  // No profile URL yet — plain, not a link to nowhere. Set hero.trustpilotHref
  // once the Trustpilot page exists and this becomes a link automatically.
  if (!href) {
    return <span className={className}>{content}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(className, "transition-opacity duration-300 hover:opacity-80")}
    >
      {content}
    </a>
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
