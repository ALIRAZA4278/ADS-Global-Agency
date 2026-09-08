import { useId } from "react";

export function Logo({ className }) {
  // The mark renders in the header and the footer at once, so a hard-coded
  // gradient id would appear twice in the document. Both references would
  // then resolve to whichever def happened to be first, and unmounting that
  // one would strip the fill from the other.
  const gradientId = useId();

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-soft)" />
          <stop offset="55%" stopColor="var(--color-brand)" />
          <stop offset="100%" stopColor="var(--color-accent)" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        fill={`url(#${gradientId})`}
        opacity="0.16"
      />
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.4"
        opacity="0.55"
      />
      {/* "A" for ADS. */}
      <path
        d="M11.5 27.5 20 12.5l8.5 15M15 22.8h10"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
