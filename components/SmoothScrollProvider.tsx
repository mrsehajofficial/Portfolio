"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { SCROLL_TO_SECTION_EVENT } from "@/lib/scrollToSection";

// Height of the fixed nav, used as a scroll offset so section headings
// aren't hidden underneath it.
const NAV_OFFSET = 84;

/**
 * SmoothScrollProvider — owns the Lenis instance AND keeps it in lockstep
 * with GSAP ScrollTrigger.
 *
 * Integration contract (the Lenis docs' recommended GSAP wiring):
 *   1. Lenis drives smooth scroll in a rAF loop.
 *   2. `lenis.on("scroll", ScrollTrigger.update)` keeps every GSAP trigger in
 *      sync with the virtual scroll position.
 *   3. `gsap.ticker.add((t) => lenis.raf(t * 1000))` runs Lenis off GSAP's
 *      official ticker, so both engines share one rAF heartbeat.
 *   4. `gsap.ticker.lagSmoothing(0)` disables GSAP's lag-smoothing so the
 *      shared clock never drifts from real frames.
 *
 * GSAP is imported lazily here (never in the initial bundle) so the pages
 * that render ScrollTriggers still register against the same instance via
 * ScrollTrigger.config() imports in each scene component.
 */
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

    // Load Lenis lazily on idle to avoid competing with LCP.
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

      // Lenis → ScrollTrigger: recompute trigger positions on every virtual
      // scroll; without this, scrubbed/pinned scenes drift or never fire.
      lenis.on("scroll", ScrollTrigger.update);

      // One shared clock: GSAP's ticker drives Lenis AND ScrollTrigger, so
      // everything stays on the same frame.
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      cleanupLenis = () => {
        lenis.destroy();
        gsap.ticker.remove(() => {});
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