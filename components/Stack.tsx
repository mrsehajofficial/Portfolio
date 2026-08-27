"use client";

import Reveal from "./Reveal";

/**
 * Capability groups instead of a flat technology list — recruiters can scan
 * what Sehaj can actually be hired for in seconds. Only tools he can discuss
 * comfortably in an interview made the cut.
 */
type CapabilityGroup = {
  name: string;
  items: string[];
};

const GROUPS: CapabilityGroup[] = [
  {
    name: "AI",
    items: ["OpenAI", "Gemini", "RAG", "Agents", "Prompt orchestration"],
  },
  {
    name: "Backend",
    items: ["Python", "Flask", "REST APIs", "SQLite"],
  },
  {
    name: "Automation",
    items: [
      "Python scripting",
      "Scheduled jobs",
      "File processing",
      "API integrations",
    ],
  },
  {
    name: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "Flutter", "Dart"],
  },
  {
    name: "Deployment",
    items: ["Vercel", "Netlify", "Render", "Wasmer"],
  },
];

export default function Stack() {
  return (
    <section
      id="stack"
      style={{ padding: "160px 0", borderTop: "1px solid var(--hairline)" }}
    >
      <div className="container">
        <Reveal>
          <p
            className="mono"
            style={{ fontSize: 13, color: "var(--signal)", marginBottom: 16 }}
          >
            tools of the trade
          </p>
          <h2
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
              color: "var(--ink)",
              marginBottom: 24,
              maxWidth: 640,
            }}
          >
            What I work with.
          </h2>
          <p
            style={{
              color: "var(--ink-faint)",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 520,
              marginBottom: 72,
            }}
          >
            Grouped by what I deliver, not by logo wall — everything below is
            something I&rsquo;ve shipped or used in real projects.
          </p>
        </Reveal>

        <div>
          {GROUPS.map((group, i) => (
            <Reveal key={group.name} delay={i * 0.05}>
              <div
                className="stack-row"
                data-cursor-hover
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  alignItems: "baseline",
                  gap: 32,
                  padding: "28px 8px",
                  borderBottom: "1px solid var(--hairline)",
                  borderTop:
                    i === 0 ? "1px solid var(--hairline)" : undefined,
                  transition: "border-color 0.3s var(--ease-power)",
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    color: "var(--ink)",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {group.name}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(15px, 1.6vw, 17px)",
                    color: "var(--ink-dim)",
                    lineHeight: 1.9,
                    display: "flex",
                    flexWrap: "wrap",
                    columnGap: 14,
                    rowGap: 4,
                  }}
                >
                  {group.items.map((item, j) => (
                    <span key={item} style={{ display: "inline-flex", gap: 14 }}>
                      {j > 0 && (
                        <span
                          aria-hidden="true"
                          className="mono"
                          style={{ color: "var(--signal)" }}
                        >
                          ·
                        </span>
                      )}
                      <span>{item}</span>
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .stack-row {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
