"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { registerGSAP, ScrollTrigger } from "@/lib/gsap-config";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FilmEffects } from "@/components/effects/FilmEffects";
import { DustParticles } from "@/components/effects/DustParticles";

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGSAP();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <FilmEffects />
      <DustParticles />
      <CustomCursor />
      {children}
    </>
  );
}
