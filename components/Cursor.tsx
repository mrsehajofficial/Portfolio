"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHoveringLink(!!target.closest("a, button, [data-cursor-hover]"));
    };

    let rafId: number;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--signal)",
          pointerEvents: "none",
          zIndex: 9998,
          marginLeft: -3,
          marginTop: -3,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHoveringLink ? 56 : 32,
          height: isHoveringLink ? 56 : 32,
          marginLeft: isHoveringLink ? -28 : -16,
          marginTop: isHoveringLink ? -28 : -16,
          borderRadius: "50%",
          border: "1px solid var(--ink-dim)",
          background: isHoveringLink ? "var(--signal-dim)" : "transparent",
          pointerEvents: "none",
          zIndex: 9997,
          transition:
            "width 0.3s var(--ease-power), height 0.3s var(--ease-power), margin 0.3s var(--ease-power), background 0.3s var(--ease-power)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
