"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
  viewport?: boolean;
  once?: boolean;
};

export const FadeIn = ({ 
  children, 
  delay = 0, 
  x = 0, 
  y = 0,
  className = "",
  viewport = true,
  once = true
}: FadeInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={viewport ? (isInView ? { opacity: 1, x: 0, y: 0 } : {}) : { opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
