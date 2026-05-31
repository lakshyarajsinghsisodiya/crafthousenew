"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#packages", label: "Packages" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = links.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    sections.forEach((s) => s && observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[9000] transition-all duration-500 ${
          scrolled ? "nav-blur py-3" : "bg-transparent py-5 md:py-6"
        }`}
      >
        <nav className="section-padding flex items-center justify-between">
          <Link href="/" className="relative z-10 flex items-center gap-3" data-cursor="magnetic">
            <Image
              src="/logo.png"
              alt="Crafthouse Media"
              width={140}
              height={40}
              className="h-8 w-auto md:h-10"
              loading="eager"
              quality={80}
            />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`group relative text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                    active === link.href
                      ? "text-[#F5F5F5]"
                      : "text-[rgba(255,255,255,0.55)] hover:text-[#F5F5F5]"
                  }`}
                  data-cursor="magnetic"
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#B72A2A] transition-all duration-300 ${
                      active === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#book-call"
            className="btn-primary hidden text-[10px] md:inline-flex"
            data-cursor="magnetic"
          >
            Book a Call
          </a>

          <button
            type="button"
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`h-px w-6 bg-[#F5F5F5] transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-[#F5F5F5] transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-6 bg-[#F5F5F5] transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[8999] flex flex-col bg-[#090909]/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-8 section-padding pt-24">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMenuOpen(false)}
                  className="editorial-heading text-4xl text-[#B72A2A] sm:text-5xl"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#book-call"
                onClick={() => setMenuOpen(false)}
                className="btn-primary mt-4 w-fit"
              >
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
