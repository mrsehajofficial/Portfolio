"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import CurtainReveal from "./CurtainReveal";
import { ABOUT } from "@/lib/content";

/**
 * Colophon — the about scene, set as a printer's colophon page.
 * The stats are letterpress digits on a shaded plate (hard ink shadow).
 * A tiny rAF counter runs the numbers up when they enter the viewport; the
 * server HTML always renders the final value so crawlers read the truth.
 */
export default function Colophon() {
  const digitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = digitsRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined")
      return;

    const targets = [...el.querySelectorAll<HTMLElement>(".stat-line")];
    const observers: IntersectionObserver[] = [];

    targets.forEach((line) => {
      const valueEl = line.querySelector<HTMLElement>("[data-value]");
      if (!valueEl) return;
      const target = parseFloat(valueEl.dataset.value || "0");

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          const start = performance.now();
          const duration = 1300;
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - p) ** 2;
            valueEl.textContent = String(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
        { threshold: 0.5 }
      );
      io.observe(line);
      observers.push(io);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="about" className="colophon">
      <div className="container">
        <div className="about-grid">
          <CurtainReveal>
            <p className="form-eyebrow mono">{ABOUT.eyebrow}</p>
            <h2 className="about-title">
              I like problems with edges.{" "}
              <em className="accent-over">Software has the most edges.</em>
            </h2>
            <div className="press-prose">
              {ABOUT.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>

            <div className="pill-row">
              {ABOUT.pills.map((h) => (
                <span className="pill" key={h}>
                  {h}
                </span>
              ))}
            </div>

            <Link
              href="/about"
              data-cursor-hover
              className="text-link"
              style={{ display: "inline-block", marginTop: 34 }}
            >
              the full about page →
            </Link>
          </CurtainReveal>

          <CurtainReveal delay={0.1}>
            <div className="press-digits" ref={digitsRef}>
              {ABOUT.stats.map((stat) => (
                <div className="stat-row" key={stat.label}>
                  <div className="stat-line">
                    <span data-value={stat.value}>{stat.value}</span>
                    <span className="stat-suffix">{stat.suffix}</span>
                  </div>
                  <p className="stat-cap">{stat.label}</p>
                </div>
              ))}
            </div>
          </CurtainReveal>
        </div>
      </div>
    </section>
  );
}