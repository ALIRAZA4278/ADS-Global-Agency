"use client";

import { ArrowUpRight } from "lucide-react";
import { work } from "@/lib/site";
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
                <ArchiveCard archive={archive} />
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
 * A whole archive as one card — the entire surface is the link, so the click
 * target is the card rather than a few words of anchor text.
 */
function ArchiveCard({ archive }) {
  return (
    <a
      href={archive.href}
      target="_blank"
      rel="noreferrer"
      className="group/arch flex h-full flex-col rounded-3xl border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-7 transition-colors duration-300 hover:border-brand/45 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink text-brand-soft transition-all duration-300 group-hover/arch:border-brand/40 group-hover/arch:text-accent">
          <Icon name={archive.icon} className="h-5 w-5" />
        </span>
        <span className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[0.7rem] uppercase tracking-[0.14em] text-faint">
          {archive.label}
        </span>
      </div>

      <h3 className="mt-6 text-lg font-semibold tracking-tight">{archive.title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
        {archive.description}
      </p>

      <span className="mt-6 inline-flex items-center gap-2 border-t border-line pt-5 text-sm font-medium text-body transition-colors duration-300 group-hover/arch:text-accent">
        {archive.cta}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/arch:-translate-y-0.5 group-hover/arch:translate-x-0.5" />
        <span className="sr-only">(opens in a new tab)</span>
      </span>
    </a>
  );
}
