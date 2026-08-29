"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let tickerFn: ((time: number) => void) | null = null;

    if (!prefersReducedMotion) {
      const lenis = new Lenis({
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
    }

    // Smooth-scroll to a section (or the very top when id is null), then
    // rewrite the URL to the clean root path — the browser always shows
    // https://www.bitbridge.work.gd/, never "/work", "/about" or "#work".
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

    // Nav buttons / CTAs dispatch SCROLL_TO_SECTION_EVENT via the
    // scrollToSection() helper in lib/scrollToSection.ts.
    const onScrollTo = (event: Event) => {
      const detail = (event as CustomEvent<{ id: string | null }>).detail;
      scrollToSection(detail?.id ?? null);
    };

    window.addEventListener(SCROLL_TO_SECTION_EVENT, onScrollTo);

    return () => {
      window.removeEventListener(SCROLL_TO_SECTION_EVENT, onScrollTo);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}