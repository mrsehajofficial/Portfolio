import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Inter,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Cursor from "@/components/Cursor";
import Noise from "@/components/Noise";
import BackToTop from "@/components/BackToTop";
// Single canonical-origin source of truth shared with robots.ts / sitemap.ts.
import { SITE_URL } from "@/lib/site";

// Self-hosted fonts via next/font. They replace the render-blocking Google
// Fonts @import that was previously in globals.css, remove the third-party
// timeout / cache-lifetime penalty, and let us define our own --font-* custom
// properties that the rest of the site's CSS consumes.
const fontDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_NAME = "Sehaj Varma — AI Automation Engineer & Backend Developer";
const SITE_DESCRIPTION =
  "AI Automation Engineer and Python Backend Developer building LLM agents, RAG systems, API integrations, automation workflows, and Flask backends that turn repetitive workflows into reliable software.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  generator: "Next.js",
  applicationName: "Sehaj Varma Portfolio",
  title: {
    default: SITE_NAME,
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
  authors: [{ name: "Sehaj Varma", url: SITE_URL }],
  creator: "Sehaj Varma",
  publisher: "Sehaj Varma",
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
    title: "Sehaj Varma — AI Automation Engineer & Backend Developer",
    description:
      "Official portfolio of Sehaj Varma. Building intelligent agents, Python automation suites, RAG pipelines, and scalable backend architecture.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sehaj Varma — AI Automation Engineer & Backend Developer Portfolio Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
  // Machine-readable identity card served from app/manifest.ts. Browsers use
  // it for install/splash surfaces; indexers treat it as origin-of-truth
  // name/description metadata.
  manifest: "/manifest.webmanifest",
  icons: {
    // SVG is the crisp master; PNGs below back platforms that skip SVG icons
    // (notably Apple, plus several crawlers' preview pipelines).
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.svg"],
    // Safari/iOS cannot render SVG apple-touch-icons — must be a real PNG.
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}#sehaj-varma`,
      name: "Sehaj Varma",
      url: SITE_URL,
      image: `${SITE_URL}og-image.png`,
      jobTitle: "AI Automation Engineer & Backend Developer",
      description: SITE_DESCRIPTION,
      email: "mailto:mr.sehaj.official@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      knowsAbout: [
        "Python",
        "Flask",
        "AI Automation",
        "Prompt Engineering",
        "LLM Integration",
        "RAG Pipelines",
        "Backend Development",
        "Workflow Automation",
        "Flutter",
        "REST APIs",
      ],
      sameAs: [
        "https://github.com/mrsehajofficial",
        "https://discord.com/channels/@me/1504410390791065631",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Sehaj Varma — AI Automation Engineer & Backend Developer",
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: {
        "@id": `${SITE_URL}#sehaj-varma`,
      },
    },
  ],
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
        <Noise />
        <Cursor />
        <BackToTop />
        <SmoothScrollProvider>
          <main id="main-content">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
