import type { Metadata, Viewport } from "next";
import { Anton, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import RegCursor from "@/components/RegCursor";
import BackToTop from "@/components/BackToTop";
// Single canonical-origin source of truth shared with robots.ts / sitemap.ts.
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { PERSON } from "@/lib/content";

// ── Fonts ────────────────────────────────────────────────────────────────
// PAPER PRESS typefaces, self-hosted via next/font:
// Anton (single static weight 400 — one small file that preloads clean),
// Archivo (variable grotesk for body — one file covers 400–700),
// IBM Plex Mono (printer's notes — weights trimmed to exactly what CSS uses).
const fontDisplay = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const fontBody = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// ── Metadata ─────────────────────────────────────────────────────────────
const SITE_TITLE = "Sehaj Varma — AI Automation Engineer & Backend Developer";
const SITE_DESCRIPTION =
  "Sehaj Varma builds LLM agents, RAG pipelines, Python automation scripts, and Flask backends that turn manual workflows into reliable software. Open to remote work worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  generator: "Next.js",
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: "%s — Sehaj Varma",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI Automation Engineer",
    "Backend Developer",
    "Python Developer",
    "LLM Integration",
    "RAG Pipelines",
    "AI Chatbots",
    "System Architecture",
    "Flask",
    "REST APIs",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${PERSON.name} — ${PERSON.role} Portfolio Banner`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#f2efe8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

// ── JSON-LD — Speakable + ProfilePage + Person structured data ──────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfilePage", "Person"],
  mainEntity: {
    "@type": "Person",
    name: "Sehaj Varma",
    jobTitle: "AI Automation Engineer & Backend Developer",
    url: "https://sehaj.wasmer.app/",
    description:
      "AI Automation Engineer & Backend Developer from India. Builds LLM agents, RAG pipelines, Python/Flask backends, and real-time messaging apps (Amai Yuki). Specializing in prompt orchestration, workflow automation, and scalable systems.",
    image: "https://sehaj.wasmer.app/og-image.svg",
    email: "mr.sehaj.official@gmail.com",
    sameAs: [
      "https://github.com/mrsehajofficial",
      "https://github.com/mrsehajofficial/Amai-Yuki",
      "https://www.linkedin.com/in/mrsehajofficial/",
      "https://www.instagram.com/sehaj.varma.official/",
    ],
    knowsAbout: [
      "LLM agents",
      "RAG pipelines",
      "prompt orchestration",
      "Python automation",
      "Flask REST APIs",
      "real-time messaging systems",
      "distributed event streaming",
      "workflow automation",
    ],
    speakable: {
      "@type": "Speakable",
      cssSelector: "h1, .hero h1, .about h2",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://sehaj.wasmer.app/",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScrollProvider>
            <main id="main-content">{children}</main>
          </SmoothScrollProvider>
        </MotionProvider>
        <RegCursor />
        <BackToTop />
      </body>
    </html>
  );
}