"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";

import { LiveProjectButton } from "./LiveProjectButton";

export type Project = {
  id: number;
  number: string;
  category: string;
  name: string;
  /** Optional real screenshot (path under /public). No stock photos are used. */
  image?: string;
  /** Optional: only set when a real public URL exists. */
  liveUrl?: string;
  technologies: string[];
  description: string;
};

type ProjectCardProps = {
  project: Project;
  index: number;
  totalCards: number;
  onOpen: (project: Project) => void;
};

const HUES = [265, 190, 320, 230, 285];

export const ProjectCard = ({ project, index, totalCards, onOpen }: ProjectCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Cards scale down slightly as the next one stacks on top.
  const targetScale = useMemo(() => 1 - (totalCards - 1 - index) * 0.03, [totalCards, index]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 100 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.6,
          ease: [0.25, 0.1, 0.25, 1] as const,
          delay: shouldReduceMotion ? 0 : index * 0.05,
        },
      },
    }),
    [shouldReduceMotion, index]
  );

  // Soft spotlight that follows the cursor (CSS variables, no re-render).
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const hue = HUES[index % HUES.length];
  const sentences = project.description.split(". ").filter(Boolean);

  return (
    <motion.div
      ref={containerRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{
        scale: shouldReduceMotion ? 1 : scale,
        willChange: shouldReduceMotion ? undefined : "transform",
      }}
      className="sticky top-20 md:top-32 sm:h-[85vh] mb-6 sm:mb-8"
    >
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`Open case study: ${project.name}`}
        data-cursor="View"
        onClick={() => onOpen(project)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(project);
          }
        }}
        onPointerMove={onMove}
        className="group relative h-auto sm:h-full cursor-pointer rounded-[28px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA]/70 hover:border-[#D7E2EA] transition-colors bg-gradient-to-br from-gray-900/95 to-gray-800/95 p-5 sm:p-8 md:p-10 overflow-hidden"
      >
        {/* Cursor spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(167,139,250,0.16), transparent 60%)",
          }}
        />

        <div className="relative flex flex-col sm:h-full">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-start gap-4 sm:gap-6">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#D7E2EA]/20 leading-none">
                {project.number}
              </span>
              <div>
                <p className="text-sm sm:text-base text-[#D7E2EA]/60 uppercase tracking-wider mb-1">
                  {project.category}
                </p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  {project.name}
                </h3>
                <p className="text-sm sm:text-base text-[#D7E2EA]/80 mb-3 max-w-xl line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs sm:text-sm bg-[#D7E2EA]/10 border border-[#D7E2EA]/30 rounded-full text-[#D7E2EA]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <LiveProjectButton url={project.liveUrl} />
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative block flex-none h-36 sm:h-auto sm:flex-1 min-h-0 overflow-hidden rounded-[24px] sm:rounded-[40px] md:rounded-[50px] border border-white/10">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: `radial-gradient(circle at 20% 20%, hsla(${hue},90%,60%,0.35), transparent 55%), radial-gradient(circle at 85% 80%, hsla(${(hue + 70) % 360},90%,55%,0.28), transparent 55%), #0a0618`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />
                <span className="absolute right-4 sm:right-8 -bottom-2 sm:bottom-2 text-[6rem] sm:text-[9rem] md:text-[13rem] font-black leading-none text-white/5">
                  {project.number}
                </span>
              </div>
            )}

            <div className="absolute left-4 sm:left-6 bottom-3 sm:bottom-6 right-4 sm:right-6 flex flex-wrap items-end justify-between gap-3">
              <p className="text-sm text-white/70 max-w-md hidden md:block">
                {sentences[0]}.
              </p>
              <span className="text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                Open case study →
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
