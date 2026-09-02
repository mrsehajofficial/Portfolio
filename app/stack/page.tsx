import type { Metadata } from "next";
import Link from "next/link";
import PressNav from "@/components/PressNav";
import PressFooter from "@/components/PressFooter";
import CurtainReveal from "@/components/CurtainReveal";
import { STACK, STACK_NOTE } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tech Stack: AI, Python, Flask, Flutter & More",
  description:
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

export default function StackPage() {
  return (
    <>
      <PressNav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="page-eyebrow mono">Form 04 — tools of the trade</p>
            <h1 className="page-h1">
              What I work with — <em className="accent-over">and where it ships.</em>
            </h1>
            <p className="lead">
              Grouped by what I deliver, not by logo wall. Everything below is
              something I&rsquo;ve shipped or used in real projects — with the
              receipts for where each one shows up.
            </p>
            <p className="lead" style={{ marginTop: 18, fontSize: 15.5, color: "var(--ink-50)" }}>
              {STACK_NOTE}
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          {STACK.map((group) => (
            <CurtainReveal key={group.name}>
              <div className="group-row">
                <h2 className="group-h2">{group.name}</h2>
                <div className="pill-row">
                  {group.items.map((item) => (
                    <span className="pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <p className="section-body">{group.where}</p>
              </div>
            </CurtainReveal>
          ))}

          <CurtainReveal delay={0.1}>
            <div className="link-row">
              <Link href="/work" data-cursor-hover className="text-link">
                see where these ship →
              </Link>
              <Link href="/#contact" data-cursor-hover className="text-link dim">
                get in touch →
              </Link>
            </div>
          </CurtainReveal>
        </div>
      </section>

      <PressFooter />
    </>
  );
}