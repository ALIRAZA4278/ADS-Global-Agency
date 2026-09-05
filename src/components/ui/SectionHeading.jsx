import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Eyebrow + title + description block shared by every section, so the
 * rhythm above each section body stays identical down the page.
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal from="none">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-ring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <h2
          className={cn(
            "text-balance text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]",
            centered ? "max-w-3xl" : "max-w-2xl"
          )}
        >
          {title}
          {highlight && <span className="text-gradient"> {highlight}</span>}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-pretty text-base leading-relaxed text-muted",
              centered ? "mx-auto max-w-2xl" : "max-w-xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
