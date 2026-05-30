"use client";

import Image from "next/image";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import type { GalleryData } from "@/lib/api";

interface GalleryProps {
  gallery: GalleryData;
}

function MarqueeRow({
  items,
  direction = "right",
  duration = "45s",
  variant = "image",
}: {
  items: {
    id: string;
    title: string;
    image: string;
    video?: string;
    url?: string;
    preview?: string;
  }[];
  direction?: "left" | "right";
  duration?: string;
  variant?: "image" | "website" | "reel";
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-3">
      <div
        className={`marquee-track ${direction === "left" ? "reverse" : ""}`}
        style={{ "--duration": duration } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="group relative shrink-0"
            data-cursor="magnetic"
          >
            {variant === "website" ? (
              <div className="w-[280px] overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#151515] sm:w-[360px] md:w-[420px]">
                <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.08)] px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#B72A2A]/80" />
                  <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.2)]" />
                  <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.2)]" />
                  <span className="ml-2 truncate text-[10px] text-[rgba(255,255,255,0.4)]">
                    {item.title}
                  </span>
                </div>
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.preview || item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="420px"
                  />
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-t border-[rgba(255,255,255,0.08)] px-4 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-[#B72A2A] transition-colors hover:bg-[#B72A2A]/10"
                  >
                    Live Preview
                  </a>
                )}
              </div>
            ) : variant === "reel" ? (
              <div className="relative h-[220px] w-[140px] overflow-hidden sm:h-[280px] sm:w-[160px]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={item.image}
                  className="h-full w-full object-cover"
                >
                  {item.video && <source src={item.video} type="video/mp4" />}
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider text-[#F5F5F5] opacity-0 transition-opacity group-hover:opacity-100">
                  {item.title}
                </span>
              </div>
            ) : (
              <div className="relative h-[180px] w-[260px] overflow-hidden sm:h-[220px] sm:w-[320px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider text-[#F5F5F5] opacity-0 transition-opacity group-hover:opacity-100">
                  {item.title}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Gallery({ gallery }: GalleryProps) {
  return (
    <section id="gallery" className="relative overflow-hidden py-24 md:py-40">
      <div className="section-padding mb-12 md:mb-16">
        <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[rgba(255,255,255,0.45)]">
          Showcase
        </p>
        <EditorialHeading lines={["CREATIVE", "OUTPUT"]} accent={false} />
      </div>

      <MarqueeRow items={gallery.graphicDesign} direction="right" duration="50s" />
      <MarqueeRow items={gallery.reels} direction="left" duration="42s" variant="reel" />
      <MarqueeRow
        items={gallery.websites.map((w) => ({
          id: w.id,
          title: w.title,
          image: w.preview || "",
          preview: w.preview,
          url: w.url,
        }))}
        direction="right"
        duration="55s"
        variant="website"
      />
    </section>
  );
}
