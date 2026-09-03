"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { SCROLL_TO_SECTION_EVENT } from "@/lib/scrollToSection";

const NAV_OFFSET = 76;

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scrollToSection = (id: string | null, smooth = true) => {
      const el = id ? document.getElementById(id) : null;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(id == null ? 0 : (el ?? 0), {
          offset: id == null ? 0 : -NAV_OFFSET,
          duration: smooth ? 1.0 : 0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          immediate: !smooth,
        });
      } else {
        const top =
          id == null || !el
            ? 0
            : el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({
          top,
          behavior: smooth && !prefersReducedMotion ? "smooth" : "auto",
        });
      }
    };

    const onScrollTo = (event: Event) => {
      const detail = (event as CustomEvent<{ id: string | null }>).detail;
      scrollToSection(detail?.id ?? null);
    };

    window.addEventListener(SCROLL_TO_SECTION_EVENT, onScrollTo);

    let cleanupLenis: (() => void) | null = null;

    const initLenis = async () => {
      if (prefersReducedMotion) return;

      try {
        const [{ default: LenisClass }, { gsap }, { ScrollTrigger }] =
          await Promise.all([
            import("lenis"),
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new LenisClass({
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
          touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);

        let rafId: number;
        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        gsap.ticker.lagSmoothing(0);

        cleanupLenis = () => {
          cancelAnimationFrame(rafId);
          lenis.destroy();
          lenisRef.current = null;
        };
      } catch (err) {
        console.error("Lenis init error:", err);
      }
    };

    initLenis();

    return () => {
      window.removeEventListener(SCROLL_TO_SECTION_EVENT, onScrollTo);
      cleanupLenis?.();
    };
  }, []);

  return <>{children}</>;
}