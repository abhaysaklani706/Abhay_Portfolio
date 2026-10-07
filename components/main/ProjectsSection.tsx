"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { LiveProjectButton } from "./LiveProjectButton";
import { ProjectCard, type Project } from "./ProjectCard";

// Project data is unchanged. Stock photos were removed, and `liveUrl` is only
// set where a real public URL exists (the other projects show "Private project").
const projectsData: Project[] = [
  {
    id: 1,
    number: "01",
    category: "Operations Management",
    name: "CustOs – Operations Management System",
    technologies: ["C#", "WPF", ".NET Core", "SQL Server", "REST APIs"],
    description: "Developed Admin and Agent system to manage customer records and operational workflows. Built .NET Core REST APIs and implemented authentication with role-based authorization. Designed optimized SQL Server databases with layered architecture for maintainability."
  },
  {
    id: 2,
    number: "02",
    category: "Web Application",
    name: "BharatByte – IIT Delhi",
    liveUrl: "https://bharatbyte-aic-iitd.com/",
    technologies: ["React.js", "Node.js", "Express", "Vite"],
    description: "Built responsive frontend using React.js and Vite with reusable components. Developed backend APIs using Node.js and Express for dynamic content management. Improved application performance through optimized builds and responsive design."
  },
  {
    id: 3,
    number: "03",
    category: "Platform",
    name: "Survey Management System – National Productivity Council",
    technologies: [".NET Core", "WPF", "SQL Server", "JWT", "REST APIs"],
    description: "Developed survey automation platform with multi-role access and JWT authentication. Built Admin desktop interface and scalable Web APIs for survey configuration. Implemented analytics dashboards and optimized database performance."
  },
  {
    id: 4,
    number: "04",
    category: "Web Portal",
    name: "NCIIPC AI Grand Challenge Portal – NTRO",
    technologies: ["React.js", "Vite", "JavaScript", "HTML5", "CSS3"],
    description: "Contributed to AI challenge portal development under NTRO initiative. Built responsive interfaces and structured layouts using React.js and Vite. Ensured accessibility, scalability, and smooth user experience across devices."
  },
  {
    id: 5,
    number: "05",
    category: "Management System",
    name: "RMS – Resource Management System",
    technologies: ["C#", "ASP.NET Core", "SQL Server", "REST APIs"],
    description: "Designed and developed resource management platform with CRUD functionality. Implemented REST APIs and role-based access control mechanisms. Optimized SQL Server schemas for secure and efficient data retrieval."
  },
];

/** Case study built only from the existing project fields. */
const CaseStudy = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const points = project.description
    .split(". ")
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] bg-black/80 overflow-y-auto overscroll-contain"
      data-lenis-prevent
      onClick={onClose}
    >
      <div className="min-h-full flex items-center justify-center p-4 sm:p-8">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-title"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl rounded-3xl border border-purple-400/30 bg-[#0b0620] p-6 sm:p-10 shadow-2xl"
        >
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close case study"
            className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            ✕
          </button>

          <p className="text-sm uppercase tracking-widest text-purple-300 mb-2">
            {project.number} · {project.category}
          </p>
          <h3 id="case-title" className="text-2xl sm:text-3xl font-bold text-white mb-6 pr-10">
            {project.name}
          </h3>

          <h4 className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-3">What I built</h4>
          <ul className="space-y-3 mb-8">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-gray-300">
                <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                {p}.
              </li>
            ))}
          </ul>

          <h4 className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-3">Technology</h4>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((t) => (
              <span key={t} className="px-3 py-1 text-sm text-white bg-white/10 border border-white/20 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <LiveProjectButton url={project.liveUrl} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const projects = useMemo(() => projectsData, []);
  const [open, setOpen] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="projects"
      className="relative -mt-8 sm:-mt-10 md:-mt-12 pt-16 sm:pt-20 md:pt-24 z-10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <h2
            className="font-black uppercase tracking-tight"
            style={{
              fontFamily: "var(--font-kanit), Kanit, sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              background: "linear-gradient(180deg, #646973 0%, #BBCCD7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Project
          </h2>
        </motion.div>

        {/* Stacked Project Cards */}
        <div className="relative">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projects.length}
              onOpen={setOpen}
            />
          ))}
        </div>
      </div>

      {/* Portal so the dialog sits above the fixed navbar */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && <CaseStudy project={open} onClose={() => setOpen(null)} />}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
