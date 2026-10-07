"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type PropsWithChildren } from "react";

import { useFinePointer } from "@/lib/use-media";

/** Pulls its child slightly toward the cursor. Desktop / non-reduced-motion only. */
export const Magnetic = ({
  children,
  strength = 0.25,
  className,
}: PropsWithChildren<{ strength?: number; className?: string }>) => {
  const enabled = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};
