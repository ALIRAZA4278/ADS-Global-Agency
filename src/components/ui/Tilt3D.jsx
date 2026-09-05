"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Tips its children in 3D toward the cursor.
 *
 * Like SpotlightCard, the pointer position is written straight to CSS custom
 * properties inside a rAF instead of React state — this fires on every
 * mousemove, and re-rendering a grid of cards at that rate is what makes
 * hover effects feel cheap.
 */
export function Tilt3D({
  children,
  className,
  // Must carry the same rounding as the card inside, so the shine overlay
  // (which inherits its radius) doesn't paint square corners over it.
  innerClassName = "rounded-2xl",
  max = 9,
  scale = 1.015,
  perspective = 1100,
  shine = true,
}) {
  const ref = useRef(null);
  const frame = useRef(0);
  const enabled = useRef(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Coarse pointers have no hover, so the tilt would only ever fire as a
    // jarring jump on tap.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

    const sync = () => {
      enabled.current = !query.matches && fine.matches;
    };

    sync();
    query.addEventListener("change", sync);
    fine.addEventListener("change", sync);

    return () => {
      query.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const handleMove = (event) => {
    if (!enabled.current) return;
    const { clientX, clientY } = event;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      node.style.setProperty("--tilt-x", `${(0.5 - y) * max * 2}deg`);
      node.style.setProperty("--tilt-y", `${(x - 0.5) * max * 2}deg`);
      node.style.setProperty("--tilt-scale", scale);
      // Drives the shine, which slides against the tilt.
      node.style.setProperty("--shine-x", `${x * 100}%`);
      node.style.setProperty("--shine-y", `${y * 100}%`);
      node.style.setProperty("--shine-o", "1");
    });
  };

  const handleLeave = () => {
    cancelAnimationFrame(frame.current);
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
    node.style.setProperty("--tilt-scale", 1);
    node.style.setProperty("--shine-o", "0");
  };

  return (
    <div style={{ perspective: `${perspective}px` }} className={cn("h-full", className)}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "relative h-full transition-transform duration-200 ease-out will-change-transform",
          innerClassName
        )}
        style={{
          transform:
            "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) scale(var(--tilt-scale, 1))",
        }}
      >
        {children}

        {shine && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--shine-o,0)] transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(420px circle at var(--shine-x,50%) var(--shine-y,50%), rgba(255,255,255,0.07), transparent 60%)",
            }}
          />
        )}
      </div>
    </div>
  );
}
