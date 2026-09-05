import { marqueeItems } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Infinite tech-stack ticker.
 *
 * The list is rendered twice and the track translates by exactly -50%, so the
 * second copy lands where the first started and the loop has no visible seam.
 */
export function Marquee() {
  // The second row runs the list in reverse and travels the other way, so the
  // two bands read as counter-rotating rather than one duplicated strip.
  const reversed = [...marqueeItems].reverse();

  return (
    <section className="relative border-y border-line bg-ink-2/60 py-7">
      <Row items={marqueeItems} />
      <Row items={reversed} reverse className="mt-5" />
    </section>
  );
}

function Row({ items, reverse = false, className }) {
  return (
    <div className={cn("mask-edges flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-14 pr-14 hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={reverse || index >= items.length}
            className={cn(
              "flex shrink-0 items-center gap-3 text-sm font-medium tracking-wide transition-colors duration-300 hover:text-body",
              reverse ? "text-faint/60" : "text-faint"
            )}
          >
            <span
              className={cn(
                "h-1 w-1 rounded-full",
                reverse ? "bg-accent/50" : "bg-brand/60"
              )}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
