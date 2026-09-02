import type { Metadata } from "next";
import PressNav from "@/components/PressNav";
import PressFooter from "@/components/PressFooter";
import CurtainReveal from "@/components/CurtainReveal";
import { ABOUT, CONTACT, PERSON } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { personEntity } from "@/lib/entity";

export const metadata: Metadata = {
  title: "About: AI Automation Engineer & Python Dev",
  description:
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
    personEntity({
      description:
        "Sehaj Varma builds AI automation, LLM agents, RAG pipelines, and Python/Flask backends that turn manual workflows into reliable software.",
    }),
  ],
};

const WORKFLOW = [
  {
    title: "Understand the workflow first",
    body: "Before any code, I map the exact steps a human does today. That transcript — screenshots, logs, the half-remembered spreadsheet step — is the real spec.",
  },
  {
    title: "Ship something that runs today",
    body: "A working script that handles the happy path beats a perfect design that's still on paper. I get it running, then make it robust.",
  },
  {
    title: "Make it repeatable",
    body: "Input validation, clean schemas, scheduled runs — so the fix keeps working after I step away. The best automation is the one nobody has to babysit.",
  },
  {
    title: "Document like future-me is reading",
    body: "Write-ups thorough enough that collaborators can read the codebase without asking questions. I hold every private script to this, not just the public ones.",
  },
];
export default function AboutPage() {
  return (
    <>
      <PressNav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="page-eyebrow mono">Form 03 — the person</p>
            <h1 className="page-h1">{ABOUT.title}</h1>
            <p className="mini-label mono">
              {PERSON.name} · {PERSON.locationLine}
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <CurtainReveal>
            <div className="press-prose">
              {ABOUT.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <div className="pill-row">
              {ABOUT.pills.map((h) => (
                <span className="pill" key={h}>
                  {h}
                </span>
              ))}
            </div>
          </CurtainReveal>

          <CurtainReveal delay={0.05}>
            <p
              className="form-eyebrow mono"
              style={{ color: "var(--ink-50)", marginTop: 64 }}
            >
              how I work
            </p>
            {WORKFLOW.map((step, i) => (
              <div className="group-row" key={step.title}>
                <h3 className="group-h2">
                  {String(i + 1).padStart(2, "0")} — {step.title}
                </h3>
                <p className="section-body" style={{ marginTop: 12 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </CurtainReveal>

          <CurtainReveal delay={0.1}>
            <p
              className="form-eyebrow mono"
              style={{ color: "var(--ink-50)", marginTop: 40 }}
            >
              the numbers
            </p>
            <div className="stats-grid" style={{ marginTop: 18 }}>
              {ABOUT.stats.map((stat) => (
                <div className="plate-card" key={stat.label}>
                  <p className="stat-value">
                    {stat.value}
                    <span
                      className="stat-suffix"
                      style={{ color: "var(--vermilion)" }}
                    >
                      {stat.suffix}
                    </span>
                  </p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </CurtainReveal>

          <CurtainReveal delay={0.1}>
            <div className="link-row">
              <a
                href={`mailto:${PERSON.email}`}
                data-cursor-hover
                className="text-link"
              >
                {PERSON.email} ↗
              </a>
              <a
                href={PERSON.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="text-link dim"
              >
                github.com/mrsehajofficial ↗
              </a>
            </div>
            <p className="stat-label" style={{ marginTop: 26 }}>
              currently available for {CONTACT.availability.join(" · ")}
            </p>
          </CurtainReveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PressFooter />
    </>
  );
}