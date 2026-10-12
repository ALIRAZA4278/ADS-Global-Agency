"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { cn } from "@/lib/utils";

export function Services() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      track.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-slide]");
    const step = card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section id="services" className="section-y relative">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={services.eyebrow}
            title={services.title}
            highlight={services.titleHighlight}
            description={services.description}
            align="left"
            className="sm:max-w-xl"
          />

          {/* Arrow controls — desktop only; touch/trackpad swipe covers mobile. */}
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <SlideButton
              direction="prev"
              disabled={atStart}
              onClick={() => scrollByCard(-1)}
            />
            <SlideButton
              direction="next"
              disabled={atEnd}
              onClick={() => scrollByCard(1)}
            />
          </div>
        </div>

        <Reveal delay={0.1}>
          <div
            ref={trackRef}
            className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 sm:mt-16"
          >
            {services.items.map((service, index) => (
              <div
                key={service.title}
                data-slide
                className="w-[86%] shrink-0 snap-start sm:w-[62%] lg:w-[46%]"
              >
                <Tilt3D innerClassName="rounded-2xl" max={6}>
                  <SpotlightCard as="article" className="h-full p-6 sm:p-8">
                    {/* Oversized index, echoing the process deck. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-5 right-3 select-none text-[6.5rem] font-bold leading-none tracking-tighter text-white/[0.028] transition-colors duration-500 group-hover/spot:text-white/[0.055]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Accent rail that grows down the left edge on hover. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-8 h-16 w-0.5 origin-top scale-y-0 rounded-full bg-[linear-gradient(180deg,var(--color-brand),var(--color-accent))] transition-transform duration-500 group-hover/spot:scale-y-100"
                    />

                    {/* Mobile stacks the icon above the copy, so the text gets the
                        card's full width; side by side from sm up. */}
                    <div className="relative flex h-full flex-col gap-5 sm:flex-row sm:gap-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-ink sm:h-14 sm:w-14 text-brand-soft transition-all duration-300 group-hover/spot:border-brand/40 group-hover/spot:text-accent">
                        <Icon name={service.icon} className="h-6 w-6" />
                      </span>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <h3 className="flex items-start justify-between gap-3 text-xl font-semibold tracking-tight">
                          {service.title}
                          <ArrowUpRight className="h-4.5 w-4.5 shrink-0 translate-y-1 text-faint opacity-0 transition-all duration-300 group-hover/spot:translate-y-0 group-hover/spot:text-accent group-hover/spot:opacity-100" />
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {service.description}
                        </p>

                        {/* mt-auto pins the capability list to the bottom, so
                            cards in view line up even when their descriptions
                            run to different lengths. */}
                        <ul className="mt-auto flex flex-wrap gap-1.5 border-t border-line pt-5">
                          {service.capabilities.map((capability) => (
                            <li
                              key={capability}
                              className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[0.7rem] text-faint transition-colors duration-300 group-hover/spot:border-line-strong group-hover/spot:text-muted"
                            >
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </SpotlightCard>
                </Tilt3D>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mobile controls, centred beneath the track where there's no room
            for them beside the heading. */}
        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
          <SlideButton direction="prev" disabled={atStart} onClick={() => scrollByCard(-1)} />
          <SlideButton direction="next" disabled={atEnd} onClick={() => scrollByCard(1)} />
        </div>
      </div>
    </section>
  );
}

function SlideButton({ direction, disabled, onClick }) {
  const Icon_ = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous services" : "Next services"}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
        disabled
          ? "cursor-not-allowed border-line text-faint/40"
          : "border-line text-body hover:border-brand/50 hover:bg-brand/10 hover:text-white"
      )}
    >
      <Icon_ className="h-4 w-4" />
    </button>
  );
}
