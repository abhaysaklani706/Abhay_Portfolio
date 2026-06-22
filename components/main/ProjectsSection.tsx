"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { useMemo } from "react";

const projectsData = [
  {
    id: 1,
    number: "01",
    category: "Operations Management",
    name: "CustOs – Operations Management System",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&q=85",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&q=85",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1280&q=85",
    ],
    liveUrl: "https://github.com/abhaysaklani706",
    technologies: ["C#", "WPF", ".NET Core", "SQL Server", "REST APIs"],
    description: "Developed Admin and Agent system to manage customer records and operational workflows. Built .NET Core REST APIs and implemented authentication with role-based authorization. Designed optimized SQL Server databases with layered architecture for maintainability."
  },
  {
    id: 2,
    number: "02",
    category: "Web Application",
    name: "BharatByte – IIT Delhi",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&q=85",
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1280&q=85",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1280&q=85",
    ],
    liveUrl: "https://bharatbyte-aic-iitd.com/",
    technologies: ["React.js", "Node.js", "Express", "Vite"],
    description: "Built responsive frontend using React.js and Vite with reusable components. Developed backend APIs using Node.js and Express for dynamic content management. Improved application performance through optimized builds and responsive design."
  },
  {
    id: 3,
    number: "03",
    category: "Platform",
    name: "Survey Management System – National Productivity Council",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1280&q=85",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1280&q=85",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280&q=85",
    ],
    liveUrl: "https://github.com/abhaysaklani706",
    technologies: [".NET Core", "WPF", "SQL Server", "JWT", "REST APIs"],
    description: "Developed survey automation platform with multi-role access and JWT authentication. Built Admin desktop interface and scalable Web APIs for survey configuration. Implemented analytics dashboards and optimized database performance."
  },
  {
    id: 4,
    number: "04",
    category: "Web Portal",
    name: "NCIIPC AI Grand Challenge Portal – NTRO",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1280&q=85",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&q=85",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1280&q=85",
    ],
    liveUrl: "https://github.com/abhaysaklani706",
    technologies: ["React.js", "Vite", "JavaScript", "HTML5", "CSS3"],
    description: "Contributed to AI challenge portal development under NTRO initiative. Built responsive interfaces and structured layouts using React.js and Vite. Ensured accessibility, scalability, and smooth user experience across devices."
  },
  {
    id: 5,
    number: "05",
    category: "Management System",
    name: "RMS – Resource Management System",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&q=85",
      "https://images.unsplash.com/photo-1553484771-371a605b060b?w=1280&q=85",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=1280&q=85",
    ],
    liveUrl: "https://github.com/abhaysaklani706",
    technologies: ["C#", "ASP.NET Core", "SQL Server", "REST APIs"],
    description: "Designed and developed resource management platform with CRUD functionality. Implemented REST APIs and role-based access control mechanisms. Optimized SQL Server schemas for secure and efficient data retrieval."
  },
];

export const ProjectsSection = () => {
  const projects = useMemo(() => projectsData, []);

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
          <h1
            className="font-black uppercase tracking-tight"
            style={{
              fontFamily: "Kanit, sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              background: "linear-gradient(180deg, #646973 0%, #BBCCD7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Project
          </h1>
        </motion.div>

        {/* Stacked Project Cards */}
        <div className="relative">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
