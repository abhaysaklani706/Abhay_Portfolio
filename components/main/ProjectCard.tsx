"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useMemo } from "react";
import { LiveProjectButton } from "./LiveProjectButton";

type ProjectCardProps = {
  project: {
    id: number;
    number: string;
    category: string;
    name: string;
    images: string[];
    liveUrl: string;
    technologies: string[];
    description: string;
  };
  index: number;
  totalCards: number;
};

export const ProjectCard = ({ project, index, totalCards }: ProjectCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate scale based on card position and scroll
  const targetScale = useMemo(() => 1 - (totalCards - 1 - index) * 0.03, [totalCards, index]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Optimized animation variants
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0 : 0.6, 
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: shouldReduceMotion ? 0 : index * 0.05
      }
    }
  }), [shouldReduceMotion, index]);

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
      className="sticky top-24 md:top-32 h-[85vh] mb-8"
    >
      <div className="h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md p-6 sm:p-8 md:p-10 overflow-hidden">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-10">
          <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-0">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#D7E2EA]/20">
              {project.number}
            </span>
            <div>
              <p className="text-sm sm:text-base text-[#D7E2EA]/60 uppercase tracking-wider mb-1">
                {project.category}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {project.name}
              </h2>
              <p className="text-sm sm:text-base text-[#D7E2EA]/80 mb-3 max-w-md">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-xs sm:text-sm bg-[#D7E2EA]/10 border border-[#D7E2EA]/30 rounded-full text-[#D7E2EA]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <LiveProjectButton url={project.liveUrl} />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 h-[calc(100%-120px)]">
          {/* Left Column - 2 stacked images */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
            <motion.div
              whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex-1 relative overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            >
              <Image
                src={project.images[0]}
                alt={`${project.name} - Image 1`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                loading="lazy"
                unoptimized
              />
            </motion.div>
            <motion.div
              whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex-1 relative overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            >
              <Image
                src={project.images[1]}
                alt={`${project.name} - Image 2`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                loading={index === 0 ? "eager" : "lazy"}
                unoptimized
              />
            </motion.div>
          </div>

          {/* Right Column - 1 tall image */}
          <div className="lg:col-span-3">
            <motion.div
              whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full relative overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            >
              <Image
                src={project.images[2]}
                alt={`${project.name} - Image 3`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                loading="lazy"
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
