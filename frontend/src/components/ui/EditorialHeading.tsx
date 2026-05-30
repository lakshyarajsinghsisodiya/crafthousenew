"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap-config";

interface EditorialHeadingProps {
  lines: string[];
  accent?: boolean;
  size?: "hero" | "section";
  className?: string;
  id?: string;
}

export function EditorialHeading({
  lines,
  accent = true,
  size = "section",
  className = "",
  id,
}: EditorialHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    const inners = el.querySelectorAll(".text-mask-inner");
    gsap.fromTo(
      inners,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      },
    );
  }, []);

  const sizeClass =
    size === "hero" ? "editorial-display" : "editorial-section";

  return (
    <h2
      ref={ref}
      id={id}
      className={`editorial-heading ${sizeClass} ${accent ? "text-[#B72A2A]" : "text-[#F5F5F5]"} ${className}`}
    >
      {lines.map((line) => (
        <span key={line} className="text-mask-line">
          <span className="text-mask-inner">{line}</span>
        </span>
      ))}
    </h2>
  );
}
