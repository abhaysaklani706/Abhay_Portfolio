"use client";

import { useEffect, useRef } from "react";

import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  const video = useRef<HTMLVideoElement>(null);

  // Don't decode/play the background video while it is off-screen.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div id="hero" className="relative flex flex-col h-full w-full">
      <video
        ref={video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      {/* Keeps the headline readable over the bright video on small screens */}
      <div aria-hidden="true" className="md:hidden absolute inset-0 -z-10 bg-gradient-to-b from-[#030014]/20 via-[#030014]/55 to-transparent" />

      <HeroContent />
    </div>
  );
};
