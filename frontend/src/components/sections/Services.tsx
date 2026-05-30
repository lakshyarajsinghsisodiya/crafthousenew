"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap-config";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import type { Service } from "@/lib/api";

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-[#111111] py-24 md:py-40"
    >
      <div className="section-padding">
        <EditorialHeading lines={["WHAT", "WE", "DO"]} className="mb-16 md:mb-24" />

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="service-card card-spotlight group relative border border-[rgba(255,255,255,0.08)] bg-[#151515] p-8 transition-all duration-500 hover:border-[#B72A2A]/40 md:p-12"
              onMouseMove={handleMouseMove}
              data-cursor="magnetic"
            >
              <span className="text-[10px] font-medium tracking-[0.3em] text-[#B72A2A]">
                {service.id}
              </span>
              <h3 className="editorial-heading mt-4 text-2xl text-[#F5F5F5] transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-4 max-h-0 overflow-hidden text-sm leading-relaxed text-[rgba(255,255,255,0.6)] opacity-0 transition-all duration-500 group-hover:mt-6 group-hover:max-h-40 group-hover:opacity-100 md:group-hover:max-h-32">
                {service.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[rgba(255,255,255,0.1)] px-3 py-1 text-[10px] uppercase tracking-wider text-[rgba(255,255,255,0.45)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
