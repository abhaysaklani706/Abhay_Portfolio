"use client";

import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "framer-motion";
import type { RefObject } from "react";

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Scroll progress (0 → 1) of `target`, mirrored into a plain MotionValue.
 *
 * Deriving opacity/filter from `useScroll`'s value directly lets framer hand the
 * animation to the browser's native ScrollTimeline, whose range does not match a
 * sticky "pinned" layout. Going through a normal MotionValue keeps every
 * derived value driven by the real scroll position.
 */
export const useScrollProgress = (
  target: RefObject<HTMLElement | null>,
  offset: Offset
): MotionValue<number> => {
  const { scrollYProgress } = useScroll({ target, offset });
  const progress = useMotionValue(scrollYProgress.get());
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  return progress;
};
