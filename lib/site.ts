/**
 * Single source of truth for the site's canonical origin.
 *
 * Every file that emits absolute URLs — page metadata, canonical links,
 * Open Graph tags, JSON-LD structured data, robots.txt and sitemap.xml —
 * MUST import this constant instead of hardcoding its own copy, so the
 * canonical host can never drift between documents.
 *
 * NOTE: the non-www apex (https://bitbridge.work.gd) is NOT a separate
 * canonical origin. It permanently redirects here via next.config.mjs,
 * so crawlers only ever see these www URLs.
 */
export const SITE_URL = "https://www.bitbridge.work.gd/";
