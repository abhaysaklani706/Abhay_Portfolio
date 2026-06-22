"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type LiveProjectButtonProps = {
  url: string;
};

export const LiveProjectButton = ({ url }: LiveProjectButtonProps) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      <motion.button
        whileHover={{ 
          backgroundColor: "rgba(215, 226, 234, 0.1)",
          scale: 1.05
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          duration: 0.2, 
          ease: "easeOut"
        }}
        className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-[#D7E2EA] bg-transparent text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base hover:text-white transition-all duration-300 ease-out"
      >
        Live Project
      </motion.button>
    </Link>
  );
};
