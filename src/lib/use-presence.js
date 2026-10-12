"use client";

import { useEffect, useState } from "react";

/**
 * Mount/unmount with CSS transitions on both ends — the small slice of
 * AnimatePresence the overlays need.
 *
 * `mounted` says whether to render at all; `visible` flips a frame after
 * mounting (so the "hidden" styles paint first and the transition runs) and
 * drops as soon as `open` does, keeping the element mounted for `duration` ms
 * so the exit transition can play.
 */
export function usePresence(open, duration = 250) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  // Adjusting state from props during render, React's documented pattern
  // for this; it avoids a wasted commit with stale values.
  if (open && !mounted) setMounted(true);
  if (!open && visible) setVisible(false);

  useEffect(() => {
    if (open) {
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    if (!mounted) return;
    const timer = setTimeout(() => setMounted(false), duration);
    return () => clearTimeout(timer);
  }, [open, mounted, duration]);

  return { mounted, visible };
}
