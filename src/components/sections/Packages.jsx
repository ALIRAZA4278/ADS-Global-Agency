"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { packages } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { useInquiry } from "@/components/inquiry/InquiryContext";

const categoryOptions = packages.categories.map((category) => ({
  value: category,
  label: category,
}));

export function Packages() {
  const { openInquiry } = useInquiry();
  const [filter, setFilter] = useState(packages.categories[0]);
  const visible = packages.plans.filter((plan) => plan.category === filter);

  return (
    <section id="packages" className="section-y relative overflow-hidden">
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
          <FilterTabs
            label="Package category"
            options={categoryOptions}
            value={filter}
            onChange={setFilter}
            className="max-w-5xl"
          />
        </Reveal>

        {/* Three columns: every category ships exactly three tiers. */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((plan, index) => (
            <PlanCard
              key={`${plan.category}-${plan.name}`}
              plan={plan}
              index={index}
              onSelect={openInquiry}
            />
          ))}
        </div>

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

// Lists longer than this scroll within a capped height.
const SCROLL_AFTER = 8;

function FeatureList({ features }) {
  const scrolls = features.length > SCROLL_AFTER;
  const [atEnd, setAtEnd] = useState(false);

  const items = (
    <ul className="flex flex-col gap-3">
      {features.map((feature) => (
        // The tick is the `list-check` pseudo-element, not an icon per line:
        // the website tiers list 20-35 features each.
        <li key={feature} className="list-check flex items-start gap-2.5 text-sm text-body/80">
          {feature}
        </li>
      ))}
    </ul>
  );

  if (!scrolls) {
    return <div className="mt-6 flex-1 border-t border-line pt-6">{items}</div>;
  }

  return (
    <div className="mt-6 flex-1 border-t border-line pt-6">
      {/* Lenis (allowNestedScroll) passes the wheel to this list while it can
          scroll, then back to the page at either end, so it never traps the
          page. The bottom fade is a mask, not an overlay, so it works on the
          featured card's tinted background. */}
      <div
        tabIndex={0}
        aria-label={`${features.length} included features`}
        onScroll={(event) => {
          const el = event.currentTarget;
          setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
        }}
        className={cn(
          "max-h-80 overflow-y-auto pr-2 [scrollbar-color:var(--color-line-strong)_transparent] [scrollbar-width:thin]",
          !atEnd && "mask-[linear-gradient(to_bottom,black_80%,transparent)]"
        )}
      >
        {items}
      </div>
      <p className="mt-3 text-[0.7rem] text-faint">
        {features.length} inclusions · scroll for more
      </p>
    </div>
  );
}

function PlanCard({ plan, index, onSelect }) {
  const isCustom = plan.price === null;

  return (
    // Cards are keyed by plan, so switching category mounts fresh ones and
    // the CSS entrance plays, staggered across the row.
    <article className="h-full animate-enter" style={{ animationDelay: `${index * 60}ms` }}>
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
              {isCustom ? "Tailored" : "Most popular"}
            </span>
          )}

          <h3 className="text-base font-semibold tracking-tight">{plan.name}</h3>
          {plan.blurb && <p className="mt-1 text-sm text-muted">{plan.blurb}</p>}

          <div className="mt-6 flex flex-wrap items-baseline gap-x-1.5">
            {isCustom ? (
              <span className="text-4xl font-semibold tracking-tight text-gradient">
                Custom
              </span>
            ) : (
              <span className="text-4xl font-semibold tracking-tight text-white">
                ${plan.price.toLocaleString("en-US")}
              </span>
            )}
            <span className="text-xs text-faint">{plan.unit}</span>
          </div>

          {/* Every feature is shown on the card. Most tiers list six; the
              website tiers carry their full detail-page list (20–35 items),
              which scrolls inside the card instead of stretching every card
              in the row to its height. */}
          <FeatureList features={plan.features} />

          <Button
            onClick={onSelect}
            variant={plan.featured ? "primary" : "outline"}
            size="sm"
            magnetic={false}
            className="mt-7 w-full"
          >
            {isCustom ? "Book a scoping call" : "Get started"}
          </Button>
        </div>
      </Tilt3D>
    </article>
  );
}
