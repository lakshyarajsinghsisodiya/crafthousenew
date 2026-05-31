"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, scrollReveal, onScrollSystemReady, ScrollTrigger } from "@/lib/gsap-config";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import type { ProcessStep } from "@/lib/api";

interface ProcessProps {
  steps: ProcessStep[];
}

export function Process({ steps }: ProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track || !progress) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const scrollWidth = track.scrollWidth - window.innerWidth;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
      tl.to(track, { x: -scrollWidth, ease: "none" });
      tl.to(progress, { scaleX: 1, ease: "none" }, 0);
    });

    mm.add("(max-width: 767px)", () => {
      scrollReveal(".process-step", section, {
        x: 30,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        start: "top 82%",
      });
    });

    onScrollSystemReady(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, [steps]);

  return (
    <section ref={sectionRef} id="process" className="relative overflow-hidden">
      <div className="section-padding py-24 md:py-0 md:pt-32">
        <EditorialHeading lines={["HOW", "WE", "WORK"]} className="mb-12 md:mb-16" />
      </div>

      <div
        ref={progressRef}
        className="mx-auto mb-8 hidden h-px w-[calc(100%-4rem)] origin-left scale-x-0 bg-[#B72A2A] md:block"
        style={{ maxWidth: "calc(100% - 10rem)" }}
      />

      <div
        ref={trackRef}
        className="flex flex-col gap-12 section-padding pb-24 md:w-max md:flex-row md:gap-0 md:pb-32 md:pr-[50vw]"
      >
        {steps.map((step) => (
          <div
            key={step.step}
            className="process-step w-full shrink-0 border-t border-[rgba(255,255,255,0.1)] pt-8 md:w-[70vw] md:border-t-0 md:border-l md:px-12 md:pt-0 lg:w-[50vw]"
          >
            <span className="editorial-heading text-6xl text-[#B72A2A]/30 md:text-8xl">
              {step.step}
            </span>
            <h3 className="editorial-heading mt-4 text-3xl text-[#F5F5F5] md:text-4xl">
              {step.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[rgba(255,255,255,0.6)] md:text-base">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
