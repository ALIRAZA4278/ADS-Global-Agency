"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const COUNT = testimonials.items.length;
const AUTOPLAY_MS = 6000;

/**
 * How far each card sits from centre, by how many places away it is.
 *
 * Depth is sold with a scrim rather than by fading the card, because a
 * translucent card lets the text of the one behind it read straight through.
 * Only the immediate neighbours are shown; anything further is hidden
 * outright so the stage never turns into a pile of overlapping quotes.
 */
const depth = [
  { x: 0, z: 0, rotate: 0, scale: 1, scrim: 0 },
  { x: 60, z: -190, rotate: 34, scale: 0.86, scrim: 0.55 },
];

/**
 * Shortest signed distance from `active` to `index` around the ring, so the
 * card after the last one travels forward instead of rewinding through the
 * whole set.
 */
function ringOffset(index, active) {
  let offset = index - active;
  if (offset > COUNT / 2) offset -= COUNT;
  if (offset < -COUNT / 2) offset += COUNT;
  return offset;
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Autoplay only runs while the carousel is (nearly) on screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const go = useCallback((direction) => {
    setActive((current) => (current + direction + COUNT) % COUNT);
  }, []);

  // Autoplay, held while the visitor is hovering, focused inside, has the tab
  // in the background, or has scrolled away — no point animating eight 3D
  // cards nobody can see.
  useEffect(() => {
    if (paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [paused, inView, go]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  return (
    <section id="reviews" className="section-y relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--color-accent)_8%,transparent),transparent_70%)]"
      />

      <div className="shell">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title="What it's like to"
          highlight="work with us"
        />

        <Reveal delay={0.12}>
          <div
            ref={stageRef}
            role="group"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative mt-14 h-[30rem] rounded-3xl focus-visible:outline-none sm:h-[26rem]"
            style={{ perspective: "1400px" }}
          >
            {testimonials.items.map((item, index) => (
              <Slide
                key={index}
                item={item}
                index={index}
                offset={ringOffset(index, active)}
                onSelect={() => setActive(index)}
                onSwipe={go}
              />
            ))}
          </div>
        </Reveal>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <ArrowButton label="Previous testimonial" onClick={() => go(-1)}>
            <ChevronLeft className="h-4.5 w-4.5" />
          </ArrowButton>

          <div className="flex items-center">
            {testimonials.items.map((item, index) => (
              // The button is a 24px tap target; the dot inside is the visual.
              <button
                key={index}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={index === active}
                className="group/dot flex h-6 min-w-6 items-center justify-center px-[5px]"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-400",
                    index === active
                      ? "w-8 bg-[linear-gradient(90deg,var(--color-brand),var(--color-accent))]"
                      : "w-1.5 bg-line-strong group-hover/dot:bg-muted"
                  )}
                />
              </button>
            ))}
          </div>

          <ArrowButton label="Next testimonial" onClick={() => go(1)}>
            <ChevronRight className="h-4.5 w-4.5" />
          </ArrowButton>
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button
            href={testimonials.proofCta.href}
            target="_blank"
            rel="noreferrer"
            size="lg"
          >
            {testimonials.proofCta.label}
            <ArrowUpRight className="h-4 w-4" />
            <span className="sr-only">(opens Instagram in a new tab)</span>
          </Button>
        </Reveal>

        {/* Screen readers get the position without watching the animation. */}
        <p aria-live="polite" className="sr-only">
          Testimonial {active + 1} of {COUNT}: {testimonials.items[active].name},{" "}
          {testimonials.items[active].company}
        </p>
      </div>
    </section>
  );
}

function Slide({ item, offset, onSelect, onSwipe }) {
  const distance = Math.abs(offset);
  const hidden = distance >= depth.length;
  const pose = depth[Math.min(distance, depth.length - 1)];
  const isActive = offset === 0;
  const side = Math.sign(offset);
  const swipeStart = useRef(null);

  // A CSS transition on transform does the travelling; the curve overshoots
  // a touch, standing in for the old spring.
  const transform = [
    `translate3d(${side * pose.x}%, 0, ${hidden ? -420 : pose.z}px)`,
    `rotateY(${-side * pose.rotate}deg)`,
    `scale(${hidden ? 0.7 : pose.scale})`,
  ].join(" ");

  // Swipe on the front card only, so a gesture can't be captured by a card
  // buried behind it. Horizontal flicks past 60px change slides; vertical
  // movement is left to the page (touch-action: pan-y).
  const swipeHandlers = isActive
    ? {
        onPointerDown: (event) => {
          swipeStart.current = event.clientX;
        },
        onPointerUp: (event) => {
          if (swipeStart.current === null) return;
          const dx = event.clientX - swipeStart.current;
          swipeStart.current = null;
          if (dx < -60) onSwipe(1);
          else if (dx > 60) onSwipe(-1);
        },
        onPointerCancel: () => {
          swipeStart.current = null;
        },
      }
    : {};

  return (
    // The wrapper centres the card; every transform then happens on the
    // figure, so nothing fights over the transform property.
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        hidden && "pointer-events-none"
      )}
      style={{ zIndex: COUNT - distance, transformStyle: "preserve-3d" }}
    >
      <figure
        style={{ transform, opacity: hidden ? 0 : 1 }}
        {...swipeHandlers}
        onClick={isActive ? undefined : onSelect}
        aria-hidden={!isActive}
        className={cn(
          "relative flex w-[min(88vw,34rem)] touch-pan-y flex-col overflow-hidden rounded-3xl border p-7 sm:p-9",
          "transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.34,1.2,0.5,1)]",
          "bg-[linear-gradient(150deg,var(--color-surface-2),var(--color-surface))]",
          isActive
            ? "cursor-grab border-brand/35 shadow-[0_40px_100px_-50px_var(--color-brand)] active:cursor-grabbing"
            : "cursor-pointer border-line"
        )}
      >
        {/* Darkens a neighbouring card without making it see-through. */}
        <span
          aria-hidden="true"
          style={{ opacity: hidden ? 1 : pose.scrim }}
          className="pointer-events-none absolute inset-0 z-20 rounded-3xl bg-ink transition-opacity duration-400"
        />

        <div className="flex items-center justify-between">
          <Quote className="h-7 w-7 text-brand/45" />
          <FiveStars />
        </div>

        <blockquote className="mt-6 flex-1 text-pretty text-base leading-relaxed sm:text-lg text-body/90">
          {item.quote}
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-[linear-gradient(140deg,color-mix(in_oklab,var(--color-brand)_28%,transparent),color-mix(in_oklab,var(--color-accent)_22%,transparent))] text-sm font-semibold text-white">
            {initials(item.name)}
          </span>
          <span>
            <span className="block text-sm font-medium">{item.name}</span>
            <span className="block text-xs text-faint">{item.company}</span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

/** "Byron Jara" → "BJ", "Mr. Gee Gab" → "GG"; honorifics don't count. */
function initials(name) {
  return name
    .replace(/^(mr|mrs|ms|dr)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

// Lucide's star outline, five abreast in one SVG rather than five icons.
const STAR =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

function FiveStars() {
  return (
    <svg
      viewBox="0 0 130 24"
      role="img"
      aria-label="Rated 5 out of 5"
      className="h-3.5 w-[4.6rem] fill-accent text-accent"
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <path
          key={index}
          d={STAR}
          transform={`translate(${index * 26.5} 0)`}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

function ArrowButton({ children, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:border-brand/50 hover:bg-brand/10 hover:text-white"
    >
      {children}
    </button>
  );
}
