import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Sehaj Varma — the full Amai Yuki real-time messaging case study (Python/Flask backend, Flutter frontend, LLM integrations), plus the automation scripts and AI/RAG experiments behind the numbers.",
  alternates: { canonical: `${SITE_URL}work` },
  openGraph: {
    type: "website",
    title: "Work — Sehaj Varma",
    description:
      "The full Amai Yuki case study — a real-time messaging app shipped end-to-end on a Python/Flask backend and a Flutter frontend — plus the automation and AI/RAG evidence.",
    url: `${SITE_URL}work`,
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

// Same factual project markup as the homepage — consistent on every page
// where the project is described.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "Amai Yuki",
  description:
    "Cross-platform real-time messaging application with a Python/Flask backend and Flutter frontend, including direct/group chats and a custom in-app camera module.",
  codeRepository: "https://github.com/mrsehajofficial/Amai-Yuki",
  programmingLanguage: ["Dart", "Python", "TypeScript"],
  author: {
    "@type": "Person",
    name: "Sehaj Varma",
    url: SITE_URL,
  },
};

const BUILD_BLOCKS: { label: string; body: string }[] = [
  {
    label: "flask rest backend on sqlite",
    body: "A modular Python/Flask REST API with SQLite persistence and input validation on every route — codebases documented thoroughly enough that future collaborators can read them without asking questions.",
  },
  {
    label: "direct & group chat flows",
    body: "Real-time messaging with direct and group chats running over the project's own protocol layer, instead of a third-party messaging backend that would cap control over data flow and latency.",
  },
  {
    label: "custom in-app camera module",
    body: "A capture module built directly into the Flutter frontend — the custom capture features that off-the-shelf messaging backends can't expose.",
  },
  {
    label: "provider-based state architecture",
    body: "A clean Provider-based architecture across the Flutter frontend, keeping chat, camera, and LLM feature state predictable as the app grows.",
  },
  {
    label: "llm integrations in chat",
    body: "OpenAI & Gemini API integrations layered into the chat workflows, driven by prompt orchestration so LLM-assisted features stay reliable.",
  },
];

const EVIDENCE: { title: string; body: string }[] = [
  {
    title: "Automation scripts",
    body: "10+ private Python tools across scheduled jobs, file-processing pipelines, and API-to-API integrations. Every one exists to turn a repeated manual step into a repeatable process — the work behind the numbers on the homepage.",
  },
  {
    title: "AI / RAG experiments",
    body: "OpenAI & Gemini API integrations, prompt orchestration systems, and RAG (Retrieval-Augmented Generation) architecture studies — the experiments feeding Amai Yuki's LLM-assisted features. The goal: agents that connect LLMs to external APIs so they retrieve real-world data instead of guessing.",
  },
  {
    title: "This portfolio itself",
    body: "A static Next.js build with truthful server-rendered counters, structured data (ProfilePage, Person, WebSite, FAQPage), direct verified contact channels, and a fully client-side retrieval assistant — zero external calls.",
  },
];

