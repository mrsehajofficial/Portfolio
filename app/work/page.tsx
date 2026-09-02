import type { Metadata } from "next";
import Link from "next/link";
import PressNav from "@/components/PressNav";
import PressFooter from "@/components/PressFooter";
import CurtainReveal from "@/components/CurtainReveal";
import { FLAGSHIP, EVIDENCE, PERSON } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI, Python & Backend Projects — Case Studies",
  description:
    "The full Amai Yuki case study — Python/Flask backend, Flutter frontend, LLM features — plus the automation and RAG work behind the numbers.",
  alternates: { canonical: `${SITE_URL}work` },
  openGraph: {
    type: "website",
    title: "AI, Python & Backend Projects — Case Studies — Sehaj Varma",
    description:
      "The full Amai Yuki case study — Python/Flask backend, Flutter frontend, LLM features — plus the automation and RAG work behind the numbers.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "Amai Yuki",
  description:
    "Cross-platform real-time messaging application with a Python/Flask backend and Flutter frontend, including direct/group chats and a custom in-app camera module.",
  codeRepository: PERSON.githubRepo,
  programmingLanguage: ["Dart", "Python", "TypeScript"],
  author: { "@type": "Person", name: PERSON.name, url: SITE_URL },
};

const BUILD_BLOCKS: { label: string; body: string }[] = [
  {
    label: "flask rest backend on sqlite",
    body: "A modular Python/Flask REST API with SQLite persistence and input validation on every route. The first version skipped validation — one bad payload taught me that lesson permanently. Documentation thorough enough that future collaborators never have to ask.",
  },
  {
    label: "direct & group chat flows",
    body: "Real-time messaging over the project's own protocol layer instead of someone else's. That's the load-bearing decision: it's the reason latency and data flow stay mine to control.",
  },
  {
    label: "custom in-app camera module",
    body: "A capture module built directly into the Flutter frontend — the kind of feature off-the-shelf messaging backends simply don't expose, and the reason the app had to own the frontend too.",
  },
  {
    label: "provider-based state architecture",
    body: "Clean Provider-based state across the frontend so chat, camera, and LLM-feature state stay predictable as the app grows. Boring on purpose; boring is what survives.",
  },
  {
    label: "llm integrations in chat",
    body: "OpenAI & Gemini wired into chat workflows via prompt orchestration. The goal isn't a flashy demo — it's an LLM feature that behaves the same on a Tuesday afternoon as it did on launch day.",
  },
];

export default function WorkPage() {
  return (
    <>
      <PressNav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="page-eyebrow mono">Form 02 — case study</p>
            <h1 className="page-h1">
              {FLAGSHIP.title} — from zero to{" "}
              <em className="accent-over">shipped.</em>
            </h1>
            <p className="lead">
              The full story of {FLAGSHIP.title}: a cross-platform real-time
              messaging app. This is the engineering narrative with the
              decisions, the tradeoffs, and the parts that didn&rsquo;t work
              the first time.
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <CurtainReveal>
            <p className="form-eyebrow mono" style={{ color: "var(--ink-50)" }}>
              the problem
            </p>
            <h2 className="group-h2" style={{ marginTop: 16 }}>
              Why build your own messaging backend?
            </h2>
            <p className="section-body" style={{ marginTop: 18 }}>
              {FLAGSHIP.problem}
            </p>
          </CurtainReveal>

          <CurtainReveal delay={0.05}>
            <p
              className="form-eyebrow mono"
              style={{ color: "var(--ink-50)", marginTop: 56 }}
            >
              the build blocks
            </p>
            {BUILD_BLOCKS.map((block) => (
              <div className="group-row" key={block.label}>
                <h3 className="group-h2">{block.label}</h3>
                <p className="section-body" style={{ marginTop: 12 }}>
                  {block.body}
                </p>
              </div>
            ))}
          </CurtainReveal>

          <CurtainReveal delay={0.05}>
            <p
              className="form-eyebrow mono"
              style={{ color: "var(--ink-50)", marginTop: 44 }}
            >
              the result
            </p>
            <div className="plate-card crop" style={{ marginTop: 16 }}>
              <h3>{FLAGSHIP.title}</h3>
              <p>{FLAGSHIP.result}</p>
              <div className="tag-row" style={{ marginTop: 18 }}>
                {FLAGSHIP.tags.map((t) => (
                  <span className="pill" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={FLAGSHIP.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="source-link"
                style={{ display: "inline-block", marginTop: 22 }}
              >
                view source ↗
              </a>
            </div>
          </CurtainReveal>

          <CurtainReveal delay={0.1}>
            <p
              className="eyebrow-late mono"
              style={{ color: "var(--ink-30)", marginTop: 64 }}
            >
              appendix — more evidence
            </p>
            <div className="cards-3" style={{ marginTop: 20 }}>
              {EVIDENCE.map((card) => (
                <div className="plate-card" key={card.id}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </CurtainReveal>

          <CurtainReveal delay={0.1}>
            <div className="link-row">
              <Link href="/stack" data-cursor-hover className="text-link">
                see the full stack page →
              </Link>
              <Link href="/#contact" data-cursor-hover className="text-link dim">
                get in touch →
              </Link>
            </div>
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