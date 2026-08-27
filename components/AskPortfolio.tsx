"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { answerFor, type KnowledgeCard } from "@/lib/portfolio-knowledge";

const SUGGESTIONS = [
  "What AI projects has Sehaj built?",
  "What's his tech stack?",
  "Tell me about Amai Yuki",
  "Is he available for freelance work?",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "1px solid var(--hairline-strong)",
  borderRadius: 8,
  padding: "14px 16px",
  color: "var(--ink)",
  fontSize: 15,
  fontFamily: "var(--font-body)",
  outline: "none",
};

export default function AskPortfolio() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<KnowledgeCard | null>(null);
  const [missed, setMissed] = useState(false);

  function ask(question: string) {
    setQuery(question);
    const card = answerFor(question);
    setResult(card);
    setMissed(card === null);
  }

  return (
    <section
      id="ask"
      style={{
        padding: "120px 0",
        borderTop: "1px solid var(--hairline)",
        position: "relative",
      }}
    >
      <div className="container">
        <Reveal>
          <p
            className="mono"
            style={{ fontSize: 13, color: "var(--signal)", marginBottom: 16 }}
          >
            interactive
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              color: "var(--ink)",
              marginBottom: 20,
              maxWidth: 720,
            }}
          >
            Ask my portfolio.
          </h2>
          <p
            style={{
              color: "var(--ink-dim)",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            A tiny retrieval engine over the facts of this site — no external
            APIs, nothing generated. Every answer is pulled verbatim from real
            project data.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(query);
            }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about projects, stack, availability…"
              aria-label="Ask this portfolio a question"
              style={{ ...inputStyle, maxWidth: 420, flex: "1 1 260px" }}
            />
            <button
              type="submit"
              data-cursor-hover
              className="mono"
              style={{
                padding: "14px 28px",
                background: "var(--signal)",
                color: "var(--bg)",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              ask
            </button>
          </form>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 20,
            }}
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                data-cursor-hover
                className="mono"
                style={{
                  fontSize: 12,
                  color: "var(--ink-dim)",
                  border: "1px solid var(--hairline-strong)",
                  padding: "6px 14px",
                  borderRadius: 100,
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* aria-live lets screen readers announce answers as they arrive. */}
          <div role="status" aria-live="polite">
            {result && (
              <div
                style={{
                  marginTop: 36,
                  border: "1px solid var(--signal)",
                  borderRadius: 12,
                  background: "var(--bg-card)",
                  padding: "28px 26px",
                  maxWidth: 680,
                }}
              >
                <p
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: "var(--signal)",
                    marginBottom: 12,
                  }}
                >
                  matched topic: {result.id}
                </p>
                <h3
                  style={{
                    fontSize: 20,
                    color: "var(--ink)",
                    fontWeight: 500,
                    marginBottom: 14,
                  }}
                >
                  {result.title}
                </h3>
                <p
                  style={{
                    color: "var(--ink-dim)",
                    fontSize: 15,
                    lineHeight: 1.75,
                    marginBottom: result.detail ? 12 : 0,
                  }}
                >
                  {result.summary}
                </p>
                {result.detail && (
                  <p
                    style={{
                      color: "var(--ink-faint)",
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    {result.detail}
                  </p>
                )}
                {result.links && (
                  <div style={{ display: "flex", gap: 18, marginTop: 18 }}>
                    {result.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target={
                          l.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          l.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        data-cursor-hover
                        className="mono"
                        style={{ fontSize: 13, color: "var(--signal)" }}
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
            {missed && (
              <p
                style={{
                  marginTop: 32,
                  color: "var(--ink-faint)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  maxWidth: 520,
                }}
              >
                I couldn&rsquo;t confidently match that. Try one of the topics
                above — or skip straight to{" "}
                <a
                  href="/contact"
                  data-cursor-hover
                  style={{ color: "var(--signal)" }}
                >
                  contacting Sehaj directly
                </a>
                .
              </p>
            )}
          </div>

          <p
            className="mono"
            style={{ marginTop: 44, fontSize: 11, color: "var(--ink-faint)" }}
          >
            static retrieval over site data · zero external calls · the nav
            above always works without this
          </p>
        </Reveal>
      </div>
    </section>
  );
}