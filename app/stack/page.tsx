import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // Rendered title = this + " — Sehaj Varma" template = 59 chars (target 50–60).
  title: "Tech Stack: AI, Python, Flask, Flutter & More",
  description:
    // 138 chars (target 100–140).
    "Tools behind the work, grouped by delivery: AI (OpenAI, Gemini, RAG), Python/Flask backends, automation scripts, Flutter, and deployment.",
  alternates: { canonical: `${SITE_URL}stack` },
  openGraph: {
    type: "website",
    title: "Tech Stack: AI, Python, Flask, Flutter & More — Sehaj Varma",
    description:
      "Tools behind the work, grouped by delivery: AI (OpenAI, Gemini, RAG), Python/Flask backends, automation scripts, Flutter, and deployment.",
    url: `${SITE_URL}stack`,
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

type CapabilityGroup = {
  name: string;
  items: string[];
  /** Grounded in real shipped work — where each group shows up. */
  where: string;
};

const GROUPS: CapabilityGroup[] = [
  {
    name: "AI",
    items: ["OpenAI", "Gemini", "RAG", "Agents", "Prompt orchestration"],
    where: "OpenAI and Gemini API integrations run inside Amai Yuki's LLM-assisted chat features. Prompt orchestration keeps outputs reliable; RAG architecture studies and conversational agents that connect LLMs to external APIs are the current deep-dive — so answers come from real data, not guesses.",
  },
  {
    name: "Backend",
    items: ["Python", "Flask", "REST APIs", "SQLite"],
    where: "The pattern: structured REST APIs in Flask on clean SQLite schemas — modular codebases, input validation on every route, and documentation thorough enough that future collaborators can read them without asking questions. Amai Yuki's messaging backend is the flagship example.",
  },
  {
    name: "Automation",
    items: ["Python scripting", "Scheduled jobs", "File processing", "API integrations"],
    where: "10+ private Python scripts spanning scheduled jobs, file-processing pipelines, and API-to-API integrations. Every one exists to turn a repeated manual step into a repeatable process.",
  },
  {
    name: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "Flutter", "Dart"],
    where: "Amai Yuki's Flutter/Dart frontend on a Provider-based state architecture — including its custom in-app camera module — plus responsive, accessible HTML/CSS/JavaScript like the site you're reading.",
  },
  {
    name: "Deployment",
    items: ["Vercel", "Netlify", "Render", "Wasmer"],
    where: "Shipped to four platforms. This portfolio itself runs as a static Next.js build on Wasmer.",
  },
];

export default function StackPage() {
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
              tools of the trade
            </p>
            <h1
              style={{
                fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
                color: "var(--ink)",
                maxWidth: 820,
                marginBottom: 24,
              }}
            >
              What I work with — and where it ships.
            </h1>
            <p
              style={{
                color: "var(--ink-dim)",
                fontSize: 16,
                lineHeight: 1.8,
                maxWidth: 640,
              }}
            >
              Grouped by what I deliver, not by logo wall. Everything below is
              something I&rsquo;ve shipped or used in real projects — with the
              receipts for where each one shows up.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "40px 0 140px" }}>
        <div className="container">
          {GROUPS.map((group) => (
            <Reveal key={group.name}>
              <div
                style={{
                  borderTop: "1px solid var(--hairline)",
                  padding: "40px 0",
                }}
              >
                <h2
                  style={{
                    fontSize: 22,
                    color: "var(--ink)",
                    fontWeight: 500,
                    marginBottom: 16,
                  }}
                >
                  {group.name}
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="mono"
                      style={{
                        fontSize: 12,
                        color: "var(--ink-dim)",
                        border: "1px solid var(--hairline-strong)",
                        padding: "5px 12px",
                        borderRadius: 100,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    color: "var(--ink-dim)",
                    fontSize: 15,
                    lineHeight: 1.8,
                    maxWidth: 680,
                  }}
                >
                  {group.where}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.05}>
            <div
              style={{
                display: "flex",
                gap: 32,
                flexWrap: "wrap",
                marginTop: 48,
              }}
            >
              <Link
                href="/work"
                data-cursor-hover
                className="mono"
                style={{ fontSize: 13, color: "var(--signal)" }}
              >
                see the work these tools shipped in →
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

      <Footer />
    </>
  );
}

