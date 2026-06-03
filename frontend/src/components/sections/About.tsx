"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, registerGSAP, scrollReveal, onScrollSystemReady, ScrollTrigger } from "@/lib/gsap-config";
import { EditorialHeading } from "@/components/ui/EditorialHeading";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGSAP();
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".about-image",
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
        scrollReveal(".about-text", sectionRef.current, {
          y: 40,
          duration: 1,
          start: "top 72%",
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-40"
    >
      <div className="section-padding grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <EditorialHeading lines={["WHO", "WE", "ARE"]} />
        </div>

        <div className="about-text lg:col-span-5 lg:flex lg:flex-col lg:justify-end">
          <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.65)] md:text-base md:leading-loose">
            We are a full-service creative marketing 
            agency specializing in branding, social media 
            marketing, content creation, performance advertising, 
            and digital growth strategies. Our approach combines 
            data-driven decisions with world-class creative execution 
            to help businesses stand out in crowded markets.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#B72A2A]">
            Cafes · Restaurants · Lifestyle
          </p>
        </div>

        <div className="about-image relative aspect-[4/5] overflow-hidden lg:col-span-5 lg:col-start-1 lg:row-start-2">
          <Image
            src="/media/photos/cafe-01.png"
            alt="Crafthouse Media café campaign"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/60 to-transparent" />
        </div>

        <div className="about-image relative aspect-[4/5] overflow-hidden lg:col-span-4 lg:col-start-6 lg:row-start-2">
          <Image
            src="/media/photos/graphic-02.jpg"
            alt="Social media content creation"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 35vw"
            loading="lazy"
          />
        </div>

        <div className="about-image relative hidden aspect-[4/5] overflow-hidden lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:block">
          <Image
            src="/media/photos/cafe-04.png"
            alt="Brand photography"
            fill
            className="object-cover"
            sizes="25vw"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
