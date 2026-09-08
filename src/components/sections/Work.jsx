"use client";

import { ArrowUpRight } from "lucide-react";
import { work } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { useInquiry } from "@/components/inquiry/InquiryContext";

export function Work() {
  const { openInquiry } = useInquiry();

  return (
    <section id="work" className="section-y relative scroll-mt-32">
      <div className="shell">
        <SectionHeading
          eyebrow={work.eyebrow}
          title={work.title}
          highlight={work.titleHighlight}
          description={work.description}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {work.portfolios.map((archive, index) => (
            <Reveal key={archive.label} delay={index * 0.08} className="h-full">
              <Tilt3D innerClassName="rounded-3xl" max={6}>
                <ArchiveCard archive={archive} index={index} />
              </Tilt3D>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button onClick={openInquiry} variant="outline" size="lg">
            Start a project like these
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * A whole archive as one card.
 *
 * The entire surface is the link, so the CTA at the bottom is a styled span
 * rather than a real button — nesting an interactive element inside an anchor
 * would be invalid and would fight the card for the click.
 */
function ArchiveCard({ archive, index }) {
  return (
    <a
      href={archive.href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group/arch relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 sm:p-8",
        "border-line-strong bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))]",
        "transition-all duration-300 hover:-translate-y-1 hover:border-brand/60",
        "hover:shadow-[0_30px_80px_-40px_var(--color-brand)]"
      )}
    >
      {/* Accent wash so the three cards aren't one flat slab of dark. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-brand)_18%,transparent),transparent_70%)] opacity-70 transition-opacity duration-500 group-hover/arch:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-4 select-none text-[7rem] font-bold leading-none tracking-tighter text-white/[0.04]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(140deg,var(--color-brand),var(--color-accent))] text-white shadow-[0_12px_30px_-12px_var(--color-brand)]">
          <Icon name={archive.icon} className="h-6 w-6" />
        </span>

        <p className="mt-6 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-accent">
          {archive.label}
        </p>
        <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight">
          {archive.title}
        </h3>
      </div>

      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">
        {archive.description}
      </p>

      {/* Looks and behaves like the primary button, but is part of the anchor. */}
      <span
        className={cn(
          "relative mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full",
          "text-sm font-medium text-white",
          "bg-[linear-gradient(100deg,var(--color-brand-deep),var(--color-brand)_45%,var(--color-accent))]",
          "shadow-[0_10px_40px_-14px_var(--color-brand)] transition-shadow duration-300",
          "group-hover/arch:shadow-[0_16px_50px_-12px_var(--color-brand)]"
        )}
      >
        {archive.cta}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/arch:-translate-y-0.5 group-hover/arch:translate-x-0.5" />
        <span className="sr-only">(opens in a new tab)</span>
      </span>
    </a>
  );
}
