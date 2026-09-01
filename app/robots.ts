import { MetadataRoute } from "next";

import { SITE_HOST, SITE_URL } from "../lib/site";

/**
 * Computed once from the single canonical-origin constant in lib/site.ts,
 * so the crawler-facing host can never drift from what pages declare.
 */
const HOST = SITE_HOST;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}sitemap.xml`,
    // Canonical-host hint honored by Yandex; ignored harmlessly by others.
    host: HOST,
  };
}
