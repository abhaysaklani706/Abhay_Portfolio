"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type LiveProjectButtonProps = {
  /** Only pass a URL that really exists. Without it a "private" badge is shown. */
  url?: string;
};

export const LiveProjectButton = ({ url }: LiveProjectButtonProps) => {
  if (!url) {
    return (
      <span
        className="inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-dashed border-[#D7E2EA]/40 text-[#D7E2EA]/60 font-medium uppercase tracking-widest text-xs sm:text-sm"
        title="This project is not publicly available"
      >
        Private project
      </span>
    );
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.span
        whileHover={{ backgroundColor: "rgba(215, 226, 234, 0.1)", scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-[#D7E2EA] bg-transparent text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base hover:text-white transition-colors duration-300 ease-out"
      >
        Live Project
      </motion.span>
    </Link>
  );
};
