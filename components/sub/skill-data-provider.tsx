"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

type SkillDataProviderProps = {
  src: string;
  name: string;
  width: number;
  height: number;
  index: number;
};

export const SkillDataProvider = ({
  src,
  name,
  width,
  height,
  index,
}: SkillDataProviderProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.1;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * animationDelay }}
      className="relative group"
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Creative Card Background with Gradient Effects */}
      <div className="relative bg-gradient-to-br from-white/20 via-white/15 to-white/8 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-2xl hover:shadow-4xl transition-all duration-500 w-32 h-32 flex items-center justify-center overflow-hidden">
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-pink-600/10 to-cyan-600/15 rounded-3xl opacity-0 group-hover:opacity-30 transition-all duration-700" />
        
        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-purple-400/60 rounded-tl-lg"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-pink-400/60 rounded-tr-lg"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-lg"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-purple-400/60 rounded-br-lg"></div>
        
        {/* Floating Particles */}
        <motion.div
          className="absolute top-1 right-1 w-1 h-1 bg-purple-400 rounded-full"
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1 left-1 w-1 h-1 bg-cyan-400 rounded-full"
          animate={{
            y: [0, -6, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Skill Icon Container */}
        <motion.div 
          className="relative z-10"
          whileHover={{ 
            scale: 1.15,
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          {/* Special Styling for Different Skill Types */}
          {name.includes('SQL Server') || name.includes('SQL') || name.includes('DBMS') ? (
            // Database Skills - Special Treatment
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-sm"></div>
              <Image 
                src={src} 
                width={85} 
                height={85} 
                alt={name}
                className="relative z-10 object-contain filter brightness-110 contrast-120 drop-shadow-xl"
                style={{
                  filter: 'drop-shadow(0 8px 25px rgba(59, 130, 246, 0.5)) brightness(1.15) contrast(1.2)'
                }}
              />
              {/* Database Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 30px rgba(147, 51, 234, 0.4)",
                    "0 0 20px rgba(236, 72, 153, 0.3)",
                    "0 0 20px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          ) : name.includes('.NET') || name.includes('C#') || name.includes('Git') || name.includes('GitHub') ? (
            // Programming Skills - Clean Professional Look
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/15 to-emerald-600/15 rounded-2xl blur-sm"></div>
              <Image 
                src={src} 
                width={85} 
                height={85} 
                alt={name}
                className="relative z-10 object-contain filter brightness-115 contrast-115 drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 6px 20px rgba(34, 197, 94, 0.4)) brightness(1.2) contrast(1.15)'
                }}
              />
              {/* Code Pulse Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-green-400/30"
                animate={{
                  borderColor: [
                    "rgba(34, 197, 94, 0.3)",
                    "rgba(16, 185, 129, 0.5)",
                    "rgba(34, 197, 94, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          ) : name.includes('React') || name.includes('Next') || name.includes('TypeScript') || name.includes('JavaScript') ? (
            // Frontend Skills - Modern Tech Look
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/15 to-blue-600/15 rounded-2xl blur-sm"></div>
              <Image 
                src={src} 
                width={85} 
                height={85} 
                alt={name}
                className="relative z-10 object-contain filter brightness-120 contrast-110 drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 6px 20px rgba(6, 182, 212, 0.4)) brightness(1.2) contrast(1.1)'
                }}
              />
              {/* Tech Wave Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  background: [
                    "linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.2) 50%, transparent 70%)",
                    "linear-gradient(45deg, transparent 30%, rgba(34, 211, 238, 0.2) 50%, transparent 70%)",
                    "linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)",
                    "linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.2) 50%, transparent 70%)"
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          ) : name.includes('Node') || name.includes('Express') || name.includes('Firebase') || name.includes('API') ? (
            // Backend Skills - Server/Cloud Look
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/15 to-red-600/15 rounded-2xl blur-sm"></div>
              <Image 
                src={src} 
                width={85} 
                height={85} 
                alt={name}
                className="relative z-10 object-contain filter brightness-115 contrast-110 drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 6px 20px rgba(251, 146, 60, 0.4)) brightness(1.15) contrast(1.1)'
                }}
              />
              {/* Server Pulse Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-orange-400/30"
                animate={{
                  borderWidth: ["2px", "4px", "2px"],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          ) : name.includes('Figma') || name.includes('Tailwind') || name.includes('HTML') || name.includes('CSS') ? (
            // Design Skills - Creative Look
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/15 to-purple-600/15 rounded-2xl blur-sm"></div>
              <Image 
                src={src} 
                width={85} 
                height={85} 
                alt={name}
                className="relative z-10 object-contain filter brightness-125 contrast-105 drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 6px 20px rgba(236, 72, 153, 0.4)) brightness(1.25) contrast(1.05)'
                }}
              />
              {/* Creative Sparkle Effect */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${20 + (i * 20)}%`,
                    left: `${10 + (i * 30)}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2 + (i * 0.5),
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          ) : (
            // Default/Other Skills - Standard Professional Look
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600/15 to-slate-600/15 rounded-2xl blur-sm"></div>
              <Image 
                src={src} 
                width={85} 
                height={85} 
                alt={name}
                className="relative z-10 object-contain filter brightness-110 contrast-110 drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 6px 20px rgba(107, 114, 128, 0.4)) brightness(1.1) contrast(1.1)'
                }}
              />
              {/* Subtle Glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          )}
        </motion.div>

        {/* Skill Name Badge */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: "rgba(147, 51, 234, 0.9)"
          }}
        >
          {name.length > 12 ? name.substring(0, 10) + '...' : name}
        </motion.div>
      </div>
    </motion.div>
  );
};
