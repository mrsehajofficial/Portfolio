"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import { SITE_URL } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Project = {
  id: string;
  index: string;
  title: string;
  description: string;
  /** Case-study framing so visitors see engineering narrative, not just tech. */
  problem: string;
  built: string[];
  result: string;
  tags: string[];
  sourceUrl: string;
  year: string;
};

const PROJECTS: Project[] = [
  {
    id: "amai-yuki",
    index: "project-01",
    title: "Amai Yuki — Real-Time Messaging App",
    // Ownership-first: what Sehaj engineered personally, with AI assistance
    // mentioned once, quietly, instead of leading the story.
    description:
      "A cross-platform real-time messaging application with direct and group chats, a custom in-app camera module, and a clean Provider-based architecture — designed and shipped end-to-end across a Python/Flask backend and a Flutter frontend.",
    problem:
      "Third-party messaging backends cap control over data flow, latency, and custom capture features — so the product needed its own protocol layer.",
    built: [
      "Python/Flask REST backend with SQLite persistence and input validation",
      "Direct & group chat flows plus a custom in-app camera module",
      "Provider-based state architecture across the Flutter frontend",
      "LLM integrations layered into chat workflows",
    ],
    result:
      "Fully functional product: the frontend is open-source and testable today; the backend stays private but documented. Frontend polish was accelerated with AI tooling under my prompt-engineering direction.",
    tags: ["Python", "Flask", "Provider", "LLM", "Flutter"],
    sourceUrl: "https://github.com/mrsehajofficial/Amai-Yuki",
    year: "2026",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
        const bar = row.querySelector(".project-progress");
        gsap.set(bar, { scaleX: 0 });
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            end: "bottom 40%",
            scrub: 0.6,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ padding: "160px 0", position: "relative" }}
    >
      <div className="container">
        <Reveal>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 88,
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <p
                className="mono"
                style={{
                  fontSize: 13,
                  color: "var(--signal)",
                  marginBottom: 16,
                }}
              >
                selected work
              </p>
              <h2
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
                  color: "var(--ink)",
                  maxWidth: 640,
                }}
              >
                A project built from scratch, end-to-end.
              </h2>
            </div>
            <p
              style={{
                color: "var(--ink-faint)",
                maxWidth: 320,
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              Proof over promises — one flagship product shipped end-to-end,
              plus the automation and AI work behind the numbers.
            </p>
          </div>
        </Reveal>

        <div>
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <article
                className="project-row"
                data-cursor-hover
                style={{
                  position: "relative",
                  borderTop: "1px solid var(--hairline)",
                  borderBottom:
                    i === PROJECTS.length - 1
                      ? "1px solid var(--hairline)"
                      : "none",
                  padding: "48px 0",
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 200px",
                  gap: 32,
                  alignItems: "start",
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: 13, color: "var(--ink-faint)" }}
                >
                  {project.index}
                </span>

                <div>
                  <h3
                    style={{
                      fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
                      color: "var(--ink)",
                      marginBottom: 16,
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--ink-dim)",
                      fontSize: 15,
                      lineHeight: 1.75,
                      maxWidth: 620,
                      marginBottom: 24,
                    }}
                  >
                    {project.description}
                  </p>

                    {/* Case-study grid: Problem → What I built → Result */}
                    <div
                      className="cs-grid"
                      style={{
                        marginTop: 26,
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 20,
                      }}
                    >
                      {(
                        [
                          ["problem", [project.problem]],
                          ["what i built", project.built],
                          ["result", [project.result]],
                        ] as const
                      ).map(([label, items]) => (
                        <div key={label}>
                          <p
                            className="mono"
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "var(--signal)",
                              marginBottom: 10,
                            }}
                          >
                            {label}
                          </p>
                          {items.map((line) => (
                            <p
                              key={line.slice(0, 24)}
                              style={{
                                fontSize: 14,
                                color: "var(--ink-faint)",
                                lineHeight: 1.65,
                                marginBottom: 6,
                              }}
                            >
                              {label === "what i built" && (
                                <span
                                  aria-hidden="true"
                                  className="mono"
                                  style={{ marginRight: 6 }}
                                >
                                  ·
                                </span>
                              )}
                              {line}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="mono"
                        style={{
                          fontSize: 12,
                          color: "var(--ink-faint)",
                          border: "1px solid var(--hairline-strong)",
                          padding: "5px 12px",
                          borderRadius: 100,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: "right" }} className="project-meta">
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="mono"
                    style={{ fontSize: 14, color: "var(--signal)" }}
                  >
                    view source ↗
                  </a>
                  <p
                    className="mono"
                    style={{
                      fontSize: 12,
                      color: "var(--ink-faint)",
                      marginTop: 20,
                    }}
                  >
                    {project.year}
                  </p>
                </div>

                <div
                  className="project-progress"
                  style={{
                    position: "absolute",
                    bottom: -1,
                    left: 0,
                    height: 1,
                    width: "100%",
                    background: "var(--signal)",
                    transformOrigin: "left",
                  }}
                />
              </article>
            </Reveal>
          ))}
        </div>

        {/* Structured data so search engines can attribute the repo properly. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareSourceCode",
              name: "Amai Yuki",
              description:
                "Cross-platform real-time messaging application with a Python/Flask backend and Flutter frontend, including direct/group chats and a custom in-app camera module.",
              codeRepository:
                "https://github.com/mrsehajofficial/Amai-Yuki",
              programmingLanguage: ["Dart", "Python", "TypeScript"],
              author: {
                "@type": "Person",
                name: "Sehaj Varma",
                url: SITE_URL,
              },
            }),
          }}
        />

        <Reveal delay={0.05}>
          <p
            className="mono"
            style={{
              fontSize: 13,
              color: "var(--signal)",
              marginTop: 88,
              marginBottom: 28,
            }}
          >
            more evidence
          </p>
          <div
            className="ev-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {[
              {
                id: "automation",
                title: "Automation scripts",
                body: "Private Python tooling across scheduled jobs, file processing pipelines, and API-to-API integrations — the work behind the 10+ scripts counter.",
              },
              {
                id: "ai-rag",
                title: "AI / RAG experiments",
                body: "OpenAI & Gemini API integrations, prompt orchestration systems, and RAG architecture studies feeding Amai Yuki's LLM-assisted features.",
              },
              {
                id: "this-site",
                title: "This portfolio itself",
                body: "Static Next.js build with truthful SSR counters, structured data, an anti-spam contact pipeline, and a client-side retrieval assistant — zero external calls.",
              },
            ].map((card) => (
              <div
                key={card.id}
                data-cursor-hover
                className="stack-item"
                style={{
                  border: "1px solid var(--hairline)",
                  borderRadius: 12,
                  padding: "24px 22px",
                  transition: "border-color 0.3s var(--ease-power)",
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    color: "var(--ink)",
                    fontWeight: 500,
                    marginBottom: 10,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--ink-faint)",
                    lineHeight: 1.7,
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .project-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .project-meta {
            text-align: left !important;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .cs-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 1000px) {
          .ev-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