export default function WorkPage() {
  return (
    <>
      <Nav />

      <section style={{ padding: "180px 0 80px" }}>
        <div className="container">
          <Reveal>
            <p
              className="mono"
              style={{ fontSize: 13, color: "var(--signal)", marginBottom: 16 }}
            >
              selected work
            </p>
            <h1
              style={{
                fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
                color: "var(--ink)",
                maxWidth: 820,
                marginBottom: 24,
              }}
            >
              A project built from scratch, end-to-end.
            </h1>
            <p
              style={{
                color: "var(--ink-dim)",
                fontSize: 16,
                lineHeight: 1.8,
                maxWidth: 640,
              }}
            >
              Proof over promises. This is the long version: what was built,
              why it exists, and what it runs on — followed by the automation
              and AI work behind the numbers.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "40px 0 140px" }}>
        <div className="container">
          <Reveal>
            <article
              style={{
                borderTop: "1px solid var(--hairline)",
                borderBottom: "1px solid var(--hairline)",
                padding: "56px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: 16,
                  marginBottom: 28,
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: 13, color: "var(--ink-faint)" }}
                >
                  project-01
                </span>
                <span
                  className="mono"
                  style={{ fontSize: 12, color: "var(--ink-faint)" }}
                >
                  2026
                </span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                  color: "var(--ink)",
                  marginBottom: 20,
                }}
              >
                Amai Yuki — Real-Time Messaging App
              </h2>
              <p
                style={{
                  color: "var(--ink-dim)",
                  fontSize: 16,
                  lineHeight: 1.8,
                  maxWidth: 720,
                  marginBottom: 40,
                }}
              >
                A cross-platform real-time messaging application with direct
                and group chats, a custom in-app camera module, and a clean
                Provider-based architecture — designed and shipped end-to-end
                across a Python/Flask backend and a Flutter frontend.
              </p>

              <div
                style={{
                  borderLeft: "2px solid var(--hairline-strong)",
                  paddingLeft: 24,
                  marginBottom: 44,
                }}
              >
                <p
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "var(--ink-faint)",
                    marginBottom: 10,
                  }}
                >
                  the problem
                </p>
                <p
                  style={{
                    color: "var(--ink-dim)",
                    fontSize: 15,
                    lineHeight: 1.75,
                    maxWidth: 680,
                  }}
                >
                  Third-party messaging backends cap control over data flow,
                  latency, and custom capture features — so the product needed
                  its own protocol layer.
                </p>
              </div>

              <p
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "var(--ink-faint)",
                  marginBottom: 18,
                }}
              >
                what i built
              </p>
              <div
                className="build-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 16,
                  marginBottom: 44,
                }}
              >
                {BUILD_BLOCKS.map((block) => (
                  <div
                    key={block.label}
                    style={{
                      border: "1px solid var(--hairline)",
                      borderRadius: 12,
                      padding: "24px 22px",
                    }}
                  >
                    <h3
                      className="mono"
                      style={{
                        fontSize: 12,
                        color: "var(--signal)",
                        fontWeight: 500,
                        marginBottom: 12,
                      }}
                    >
                      {block.label}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--ink-dim)",
                        lineHeight: 1.75,
                      }}
                    >
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderLeft: "2px solid var(--signal)",
                  paddingLeft: 24,
                  marginBottom: 44,
                }}
              >
                <p
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "var(--ink-faint)",
                    marginBottom: 10,
                  }}
                >
                  the result
                </p>
                <p
                  style={{
                    color: "var(--ink-dim)",
                    fontSize: 15,
                    lineHeight: 1.75,
                    maxWidth: 680,
                  }}
                >
                  Fully functional product: the frontend is open-source and
                  testable today; the backend stays private but documented.
                  Frontend polish was accelerated with AI tooling under my
                  prompt-engineering direction.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 20,
                }}
              >
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["Python", "Flask", "Provider", "LLM", "Flutter"].map(
                    (tag) => (
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
                    ),
                  )}
                </div>
                <a
                  href="https://github.com/mrsehajofficial/Amai-Yuki"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="mono"
                  style={{ fontSize: 14, color: "var(--signal)" }}
                >
                  view source ↗
                </a>
              </div>
            </article>
          </Reveal>

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
              {EVIDENCE.map((card) => (
                <div
                  key={card.title}
                  style={{
                    border: "1px solid var(--hairline)",
                    borderRadius: 12,
                    padding: "24px 22px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      color: "var(--ink)",
                      fontWeight: 500,
                      marginBottom: 12,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--ink-faint)",
                      lineHeight: 1.75,
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                display: "flex",
                gap: 32,
                flexWrap: "wrap",
                marginTop: 64,
              }}
            >
              <Link
                href="/stack"
                data-cursor-hover
                className="mono"
                style={{ fontSize: 13, color: "var(--signal)" }}
              >
                see the full stack page →
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

      {/* Structured data so search engines can attribute the repo properly. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        @media (max-width: 860px) {
          .build-grid,
          .ev-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Footer />
    </>
  );
}




