import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function Testimonials() {
  return (
    <section className="section-y relative overflow-hidden">
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

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {testimonials.items.map((item, index) => (
            <Reveal
              key={item.name}
              delay={(index % 2) * 0.1}
              from={index % 2 === 0 ? "right" : "left"}
              className="h-full"
            >
              <SpotlightCard as="figure" className="flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <Quote className="h-7 w-7 text-brand/40" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-3.5 w-3.5 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="mt-5 flex-1 text-pretty leading-relaxed text-body/90">
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
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
