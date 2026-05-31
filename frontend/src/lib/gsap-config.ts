"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
let scrollSystemReady = false;
const readyCallbacks: Array<() => void> = [];

export function registerGSAP() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function markScrollSystemReady() {
  if (typeof window === "undefined") return;
  scrollSystemReady = true;
  ScrollTrigger.refresh(true);
  readyCallbacks.splice(0).forEach((cb) => cb());
}

export function onScrollSystemReady(callback: () => void) {
  if (scrollSystemReady) {
    callback();
    return () => {};
  }
  readyCallbacks.push(callback);
  return () => {
    const index = readyCallbacks.indexOf(callback);
    if (index >= 0) readyCallbacks.splice(index, 1);
  };
}

export function scrollReveal(
  targets: gsap.TweenTarget,
  trigger: Element | null,
  options?: {
    y?: number;
    x?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  },
) {
  if (!trigger) return;

  const {
    y = 50,
    x = 0,
    duration = 0.9,
    stagger = 0,
    start = "top 80%",
  } = options ?? {};

  return gsap.fromTo(
    targets,
    { opacity: 0, y, x },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start,
        once: true,
        invalidateOnRefresh: true,
      },
    },
  );
}

export { gsap, ScrollTrigger };
