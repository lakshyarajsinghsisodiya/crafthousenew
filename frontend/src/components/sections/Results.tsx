"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP, scrollReveal, onScrollSystemReady, ScrollTrigger } from "@/lib/gsap-config";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import type { Stat } from "@/lib/api";

interface ResultsProps {
  stats: Stat[];
}

function AnimatedCounter({
  value,
  display,
  suffix,
}: {
  value: number;
  display: string;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(value * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const format = () => {
    if (count >= value) return display;
    if (value >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${Math.floor(count / 1000)}K`;
    return `${count}${suffix}`;
  };

  return (
    <span ref={ref} className="editorial-heading text-5xl text-[#B72A2A] md:text-7xl lg:text-8xl">
      {started.current ? format() : "0"}
    </span>
  );
}

export function Results({ stats }: ResultsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGSAP();
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        scrollReveal(".stat-item", sectionRef.current, {
          y: 50,
          duration: 0.8,
          stagger: 0.1,
          start: "top 78%",
        });
      }, sectionRef);
      ScrollTrigger.refresh();
    };

    const cancelReady = onScrollSystemReady(setup);
    setup();

    return () => {
      cancelReady();
      ctx?.revert();
    };
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative bg-[#111111] py-24 md:py-40"
    >
      <div className="section-padding">
        <EditorialHeading
          lines={["RESULTS", "THAT", "MATTER"]}
          className="mb-16 md:mb-24"
        />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-item border-t border-[rgba(255,255,255,0.1)] pt-6">
              <AnimatedCounter
                value={stat.value}
                display={stat.display}
                suffix={stat.suffix}
              />
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[rgba(255,255,255,0.5)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
