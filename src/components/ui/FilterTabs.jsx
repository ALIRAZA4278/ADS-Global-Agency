"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Pill-style filter tabs with a highlight that slides to the selected tab.
 * Shared by the gallery and the packages section.
 *
 * The highlight is one absolutely positioned element moved to the selected
 * button's box (offsetLeft/Top/Width/Height), so it also follows tabs that
 * wrap onto a second row. A ResizeObserver re-places it when the row reflows.
 *
 * `options`: [{ value, label, count? }]
 */
export function FilterTabs({ options, value, onChange, label, className }) {
  const listRef = useRef(null);
  const pillRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;

    const place = () => {
      const button = list.querySelector('[aria-pressed="true"]');
      if (!button) return;
      pill.style.width = `${button.offsetWidth}px`;
      pill.style.height = `${button.offsetHeight}px`;
      pill.style.transform = `translate(${button.offsetLeft}px, ${button.offsetTop}px)`;
      pill.style.opacity = "1";
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={listRef}
      role="group"
      aria-label={label}
      className={cn(
        "relative inline-flex max-w-full flex-wrap justify-center gap-1 rounded-3xl border border-line bg-white/2 p-1.5",
        className
      )}
    >
      <span
        ref={pillRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 rounded-full bg-[linear-gradient(100deg,var(--color-brand-deep),var(--color-brand))] opacity-0 transition-[transform,width,height,opacity] duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]"
      />
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={selected}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
              selected ? "text-white" : "text-muted hover:text-white"
            )}
          >
            {option.label}
            {option.count !== undefined && (
              <span className="ml-1.5 text-xs opacity-60">{option.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
