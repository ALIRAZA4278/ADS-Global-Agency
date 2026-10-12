"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { process } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Starfield } from "@/components/ui/Starfield";

const TOTAL = process.steps.length;

/**
 * The phase cards stack into a deck as you scroll: each one pins a little
 * lower than the last, so earlier phases stay visible as a sliver behind the
 * one you're reading. A sticky rail on the left tracks which is in focus.
 *
 * Scroll progress through the deck (0 when its top reaches 30% down the
 * viewport, 1 when its bottom reaches 90%) is written to one CSS variable,
 * --deck-p, on the section. The rail beam, each card's shrink and its scrim
 * are all calc()'d from it in CSS, so scrolling never re-renders the cards;
 * React only hears about it when the active phase changes.
 */
export function Process() {
  const sectionRef = useRef(null);
  const deckRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const deck = deckRef.current;
    if (!section || !deck) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = deck.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = height - 0.6 * vh;
      const progress = travel > 0 ? Math.min(1, Math.max(0, (0.3 * vh - top) / travel)) : 0;
      section.style.setProperty("--deck-p", progress.toFixed(4));
      // Split the deck's travel evenly between the phases.
      setActiveIndex(Math.min(TOTAL - 1, Math.floor(progress * TOTAL)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    // overflow-x-clip, not overflow-hidden: `hidden` would make this section a
    // scroll container and the sticky deck inside it would never pin.
    <section
      ref={sectionRef}
      id="process"
      className="section-y relative overflow-x-clip"
      style={{ "--deck-p": 0 }}
    >
      <Starfield count={45} seed={23} className="opacity-60" />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16">
          {/* Sticky side: heading plus the phase rail. */}
          <div className="lg:sticky lg:top-28">
            <Reveal from="none">
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-accent sm:text-sm">
                {process.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-5 text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
                {process.title}{" "}
                <span className="text-gradient">{process.titleHighlight}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
                {process.description}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <PhaseRail activeIndex={activeIndex} />
            </Reveal>
          </div>

          {/* The deck. */}
          <div ref={deckRef} className="flex flex-col">
            {process.steps.map((step, index) => (
              <PhaseCard
                key={step.number}
                step={step}
                index={index}
                isActive={activeIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Vertical rail whose beam fills with the deck's scroll progress. */
function PhaseRail({ activeIndex }) {
  return (
    // The track and beam sit beside the list rather than inside it: an <ol>
    // may only hold <li> children.
    <div className="relative mt-12 hidden pl-8 lg:block">
      {/* Track + beam. */}
      <span
        aria-hidden="true"
        className="absolute left-[7px] top-2 bottom-2 w-px bg-line"
      />
      <span
        aria-hidden="true"
        className="absolute left-[7px] top-2 bottom-2 w-px origin-top scale-y-(--deck-p) bg-[linear-gradient(180deg,var(--color-brand),var(--color-accent))]"
      />

      <ol>
        {process.steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isDone = index < activeIndex;

          return (
            <li key={step.number} className="relative py-4 first:pt-2 last:pb-2">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1/2 -left-8 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-500",
                  isActive
                    ? "border-accent bg-accent shadow-[0_0_16px_var(--color-accent)]"
                    : isDone
                      ? "border-brand bg-brand"
                      : "border-line-strong bg-ink"
                )}
              >
                {isDone && <Check className="h-2.5 w-2.5 text-white" />}
              </span>

              <div
                className={cn(
                  "flex items-baseline gap-3 transition-colors duration-500",
                  isActive ? "text-white" : "text-faint"
                )}
              >
                <span className="font-mono text-xs tabular-nums">{step.number}</span>
                <span className="text-lg font-medium tracking-tight">{step.title}</span>
                <span className="ml-auto text-xs text-faint">{step.duration}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function PhaseCard({ step, index, isActive }) {
  // Once a card is pinned, the cards arriving after it push it back: it shrinks
  // so the stack reads as depth rather than a flat overlap. Nothing arrives
  // after the final card, so it is never buried.
  //
  // --bury runs 0 -> 1 over the stretch of the deck after this card's turn
  // (from (index + 1) / TOTAL to the end), straight from --deck-p.
  const isLast = index === TOTAL - 1;
  const start = (index + 1) / TOTAL;
  const shrink = isLast ? 0 : (TOTAL - index - 1) * 0.045;

  return (
    <div
      className="sticky pb-6"
      // Each card pins ~1.6rem lower than the one before, leaving the previous
      // card's top edge peeking out of the deck.
      style={{
        top: `${7 + index * 1.6}rem`,
        zIndex: index + 1,
        "--bury": isLast ? 0 : `clamp(0, calc((var(--deck-p) - ${start}) / ${1 - start}), 1)`,
      }}
    >
      <article
        style={{ transform: `scale(calc(1 - var(--bury) * ${shrink}))` }}
        className={cn(
          "relative origin-top overflow-hidden rounded-3xl border p-7 transition-colors duration-500 sm:p-9",
          isActive
            ? "border-brand/40 bg-[linear-gradient(150deg,color-mix(in_oklab,var(--color-brand)_12%,var(--color-surface-2)),var(--color-surface))] shadow-[0_30px_80px_-40px_var(--color-brand)]"
            : "border-line bg-[linear-gradient(150deg,var(--color-surface-2),var(--color-surface))]"
        )}
      >
        {/* Buried cards darken under a scrim rather than losing opacity —
            fading the card itself would make the one underneath show through. */}
        <span
          aria-hidden="true"
          style={{ opacity: "calc(var(--bury) * 0.78)" }}
          className="pointer-events-none absolute inset-0 z-20 rounded-3xl bg-ink"
        />
        {/* Oversized watermark numeral. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 right-2 select-none text-[9rem] font-bold leading-none tracking-tighter text-white/[0.025]"
        >
          {step.number}
        </span>

        <div className="relative flex items-center justify-between gap-4">
          <span
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-500",
              isActive
                ? "border-brand/45 bg-brand/12 text-accent"
                : "border-line bg-ink text-brand-soft"
            )}
          >
            <Icon name={step.icon} className="h-6 w-6" />
          </span>

          <span className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-faint">
            {step.duration}
          </span>
        </div>

        <div className="relative mt-6 flex items-baseline gap-3">
          <span className="font-mono text-sm text-accent tabular-nums">
            {step.number}
          </span>
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {step.title}
          </h3>
        </div>

        <p className="relative mt-4 max-w-xl text-pretty leading-relaxed text-muted">
          {step.description}
        </p>

        <ul className="relative mt-7 flex flex-wrap gap-2 border-t border-line pt-6">
          {step.deliverables.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-body/80"
            >
              <ArrowRight className="h-3 w-3 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
