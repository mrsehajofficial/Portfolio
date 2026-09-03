"use client";

import { useEffect, useRef, useState } from "react";

/**
 * RegCursor — a print-registration crosshair cursor.
 * A vermilion dot follows the pointer instantly; a square ring lags on a
 * compositor rAF (translate3d only) and grows when hovering interactive
 * elements. Touch devices and reduced-motion users get the native cursor.
 */
export default function RegCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

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
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 2.5}px, ${
          mouseY - 2.5
        }px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };

    const loop = () => {
      // Frame-rate-independent lerp — smooth even when the tab lags.
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div aria-hidden="true" className="reg-cursor" style={{ opacity: isVisible ? 1 : 0 }}>
      <div ref={dotRef} className="reg-dot" />
      <div ref={ringRef} className={`reg-ring${hovering ? " hovering" : ""}`} />
    </div>
  );
}