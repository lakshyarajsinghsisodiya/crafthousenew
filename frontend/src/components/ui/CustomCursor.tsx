"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const scale = useRef(1);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterInteractive = () => {
      scale.current = 2.2;
    };
    const onLeaveInteractive = () => {
      scale.current = 1;
    };

    document.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll(
      "a, button, [data-cursor='magnetic']",
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${scale.current})`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] hidden md:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-[#B72A2A] mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-10 w-10 rounded-full border border-[#B72A2A]/50 transition-[box-shadow] duration-300"
        style={{
          willChange: "transform",
          boxShadow: "0 0 20px rgba(183, 42, 42, 0.3)",
        }}
      />
    </div>
  );
}
