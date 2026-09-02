import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // Rendered title = this + " — Sehaj Varma" template = 56 chars (target 50–60).
  title: "About: AI Automation Engineer & Python Dev",
  description:
    // 140 chars (target 100–140).
    "How Sehaj works: AI automation, LLM integrations, Python backends — and what he's available for, from freelance projects to full-time roles.",
  alternates: { canonical: `${SITE_URL}about` },
  openGraph: {
    type: "website",
    title: "About: AI Automation Engineer & Python Dev — Sehaj Varma",
    description:
      "How Sehaj works: AI automation, LLM integrations, Python backends — and what he's available for, from freelance projects to full-time roles.",
    url: `${SITE_URL}about`,
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

const STATS = [
  { value: "10+", label: "Private automation scripts built" },
  { value: "4+", label: "AI integration prototypes" },
  { value: "4+", label: "Deployment platforms shipped to" },
];

const FOCUS_AREAS = [
  "Workflow Automation",
  "Clean API Structures",
  "AI API Integrations",
  "System Scripting",
];

// The Person entity uses the SAME @id as the homepage graph, so search
// engines unify both documents into one identity.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}about#aboutpage`,
      url: `${SITE_URL}about`,
      name: "About Sehaj Varma — AI Automation Engineer & Backend Developer",
      inLanguage: "en",
      mainEntity: { "@id": `${SITE_URL}#sehaj-varma` },
      dateModified: new Date().toISOString().slice(0, 10),
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#sehaj-varma`,
      name: "Sehaj Varma",
      givenName: "Sehaj",
      familyName: "Varma",
      alternateName: "Sehaj",
      identifier: "mrsehajofficial",
      url: SITE_URL,
      image: `${SITE_URL}og-image.png`,
      jobTitle: "AI Automation Engineer & Backend Developer",
      description:
        "Sehaj Varma builds AI automation, LLM agents, RAG pipelines, and Python/Flask backends that turn manual workflows into reliable software.",
      email: "mailto:mr.sehaj.official@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      sameAs: ["https://github.com/mrsehajofficial"],
    },
  ],
};

export default function AboutPage() {
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
              about
            </p>
            <h1
              style={{
                fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
                color: "var(--ink)",
                maxWidth: 900,
                marginBottom: 24,
              }}
            >
              Building efficient workflows and clean backend structures.
            </h1>
            <p
              className="mono"
              style={{ fontSize: 13, color: "var(--ink-faint)" }}
            >
              Sehaj Varma · India — open to remote work worldwide
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "40px 0 60px" }}>
        <div className="container">
          <Reveal>
            <div
              style={{
                color: "var(--ink-dim)",
                fontSize: 17,
                lineHeight: 1.9,
                maxWidth: 720,
              }}
            >
              <p style={{ marginBottom: 24 }}>
                Sehaj Varma is an AI Automation Engineer and Backend Developer
                who builds LLM agents, RAG pipelines, Python automation suites,
                and Flask backends that turn repetitive workflows into reliable
                software.
              </p>
              <p style={{ marginBottom: 24 }}>
                I build Python automation scripts that turn repetitive file,
                API, and data-processing workflows into repeatable processes.
                Software clicked for me because I enjoy logic puzzles — and
                every manual step scripted away is a step nobody has to do
                again.
              </p>
              <p style={{ marginBottom: 24 }}>
                Currently I&rsquo;m deep-diving into AI integrations: studying
                prompt orchestration, learning RAG (Retrieval-Augmented
                Generation) architectures, and building conversational agents
                that connect LLMs to external APIs so they retrieve real-world
                data instead of guessing.
              </p>
              <p style={{ marginBottom: 0 }}>
                On the backend side, I ship structured REST APIs with Flask on
                clean SQLite schemas — modular codebases, input validation, and
                documentation thorough enough that future-me (or you) can read
                them without asking questions.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "40px 0 140px" }}>
        <div className="container">
          <Reveal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 72,
              }}
            >
              {FOCUS_AREAS.map((area) => (
                <span
                  key={area}
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: "var(--ink-dim)",
                    border: "1px solid var(--hairline-strong)",
                    padding: "5px 12px",
                    borderRadius: 100,
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginBottom: 88,
              }}
              className="stats-grid"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    border: "1px solid var(--hairline)",
                    borderRadius: 12,
                    padding: "24px 22px",
                  }}
                >
                  <p
                    className="mono"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 2.8rem)",
                      color: "var(--ink)",
                      fontWeight: 500,
                      marginBottom: 8,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mono"
                    style={{ fontSize: 12, color: "var(--ink-faint)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                borderTop: "1px solid var(--hairline)",
                paddingTop: 40,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 32,
              }}
            >
              <div>
                <p
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "var(--ink-faint)",
                    marginBottom: 12,
                  }}
                >
                  currently available for
                </p>
                <p style={{ color: "var(--ink-dim)", fontSize: 15 }}>
                  AI automation · Python backends · API integration · freelance
                  projects
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <a
                  href="mailto:mr.sehaj.official@gmail.com"
                  data-cursor-hover
                  className="mono"
                  style={{ fontSize: 13, color: "var(--signal)" }}
                >
                  mr.sehaj.official@gmail.com ↗
                </a>
                <a
                  href="https://github.com/mrsehajofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="mono"
                  style={{ fontSize: 13, color: "var(--signal)" }}
                >
                  github.com/mrsehajofficial ↗
                </a>
              </div>
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
                href="/work"
                data-cursor-hover
                className="mono"
                style={{ fontSize: 13, color: "var(--signal)" }}
              >
                see the full work page →
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

      {/* AboutPage + Person — the Person @id matches the homepage graph. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        @media (max-width: 860px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Footer />
    </>
  );
}


