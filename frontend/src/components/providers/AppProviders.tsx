"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { registerGSAP } from "@/lib/gsap-config";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FilmEffects } from "@/components/effects/FilmEffects";
import { DustParticles } from "@/components/effects/DustParticles";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGSAP();

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
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
