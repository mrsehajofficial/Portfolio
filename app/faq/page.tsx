import type { Metadata } from "next";
import PressNav from "@/components/PressNav";
import PressFooter from "@/components/PressFooter";
import CurtainReveal from "@/components/CurtainReveal";
import { FAQS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ: Who is Sehaj Varma? What does he build?",
  description:
    "Plain answers about who Sehaj Varma is, his tech stack, the Amai Yuki project, and how to hire him for AI automation, Python backends, and freelance work.",
  alternates: { canonical: `${SITE_URL}faq` },
  openGraph: {
    type: "website",
    title: "FAQ: Who is Sehaj Varma? What does he build? — Sehaj Varma",
    description:
      "Plain answers about who Sehaj Varma is, his tech stack, the Amai Yuki project, and how to hire him for AI automation, Python backends, and freelance work.",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE_URL}faq`,
  mainEntity: FAQS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PressNav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="page-eyebrow mono">Form 05 — field questions</p>
            <h1 className="page-h1">
              Frequently asked, <em className="accent-over">plainly answered.</em>
            </h1>
            <p className="lead">
              Short, factual answers about who I am, what I build, and how to
              work with me. Everything here is something I&rsquo;d say over a
              call — no canned lines.
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <div className="slips">
            {FAQS.map(({ question, answer }, i) => (
              <div className="slip" key={question}>
                <div className="slip-head" style={{ cursor: "default" }}>
                  <span className="slip-num">
                    Q.{String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="slip-q">{question}</h2>
                </div>
                <div className="slip-a" style={{ paddingBottom: 30, paddingTop: 0 }}>
                  {answer}
                </div>
              </div>
            ))}
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        </div>
      </section>

      <PressFooter />
    </>
  );
}