"use client";

import { useEffect, useRef, type ReactNode } from "react";

type CurtainRevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
  once?: boolean;
};

/**
 * CurtainReveal — ink-press entrance reveal.
 *
 * Implemented with plain CSS transitions + IntersectionObserver instead of
 * motion/react `m.*` components. The previous `m[as]` dynamic component type
 * caused React to unmount + remount the DOM node mid-animation during page
 * transitions, producing the "removeChild" reconciliation error.
 *
 * Strategy:
 *  - SSR: renders fully visible plain HTML → crawlers and no-JS users see
 *    everything immediately, no hydration mismatch possible.
 *  - Client: useEffect hides below-fold elements via inline style, then
 *    IntersectionObserver triggers a CSS transition when they enter view.
 *  - Reduced-motion / no-IO: element stays fully visible, no flicker.
 *  - Cleanup: inline styles are fully reset on unmount so navigating away
 *    during an animation never leaves orphaned transform/opacity values.
 */
export default function CurtainReveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  as: Tag = "div",
  once = true,
}: CurtainRevealProps) {
  const ref = useRef<HTMLDivElement & HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reduced-motion or no IntersectionObserver support → stay fully visible.
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      return;
    }

    // Above-the-fold content stays visible on first paint (no FOUT).
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      return;
    }

    // Hide the element before the user can see it.
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`;
    el.style.willChange = "opacity, transform";

    // Hard failsafe: force visible after 2.5s so the page can never stay
    // blank if the observer fires late or the tab is backgrounded.
    const failsafe = window.setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 2500);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          window.clearTimeout(failsafe);
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          if (once) io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      // Reset all inline styles so navigating away mid-animation leaves no
      // ghost opacity/transform values on the recycled DOM node.
      el.style.opacity = "";
      el.style.transform = "";
      el.style.transition = "";
      el.style.willChange = "";
    };
  }, [delay, y, once]);

  return (
    <Tag ref={ref} className={className || undefined}>
      {children}
    </Tag>
  );
}