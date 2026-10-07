"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

import { Magnetic } from "@/components/sub/magnetic";
import { SplitText } from "@/components/sub/split-text";
import { LINKS } from "@/constants";
import { useMediaQuery, useReducedMotionQuery } from "@/lib/use-media";
import { useScrollProgress } from "@/lib/use-scroll-progress";

const experienceData = [
  {
    title: "Software Developer",
    company: "Apptad Inc.",
    period: "Dec 2025 – Present",
    description: "Working on Survey Management System for National Productivity Council (Government of India). Developing scalable full-stack applications using .NET Core, React.js, and SQL Server. Designing and integrating RESTful APIs for dynamic data handling. Implementing role-based authentication and improving system performance.",
    technologies: [".NET Core", "React.js", "SQL Server", "REST APIs", "Authentication"],
    icon: "🚀",
    color: "from-purple-600 to-pink-600",
  },
  {
    title: "Full Stack Developer",
    company: "Shuk Global Pvt. Ltd.",
    period: "May 2024 – Dec 2025",
    description: "Developed CustOs Admin & Agent Application using C#, WPF, .NET Core, and SQL Server. Built backend services and REST APIs for seamless integration. Implemented role-based access control and optimized database performance.",
    technologies: ["C#", "WPF", ".NET Core", "SQL Server", "REST APIs"],
    icon: "💻",
    color: "from-blue-600 to-cyan-600",
  },
];

type Exp = (typeof experienceData)[number];

const Chip = ({
  label,
  progress,
  start,
}: {
  label: string;
  progress?: MotionValue<number>;
  start?: number;
}) => {
  // In pinned mode each chip is revealed by scroll progress, one after another.
  const fallback = useTransform(() => 1);
  const opacity = useTransform(progress ?? fallback, [start ?? 0, (start ?? 0) + 0.05], [0, 1]);
  const y = useTransform(progress ?? fallback, [start ?? 0, (start ?? 0) + 0.05], [10, 0]);
  return (
    <motion.span
      style={progress ? { opacity, y } : undefined}
      className="px-3 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20"
    >
      {label}
    </motion.span>
  );
};

const Card = ({
  exp,
  progress,
  chipStart,
}: {
  exp: Exp;
  progress?: MotionValue<number>;
  chipStart?: number;
}) => (
  <div className={`relative bg-gradient-to-br ${exp.color} p-px rounded-2xl shadow-2xl`}>
    <div className="bg-black/90 rounded-2xl p-6 md:p-8 border border-white/10 h-full">
      <div className="flex items-center mb-5">
        <span className="text-4xl mr-4" aria-hidden="true">{exp.icon}</span>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{exp.title}</h3>
          <p className="text-base md:text-lg text-purple-300">{exp.company}</p>
        </div>
      </div>
      <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-600/50 to-cyan-600/50 text-white rounded-full border border-white/20 text-sm mb-4">
        {exp.period}
      </span>
      <p className="text-gray-300 text-sm md:text-base mb-5">{exp.description}</p>
      <div className="flex flex-wrap gap-2">
        {exp.technologies.map((t, i) => (
          <Chip
            key={t}
            label={t}
            progress={progress}
            start={chipStart !== undefined ? chipStart + i * 0.025 : undefined}
          />
        ))}
      </div>
    </div>
  </div>
);

const Heading = () => (
  <div className="text-center mb-10 md:mb-14">
    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
      <SplitText text="Professional" inView className="block" />
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500">
        <SplitText text="Experience" inView delay={0.15} />
      </span>
    </h2>
    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
      My journey building innovative solutions that make a difference
    </p>
  </div>
);

const ResumeButton = () => (
  <Magnetic>
    <a
      href={LINKS.resume}
      download="Abhay_Saklani_Resume.pdf"
      className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold rounded-full shadow-xl text-lg"
    >
      Download Resume
      <svg className="w-5 h-5 ml-3 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" />
      </svg>
    </a>
  </Magnetic>
);

/** Desktop: pinned, scroll-scrubbed timeline. */
const PinnedTimeline = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(wrap, ["start start", "end end"]);

  const line = useTransform(p, [0.05, 0.85], [0, 1]);
  const o0 = useTransform(p, [0.08, 0.28], [0, 1]);
  const y0 = useTransform(p, [0.08, 0.28], [60, 0]);
  const o1 = useTransform(p, [0.45, 0.65], [0, 1]);
  const y1 = useTransform(p, [0.45, 0.65], [60, 0]);
  const dot0 = useTransform(p, [0.08, 0.14], [0.4, 1]);
  const dot1 = useTransform(p, [0.45, 0.51], [0.4, 1]);
  const cta = useTransform(p, [0.8, 0.92], [0, 1]);
  const ctaY = useTransform(p, [0.8, 0.92], [24, 0]);

  const items = [
    { o: o0, y: y0, dot: dot0, chipStart: 0.2 },
    { o: o1, y: y1, dot: dot1, chipStart: 0.57 },
  ];

  return (
    <div ref={wrap} style={{ height: "260vh" }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-6xl w-full mx-auto px-6">
          <Heading />

          {/* Progress line */}
          <div className="relative h-px bg-white/15 mb-10">
            <motion.div
              style={{ scaleX: line }}
              className="absolute inset-0 origin-left bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 h-[2px] -top-px"
            />
            {items.map((it, i) => (
              <motion.span
                key={i}
                style={{ scale: it.dot, opacity: it.dot, left: i === 0 ? "25%" : "75%" }}
                className="absolute -top-[7px] w-4 h-4 -ml-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 border-2 border-black"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8">
            {experienceData.map((exp, i) => (
              <motion.div key={exp.company} style={{ opacity: items[i].o, y: items[i].y }}>
                <Card exp={exp} progress={p} chipStart={items[i].chipStart} />
              </motion.div>
            ))}
          </div>

          <motion.div style={{ opacity: cta, y: ctaY }} className="text-center mt-10">
            <ResumeButton />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/** Mobile / reduced motion: simple stacked timeline, content always readable. */
const StackedTimeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useScrollProgress(ref, ["start 80%", "end 60%"]);
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <Heading />
      <div ref={ref} className="relative pl-6">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/15" />
        <motion.div
          style={{ scaleY: line }}
          className="absolute left-0 top-0 bottom-0 w-[2px] -ml-px origin-top bg-gradient-to-b from-purple-500 to-cyan-400"
        />
        <div className="space-y-10">
          {experienceData.map((exp) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <span className="absolute -left-[31px] top-6 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 border-2 border-black" />
              <Card exp={exp} />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="text-center mt-12">
        <ResumeButton />
      </div>
    </div>
  );
};

export const Experience = () => {
  const desktop = useMediaQuery("(min-width: 768px) and (min-height: 640px)");
  const reduced = useReducedMotionQuery();
  const pinned = desktop && !reduced;

  return (
    <section id="experience" aria-label="Professional experience" className="relative w-full">
      <div className="absolute inset-0 -z-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />
      {pinned ? <PinnedTimeline /> : <StackedTimeline />}
    </section>
  );
};
