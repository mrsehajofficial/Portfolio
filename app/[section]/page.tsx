import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PortfolioSections from "@/components/PortfolioSections";

const SECTIONS = ["work", "about", "stack", "contact"] as const;

const SECTION_META: Record<string, { title: string; description: string }> = {
  work: {
    title: "Selected Work",
    description:
      "Featured projects by Sehaj Varma — including Amai Yuki, a real-time Flutter messaging app, plus automation scripts and REST API prototypes.",
  },
  about: {
    title: "About",
    description:
      "Sehaj Varma — developer focused on workflow automation, AI integrations, RAG architectures, and clean backend structures.",
  },
  stack: {
    title: "Stack",
    description:
      "Sehaj Varma's capabilities grouped for fast scanning: AI (OpenAI, Gemini, RAG, agents, prompt orchestration), Backend (Python, Flask, REST APIs, SQLite), Automation (scripting, scheduled jobs, file processing, API integrations), Frontend (HTML/CSS/JS, Flutter, Dart), Deployment (Vercel, Netlify, Render, Wasmer).",
  },
  contact: {
    title: "Contact",
    description:
      "Get in touch with Sehaj Varma about workflow automation, backend challenges, or open-source collaborations.",
  },
};

type SectionPageProps = { params: Promise<{ section: string }> };

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  if (!SECTIONS.includes(section as (typeof SECTIONS)[number])) notFound();
  return <PortfolioSections />;
}

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const meta = SECTION_META[section];
  if (!meta) return {};
  return {
    // The root layout's title template adds "— Sehaj Varma", so just provide
    // the section name here to avoid double-suffixing.
    title: meta.title,
    description: meta.description,
  };
}