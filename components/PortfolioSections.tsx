"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

// AskPortfolio is a purely client-side retrieval widget (interactive tool,
// not indexable content) — its chunk and search index stay deferred.
const AskPortfolioLazy = dynamic(
  () => import("@/components/AskPortfolioLazy"),
  { ssr: false }
);

/**
 * The full single-page layout, used by every route.
 * The home page and each clean-URL section route (/work, /about, ...) render
 * the exact same sections; SmoothScrollProvider then scrolls to whichever
 * section matches the current URL.
 *
 * Every content section is server-rendered: the previous `ssr: false` +
 * LazyMount approach stripped ~350 words of the homepage's best content out
 * of the HTML that crawlers and no-JS visitors see (Googlebot does not
 * scroll, so IntersectionObserver-gated sections never rendered for it —
 * SEO audits flagged the homepage as "low content" at 82 visible words).
 * The load-time concerns that motivated deferral are handled at the source
 * now: gzip transport, no GSAP, trimmed variable fonts, deferred noise
 * overlay. Reveal's entrance animations still apply client-side per section.
 */
export default function PortfolioSections() {
  return (
    <>
      <Nav />
      <Hero />
      <Work />
      <About />
      <Stack />
      <AskPortfolioLazy />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}