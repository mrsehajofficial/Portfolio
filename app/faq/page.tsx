import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // Rendered title = this + " — Sehaj Varma" template = 59 chars (target 50–60).
  title: "Portfolio FAQ: Projects, Stack & Availability",
  description:
    // 119 chars (target 100–140).
    "Straight answers about Sehaj Varma: who he is, what he builds, how to run Amai Yuki, and how to start working with him.",
  alternates: { canonical: `${SITE_URL}faq` },
  openGraph: {
    type: "website",
    title: "Portfolio FAQ: Projects, Stack & Availability — Sehaj Varma",
    description:
      "Straight answers about Sehaj Varma: who he is, what he builds, how to run Amai Yuki, and how to start working with him.",
    url: `${SITE_URL}faq`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sehaj Varma — AI Automation Engineer & Backend Developer Portfolio Banner",
      },
    ],
  },
};

// Question-style headings and concise, factual, extractable answers are the
// format answer engines (Google AI Overviews, AI Mode) cite most readily.
const FAQS: { question: string; answer: string }[] = [
  {
    question: "Who is Sehaj Varma?",
    answer:
      "Sehaj Varma is an AI Automation Engineer and Backend Developer based in India, open to remote work worldwide. He builds LLM agents, RAG pipelines, Python automation suites, and Flask backends that turn repetitive workflows into reliable software.",
  },
  {
    question: "What does Sehaj Varma specialize in?",
    answer:
      "Workflow automation and backend engineering: Python scripting for scheduled jobs, file processing, and API-to-API integrations — plus structured REST APIs in Flask on clean SQLite schemas, with input validation and modular, documented codebases. The through-line is repeatability: anything done twice manually is a candidate for a script or an endpoint.",
  },
  {
    question: "What is Amai Yuki?",
    answer:
      "Amai Yuki is Sehaj's flagship project: a cross-platform real-time messaging application with direct and group chats, a custom in-app camera module, and Provider-based state architecture — built on a Python/Flask REST backend with SQLite and a Flutter/Dart frontend. The frontend is open-source on GitHub and testable today; the backend is private but fully functional.",
  },
  {
    question: "How can I test Amai Yuki today?",
    answer:
      "The Flutter frontend is open-source at github.com/mrsehajofficial/Amai-Yuki and can be run today. The Python/Flask backend stays private, but it is fully functional and documented — the repository describes how the two halves fit together.",
  },
  {
    question: "What AI technologies does Sehaj work with?",
    answer:
      "OpenAI and Gemini API integrations, prompt orchestration engineering, RAG (Retrieval-Augmented Generation) architecture, and conversational agents that connect LLMs to external APIs so they retrieve real-world data instead of guessing. The applied testbed is Amai Yuki's LLM-assisted chat features, plus standalone prompt-orchestration experiments.",
  },
  {
    question: "What is Sehaj Varma's tech stack?",
    answer:
      "Five capability groups — AI (OpenAI, Gemini, RAG, agents, prompt orchestration), Backend (Python, Flask, REST APIs, SQLite), Automation (Python scripting, scheduled jobs, file processing, API integrations), Frontend (HTML/CSS/JavaScript, Flutter, Dart), and Deployment (Vercel, Netlify, Render, Wasmer). Every item is something shipped or used in real projects.",
  },
  {
    question: "Where is Sehaj Varma based?",
    answer:
      "India — open to remote work worldwide. He has shipped projects to four deployment platforms (Vercel, Netlify, Render, Wasmer) and works across AI automation, Python backends, and API integration.",
  },
  {
    question: "Is Sehaj Varma available for freelance work?",
    answer:
      "Yes — he is currently available for AI automation, Python backends, API integration, and freelance projects. Reach him at mr.sehaj.official@gmail.com or via GitHub at github.com/mrsehajofficial.",
  },
];

// FAQPage structured data generated from the SAME array the visible answers
// render from, so schema and visible text can never drift apart.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE_URL}faq`,
  mainEntity: FAQS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Nav />

      <section style={{ padding: "180px 0 60px" }}>
        <div className="container">
          <Reveal>
            <p
              className="mono"
              style={{ fontSize: 13, color: "var(--signal)", marginBottom: 16 }}
            >
              faq
            </p>
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
                color: "var(--ink)",
                maxWidth: 820,
                marginBottom: 24,
              }}
            >
              Frequently asked, plainly answered.
            </h1>
            <p
              style={{
                color: "var(--ink-dim)",
                fontSize: 16,
                lineHeight: 1.8,
                maxWidth: 640,
              }}
            >
              Longer answers than the homepage panel — who Sehaj is, what he
              builds, and how to work with him. No fluff.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "40px 0 140px" }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            {FAQS.map(({ question, answer }, i) => (
              <Reveal key={question} delay={Math.min(i * 0.04, 0.2)}>
                <div
                  style={{
                    borderBottom: "1px solid var(--hairline)",
                    padding: "28px 0",
                  }}
                >
                  <h2
                    style={{
                      fontSize: 18,
                      color: "var(--ink)",
                      fontWeight: 500,
                      marginBottom: 12,
                    }}
                  >
                    {question}
                  </h2>
                  <p
                    style={{
                      fontSize: 15,
                      color: "var(--ink-dim)",
                      lineHeight: 1.8,
                    }}
                  >
                    {answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <div
              style={{
                display: "flex",
                gap: 32,
                flexWrap: "wrap",
                marginTop: 56,
              }}
            >
              <Link
                href="/work"
                data-cursor-hover
                className="mono"
                style={{ fontSize: 13, color: "var(--signal)" }}
              >
                see the work →
              </Link>
              <Link
                href="/#contact"
                data-cursor-hover
                className="mono"
                style={{ fontSize: 13, color: "var(--ink-dim)" }}
              >
                get in touch →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Footer />
    </>
  );
}

