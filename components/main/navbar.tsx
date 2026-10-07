'use client';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";

const SECTION_IDS = NAV_LINKS.map((l) => l.link.slice(1));

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>(SECTION_IDS[0]);
  const lastY = useRef(0);
  const menuOpen = useRef(false);
  menuOpen.current = isMobileMenuOpen;

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(y > 120 && delta > 0 && !menuOpen.current);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section crossing the middle of the viewport.
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 backdrop-blur-md z-50 px-4 sm:px-10 transition-transform duration-500 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link href="#hero" className="flex items-center" aria-label="Abhay Saklani – back to top">
          <Image
            src="/logo.png"
            alt=""
            width={70}
            height={70}
            draggable={false}
            loading="eager"
            className="cursor-pointer"
          />
          <div className="hidden sm:flex font-bold ml-[10px] text-sm sm:text-base text-gray-300">ABHAY SAKLANI</div>
        </Link>

        {/* Web Navbar */}
        <nav aria-label="Primary" className="hidden xl:flex w-[560px] 2xl:w-[600px] h-full flex-row items-center justify-between xl:mr-20">
          <div className="flex items-center justify-between w-full h-auto bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 mr-[15px] px-[25px] py-[12px] rounded-full border border-white/20 shadow-xl">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.link.slice(1);
              return (
                <Link
                  key={link.title}
                  href={link.link}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative cursor-pointer hover:text-white transition-colors duration-300 font-medium ${
                    isActive ? "text-white" : "text-gray-300"
                  }`}
                >
                  {link.title}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Social Icons (Web) */}
        <div className="hidden xl:flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
              aria-label={name}
            >
              <Icon className="h-6 w-6 text-white" />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu */}
        <button
          className="xl:hidden text-white focus:outline-none text-3xl w-11 h-11 flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav
          aria-label="Mobile"
          className="absolute top-[65px] left-0 w-full p-5 pb-8 flex flex-col items-center text-gray-300 xl:hidden bg-[#030014] border-b border-purple-500/20 shadow-xl shadow-[#2A0E61]/40 max-h-[calc(100vh-65px)] overflow-y-auto"
        >
          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className={`cursor-pointer hover:text-[rgb(112,66,248)] transition text-center ${
                  active === link.link.slice(1) ? "text-white font-semibold" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Source Code
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
                aria-label={name}
              >
                <Icon className="h-8 w-8 text-white" />
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
