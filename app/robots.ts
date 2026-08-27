import { MetadataRoute } from "next";

import { SITE_URL } from "../lib/site";

/**
 * Computed once from the single canonical-origin constant in lib/site.ts,
 * so the crawler-facing host can never drift from what pages declare.
 */
const HOST = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // One uniform policy for every crawler — search engines AND AI agents.
        //
        // Site-wide allow, except /api/: those are POST-only application
        // endpoints (e.g. the contact form), not indexable documents.
        //
        // The previous version listed ~20 explicit bot groups all saying
        // "Allow: /". That was redundant with User-Agent: * — and worse, a
        // specific group OVERRIDES the * group entirely for that bot, so any
        // future disallow added only under * would silently NOT apply to the
        // listed bots. Consolidating keeps behavior identical today while
        // making future restrictions correct for everyone.
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}sitemap.xml`,
    // Canonical-host hint honored by Yandex; ignored harmlessly by others.
    host: HOST,
  };
}
