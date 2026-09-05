"use client";

import { motion } from "motion/react";

const offsets = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Fades content in the first time it scrolls into view.
 * `delay` staggers siblings; `from` picks the direction it travels from.
 *
 * Reduced-motion is handled globally by <MotionConfig reducedMotion="user">
 * in Providers — transforms are dropped there and only the fade survives.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  duration = 0.7,
  as = "div",
  ...props
}) {
  const Tag = motion[as] ?? motion.div;
  const offset = offsets[from] ?? offsets.up;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * Parent wrapper that reveals its `Stagger.Item` children in sequence.
 * Cheaper than giving every child its own viewport observer.
 */
export function Stagger({ children, className, delay = 0, step = 0.09, ...props }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

Stagger.Item = function StaggerItem({ children, className, ...props }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
