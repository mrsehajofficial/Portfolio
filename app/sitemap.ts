import { MetadataRoute } from "next";

import { SITE_URL } from "../lib/site";

type PagePath = "/";

interface PageSpec {
  path: PagePath;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}

/**
 * Every URL here is built from the one canonical-origin constant in
 * lib/site.ts (https://sehaj.wasmer.app) — never the retired
 * bitbridge.work.gd domain, which permanently redirects via next.config.mjs.
 *
 * The portfolio is a single page; section navigation happens in-page, so
 * "/" is the only entry.
 */
const PAGES: readonly PageSpec[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
];

// Shared across all entries so every <lastmod> in a build agrees, instead of
// each entry capturing its own slightly-different Date.now().
const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ changeFrequency, priority }) => ({
    // SITE_URL ends with "/", so the bare constant IS the homepage URL.
    url: SITE_URL,
    lastModified: BUILD_TIME,
    changeFrequency,
    priority,
  }));
}
