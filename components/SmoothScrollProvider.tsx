"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Height of the fixed navbar, used as a scroll offset so section headings
// aren't hidden underneath it.
const NAV_OFFSET = 84;

// Clean URLs -> section id. "/" means "scroll to the very top".
const SECTION_TARGETS: Record<string, string | null> = {
  "/": null,
  "/work": "work",
  "/about": "about",
  "/stack": "stack",
  "/contact": "contact",
};

const SECTION_PATHS = Object.keys(SECTION_TARGETS);

const SECTION_TITLES: Record<string, string> = {
  "/": "Sehaj Varma — AI Automation Engineer & Backend Developer",
  "/work": "Selected Work — Sehaj Varma",
  "/about": "About — Sehaj Varma",
  "/stack": "Stack — Sehaj Varma",
  "/contact": "Contact — Sehaj Varma",
};

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
        return;
      }

      const top =
        id == null || !el
          ? 0
          : el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({
        top,
        behavior: smooth && !prefersReducedMotion ? "smooth" : "auto",
      });
    };

    const updateTitle = (path: string) => {
      const title = SECTION_TITLES[path];
      if (title) document.title = title;
    };

    // Intercept clicks on every in-site anchor so they smooth-scroll with
    // Lenis and rewrite the URL to a clean section path (no "#" fragment).
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const anchor = (event.target as HTMLElement)?.closest?.(
        'a[href]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const [rawPath, hashPart = ""] = href.split("#");

      let path: string | null = null;

      if (SECTION_PATHS.includes(rawPath)) {
        path = rawPath;
      } else if (rawPath === "") {
        // Old-style in-page hash links ("#work", "#") map to clean URLs.
        if (hashPart === "" || hashPart === "/") path = "/";
        else if (SECTION_TARGETS[`/${hashPart}`] !== undefined)
          path = `/${hashPart}`;
      }

      if (path === null) return; // external link (github, mailto, ...)

      // Let modified clicks (new tab / middle click) behave natively.
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();

      if (pathnameRef.current !== path) {
        history.pushState({ section: path }, "", path);
        updateTitle(path);
      }

      scrollToSection(SECTION_TARGETS[path] ?? null);
    };

    // Back/forward between clean URLs.
    const onPopState = () => {
      const path = window.location.pathname || "/";
      scrollToSection(SECTION_TARGETS[path] ?? null, true);
      updateTitle(path);
    };

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

    // Landed directly on a section URL (refresh / share / Google)? Jump to it
    // instantly once the layout has settled.
    const initialPath = pathnameRef.current;
    if (initialPath !== "/" && SECTION_TARGETS[initialPath] !== undefined) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          ScrollTrigger.refresh();
          scrollToSection(SECTION_TARGETS[initialPath] ?? null, false);
        }, 80);
      });
    }

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}