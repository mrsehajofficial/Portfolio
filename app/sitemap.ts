import { MetadataRoute } from "next";

import { SITE_URL } from "../lib/site";

type SectionPath = "/" | "/work" | "/about" | "/stack" | "/contact";

interface PageSpec {
  path: SectionPath;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}

/**
 * Every URL here is built from the one canonical-origin constant in
 * lib/site.ts (https://www.bitbridge.work.gd) — never the non-www apex,
 * which permanently redirects to www via next.config.mjs.
 *
 * Keep this list in sync with the sections served by app/[section]/page.tsx.
 */
const PAGES: readonly PageSpec[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/work", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/stack", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
];

// Shared across all entries so every <lastmod> in a build agrees, instead of
// each entry capturing its own slightly-different Date.now().
const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, changeFrequency, priority }) => ({
    // SITE_URL ends with "/", so the bare constant IS the homepage URL and
    // section paths just drop their leading slash.
    url: path === "/" ? SITE_URL : `${SITE_URL}${path.slice(1)}`,
    lastModified: BUILD_TIME,
    changeFrequency,
    priority,
  }));
}
