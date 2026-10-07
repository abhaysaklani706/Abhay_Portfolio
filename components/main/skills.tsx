"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import type { Progress, SceneSkill } from "@/components/sub/skills-scene";
import { SkillText } from "@/components/sub/skill-text";
import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
} from "@/constants";

const SkillsScene = dynamic(() => import("@/components/sub/skills-scene"), {
  ssr: false,
});

const CHAPTERS = [
  { title: "Frontend", list: FRONTEND_SKILL, accent: "#a78bfa" },
  { title: "Backend", list: BACKEND_SKILL, accent: "#22d3ee" },
  { title: "Full Stack", list: FULLSTACK_SKILL, accent: "#f472b6" },
  { title: "Tools & Platforms", list: OTHER_SKILL, accent: "#fbbf24" },
];

export const Skills = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const progress = useRef<Progress>({ value: 0 });

  const [reduced, setReduced] = useState<boolean | null>(null);
  const [live, setLive] = useState(false);

  const skills = useMemo<SceneSkill[]>(
    () =>
      CHAPTERS.flatMap((c) =>
        c.list.map((s) => ({
          name: s.skill_name,
          image: s.image,
          category: c.title,
          accent: c.accent,
        }))
      ),
    []
  );

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Only keep the WebGL scene alive while the section is near the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduced !== false) return;
    const io = new IntersectionObserver(
      ([e]) => setLive(e.isIntersecting),
      { rootMargin: "100% 0px 100% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // USER SCROLL → (Lenis) → ScrollTrigger scrub → progress 0..1 → scene
  useEffect(() => {
    if (reduced !== false || !wrapRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const state = progress.current;
    state.value = 0;
    let lastIdx = -1;

    const tween = gsap.to(state, {
      value: 1,
      ease: "none",
      scrollTrigger: {
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
      onUpdate: () => {
        const p = state.value;
        if (headRef.current) {
          const o = 1 - Math.min(1, p / 0.07);
          headRef.current.style.opacity = String(o);
          headRef.current.style.transform = `translateY(${(1 - o) * -40}px)`;
        }
        if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 1 - p / 0.05));
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

        const idx = Math.min(skills.length - 1, Math.floor(p * skills.length));
        if (idx !== lastIdx) {
          lastIdx = idx;
          const s = skills[idx];
          if (nameRef.current) {
            nameRef.current.textContent = s.name;
            nameRef.current.style.color = s.accent;
          }
          if (chapterRef.current) chapterRef.current.textContent = s.category;
        }
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, skills]);

  // Accessibility fallback: the original static grid.
  if (reduced) {
    return (
      <section
        id="skills"
        className="flex flex-col items-center justify-center gap-3 h-full relative py-20"
      >
        <SkillText />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-8 max-w-6xl mx-auto px-4">
          {[...FRONTEND_SKILL, ...BACKEND_SKILL, ...FULLSTACK_SKILL, ...OTHER_SKILL].map(
            (skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={skill.width}
                height={skill.height}
                index={i}
              />
            )
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="skills" aria-label="Skills" className="relative w-full">
      <ul className="sr-only-skills">
        {skills.map((s) => (
          <li key={s.name}>
            {s.name} ({s.category})
          </li>
        ))}
      </ul>
      {/* Scroll distance that drives the whole journey */}
      <div ref={wrapRef} style={{ height: "650vh" }} className="relative">
        {/* Pinned viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent opacity-40" />

          <div className="absolute inset-0" aria-hidden="true">{live && <SkillsScene skills={skills} progress={progress} />}</div>

          {/* Intro heading — fades out as the journey begins */}
          <div
            ref={headRef}
            className="absolute inset-x-0 top-24 [@media(max-height:520px)]:top-16 flex flex-col items-center px-4 pointer-events-none will-change-transform"
          >
            <SkillText />
          </div>

          <div
            ref={hintRef}
            className="absolute bottom-40 md:bottom-24 [@media(max-height:520px)]:hidden inset-x-0 text-center text-xs sm:text-sm tracking-[0.3em] text-white/60 uppercase pointer-events-none"
          >
            Scroll to travel
          </div>

          {/* HUD */}
          <div className="absolute inset-x-0 bottom-8 [@media(max-height:520px)]:bottom-3 px-6 flex flex-col items-center gap-2 pointer-events-none">
            <div ref={chapterRef} className="text-xs tracking-[0.35em] uppercase text-white/60" />
            <div ref={nameRef} className="text-3xl md:text-5xl [@media(max-height:520px)]:text-2xl font-bold text-white" />
            <div className="mt-2 h-[2px] w-48 md:w-72 bg-white/15 rounded-full overflow-hidden">
              <div
                ref={barRef}
                className="h-full w-full origin-left bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
