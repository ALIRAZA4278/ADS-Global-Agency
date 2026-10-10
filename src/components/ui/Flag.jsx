import { useId } from "react";

// Unit 5-point star (outer radius 1, centred at origin) — reused at
// different positions and scales across both flags.
const STAR_PATH =
  "M0,-1 L0.225,-0.309 L0.951,-0.309 L0.363,0.118 L0.588,0.809 L0,0.382 L-0.588,0.809 L-0.363,0.118 L-0.951,-0.309 L-0.225,-0.309 Z";

function Star({ x, y, r = 1.6, fill = "#fff" }) {
  return (
    <path d={STAR_PATH} fill={fill} transform={`translate(${x} ${y}) scale(${r})`} />
  );
}

/**
 * Small inline national flags for AU and US.
 *
 * The Unicode flag emoji ("\u{1F1E6}\u{1F1FA}") fall back to plain two-letter
 * text on Windows, which has no colour flag glyphs in its default fonts — so
 * these are hand-drawn SVGs instead of relying on emoji rendering.
 */
export function Flag({ country, className }) {
  const Glyph = FLAGS[country];
  if (!Glyph) return null;

  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" className={className}>
      <Glyph />
    </svg>
  );
}

function UsFlag() {
  const stripeHeight = 40 / 13;
  const cantonWidth = 24;
  const cantonHeight = stripeHeight * 7;

  const stars = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      stars.push(
        <Star
          key={`${row}-${col}`}
          x={(cantonWidth / 5) * (col + 0.5)}
          y={(cantonHeight / 4) * (row + 0.5)}
          r={1.1}
        />
      );
    }
  }

  return (
    <>
      <rect width={60} height={40} fill="#FFFFFF" />
      {Array.from({ length: 13 }, (_, i) => (
        <rect
          key={i}
          x={0}
          y={i * stripeHeight}
          width={60}
          height={stripeHeight}
          fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      <rect width={cantonWidth} height={cantonHeight} fill="#3C3B6E" />
      {stars}
    </>
  );
}

/** Simplified Union Jack + Commonwealth / Southern Cross stars. */
function AuFlag() {
  const clipId = useId();

  return (
    <>
      <rect width={60} height={40} fill="#00247D" />

      <clipPath id={clipId}>
        <rect width={30} height={20} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <line x1={0} y1={0} x2={30} y2={20} stroke="#fff" strokeWidth={4} />
        <line x1={30} y1={0} x2={0} y2={20} stroke="#fff" strokeWidth={4} />
        <line x1={0} y1={0} x2={30} y2={20} stroke="#CC142B" strokeWidth={1.6} />
        <line x1={30} y1={0} x2={0} y2={20} stroke="#CC142B" strokeWidth={1.6} />
        <rect x={13} y={0} width={4} height={20} fill="#fff" />
        <rect x={0} y={8} width={30} height={4} fill="#fff" />
        <rect x={14} y={0} width={2} height={20} fill="#CC142B" />
        <rect x={0} y={9} width={30} height={2} fill="#CC142B" />
      </g>

      {/* Commonwealth Star */}
      <Star x={15} y={30} r={2.6} />

      {/* Southern Cross */}
      <Star x={45} y={10} r={2.2} />
      <Star x={51} y={22} r={2.2} />
      <Star x={45} y={33} r={2.2} />
      <Star x={36} y={26} r={2.2} />
      <Star x={41} y={19} r={1.2} />
    </>
  );
}

const FLAGS = { AU: AuFlag, US: UsFlag };
