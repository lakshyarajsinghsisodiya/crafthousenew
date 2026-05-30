"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap-config";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import type { Testimonial } from "@/lib/api";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const track = trackRef.current;
    if (!track) return;

    const scroll = gsap.to(track, {
      x: () => -(track.scrollWidth / 2),
      ease: "none",
      duration: 30,
      repeat: -1,
    });

    const onEnter = () => scroll.pause();
    const onLeave = () => scroll.play();
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);

    return () => {
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      scroll.kill();
    };
  }, [testimonials]);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative bg-[#111111] py-24 md:py-40">
      <div className="section-padding mb-12 md:mb-16">
        <EditorialHeading lines={["CLIENT", "SUCCESS"]} />
      </div>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-6 px-6 md:gap-8 md:px-12">
          {doubled.map((t, i) => (
            <blockquote
              key={`${t.id}-${i}`}
              className="w-[85vw] shrink-0 border border-[rgba(255,255,255,0.08)] bg-[#151515] p-8 md:w-[480px] md:p-12"
              data-cursor="magnetic"
            >
              <p className="text-lg leading-relaxed text-[#F5F5F5] md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-8 border-t border-[rgba(255,255,255,0.08)] pt-6">
                <cite className="not-italic">
                  <span className="block text-sm font-medium text-[#F5F5F5]">
                    {t.name}
                  </span>
                  <span className="mt-1 block text-xs text-[rgba(255,255,255,0.45)]">
                    {t.role}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
