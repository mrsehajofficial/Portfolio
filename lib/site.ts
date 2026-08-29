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
