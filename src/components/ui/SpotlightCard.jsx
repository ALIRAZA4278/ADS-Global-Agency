"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card whose border and surface pick up a soft glow that follows the cursor.
 *
 * The pointer position is written straight to CSS custom properties rather
 * than React state — this runs on every mousemove, and re-rendering a grid of
 * cards at that rate is what makes hover effects feel cheap.
 */
export function SpotlightCard({ children, className, as: Tag = "div", ...props }) {
  const ref = useRef(null);

  const handleMouseMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group/spot relative overflow-hidden rounded-2xl border border-line",
        "bg-[linear-gradient(150deg,var(--color-surface-2),var(--color-surface))]",
        "transition-colors duration-300 hover:border-line-strong",
        className
      )}
      {...props}
    >
      {/* Glow that tracks the cursor. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--color-brand) 16%, transparent), transparent 70%)",
        }}
      />
      {/* Top hairline that brightens on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-brand-soft),transparent)] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-70"
      />
      <div className="relative h-full">{children}</div>
    </Tag>
  );
}
