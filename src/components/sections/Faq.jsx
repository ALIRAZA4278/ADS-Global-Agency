"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  // Open the first question by default so the section reads as answerable
  // content rather than a wall of closed rows.
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faqs" className="section-y relative">
      <div className="shell max-w-4xl!">
        <SectionHeading
          eyebrow={faqs.eyebrow}
          title="Questions,"
          highlight="answered"
        />

        <div className="mt-14 flex flex-col gap-3">
          {faqs.items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <Reveal key={item.q} delay={index * 0.05}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors duration-300",
                    isOpen
                      ? "border-brand/35 bg-[linear-gradient(150deg,color-mix(in_oklab,var(--color-brand)_7%,var(--color-surface-2)),var(--color-surface))]"
                      : "border-line bg-surface/60 hover:border-line-strong"
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left sm:px-7"
                    >
                      <span className="text-base font-medium tracking-tight">
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "rotate-45 border-brand/50 bg-brand/15 text-accent"
                            : "border-line text-muted"
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>

                  {/* Animating grid-template-rows between 0fr and 1fr gives a
                      true height-auto transition in CSS. Closed panels stay
                      in the DOM (hidden from assistive tech via `inert`), so
                      answers are still in the page for search engines. */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!isOpen}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-[340ms] ease-[cubic-bezier(0.21,0.47,0.32,0.98)]",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted sm:px-7">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
