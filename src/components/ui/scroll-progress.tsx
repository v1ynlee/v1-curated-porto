"use client";

import { motion, useScroll, type MotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof MotionProps
> {
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Scroll progress indicator.
 *
 * When placed as the last child of the fixed `<header>`, it renders flush at
 * the bottom edge of the navigation bar — directly below all nav content and
 * never overlapping it.
 *
 * Color is driven entirely by the active color-theme CSS custom properties
 * (`--p`, `--s`) so it automatically updates when the user switches themes.
 */
export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        // absolute bottom-0 keeps the bar pinned to the bottom of the header
        // (the header itself is fixed, so this is relative to the header)
        "absolute inset-x-0 bottom-0 h-[2px] origin-left",
        className,
      )}
      style={{
        scaleX: scrollYProgress,
        // Theme-aware gradient: both from/to follow the active CSS tokens.
        // These resolve to whichever palette is currently active.
        background: "linear-gradient(to right, var(--p), var(--s))",
        // Subtle glow beneath the bar to reinforce the brand accent
        boxShadow: "0 0 8px var(--p-glow)",
      }}
      {...props}
    />
  );
}
