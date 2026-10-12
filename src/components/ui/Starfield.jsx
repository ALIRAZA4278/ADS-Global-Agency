import { cn } from "@/lib/utils";

/** Small deterministic PRNG — same sequence every call for a given seed. */
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const tints = [
  "var(--color-body)",
  "var(--color-accent)",
  "var(--color-brand-soft)",
  "var(--color-brand)",
];

// Stars are split across this many layers, each twinkling on its own cycle.
const LAYERS = 3;
const LAYER_TIMING = [
  { duration: "6s", delay: "0s" },
  { duration: "8.5s", delay: "-3s" },
  { duration: "11s", delay: "-6s" },
];

/**
 * Twinkling starfield behind the hero, process and careers sections.
 *
 * Drawn as a few SVG layers rather than one element per star: each layer is
 * a single composited surface whose opacity animates, so a field of 100+
 * stars costs three animations instead of a hundred repaints, and adds a
 * handful of DOM nodes instead of hundreds.
 *
 * Positions come from a seeded PRNG rather than Math.random so the server and
 * client render the exact same stars.
 */
export function Starfield({ count = 90, seed = 7, className }) {
  const random = mulberry32(seed);
  const layers = Array.from({ length: LAYERS }, () => []);

  for (let index = 0; index < count; index++) {
    const size = random() * 2.2 + 0.8;
    layers[index % LAYERS].push({
      id: index,
      x: `${(random() * 100).toFixed(2)}%`,
      y: `${(random() * 100).toFixed(2)}%`,
      r: size / 2,
      // Bigger stars glow brighter; small ones stay as faint dust.
      opacity: (0.15 + random() * 0.55).toFixed(2),
      color: tints[Math.floor(random() * tints.length)],
    });
  }

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {layers.map((stars, layer) => (
        <svg
          key={layer}
          className="absolute inset-0 h-full w-full animate-twinkle"
          style={{
            animationDuration: LAYER_TIMING[layer].duration,
            animationDelay: LAYER_TIMING[layer].delay,
          }}
        >
          {stars.map((star) => (
            // Fill goes through style: CSS variables don't resolve in SVG
            // presentation attributes.
            <g key={star.id} style={{ fill: star.color }} opacity={star.opacity}>
              {/* A soft halo stands in for the old box-shadow glow. */}
              {star.r > 1 && <circle cx={star.x} cy={star.y} r={star.r * 3} opacity="0.12" />}
              <circle cx={star.x} cy={star.y} r={star.r} />
            </g>
          ))}
        </svg>
      ))}
    </div>
  );
}
