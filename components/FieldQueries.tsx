"use client";

import { useState } from "react";
import Link from "next/link";
import CurtainReveal from "./CurtainReveal";
import { FAQS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/**
 * FieldQueries — the FAQ as a stack of proof slips.
 * Each slip unfolds (paper reveal) when opened. The FAQPage JSON-LD is
 * generated from the SAME data array as the visible text — they can never
 * drift, and answers stay extractable for AI Overviews.
 */
export default function FieldQueries() {
  const [open, setOpen] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${SITE_URL}#faq`,
    mainEntity: FAQS.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <section id="faq" className="slips-section">
      <div className="container">
        <CurtainReveal>
          <header>
            <p className="form-eyebrow mono">Form 05 — field questions</p>
            <h2 className="section-title" style={{ color: "var(--ink)" }}>
              Frequently asked, <em className="accent-over">plainly answered.</em>
            </h2>
            <p
              className="section-note"
              style={{ color: "var(--ink-70)", marginTop: 16 }}
            >
              Short, factual answers about who I am, what I build, and how to
              work with me — no fluff.
            </p>
            <Link
              href="/faq"
              data-cursor-hover
              className="text-link"
              style={{ display: "inline-block", marginTop: 22 }}
            >
              the full faq page with the expanded answers →
            </Link>
          </header>
        </CurtainReveal>

        <CurtainReveal delay={0.05}>
          <div className="slips">
            {FAQS.map(({ question, answer }, i) => {
              const isOpen = open === i;
              return (
                <div className="slip" key={question}>
                  <button
                    className="slip-head"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`slip-${i}`}
                    data-cursor-hover
                  >
                    <span className="slip-num">
                      Q.{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="slip-q">{question}</span>
                    <span className="slip-mark" aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div
                    className="slip-body"
                    id={`slip-${i}`}
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition:
                        "grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <p className="slip-a">{answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CurtainReveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}