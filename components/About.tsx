"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

const STATS = [
  { value: 10, suffix: "+", label: "Private automation scripts built" },
  { value: 4, suffix: "+", label: "AI integration prototypes" },
  // Replaced the generic "Efforts, focus & dedication" with a verifiable
  // metric — recruiters trust numbers they can cross-check vs the Stack list.
  { value: 4, suffix: "+", label: "deployment platforms shipped to" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return;

    const statEls = sectionRef.current?.querySelectorAll<HTMLElement>(".stat-value");
    if (!statEls?.length) return;

    // Animate counters up from 0 when they enter the viewport.
    // SSR already renders the final value so crawlers always read the real number.
    const observers: IntersectionObserver[] = [];
    statEls.forEach((el) => {
      const target = parseFloat(el.dataset.value || "0");
      const isDecimal = target % 1 !== 0;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          const start = performance.now();
          const duration = 1600;
          el.textContent = "0";

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out quad
            const eased = 1 - (1 - progress) ** 2;
            const current = eased * target;
            el.textContent = isDecimal
              ? current.toFixed(1)
              : Math.round(current).toString();
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "160px 0",
        borderTop: "1px solid var(--hairline)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
          }}
          className="about-grid"
        >
          <Reveal>
            <p
              className="mono"
              style={{
                fontSize: 13,
                color: "var(--signal)",
                marginBottom: 24,
              }}
            >
              about
            </p>
            <h2
              style={{
                fontSize: "clamp(2.1rem, 4.5vw, 3.8rem)",
                color: "var(--ink)",
                marginBottom: 28,
              }}
            >
              Building efficient workflows and clean backend structures.
            </h2>
            <div
              style={{
                color: "var(--ink-dim)",
                fontSize: 16,
                lineHeight: 1.85,
              }}
            >
              <p style={{ marginBottom: 20 }}>
                Sehaj Varma is an AI Automation Engineer and Backend Developer
                based in India, open to remote work worldwide.
              </p>
              <p style={{ marginBottom: 20 }}>
                I build Python automation scripts that turn repetitive file,
                API, and data-processing workflows into repeatable processes.
                Software clicked for me because I enjoy logic puzzles — and
                every manual step scripted away is a step nobody has to do
                again.
              </p>
              <p style={{ marginBottom: 20 }}>
                Currently I&rsquo;m deep-diving into AI integrations: studying
                prompt orchestration, learning RAG (Retrieval-Augmented
                Generation) architectures, and building conversational agents
                that connect LLMs to external APIs so they retrieve real-world
                data instead of guessing.
              </p>
              <p>
                On the backend side, I ship structured REST APIs with Flask on
                clean SQLite schemas — modular codebases, input validation, and
                documentation thorough enough that future-me (or you) can read
                them without asking questions.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 32,
              }}
            >
              {[
                "Workflow Automation",
                "Clean API Structures",
                "AI API Integrations",
                "System Scripting",
              ].map((h) => (
                <span
                  key={h}
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: "var(--ink-dim)",
                    border: "1px solid var(--hairline-strong)",
                    padding: "5px 12px",
                    borderRadius: 100,
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
            <Link
              href="/about"
              data-cursor-hover
              className="mono"
              style={{
                fontSize: 13,
                color: "var(--signal)",
                display: "inline-block",
                marginTop: 24,
              }}
            >
              the full about page →
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 48,
                paddingTop: 8,
              }}
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    borderBottom: "1px solid var(--hairline)",
                    paddingBottom: 32,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 4,
                    }}
                  >
                    <span
                      className="stat-value mono"
                      data-value={stat.value}
                      style={{
                        fontSize: "clamp(2.6rem, 5vw, 3.6rem)",
                        color: "var(--ink)",
                        fontWeight: 500,
                      }}
                    >
                      {/* Final value in the SERVER HTML, not a placeholder:
                          non-JS crawlers, AI agents and no-JS visitors must
                          read the real number. The rAF counter effect below
                          rewrites text (to 0, then back up) purely as a
                          visual flourish AFTER a human scrolls here. */}
                      {stat.value}
                    </span>
                    <span
                      className="mono"
                      style={{
                        fontSize: "clamp(2.6rem, 5vw, 3.6rem)",
                        color: "var(--ink)",
                      }}
                    >
                      {stat.suffix}
                    </span>
                  </div>
                  <p
                    className="mono"
                    style={{
                      fontSize: 13,
                      color: "var(--ink-faint)",
                      marginTop: 8,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}
