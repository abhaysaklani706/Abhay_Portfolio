"use client";

import { motion } from "framer-motion";
import { slideInFromTop, slideInFromLeft, slideInFromRight } from "@/lib/motion";
import { LINKS } from "@/constants";
import { useState } from "react";
import emailjs from '@emailjs/browser';


export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("Sending your message...");

    try {
      // Using FormSubmit.co for zero-configuration email sending
      const response = await fetch("https://formsubmit.co/ajax/abhaysaklani706@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _subject: `New Portfolio Message: ${formData.subject}`
        })
      });

      if (response.ok) {
        setSubmitStatus("Thank you for your message!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("FormSubmit Error:", error);
      setSubmitStatus("Error sending message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Gradient and Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20">
        {/* Section Title */}
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            <span className="block">Get In</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-gradient">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <motion.div
            variants={slideInFromLeft(0.5)}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <span className="text-white">📧</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-gray-300">abhaysaklani706@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <span className="text-white">💼</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Available for</h3>
                    <p className="text-gray-300">Freelance & Part-time opportunities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/abhaysaklani706"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <span className="text-white">🔗</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/abhay-saklani-b23389217/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <span className="text-white">💼</span>
                </a>
                <a
                  href="https://instagram.com/abhaysa1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <span className="text-white">📸</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            variants={slideInFromRight(0.5)}
            initial="hidden"
            animate="visible"
          >
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Send me a message</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              
              {submitStatus && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-center ${
                    submitStatus.includes("Thank you") ? "text-green-400" : 
                    submitStatus.includes("Error") ? "text-red-400" : 
                    "text-blue-400"
                  }`}
                >
                  {submitStatus}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
