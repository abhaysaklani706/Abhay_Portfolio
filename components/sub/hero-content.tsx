"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Magnetic } from "@/components/sub/magnetic";
import { SplitText } from "@/components/sub/split-text";
import { LINKS } from "@/constants";
import { useMediaQuery, useReducedMotionQuery } from "@/lib/use-media";

const HeroOrb = dynamic(() => import("@/components/sub/hero-orb"), { ssr: false });

// Roles that match the portfolio's real experience.
const ROLES = [
  ".NET Core Developer",
  "React Developer",
  "Full Stack Developer",
  "API Developer",
];

export const HeroContent = () => {
  const [role, setRole] = useState(0);
  const [visible, setVisible] = useState(true);
  const visualRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduced = useReducedMotionQuery();
  const show3D = isDesktop && !reduced;

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  // Only render the 3D scene while it is on screen.
  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20 mt-28 md:mt-40 w-full z-[20]">
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" aria-hidden="true" />
          <p className="Welcome-text text-[13px]">Abhay Saklani | Software Developer</p>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-[640px] leading-tight mt-4">
          <SplitText text="Hi, I'm" delay={0.15} />{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            <SplitText text="Abhay Saklani" delay={0.3} />
          </span>
        </h1>

        <div className="h-9 text-xl sm:text-2xl font-medium text-cyan-300" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.span
              key={role}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-block"
            >
              {ROLES[role]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-base sm:text-lg text-gray-400 my-3 max-w-[600px]"
        >
          Software Developer experienced in building scalable full-stack applications using React.js, .NET Core, ASP.NET Core, and SQL Server.
          Focused on performance optimization, secure architecture, and maintainable code practices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-wrap gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              className="inline-block py-3 px-7 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-colors"
            >
              View my work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 px-7 button-primary text-white rounded-lg border border-[#7042f88b]"
            >
              Resume
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        ref={visualRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full flex justify-center items-center mt-12 md:mt-0 h-[320px] md:h-[520px]"
      >
        {show3D ? (
          <div className="w-full h-full" aria-hidden="true">
            <HeroOrb active={visible} />
          </div>
        ) : (
          <Image
            src="/hero-bg.svg"
            alt=""
            height={650}
            width={650}
            draggable={false}
            className="select-none max-h-full w-auto"
          />
        )}
      </motion.div>
    </div>
  );
};
