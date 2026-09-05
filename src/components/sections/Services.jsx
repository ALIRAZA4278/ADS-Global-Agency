import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function Services() {
  return (
    <section id="services" className="section-y relative scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow={services.eyebrow}
          title="Services built to"
          highlight="compound"
          description={services.description}
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((service, index) => (
            <Reveal
              key={service.title}
              // Stagger across the row, not the whole grid, so cards further
              // down the page don't wait on a long cumulative delay.
              delay={(index % 4) * 0.08}
              className="h-full"
            >
              <SpotlightCard as="article" className="flex h-full flex-col p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink text-brand-soft transition-all duration-300 group-hover/spot:border-brand/40 group-hover/spot:text-accent">
                  <Icon name={service.icon} className="h-5.5 w-5.5" />
                </span>

                <h3 className="mt-6 flex items-start justify-between gap-2 text-lg font-semibold tracking-tight">
                  {service.title}
                  <ArrowUpRight className="h-4 w-4 shrink-0 translate-y-1 text-faint opacity-0 transition-all duration-300 group-hover/spot:translate-y-0 group-hover/spot:text-accent group-hover/spot:opacity-100" />
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[0.7rem] text-faint"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
