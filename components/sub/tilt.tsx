"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type PropsWithChildren } from "react";

import { useFinePointer } from "@/lib/use-media";

/** Subtle 3D tilt toward the cursor. Desktop / non-reduced-motion only. */
export const Tilt = ({
  children,
  max = 8,
  className,
}: PropsWithChildren<{ max?: number; className?: string }>) => {
  const enabled = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <div className={className} style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry.set(px * max * 2);
          rx.set(-py * max * 2);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
