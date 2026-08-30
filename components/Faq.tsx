import Link from "next/link";
import Reveal from "./Reveal";
import { SITE_URL } from "@/lib/site";

/**
 * Static FAQ section — pure server-rendered HTML (the answers are readable
 * without JavaScript) plus a matching FAQPage JSON-LD block generated from
 * the SAME data, so schema and visible text can never drift apart.
 *
 * Question-style headings and concise, factual, extractable answers are the
 * format that Google AI Overviews / AI Mode and other answer engines cite
 * most readily (Generative Engine Optimization).
 */
const FAQS: { question: string; answer: string }[] = [
  {
    question: "Who is Sehaj Varma?",
    answer:
      "Sehaj Varma is an AI Automation Engineer and Backend Developer based in India, open to remote work worldwide. He builds LLM agents, RAG pipelines, Python automation suites, and Flask backends that turn repetitive workflows into reliable software.",
  },
  {
    question: "What does Sehaj Varma specialize in?",
    answer:
      "Workflow automation and backend engineering: Python scripting for scheduled jobs, file processing, and API-to-API integrations — plus structured REST APIs in Flask on clean SQLite schemas, with input validation and modular, documented codebases.",
  },
  {
    question: "What is Amai Yuki?",
    answer:
      "Amai Yuki is Sehaj's flagship project: a cross-platform real-time messaging application with direct and group chats, a custom in-app camera module, and Provider-based state architecture — built on a Python/Flask REST backend with SQLite and a Flutter/Dart frontend. The frontend is open-source on GitHub and testable today; the backend is private but fully functional.",
  },
  {
    question: "What AI technologies does Sehaj work with?",
    answer:
      "OpenAI and Gemini API integrations, prompt orchestration engineering, RAG (Retrieval-Augmented Generation) architecture, and conversational agents that connect LLMs to external APIs so they retrieve real-world data instead of guessing.",
  },
  {
    question: "What is Sehaj Varma's tech stack?",
    answer:
      "Five capability groups — AI (OpenAI, Gemini, RAG, agents, prompt orchestration), Backend (Python, Flask, REST APIs, SQLite), Automation (Python scripting, scheduled jobs, file processing, API integrations), Frontend (HTML/CSS/JavaScript, Flutter, Dart), and Deployment (Vercel, Netlify, Render, Wasmer).",
  },
  {
    question: "Is Sehaj Varma available for freelance work?",
    answer:
      "Yes — he is currently available for AI automation, Python backends, API integration, and freelance projects. Reach him at mr.sehaj.official@gmail.com or via GitHub at github.com/mrsehajofficial.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE_URL}#faq`,
  mainEntity: FAQS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function Faq() {
  return (
    <section
      id="faq"
      style={{
        padding: "160px 0",
        borderTop: "1px solid var(--hairline)",
      }}
    >
      <div className="container">
        <Reveal>
          <p
            className="mono"
            style={{ fontSize: 13, color: "var(--signal)", marginBottom: 16 }}
          >
            faq
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              color: "var(--ink)",
              marginBottom: 20,
              maxWidth: 720,
            }}
          >
            Frequently asked, plainly answered.
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
            Short, factual answers about who Sehaj is, what he builds, and how
            to work with him — no fluff.
          </p>
          <Link
            href="/faq"
            data-cursor-hover
            className="mono"
            style={{
              fontSize: 13,
              color: "var(--signal)",
              display: "inline-block",
              marginTop: 8,
            }}
          >
            the full faq page with the expanded answers →
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div style={{ maxWidth: 760 }}>
            {FAQS.map(({ question, answer }) => (
              <div
                key={question}
                style={{
                  borderBottom: "1px solid var(--hairline)",
                  padding: "26px 0",
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    color: "var(--ink)",
                    fontWeight: 500,
                    marginBottom: 10,
                  }}
                >
                  {question}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--ink-dim)",
                    lineHeight: 1.75,
                  }}
                >
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* FAQPage structured data — generated from the same FAQS array the
          visible answers render from, so they can never disagree. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
