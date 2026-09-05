"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts up to `value` the first time it enters the viewport.
 */
export function Counter({ value, suffix = "", duration = 1.6, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Reduced motion still runs through `animate`, just at zero duration —
    // that keeps the state update inside an animation callback instead of
    // firing synchronously in the effect body.
    const controls = animate(0, value, {
      duration: reduceMotion ? 0 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
      onComplete: () => setDisplay(value),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
