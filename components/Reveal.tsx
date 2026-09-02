"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  as?: "div" | "span";
  className?: string;
  start?: string;
};

export default function Reveal({
  children,
  delay = 0,
  y = 30,
  duration = 0.8,
  as = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLSpanElement>(null);
  // Start VISIBLE: the server HTML (and no-JS rendering) always contains the
  // content fully shown, so crawlers and "low content" audits see everything.
  // The effect below re-hides only the elements that are currently OFFSCREEN
  // so their entrance animation still plays when scrolled into view — the
  // swap happens before the user can see those elements, so there is no flash.
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      prefersReducedMotion ||
      typeof IntersectionObserver === "undefined"
    ) {
      return; // stays visible — no scroll animation
    }

    // Elements already on screen at load keep their content visible
    // immediately; only below-the-fold elements get the entrance animation.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;

    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

