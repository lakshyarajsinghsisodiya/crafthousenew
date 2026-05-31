"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  eager?: boolean;
  autoPlay?: boolean;
}

export function LazyVideo({
  src,
  poster,
  className,
  eager = false,
  autoPlay = true,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || eager) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { rootMargin: "120px", threshold: 0.12 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [eager]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active) {
      video.pause();
      return;
    }

    if (video.dataset.src !== src) {
      video.src = src;
      video.dataset.src = src;
      video.load();
    }

    if (autoPlay) {
      video.play().catch(() => {});
    }
  }, [active, src, autoPlay]);

  useEffect(() => {
    const onVisibility = () => {
      const video = videoRef.current;
      if (!video || !active) return;
      if (document.hidden) {
        video.pause();
      } else if (autoPlay) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [active, autoPlay]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
