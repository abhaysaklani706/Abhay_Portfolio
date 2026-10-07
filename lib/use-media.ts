"use client";

import { useEffect, useState } from "react";

/** Subscribes to a CSS media query. Returns `false` on the server / first render. */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
};

/** True only for mouse-like devices (desktop) that haven't asked for reduced motion. */
export const useFinePointer = () => {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return fine && !reduced;
};

export const useReducedMotionQuery = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
