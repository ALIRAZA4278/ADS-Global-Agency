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

/**
 * Drifting starfield behind the hero and process sections.
 *
 * Positions come from a seeded PRNG rather than Math.random so the server and
 * client render the exact same stars — random values here would hydrate
 * mismatched and React would blow away the whole subtree.
 */
export function Starfield({ count = 90, seed = 7, className }) {
  const random = mulberry32(seed);

  const stars = Array.from({ length: count }, (_, index) => {
    const size = random() * 2.2 + 0.8;
    return {
      id: index,
      left: `${random() * 100}%`,
      top: `${random() * 100}%`,
      size,
      // Bigger stars glow brighter; small ones stay as faint dust.
      opacity: 0.15 + random() * 0.55,
      color: tints[Math.floor(random() * tints.length)],
      delay: `${(random() * 6).toFixed(2)}s`,
      duration: `${(3 + random() * 5).toFixed(2)}s`,
    };
  });

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.color,
            // The twinkle keyframes read this, so each star dims relative to
            // its own brightness instead of every star fading to the same value.
            "--star-opacity": star.opacity,
            opacity: star.opacity,
            boxShadow: star.size > 2 ? `0 0 ${star.size * 3}px ${star.color}` : undefined,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}
