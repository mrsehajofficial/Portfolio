"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { SCROLL_TO_SECTION_EVENT } from "@/lib/scrollToSection";

// Height of the fixed navbar, used as a scroll offset so section headings
// aren't hidden underneath it.
const NAV_OFFSET = 84;

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

    // scrollToSection is needed immediately; Lenis/GSAP can load lazily on idle.
    const scrollToSection = (id: string | null, smooth = true) => {
      const el = id ? document.getElementById(id) : null;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(id == null ? 0 : (el ?? 0), {
          offset: id == null ? 0 : -NAV_OFFSET,
          duration: smooth ? 1.2 : 0,
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

      history.replaceState(null, "", "/");
    };

    const onScrollTo = (event: Event) => {
      const detail = (event as CustomEvent<{ id: string | null }>).detail;
      scrollToSection(detail?.id ?? null);
    };

    window.addEventListener(SCROLL_TO_SECTION_EVENT, onScrollTo);

    // Load Lenis + GSAP ScrollTrigger lazily on idle to avoid blocking LCP.
    let tickerFn: ((time: number) => void) | null = null;
    let cleanupLenis: (() => void) | null = null;

    const initLenis = async () => {
      if (prefersReducedMotion) return;

      const [{ default: LenisClass }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      cleanupLenis = () => {
        if (tickerFn) gsap.ticker.remove(tickerFn);
        lenis.destroy();
        lenisRef.current = null;
      };
    };

    // Use requestIdleCallback when available, otherwise defer via setTimeout.
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(initLenis, { timeout: 2000 });
      return () => {
        cancelIdleCallback(id);
        window.removeEventListener(SCROLL_TO_SECTION_EVENT, onScrollTo);
        cleanupLenis?.();
      };
    } else {
      const id = setTimeout(initLenis, 200);
      return () => {
        clearTimeout(id);
        window.removeEventListener(SCROLL_TO_SECTION_EVENT, onScrollTo);
        cleanupLenis?.();
      };
    }
  }, []);

  return <>{children}</>;
}