"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";
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
  const reduceMotion = useReducedMotion();
  const stageRef = useRef(null);

  const go = useCallback((direction) => {
    setActive((current) => (current + direction + COUNT) % COUNT);
  }, []);

  // Autoplay, held while the visitor is hovering, focused inside, or has the
  // tab in the background.
  useEffect(() => {
    if (paused || reduceMotion) return;

    const timer = setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [paused, reduceMotion, go]);

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
    <section className="section-y relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--color-accent)_8%,transparent),transparent_70%)] blur-3xl"
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
            className="relative mt-14 h-[28rem] rounded-3xl focus-visible:outline-none sm:h-[24rem]"
            style={{ perspective: "1400px" }}
          >
            {testimonials.items.map((item, index) => (
              <Slide
                key={item.name}
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

          <div className="flex items-center gap-2.5">
            {testimonials.items.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show testimonial from ${item.name}`}
                aria-current={index === active}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-400",
                  index === active
                    ? "w-8 bg-[linear-gradient(90deg,var(--color-brand),var(--color-accent))]"
                    : "w-1.5 bg-line-strong hover:bg-muted"
                )}
              />
            ))}
          </div>

          <ArrowButton label="Next testimonial" onClick={() => go(1)}>
            <ChevronRight className="h-4.5 w-4.5" />
          </ArrowButton>
        </div>

        {/* Screen readers get the position without watching the animation. */}
        <p aria-live="polite" className="sr-only">
          Testimonial {active + 1} of {COUNT}: {testimonials.items[active].name}
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

  return (
    // The wrapper centres the card; every transform then happens on the
    // motion element, so nothing fights over the transform property.
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        hidden && "pointer-events-none"
      )}
      style={{ zIndex: COUNT - distance, transformStyle: "preserve-3d" }}
    >
      <motion.figure
        animate={{
          x: `${side * pose.x}%`,
          z: hidden ? -420 : pose.z,
          rotateY: -side * pose.rotate,
          scale: hidden ? 0.7 : pose.scale,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 190, damping: 26, mass: 0.9 }}
        // Only the front card takes the drag, so a swipe can't be captured by
        // a card buried behind it.
        drag={isActive ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        onDragEnd={(_, info) => {
          const throw_ = info.offset.x + info.velocity.x * 0.06;
          if (throw_ < -70) onSwipe(1);
          else if (throw_ > 70) onSwipe(-1);
        }}
        onClick={isActive ? undefined : onSelect}
        aria-hidden={!isActive}
        className={cn(
          "relative flex w-[min(88vw,34rem)] flex-col overflow-hidden rounded-3xl border p-7 sm:p-9",
          "bg-[linear-gradient(150deg,var(--color-surface-2),var(--color-surface))]",
          isActive
            ? "cursor-grab border-brand/35 shadow-[0_40px_100px_-50px_var(--color-brand)] active:cursor-grabbing"
            : "cursor-pointer border-line"
        )}
      >
        {/* Darkens a neighbouring card without making it see-through. */}
        <motion.span
          aria-hidden="true"
          animate={{ opacity: hidden ? 1 : pose.scrim }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 z-20 rounded-3xl bg-ink"
        />

        <div className="flex items-center justify-between">
          <Quote className="h-7 w-7 text-brand/45" />
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <Star key={starIndex} className="h-3.5 w-3.5 fill-accent text-accent" />
            ))}
          </div>
        </div>

        <blockquote className="mt-6 flex-1 text-pretty text-lg leading-relaxed text-body/90">
          {item.quote}
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[linear-gradient(140deg,color-mix(in_oklab,var(--color-brand)_28%,transparent),color-mix(in_oklab,var(--color-accent)_22%,transparent))] text-sm font-semibold text-white">
            {item.initials}
          </span>
          <span>
            <span className="block text-sm font-medium">{item.name}</span>
            <span className="block text-xs text-faint">{item.role}</span>
          </span>
        </figcaption>
      </motion.figure>
    </div>
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
