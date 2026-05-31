"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap-config";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { LazyVideo } from "@/components/ui/LazyVideo";
import type { PortfolioItem } from "@/lib/api";

interface PortfolioProps {
  items: PortfolioItem[];
}

export function Portfolio({ items }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      document.querySelectorAll(".portfolio-block").forEach((block) => {
        gsap.from(block.querySelector(".portfolio-media"), {
          scale: 1.15,
          clipPath: "inset(0 100% 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: block, start: "top 75%" },
        });
        gsap.from(block.querySelector(".portfolio-content"), {
          opacity: 0,
          x: block.classList.contains("layout-right") ? -40 : 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 70%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [items]);

  return (
    <section ref={sectionRef} id="work" className="relative py-24 md:py-40">
      <div className="section-padding mb-16 md:mb-24">
        <EditorialHeading lines={["OUR", "WORK"]} />
      </div>

      <div className="flex flex-col gap-24 md:gap-40">
        {items.map((item) => {
          if (item.type === "video") {
            return (
              <div
                key={item.id}
                className="portfolio-block section-padding"
              >
                <div className="portfolio-media relative aspect-video overflow-hidden">
                  {item.video && (
                    <LazyVideo
                      src={item.video}
                      poster={item.image}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                </div>
                <div className="portfolio-content mt-8 max-w-2xl">
                  <ProjectMeta item={item} />
                </div>
              </div>
            );
          }

          const isRight = item.layout === "right";
          return (
            <div
              key={item.id}
              className={`portfolio-block section-padding grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                isRight ? "layout-right" : ""
              }`}
            >
              <div
                className={`portfolio-media relative aspect-[4/5] overflow-hidden md:aspect-[3/4] ${
                  isRight ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.brand}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              <div
                className={`portfolio-content ${isRight ? "lg:order-1" : ""}`}
              >
                <ProjectMeta item={item} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ProjectMeta({ item }: { item: PortfolioItem }) {
  return (
    <>
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#B72A2A]">
        {item.industry}
      </p>
      <h3 className="editorial-heading mt-2 text-3xl text-[#F5F5F5] md:text-5xl">
        {item.brand}
      </h3>
      <p className="mt-4 text-sm text-[rgba(255,255,255,0.55)]">
        {item.services.join(" · ")}
      </p>
      <p className="mt-6 border-l-2 border-[#B72A2A] pl-4 text-sm leading-relaxed text-[rgba(255,255,255,0.7)] md:text-base">
        {item.results}
      </p>
    </>
  );
}
