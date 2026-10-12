"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium " +
  "whitespace-nowrap select-none " +
  // The magnetic pull and the press both live in one transform, driven by
  // CSS variables; the transition gives the pull its springy settle.
  "[transform:translate3d(var(--pull-x,0px),var(--pull-y,0px),0)_scale(var(--press,1))] " +
  "transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out " +
  "active:[--press:0.97]";

const sizes = {
  sm: "h-10 px-5",
  md: "h-12 px-7",
  lg: "h-14 px-9 text-base",
};

const variants = {
  primary:
    "text-white shadow-[0_10px_40px_-12px_var(--color-brand)] " +
    "bg-[linear-gradient(100deg,var(--color-brand-deep),var(--color-brand)_45%,var(--color-accent))] " +
    "hover:shadow-[0_16px_50px_-10px_var(--color-brand)]",
  outline:
    "border border-line-strong text-body/90 hover:text-white hover:border-brand/60 " +
    "bg-white/[0.02] hover:bg-white/[0.06]",
  ghost: "text-muted hover:text-white",
};

/**
 * Button / link with a subtle magnetic pull toward the cursor.
 * Renders an <a> when `href` is set, otherwise a <button>.
 *
 * The pull is written to CSS variables inside a rAF, not React state, so
 * hovering never re-renders; it's skipped on touch screens and under reduced
 * motion.
 */
export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  magnetic = true,
  ...props
}) {
  const ref = useRef(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const handleMouseMove = (event) => {
    if (!magnetic) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const node = ref.current;
      if (!node || !pullAllowed()) return;
      const rect = node.getBoundingClientRect();
      // Cap the pull at ~18% of the button size so it never detaches visually.
      node.style.setProperty("--pull-x", `${(clientX - (rect.left + rect.width / 2)) * 0.18}px`);
      node.style.setProperty("--pull-y", `${(clientY - (rect.top + rect.height / 2)) * 0.18}px`);
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(frame.current);
    ref.current?.style.removeProperty("--pull-x");
    ref.current?.style.removeProperty("--pull-y");
  };

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {/* Sheen sweep on hover — primary only, where there is a fill to catch it. */}
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span
            className={cn(
              "absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-white/25 blur-md transition-transform duration-700",
              "group-hover/btn:translate-x-[400%]"
            )}
          />
        </span>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </Tag>
  );
}

function pullAllowed() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
