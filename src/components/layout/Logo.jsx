export function Logo({ className }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
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
        fill="url(#logo-gradient)"
        opacity="0.16"
      />
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        fill="none"
        stroke="url(#logo-gradient)"
        strokeWidth="1.4"
        opacity="0.55"
      />
      {/* "A" for ADS. */}
      <path
        d="M11.5 27.5 20 12.5l8.5 15M15 22.8h10"
        fill="none"
        stroke="url(#logo-gradient)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
