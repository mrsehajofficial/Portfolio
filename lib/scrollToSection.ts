"use client";

/**
 * Fires a "scroll to section" request that SmoothScrollProvider listens for.
 *
 * The scroll itself is performed with Lenis (falling back to native smooth
 * scrolling) and the URL is rewritten to the clean root path afterwards, so
 * the browser always shows https://www.bitbridge.work.gd/ — no "/work",
 * no "/about", and no "#about"-style fragments.
 */
export const SCROLL_TO_SECTION_EVENT = "portfolio:scroll-to";

export function scrollToSection(id: string | null) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(SCROLL_TO_SECTION_EVENT, { detail: { id } })
  );
}

export default scrollToSection;
