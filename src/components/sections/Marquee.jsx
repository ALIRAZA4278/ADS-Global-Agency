import { marqueeItems } from "@/lib/site";

/**
 * Infinite tech-stack ticker.
 *
 * The list is rendered twice and the track translates by exactly -50%, so the
 * second copy lands where the first started and the loop has no visible seam.
 */
export function Marquee() {
  return (
    <section className="relative border-y border-line bg-ink-2/60 py-8">
      <div className="mask-edges flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14 [animation-play-state:running] hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              aria-hidden={index >= marqueeItems.length}
              className="flex shrink-0 items-center gap-3 text-sm font-medium tracking-wide text-faint transition-colors duration-300 hover:text-body"
            >
              <span className="h-1 w-1 rounded-full bg-brand/60" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
