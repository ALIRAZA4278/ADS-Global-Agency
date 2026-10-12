"use client";

import { useEffect, useRef } from "react";

/**
 * Fades content in the first time it scrolls into view.
 * `delay` (seconds) staggers siblings; `from` picks the direction it travels
 * from.
 *
 * The animation itself is a CSS transition on `[data-reveal]` (globals.css);
 * all this component does is mark the element `data-shown` once it enters
 * the viewport. Every Reveal on the page shares one IntersectionObserver.
 * Reduced motion is handled by the global reduced-motion rules, which make
 * the transition instant.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as: Tag = "div",
  style,
  ...props
}) {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <Tag
      ref={ref}
      data-reveal={from}
      className={className}
      style={delay ? { ...style, "--reveal-delay": `${delay}s` } : style}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * Wrapper whose `StaggerItem` children reveal in sequence once the wrapper
 * enters the viewport — one observed element for the whole group.
 */
export function Stagger({ children, className, delay = 0, step = 0.09, style, ...props }) {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <div
      ref={ref}
      data-reveal-group=""
      className={className}
      style={{ ...style, "--stagger-delay": `${delay}s`, "--stagger-step": `${step}s` }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * One step of a Stagger; `index` sets its place in the sequence. A separate
 * export, not `Stagger.Item`: server components can only reach a client
 * module's named exports, not properties hung off them.
 */
export function StaggerItem({ children, className, index = 0, style, ...props }) {
  return (
    <div data-reveal-item="" className={className} style={{ ...style, "--i": index }} {...props}>
      {children}
    </div>
  );
}

let observer = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      // Matches the old motion viewport margin: trigger a little after the
      // element's top edge clears the bottom of the screen.
      { rootMargin: "0px 0px -80px 0px" }
    );
  }
  return observer;
}

function useReveal(ref) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = getObserver();
    io.observe(node);
    return () => io.unobserve(node);
  }, [ref]);
}
