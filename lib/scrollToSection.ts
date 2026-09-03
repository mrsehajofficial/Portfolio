"use client";

export const SCROLL_TO_SECTION_EVENT = "portfolio:scroll-to";

const NAV_OFFSET = 76;

export function scrollToSection(id: string | null) {
  if (typeof window === "undefined") return;

  // Dispatch custom event for SmoothScrollProvider / Lenis instance
  window.dispatchEvent(
    new CustomEvent(SCROLL_TO_SECTION_EVENT, { detail: { id } })
  );

  // Fallback native scroll in case Lenis is not active
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default scrollToSection;
