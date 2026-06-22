"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export const About = () => {
  const [showConnectOptions, setShowConnectOptions] = useState(false);
  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 p-1">
                <div className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
                  <Image
                    src="/skills/Abhayphoto.PNG"
                    alt="Abhay Saklani"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl" />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Name and Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Abhay Saklani
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-300">
                Full Stack Developer
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                I'm a Software Developer experienced in building scalable full-stack applications using React.js, .NET Core, ASP.NET Core, and SQL Server. 
                Skilled in REST API development, database design, authentication systems, and delivering user-centric solutions.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My focus is on performance optimization, secure architecture, and maintainable code practices. I am dedicated to pushing the boundaries of innovation by optimizing builds and reducing load times.
              </p>
            </div>

            {/* Skills Progress Bars */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Skills</h3>
              <div className="space-y-4">
                {[
                  { name: 'React', level: 90 },
                  { name: '.NET', level: 85 },
                  { name: 'Node.js', level: 80 },
                  { name: 'TypeScript', level: 85 },
                  { name: 'SQL', level: 90 },
                  { name: 'Tailwind', level: 88 },
                  { name: 'JavaScript', level: 92 },
                  { name: 'Git', level: 85 },
                ].map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-gray-400 text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-gray-400 text-sm">Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2Y+</div>
                <div className="text-gray-400 text-sm">Experience</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 relative">
              <div className="relative">
                <button 
                  onClick={() => setShowConnectOptions(!showConnectOptions)}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Let's Connect
                </button>
                
                {showConnectOptions && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50 left-0"
                  >
                    <a 
                      href="mailto:abhaysaklani706@gmail.com" 
                      className="block px-4 py-3 text-white hover:bg-gray-700 transition-colors border-b border-gray-700 text-sm"
                    >
                      <span className="mr-2">📧</span> abhaysaklani706@gmail.com
                    </a>
                    <a 
                      href="https://wa.me/917060470801" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block px-4 py-3 text-white hover:bg-gray-700 transition-colors text-sm"
                    >
                      <span className="mr-2">💬</span> +91 7060470801
                    </a>
                  </motion.div>
                )}
              </div>
              <a href="/ABHAY_SOFTWARE_DEVELOPER (1).pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3 bg-gray-700 text-white text-center font-semibold rounded-lg hover:bg-gray-600 transition-colors">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
