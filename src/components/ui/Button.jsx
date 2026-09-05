"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium " +
  "transition-colors duration-300 whitespace-nowrap select-none";

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
    "bg-white/[0.02] hover:bg-white/[0.06] backdrop-blur-sm",
  ghost: "text-muted hover:text-white",
};

/**
 * Button / link with a subtle magnetic pull toward the cursor.
 * Renders an <a> when `href` is set, otherwise a <button>.
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
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  const pullEnabled = magnetic && !reduceMotion;

  const handleMouseMove = (event) => {
    if (!pullEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Cap the pull at ~18% of the button size so it never detaches visually.
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.18);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.18);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      style={pullEnabled ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {/* Sheen sweep on hover — primary only, where there is a fill to catch it. */}
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span
            className={cn(
              "absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-white/25 blur-md transition-transform duration-700",
              hovered && "translate-x-[400%]"
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
