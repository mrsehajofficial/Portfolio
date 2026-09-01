import { MetadataRoute } from "next";

import { SITE_URL } from "../lib/site";

type PagePath = "/" | "/work" | "/about" | "/stack" | "/faq";

interface PageSpec {
  path: PagePath;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}

/**
 * Every URL here is built from the one canonical-origin constant in
 * lib/site.ts (https://sehaj.wasmer.app).
 *
 * The homepage is the hub; /work, /about, /stack and /faq are the detailed
 * section pages. Contact lives on the homepage only (no /contact route), so
 * it is deliberately absent here.
 */
const PAGES: readonly PageSpec[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/work", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/stack", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
];

// Shared across all entries so every <lastmod> in a build agrees, instead of
// each entry capturing its own slightly-different Date.now().
const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, changeFrequency, priority }) => ({
    // SITE_URL ends with "/", so the homepage is the bare constant and every
    // other route appends its path.
    url: path === "/" ? SITE_URL : `${SITE_URL}${path.slice(1)}`,
    lastModified: BUILD_TIME,
    changeFrequency,
    priority,
  }));
}
