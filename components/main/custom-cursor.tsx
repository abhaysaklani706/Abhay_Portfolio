"use client";

import { useEffect, useRef, useState } from "react";

import { useFinePointer } from "@/lib/use-media";

/**
 * Small ring that follows the mouse (desktop only). It grows over links/buttons
 * and shows a label over anything with `data-cursor="Label"`.
 * The native cursor stays visible, so nothing is hidden from the user.
 */
export const CustomCursor = () => {
  const enabled = useFinePointer();
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? "");
      setHover(!!t?.closest("a,button,[role='button'],input,textarea,[data-cursor]"));
    };
    const tick = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = label ? 84 : hover ? 46 : 26;
  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="fixed left-0 top-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full border border-purple-300/70 text-[11px] font-semibold uppercase tracking-widest text-white"
      style={{
        width: size,
        height: size,
        background: label ? "rgba(112,66,248,0.55)" : hover ? "rgba(180,155,255,0.12)" : "transparent",
        transition: "width .25s, height .25s, background .25s",
        willChange: "transform",
      }}
    >
      {label}
    </div>
  );
};
