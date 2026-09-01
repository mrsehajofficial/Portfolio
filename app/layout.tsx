import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Cursor from "@/components/Cursor";
import Noise from "@/components/Noise";
import BackToTop from "@/components/BackToTop";
// Single canonical-origin source of truth shared with robots.ts / sitemap.ts.
import { SITE_HOST, SITE_NAME, SITE_URL } from "@/lib/site";

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

// Descriptive page title for <title> / og:title / twitter:title. The SHORT
// site name used for og:site_name and the WebSite JSON-LD lives in lib/site.ts
// as SITE_NAME — Google's site-name picker wants a concise name there, not a
// title-length string (which is why Google previously fell back to "Wasmer").
const SITE_TITLE = "Sehaj Varma — AI Automation Engineer & Backend Developer";
const SITE_DESCRIPTION =
  "AI Automation Engineer and Python Backend Developer building LLM agents, RAG systems, API integrations, automation workflows, and Flask backends that turn repetitive workflows into reliable software.";

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
    // Concise site name from lib/site.ts — NOT the page title. Google reads
    // this and the WebSite JSON-LD below to label the whole site in results.
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
    title: SITE_TITLE,
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
    // Google Search's favicon picker only accepts BMP / GIF / ICO / PNG /
    // JPEG / PPM / TIFF — SVG is NOT a supported search-favicon format, so the
    // classic multi-resolution favicon.ico is listed first. The SVG remains
    // the crisp master for modern browsers; PNGs back platforms that skip SVG
    // icons (notably Apple, plus several crawlers' preview pipelines).
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    // Safari/iOS cannot render SVG apple-touch-icons — must be a real PNG.
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
      // This homepage IS Sehaj's public profile. ProfilePage is Google's
      // documented type for "a page whose primary purpose is to describe a
      // person" — it binds the whole document to the Person entity below,
      // reinforcing the same identity the WebSite site-name preference and
      // the favicon hang off. mainEntity references the Person by @id, so
      // all three nodes resolve as one connected entity graph.
      "@type": "ProfilePage",
      "@id": `${SITE_URL}#profilepage`,
      url: SITE_URL,
      inLanguage: "en",
      mainEntity: { "@id": `${SITE_URL}#sehaj-varma` },
      // First public commit (truthful, from git history).

      // Evaluated at prerender — same freshness pattern as sitemap.ts.
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#sehaj-varma`,
      name: "Sehaj Varma",
      givenName: "Sehaj",
      familyName: "Varma",
      // Shorter nickname — recommended on the ProfilePage mainEntity in
      // Google's docs/example.
      alternateName: "Sehaj",
      // Platform identifier, mirroring Google's ProfilePage example.
      identifier: "mrsehajofficial", // GitHub username
      // Real public interaction metrics — the creator-popularity signal the
      // ProfilePage docs recommend (InteractionCounter → FollowAction).
      // Counts are true as of Aug 2026; bump them on future deploys.
      interactionStatistic: [
        {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/FollowAction",
          userInteractionCount: 1, // GitHub followers
        },
      ],
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
      sameAs: ["https://github.com/mrsehajofficial"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      // Concise site name per Google's site-names doc — this is the strongest
      // lever for the "site name" line in search results.
      name: SITE_NAME,
      // Preference ladder per Google's troubleshooting guidance: the bare
      // person name and its shorter nickname (both strong identity signals
      // tied to the Person entity in this same @graph), then the bare
      // subdomain in all lowercase as the documented final preference before
      // Google falls back to the hosting domain's own brand ("Wasmer" for
      // *.wasmer.app).
      alternateName: ["Sehaj Varma", "Sehaj", SITE_HOST],
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
