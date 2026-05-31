"use client";

import { useEffect, useRef } from "react";

export function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particleCount = window.innerWidth > 1200 ? 18 : 12;
    let animationId = 0;
    let visible = !document.hidden;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: Math.random() * 0.2 + 0.05,
      opacity: Math.random() * 0.25 + 0.05,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) {
        animationId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animationId);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const draw = () => {
      if (!visible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 245, 245, ${p.opacity})`;
        ctx.fill();
        p.x += p.speedX;
        p.y -= p.speedY;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9994] opacity-40 max-md:hidden"
      aria-hidden="true"
    />
  );
}
