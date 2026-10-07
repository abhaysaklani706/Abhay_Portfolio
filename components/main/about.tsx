"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";

import { CountUp } from "@/components/sub/count-up";
import { Magnetic } from "@/components/sub/magnetic";
import { SpotlightCard } from "@/components/sub/spotlight-card";
import { CERTIFICATIONS, EDUCATION, LINKS } from "@/constants";
import { useMediaQuery, useReducedMotionQuery } from "@/lib/use-media";
import { useScrollProgress } from "@/lib/use-scroll-progress";

const PARAGRAPHS = [
  "I'm a Software Developer experienced in building scalable full-stack applications using React.js, .NET Core, ASP.NET Core, and SQL Server. Skilled in REST API development, database design, authentication systems, and delivering user-centric solutions.",
  "My focus is on performance optimization, secure architecture, and maintainable code practices. I am dedicated to pushing the boundaries of innovation by optimizing builds and reducing load times.",
];

const CORE_STACK = [
  { name: "React", icon: "/skills/react.png" },
  { name: ".NET", icon: "/skills/dotnet.png" },
  { name: "Node.js", icon: "/skills/node.png" },
  { name: "TypeScript" },
  { name: "SQL", icon: "/skills/sql.png.png" },
  { name: "Tailwind", icon: "/skills/tailwind.png" },
  { name: "JavaScript", icon: "/skills/js.png" },
  { name: "Git", icon: "/skills/git.svg" },
];

const STATS = [
  { value: 5, suffix: "+", label: "Projects" },
  { value: 15, suffix: "+", label: "Skills" },
  { value: 2, suffix: "Y+", label: "Experience" },
];

const CHAPTERS = ["Who I am", "What I focus on", "What I build with"];

const ALL_WORDS = PARAGRAPHS.flatMap((p, pi) =>
  p.split(" ").map((w) => ({ w, pi }))
);

/** One word that lights up as scroll progress passes it. */
const Word = ({
  word,
  index,
  total,
  p,
}: {
  word: string;
  index: number;
  total: number;
  p: MotionValue<number>;
}) => {
  const start = 0.06 + (index / total) * 0.56;
  const opacity = useTransform(p, [start, start + 0.05], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
      {word}
    </motion.span>
  );
};

const ScrubStat = ({
  value,
  suffix,
  label,
  p,
}: {
  value: number;
  suffix: string;
  label: string;
  p: MotionValue<number>;
}) => {
  const n = useTransform(p, [0.82, 0.96], [0, value], { clamp: true });
  const rounded = useTransform(n, (v) => Math.round(v));
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </div>
  );
};

