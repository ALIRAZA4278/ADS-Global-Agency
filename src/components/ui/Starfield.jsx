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

// Literal colours rather than theme variables: these stars are drawn inside a
// data-URI SVG, which can't see the page's CSS custom properties. They match
// --color-body, --color-accent, --color-brand-soft and --color-brand.
const tints = ["#e8ecf5", "#22d3ee", "#5aa0ff", "#2f7bff"];

// Each layer is a repeating tile of stars, twinkling on its own cycle. The
// tile sizes differ so the three repeats never line up into a visible grid,
// and tiling (rather than stretching one image) keeps every star round and at
// its real pixel size on any section shape, phone or desktop.
const LAYERS = [
  { width: 900, height: 700, duration: "6s", delay: "0s" },
  { width: 1100, height: 800, duration: "8.5s", delay: "-3s" },
  { width: 1300, height: 900, duration: "11s", delay: "-6s" },
];

// `count` is the number of stars over a 1600x1000px area, split evenly
// across the layers.
const REFERENCE_AREA = 1600 * 1000;

/**
 * Twinkling starfield behind the hero, process and careers sections.
 *
 * Each layer is a single <div> whose background is an inline SVG of its
 * stars: no DOM nodes per star at all, so the field costs nothing to hydrate
 * or lay out, and each layer's twinkle is one compositor-only opacity
 * animation.
 *
 * Positions come from a seeded PRNG rather than Math.random so the server and
 * client render the exact same stars.
 */
export function Starfield({ count = 90, seed = 7, className }) {
  const random = mulberry32(seed);

  const layers = LAYERS.map((layer) => {
    const stars = Math.round(((count / LAYERS.length) * layer.width * layer.height) / REFERENCE_AREA);
    let circles = "";
    for (let index = 0; index < stars; index++) {
      const size = random() * 2.2 + 0.8;
      const x = (random() * layer.width).toFixed(1);
      const y = (random() * layer.height).toFixed(1);
      // Bigger stars glow brighter; small ones stay as faint dust.
      const opacity = 0.15 + random() * 0.55;
      const color = tints[Math.floor(random() * tints.length)];
      // A soft halo stands in for a glow on the larger stars.
      if (size > 2) {
        circles += `<circle cx="${x}" cy="${y}" r="${(size * 1.5).toFixed(2)}" fill="${color}" opacity="${(opacity * 0.12).toFixed(3)}"/>`;
      }
      circles += `<circle cx="${x}" cy="${y}" r="${(size / 2).toFixed(2)}" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${layer.width}" height="${layer.height}">${circles}</svg>`;
    return { ...layer, image: `url("data:image/svg+xml,${encodeURIComponent(svg)}")` };
  });

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {layers.map((layer) => (
        <div
          key={layer.width}
          className="absolute inset-0 animate-twinkle"
          style={{
            backgroundImage: layer.image,
            backgroundSize: `${layer.width}px ${layer.height}px`,
            animationDuration: layer.duration,
            animationDelay: layer.delay,
          }}
        />
      ))}
    </div>
  );
}
