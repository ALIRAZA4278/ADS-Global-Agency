"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { packages } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { useInquiry } from "@/components/inquiry/InquiryContext";

export function Packages() {
  const { openInquiry } = useInquiry();
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All"
      ? packages.plans
      : packages.plans.filter((plan) => plan.category === filter);

  return (
    <section id="packages" className="section-y relative scroll-mt-24 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px rule-gradient"
      />

      <div className="shell">
        <SectionHeading
          eyebrow={packages.eyebrow}
          title={packages.title}
          highlight={packages.titleHighlight}
          description={packages.description}
        />

        <Reveal delay={0.14} className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-line bg-white/[0.02] p-1">
            {packages.categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
                  filter === category ? "text-white" : "text-muted hover:text-white"
                )}
              >
                {filter === category && (
                  <motion.span
                    layoutId="package-filter-pill"
                    className="absolute inset-0 rounded-full bg-[linear-gradient(100deg,var(--color-brand-deep),var(--color-brand))]"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-line bg-[linear-gradient(140deg,var(--color-surface-2),var(--color-surface))] p-8 text-center sm:p-10 md:flex-row md:text-left">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                Need something outside these packages?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Tell us the problem and we&apos;ll scope a fixed-price solution around it.
              </p>
            </div>
            <Button onClick={openInquiry} size="lg" className="shrink-0">
              Request a custom quote
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlanCard({ plan }) {
  const { openInquiry } = useInquiry();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="h-full"
    >
      <Tilt3D innerClassName="rounded-3xl" max={6}>
        <div
          className={cn(
            "group relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300",
            plan.featured
              ? "border-brand/40 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--color-brand)_10%,var(--color-surface-2)),var(--color-surface))] shadow-[0_24px_70px_-40px_var(--color-brand)]"
              : "border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] hover:border-line-strong"
          )}
        >
          {plan.featured && (
            <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(100deg,var(--color-brand),var(--color-accent))] px-3 py-1 text-[0.7rem] font-medium text-white">
              <Sparkles className="h-3 w-3" />
              Most popular
            </span>
          )}

          <h3 className="text-base font-semibold tracking-tight">{plan.name}</h3>
          <p className="mt-1 text-sm text-muted">{plan.blurb}</p>

          <div className="mt-6 flex items-baseline gap-1.5">
            <span className="text-4xl font-semibold tracking-tight text-white">
              ${plan.price.toLocaleString("en-US")}
            </span>
            <span className="text-sm text-faint">{plan.unit}</span>
          </div>

          <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-line pt-6">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm text-body/80"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            onClick={openInquiry}
            variant={plan.featured ? "primary" : "outline"}
            size="sm"
            magnetic={false}
            className="mt-7 w-full"
          >
            Get started
          </Button>
        </div>
      </Tilt3D>
    </motion.article>
  );
}
