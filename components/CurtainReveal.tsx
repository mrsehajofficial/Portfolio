"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { m } from "motion/react";

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
 * Server HTML starts fully visible (crawlers + no-JS read everything); JS
 * then hides only offscreen elements and "presses" them in when they enter
 * the viewport, using Motion's `m` component (WAAPI = compositor thread).
 * Reduced-motion users keep the fully-visible static state.
 */
export default function CurtainReveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  as = "div",
  once = true,
}: CurtainRevealProps) {
  const ref = useRef<HTMLDivElement & HTMLSpanElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // HARD FAILSAFE: if the below-fold "hidden until in view" state is ever
    // left in place (lazy Motion features stall, IntersectionObserver fails,
    // script error after mount), force everything visible after 2.5s so the
    // page can never be blank. 2.5s is comfortably past the entrance window.
    const failsafe = window.setTimeout(() => {
      setShouldAnimate(false);
    }, 2500);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      return () => window.clearTimeout(failsafe);
    }

    // Only re-animate content that's below the fold at load; above-the-fold
    // content stays fully visible (no flash), just like the old Reveal.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      window.clearTimeout(failsafe);
      return;
    }

    setShouldAnimate(true);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldAnimate(false);
          io.disconnect();
          window.clearTimeout(failsafe);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const Tag = m[as];

  const style = {
    "--reveal-y": `${y}px`,
    "--reveal-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      className={className || undefined}
      style={style}
      initial={shouldAnimate ? { opacity: 0, y } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  );
}