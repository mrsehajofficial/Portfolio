import type { MetadataRoute } from "next";

// Same canonical-origin constant consumed by robots.ts / sitemap.ts / layout.tsx.
import { SITE_NAME, SITE_URL } from "../lib/site";

/**
 * PWA / identity manifest, served by Next at /manifest.webmanifest.
 *
 * This is the machine-readable "about this site" card: browsers use it for
 * install prompts / splash screens and favicon fallbacks, and indexers &
 * assistants surface it as the authoritative name/description of the origin.
 *
 * Every URL is derived from lib/site.ts so the manifest can never drift from
 * what robots.txt, the sitemap and the page <head> declare.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    // Aligned with lib/site.ts SITE_NAME so every identity surface (head,
    // JSON-LD, manifest) tells indexers the same concise name.
    name: SITE_NAME,
    short_name: "Sehaj Varma",
    description:
      // 137 chars — kept in the same 100–140 band as the page meta descriptions.
      "Portfolio of Sehaj Varma: LLM agents, RAG pipelines, Python automation, and Flask backends that turn manual work into reliable software.",
    start_url: SITE_URL,
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    lang: "en",
    categories: ["portfolio", "developer", "technology"],
    icons: [
      {
        // Master vector source of truth — scales to any tab/bookmark size.
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      // Standard Android/desktop raster renditions.
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // Full-bleed art padded into the circle safe zone so Android launchers,
      // which mask icons aggressively, never crop the glyph
      {
        src: "/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
