import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Tilt3D } from "@/components/ui/Tilt3D";

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

        {/* Two wide columns rather than four narrow ones: each card gets room
            for its number, icon and copy to sit side by side, and eight items
            divide evenly into four rows. */}
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {services.items.map((service, index) => (
            <Reveal
              key={service.title}
              // Stagger across the row, not the whole grid, so cards further
              // down the page don't wait on a long cumulative delay.
              delay={(index % 2) * 0.08}
              className="h-full"
            >
              <Tilt3D innerClassName="rounded-2xl" max={6}>
                <SpotlightCard as="article" className="h-full p-7 sm:p-8">
                  <div className="flex gap-6">
                    <div className="flex shrink-0 flex-col items-center gap-4">
                      <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-ink text-brand-soft transition-all duration-300 group-hover/spot:border-brand/40 group-hover/spot:text-accent">
                        <Icon name={service.icon} className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-xs tabular-nums text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="flex items-start justify-between gap-3 text-xl font-semibold tracking-tight">
                        {service.title}
                        <ArrowUpRight className="h-4.5 w-4.5 shrink-0 translate-y-1 text-faint opacity-0 transition-all duration-300 group-hover/spot:translate-y-0 group-hover/spot:text-accent group-hover/spot:opacity-100" />
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {service.description}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
                        {service.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[0.7rem] text-faint"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpotlightCard>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
