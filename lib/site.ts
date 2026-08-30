/**
 * Single source of truth for the site's canonical origin.
 *
 * Every file that emits absolute URLs — page metadata, canonical links,
 * Open Graph tags, JSON-LD structured data, robots.txt and sitemap.xml —
 * MUST import this constant instead of hardcoding its own copy, so the
 * canonical host can never drift between documents.
 *
 * NOTE: the previous domain (https://bitbridge.work.gd, with or without www)
 * is retired and is NOT a canonical origin. Both of its hosts permanently
 * redirect here via next.config.mjs, so crawlers only ever see these URLs.
 */
export const SITE_URL = "https://sehaj.wasmer.app/";

/**
 * Bare hostname of SITE_URL ("sehaj.wasmer.app"), derived once here so no
 * consumer reimplements the strip-the-scheme math. Used for robots.txt `host`
 * and the lowercase-subdomain fallback entry in the WebSite structured data.
 */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");

/**
 * The concise site name — what Google Search should display in the small
 * "site name" line above/beside a result's title link, and what every
 * identity surface (og:site_name, WebSite JSON-LD, PWA manifest) agrees on.
 *
 * Includes the word "Portfolio" so the name itself tells searchers what kind
 * of site they're looking at, at a glance. Still concise per Google's
 * site-names guidance (https://developers.google.com/search/docs/appearance/
 * site-names), where the WebSite structured-data name should be "unique,
 * concise, non-generic" — a title-length string reads as a page title, gets
 * ignored, and Google then falls back to the hosting domain's own brand
 * ("Wasmer" for *.wasmer.app).
 */
export const SITE_NAME = "Sehaj Varma Portfolio";
