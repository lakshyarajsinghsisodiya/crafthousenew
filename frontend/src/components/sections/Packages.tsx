"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, scrollReveal, onScrollSystemReady, ScrollTrigger } from "@/lib/gsap-config";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import type { Package } from "@/lib/api";

interface PackagesProps {
  packages: Package[];
}

export function Packages({ packages }: PackagesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGSAP();
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        scrollReveal(".package-card", sectionRef.current, {
          y: 50,
          duration: 0.9,
          stagger: 0.15,
          start: "top 75%",
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
  }, [packages]);

  const formatPrice = (pkg: Package) =>
    `${pkg.currency}${pkg.price.toLocaleString("en-IN")}`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      id="packages"
      className="relative bg-[#111111] py-24 md:py-40"
    >
      <div className="section-padding">
        <EditorialHeading lines={["GROWTH", "PACKAGES"]} className="mb-16 md:mb-24" />

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`package-card card-spotlight relative border p-8 transition-all duration-500 md:p-12 ${
                pkg.highlighted
                  ? "border-[#B72A2A] bg-[#151515] glow-red"
                  : "border-[rgba(255,255,255,0.08)] bg-[#090909]"
              }`}
              onMouseMove={handleMouseMove}
              data-cursor="magnetic"
            >
              {pkg.badge && (
                <span className="absolute -top-3 right-6 bg-[#B72A2A] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
                  {pkg.badge}
                </span>
              )}
              <p className="text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.45)]">
                {pkg.name}
              </p>
              <p className="editorial-heading mt-4 text-4xl text-[#F5F5F5] md:text-5xl">
                {formatPrice(pkg)}
                <span className="text-base font-normal text-[rgba(255,255,255,0.45)]">
                  {pkg.period}
                </span>
              </p>
              <ul className="mt-8 space-y-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-[rgba(255,255,255,0.65)]"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#B72A2A]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-10 inline-flex w-full justify-center py-4 text-center text-[10px] uppercase tracking-[0.2em] transition-all ${
                  pkg.highlighted
                    ? "bg-[#B72A2A] text-[#F5F5F5] hover:bg-[#8b1e1e]"
                    : "border border-[rgba(255,255,255,0.2)] hover:border-[#B72A2A]"
                }`}
              >
                Get Started
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
