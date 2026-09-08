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
          title={services.title}
          highlight={services.titleHighlight}
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

                  <div className="relative flex h-full gap-6">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-line bg-ink text-brand-soft transition-all duration-300 group-hover/spot:border-brand/40 group-hover/spot:text-accent">
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
                          cards in a row line up even when their descriptions
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
