"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP } from "@/lib/gsap-config";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const startVideo = () => setVideoReady(true);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(startVideo, { timeout: 1200 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(startVideo, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 120,
        duration: 1.4,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.3,
      });
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        delay: 0.9,
        ease: "power3.out",
      });
      gsap.to(".hero-video-wrap", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32"
    >
      <div className="hero-video-wrap absolute inset-0 z-0">
        <LazyVideo
          eager={videoReady}
          src="/media/videos/reel-05.mp4"
          poster="/media/photos/cafe-01.png"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/80 via-[#090909]/60 to-[#090909]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-transparent to-[#090909]/40" />
      </div>

      <div className="section-padding relative z-10">
        <p className="hero-fade mb-6 text-[10px] uppercase tracking-[0.35em] text-[rgba(255,255,255,0.5)] md:text-xs">
          Crafting stories that live beyond the screen.
        </p>

        <h1 className="editorial-heading editorial-display mb-8 max-w-[95vw] text-[#B72A2A] md:mb-12">
          {["CRAFTING", "DIGITAL", "EXPERIENCES"].map((line) => (
            <span key={line} className="hero-line text-mask-line block overflow-hidden">
              <span className="text-mask-inner block">{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-fade mb-10 max-w-xl text-sm leading-relaxed text-[rgba(255,255,255,0.65)] md:text-base md:leading-loose">
          Crafting stories that inspire,  connect,  leave a long lasting mark.
        </p>

        <div className="hero-fade flex flex-col gap-4 sm:flex-row sm:gap-6">
          <a href="#book-call" className="btn-primary" data-cursor="magnetic">
            Book a Discovery Call
          </a>
          <a href="#work" className="btn-ghost" data-cursor="magnetic">
            View Our Work
          </a>
        </div>
      </div>

      <div className="section-padding relative z-10 mt-16 hidden justify-between text-[10px] uppercase tracking-[0.25em] text-[rgba(255,255,255,0.35)] md:flex">
        <span>Content · Branding · Growth</span>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
