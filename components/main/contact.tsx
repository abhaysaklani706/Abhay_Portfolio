"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  FaBriefcase,
  FaCopy,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { Magnetic } from "@/components/sub/magnetic";
import { SplitText } from "@/components/sub/split-text";

const EMAIL = "abhaysaklani706@gmail.com";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/abhaysaklani706", Icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhay-saklani-b23389217/",
    Icon: FaLinkedinIn,
  },
  { label: "Instagram", href: "https://instagram.com/abhaysa1", Icon: FaInstagram },
];

const fieldClass =
  "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-colors";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard may be blocked; the address is still visible and selectable.
      return;
    }
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
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
      {/* Background (static glows — no infinite animation) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-pink-900/20" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-20 left-0 sm:left-10 w-40 h-40 sm:w-72 sm:h-72 bg-cyan-600/15 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-0 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-pink-600/15 rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <SplitText text="Let's build" inView className="block" />
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-gradient">
              <SplitText text="something together" inView delay={0.15} />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you!
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 sm:p-8 border border-white/20">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Let&apos;s Connect</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                I&apos;m always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 shrink-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-white" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold">Email</h4>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label={`Copy email address ${EMAIL}`}
                      className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-left text-[13px] sm:text-base [overflow-wrap:anywhere]"
                    >
                      {EMAIL}
                      <FaCopy className="shrink-0 opacity-60 group-hover:opacity-100" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 shrink-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <FaBriefcase className="text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Available for</h4>
                    <p className="text-gray-300">Freelance &amp; Part-time opportunities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-5 sm:p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <Magnetic key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <Icon className="text-white" aria-hidden="true" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 sm:p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>

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
                    className={fieldClass}
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
                    className={fieldClass}
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
                    className={fieldClass}
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
                    className={`${fieldClass} resize-none`}
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
                  role="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-center ${
                    submitStatus.includes("Thank you") ? "text-green-400" :
                    submitStatus.includes("Error") ? "text-red-400" :
                    "text-cyan-300"
                  }`}
                >
                  {submitStatus}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Copy confirmation toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] px-5 py-3 rounded-full bg-[#0b0620] border border-purple-400/40 text-white text-sm shadow-xl"
          >
            Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
