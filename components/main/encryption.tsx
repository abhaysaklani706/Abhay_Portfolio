"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { slideInFromTop } from "@/lib/motion";
import { LINKS } from "@/constants";
import { useState, useEffect } from "react";

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

export const Encryption = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Generate particles only on client side to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{left: number, top: number}>>([]);

  useEffect(() => {
    setIsClient(true);
    const generatedParticles = Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section id="encryption" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
        
        {/* Animated Particles */}
        {isClient && particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content with Parallax */}
      <motion.div style={{ y }} className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
        {/* Enhanced Title */}
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            <span className="block">Professional</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-gradient">
              Experience
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            🚀 My journey building innovative solutions that make a difference
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-cyan-600 rounded-full opacity-30" />
          
          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full border-4 border-black z-20"
                  whileHover={{ scale: 1.5 }}
                />
                
                {/* Experience Card */}
                <motion.div
                  className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <div className={`relative bg-gradient-to-br ${exp.color} p-1 rounded-2xl shadow-2xl`}>
                    <div className="bg-black/90 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                      <div className="flex items-center mb-6">
                        <motion.span 
                          className="text-4xl mr-4"
                          animate={{ rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0 }}
                        >
                          {exp.icon}
                        </motion.span>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                          <p className="text-lg text-purple-300 whitespace-nowrap">{exp.company}</p>
                        </div>
                      </div>
                      
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/50 to-cyan-600/50 text-white rounded-full border border-white/20 text-sm mb-4">
                        {exp.period}
                      </span>
                      
                      <p className="text-gray-300 mb-6">{exp.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20"
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <motion.div className="text-center mt-20">
          <motion.a
            href={LINKS.resume}
            download="Abhay_Saklani_Resume.pdf"
            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold rounded-full shadow-xl text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-3">📄</span>
            Download Resume
            <svg className="w-5 h-5 ml-3 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};
