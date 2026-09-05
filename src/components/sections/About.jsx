"use client";

import { motion } from "motion/react";
import { about } from "@/lib/site";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger } from "@/components/ui/Reveal";

export function About() {
  return (
    // overflow-x-clip rather than overflow-hidden: `hidden` turns this into a
    // scroll container, which stops the stat panel below from sticking.
    <section id="about" className="section-y relative overflow-x-clip">
      {/* Soft wash so the section separates from the ones either side. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-brand)_10%,transparent),transparent_70%)] blur-3xl"
      />

      <div className="shell">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Copy */}
          <div>
            <Reveal from="none">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {about.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-7 text-lg font-medium leading-relaxed text-brand-soft">
                {about.kicker}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]">
                We create <span className="text-gradient">digital excellence</span>
              </h2>
            </Reveal>

            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.16 + index * 0.06}>
                <p className="mt-5 text-pretty leading-relaxed text-muted">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Stagger className="mt-10 flex flex-col gap-4" delay={0.1}>
              {about.values.map((value) => (
                <Stagger.Item key={value.title}>
                  <div className="group flex gap-4 rounded-2xl border border-transparent p-4 transition-colors duration-300 hover:border-line hover:bg-white/[0.02]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink text-accent transition-colors duration-300 group-hover:border-accent/40">
                      <Icon name={value.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight">
                        {value.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Stagger.Item>
              ))}
            </Stagger>
          </div>

          {/* Stat panel */}
          <Reveal from="left" delay={0.1} className="lg:sticky lg:top-28">
            <div className="relative rounded-3xl border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-2">
              {/* Rotating conic sheen behind the panel edge. */}
              <motion.div
                aria-hidden="true"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-40 [background:conic-gradient(from_0deg,transparent,var(--color-brand),transparent_38%,var(--color-accent),transparent_75%)] blur-[2px]"
              />

              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] bg-line">
                {about.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group relative bg-ink-2 p-8 transition-colors duration-300 hover:bg-surface-2 sm:p-10"
                  >
                    <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
                      <Counter
                        value={stat.value}
                        suffix={stat.suffix}
                        className="text-gradient"
                      />
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-faint">
                      {stat.label}
                    </p>
                    <span className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-[linear-gradient(90deg,var(--color-brand),transparent)] transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