const Chip = ({
  t,
  i,
  p,
}: {
  t: (typeof CORE_STACK)[number];
  i: number;
  p: MotionValue<number>;
}) => {
  const s = 0.64 + i * 0.016;
  const opacity = useTransform(p, [s, s + 0.04], [0, 1]);
  const y = useTransform(p, [s, s + 0.04], [14, 0]);
  return (
    <motion.li
      style={{ opacity, y }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-white bg-white/5 border border-purple-400/30"
    >
      {t.icon && <Image src={t.icon} alt="" width={16} height={16} className="w-4 h-4 object-contain" />}
      {t.name}
    </motion.li>
  );
};

const Photo = ({ p }: { p?: MotionValue<number> }) => {
  const fallback = useTransform(() => 1);
  const prog = p ?? fallback;
  const scale = useTransform(prog, [0, 0.35], [0.72, 1]);
  const radius = useTransform(prog, [0, 0.35], [999, 40]);
  const gray = useTransform(prog, [0, 0.4], [1, 0]);
  const filter = useTransform(gray, (g) => `grayscale(${g})`);
  const ring = useTransform(prog, [0, 1], [0, 420]);

  return (
    <div className="relative w-72 h-80 sm:w-80 sm:h-96 mx-auto">
      {/* Gradient halo rotated directly by scroll */}
      <motion.div
        aria-hidden="true"
        style={{
          rotate: p ? ring : 0,
          background: "conic-gradient(from 0deg, #a855f7, #ec4899, #22d3ee, #a855f7)",
        }}
        className="absolute -inset-3 rounded-[48px] opacity-60 blur-md"
      />
      <motion.div
        style={p ? { scale, borderRadius: radius } : { borderRadius: 40 }}
        className="relative w-full h-full overflow-hidden border border-white/15 bg-gray-900"
      >
        <motion.div style={p ? { filter } : undefined} className="w-full h-full">
          <Image
            src="/skills/Abhayphoto.PNG"
            alt="Abhay Saklani"
            width={420}
            height={520}
            priority={false}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

/** Desktop: pinned, scroll-scrubbed story. */
const PinnedStory = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(wrap, ["start start", "end end"]);

  const c0 = useTransform(p, [0, 0.05, 0.3, 0.38], [0, 1, 1, 0]);
  const c1 = useTransform(p, [0.3, 0.38, 0.56, 0.64], [0, 1, 1, 0]);
  const c2 = useTransform(p, [0.58, 0.66, 0.98, 1], [0, 1, 1, 1]);
  const chapter = [c0, c1, c2];
  const bar = useTransform(p, [0, 1], [0, 1]);
  const stats = useTransform(p, [0.8, 0.88], [0, 1]);
  const total = ALL_WORDS.length;

  return (
    <div ref={wrap} style={{ height: "320vh" }} className="relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-12 gap-10 items-center">
          <div className="col-span-5">
            <Photo p={p} />
            <div className="mt-8 h-[2px] bg-white/10 rounded-full overflow-hidden max-w-xs mx-auto">
              <motion.div
                style={{ scaleX: bar }}
                className="h-full origin-left bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"
              />
            </div>
          </div>

          <div className="col-span-7">
            <div className="relative h-6 mb-4">
              {CHAPTERS.map((c, i) => (
                <motion.p
                  key={c}
                  style={{ opacity: chapter[i] }}
                  className="absolute inset-0 text-xs uppercase tracking-[0.3em] text-cyan-300"
                >
                  0{i + 1} · {c}
                </motion.p>
              ))}
            </div>

            <h2 className="sr-only">About Abhay Saklani</h2>
            <p className="text-white text-xl lg:text-[26px] font-semibold leading-snug" aria-label={PARAGRAPHS.join(" ")}>
              <span aria-hidden="true">
                {ALL_WORDS.map((x, i) => (
                  <span key={i}>
                    {i > 0 && x.pi !== ALL_WORDS[i - 1].pi && <span className="block h-4" />}
                    <Word word={x.w} index={i} total={total} p={p} />
                  </span>
                ))}
              </span>
            </p>

            <ul className="flex flex-wrap gap-2 mt-8">
              {CORE_STACK.map((t, i) => (
                <Chip key={t.name} t={t} i={i} p={p} />
              ))}
            </ul>

            <motion.div style={{ opacity: stats }} className="grid grid-cols-3 gap-6 mt-8 max-w-md">
              {STATS.map((s) => (
                <ScrubStat key={s.label} {...s} p={p} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Mobile / reduced motion: everything readable, no pinning. */
const StaticStory = () => (
  <div className="max-w-3xl mx-auto px-6 py-20 space-y-8">
    <Photo />
    <h2 className="text-3xl font-bold text-white text-center">About Abhay Saklani</h2>
    {PARAGRAPHS.map((t) => (
      <p key={t} className="text-gray-200 text-lg leading-relaxed">
        {t}
      </p>
    ))}
    <ul className="flex flex-wrap gap-2 justify-center">
      {CORE_STACK.map((t) => (
        <li key={t.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-white bg-white/5 border border-purple-400/30">
          {t.icon && <Image src={t.icon} alt="" width={16} height={16} className="w-4 h-4 object-contain" />}
          {t.name}
        </li>
      ))}
    </ul>
    <div className="grid grid-cols-3 gap-6">
      {STATS.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            <CountUp to={s.value} suffix={s.suffix} />
          </div>
          <div className="text-gray-400 text-sm mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export const About = () => {
  const desktop = useMediaQuery("(min-width: 1024px) and (min-height: 700px)");
  const reduced = useReducedMotionQuery();
  const pinned = desktop && !reduced;

  const [showConnectOptions, setShowConnectOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click / Escape.
  useEffect(() => {
    if (!showConnectOptions) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setShowConnectOptions(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowConnectOptions(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [showConnectOptions]);

  return (
    <section id="about" aria-label="About" className="relative w-full">
      {pinned ? <PinnedStory /> : <StaticStory />}

      {/* Education, certifications and contact actions */}
      <div className="max-w-6xl mx-auto px-6 pb-24 pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        <SpotlightCard>
          <h3 className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-4">Education</h3>
          <ol className="relative space-y-5 pl-5 border-l border-white/15">
            {EDUCATION.map((e) => (
              <li key={e.degree} className="relative">
                <span className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 border-2 border-[#030014]" />
                <p className="text-white font-semibold">{e.degree}</p>
                <p className="text-gray-400 text-sm">
                  {e.institution}, {e.location}
                </p>
                <p className="text-sm mt-1">
                  <span className="text-purple-300">{e.period}</span>
                  <span className="text-gray-500"> · </span>
                  <span className="text-cyan-300">CGPA {e.cgpa}</span>
                </p>
              </li>
            ))}
          </ol>
        </SpotlightCard>

        <SpotlightCard delay={0.1}>
          <h3 className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-4">Certifications</h3>
          <ul className="space-y-3">
            {CERTIFICATIONS.map((c) => (
              <li
                key={c.title}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <div>
                  <p className="text-white font-medium">{c.title}</p>
                  <p className="text-gray-400 text-sm">{c.issuer}</p>
                </div>
                <span className="text-xs text-purple-300 shrink-0">{c.year}</span>
              </li>
            ))}
          </ul>
        </SpotlightCard>

        <SpotlightCard className="md:col-span-2" delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-2xl font-bold text-white">Let&apos;s work together</p>
              <p className="text-gray-400">Available for Freelance &amp; Part-time opportunities.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 relative">
              <div className="relative" ref={menuRef}>
                <Magnetic>
                  <button
                    onClick={() => setShowConnectOptions(!showConnectOptions)}
                    aria-expanded={showConnectOptions}
                    aria-haspopup="true"
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-center font-semibold rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-colors"
                  >
                    Let&apos;s Connect
                  </button>
                </Magnetic>

                {showConnectOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-2 md:right-0 w-72 bg-[#0b0620] border border-purple-500/30 rounded-lg shadow-xl overflow-hidden z-50 left-0"
                  >
                    <a
                      href="mailto:abhaysaklani706@gmail.com"
                      className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors border-b border-white/10 text-sm"
                    >
                      <FaEnvelope className="text-purple-300" aria-hidden="true" /> abhaysaklani706@gmail.com
                    </a>
                    <a
                      href="https://wa.me/917060470801"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors text-sm"
                    >
                      <FaWhatsapp className="text-green-400" aria-hidden="true" /> +91 7060470801
                    </a>
                  </motion.div>
                )}
              </div>
              <Magnetic>
                <a
                  href={LINKS.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto px-6 py-3 button-primary border border-[#7042f88b] text-white text-center font-semibold rounded-lg"
                >
                  Download Resume
                </a>
              </Magnetic>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
