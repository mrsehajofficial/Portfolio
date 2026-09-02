"use client";

import { useState } from "react";
import CurtainReveal from "./CurtainReveal";
import { scrollToSection } from "@/lib/scrollToSection";
import { answerFor, type KnowledgeCard } from "@/lib/portfolio-knowledge";

const SUGGESTIONS = [
  "What AI projects has Sehaj built?",
  "What's his tech stack?",
  "Tell me about Amai Yuki",
  "Is he available for freelance work?",
];

/**
 * AskPortfolio — the site's retrieval widget, styled as a job ticket on the
 * print-shop counter. Every answer is pulled verbatim from local site data;
 * zero external calls.
 */
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
    <section id="ask" className="ask-section">
      <div className="container">
        <CurtainReveal>
          <p className="form-eyebrow mono" style={{ color: "var(--ink-50)" }}>
            interactive — work order desk
          </p>
          <h2 className="ask-title">Ask the press.</h2>
          <p className="ask-note">
            A tiny retrieval engine over the facts of this site — no external
            APIs, nothing generated. Every answer is pulled verbatim from real
            project data.
          </p>
        </CurtainReveal>

        <CurtainReveal delay={0.05}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(query);
            }}
            className="ask-form"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about projects, stack, availability…"
              aria-label="Ask this portfolio a question"
              className="ask-input"
            />
            <button type="submit" data-cursor-hover className="ask-submit">
              ask
            </button>
          </form>

          <div className="ask-suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                data-cursor-hover
                className="ask-chip"
              >
                {s}
              </button>
            ))}
          </div>

          {result && (
            <div className="ask-result">
              <p className="ask-result-label">matched topic: {result.id}</p>
              <h3>{result.title}</h3>
              <p>{result.summary}</p>
              {result.detail && <p style={{ marginTop: 12 }}>{result.detail}</p>}
              {result.links && (
                <div className="pill-row" style={{ gap: 18, marginTop: 18 }}>
                  {result.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        l.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      data-cursor-hover
                      className="text-link"
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {missed && (
            <p className="ask-miss">
              I couldn&rsquo;t confidently match that. Try one of the topics
              above — or skip straight to{" "}
              <button
                onClick={() => scrollToSection("contact")}
                data-cursor-hover
                style={{ color: "var(--vermilion)", fontSize: "inherit" }}
              >
                contacting Sehaj directly
              </button>
              .
            </p>
          )}

          <p className="ask-footnote">
            static retrieval over site data · zero external calls · the nav
            above always works without this
          </p>
        </CurtainReveal>
      </div>
    </section>
  );
}