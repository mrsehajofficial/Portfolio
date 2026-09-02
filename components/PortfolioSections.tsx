"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import LazyMount from "@/components/LazyMount";

// Only Nav + Hero are in the critical initial payload. Everything below the
// fold is dynamically imported so the browser fetches it AFTER the hero has
// already painted — this is the primary lever for fixing the 5s LCP.
const Work = dynamic(() => import("@/components/Work"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const Stack = dynamic(() => import("@/components/Stack"), { ssr: false });
const AskPortfolioLazy = dynamic(
  () => import("@/components/AskPortfolioLazy"),
  { ssr: false }
);
const Faq = dynamic(() => import("@/components/Faq"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

/**
 * The full single-page layout, used by every route.
 * The home page and each clean-URL section route (/work, /about, ...) render
 * the exact same sections; SmoothScrollProvider then scrolls to whichever
 * section matches the current URL.
 *
 * Only Nav + Hero are in the critical render path. Work, About, Stack,
 * AskPortfolio, Faq, Contact and Footer are deferred behind IntersectionObserver
 * so the hero LCP is not gated on their JS chunks.
 */
export default function PortfolioSections() {
  return (
    <>
      <Nav />
      <Hero />
      {/* below-the-fold: load when scrolled near (600 px pre-fetch margin) */}
      <LazyMount rootMargin="600px 0px">
        <Work />
      </LazyMount>
      <LazyMount rootMargin="600px 0px">
        <About />
      </LazyMount>
      <LazyMount rootMargin="600px 0px">
        <Stack />
      </LazyMount>
      <AskPortfolioLazy />
      <LazyMount rootMargin="600px 0px">
        <Faq />
      </LazyMount>
      <LazyMount rootMargin="600px 0px">
        <Contact />
      </LazyMount>
      <LazyMount rootMargin="600px 0px">
        <Footer />
      </LazyMount>
    </>
  );
}