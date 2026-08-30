"use client";

import dynamic from "next/dynamic";
import LazyMount from "./LazyMount";

// AskPortfolio is a purely client-side retrieval widget sitting below the
// fold (between Stack and Contact). Deferring its chunk — and with it the
// portfolio search index — keeps the initial JS bundle and main-thread work
// on the homepage lean; it loads only when a real visitor scrolls near it.
// Its facts are duplicated verbatim in the Faq / faq-page SSR content, so
// nothing crawlable is lost by excluding it from the initial payload.
const AskPortfolio = dynamic(() => import("./AskPortfolio"), {
  ssr: false,
  loading: () => null,
});

export default function AskPortfolioLazy() {
  return (
    <LazyMount minHeight="560px" rootMargin="600px 0px">
      <AskPortfolio />
    </LazyMount>
  );
}