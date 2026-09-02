"use client";

import PressNav from "@/components/PressNav";
import FrontPage from "@/components/FrontPage";
import InkTicker from "@/components/InkTicker";
import PressWork from "@/components/PressWork";
import Colophon from "@/components/Colophon";
import SpecimenSheet from "@/components/SpecimenSheet";
import FieldQueries from "@/components/FieldQueries";
import Imprint from "@/components/Imprint";
import PressFooter from "@/components/PressFooter";
import dynamic from "next/dynamic";

// AskPortfolio is a purely client-side retrieval widget (interactive tool,
// not indexable content) — its chunk and search index stay deferred.
const AskPortfolioLazy = dynamic(
  () => import("@/components/AskPortfolioLazy"),
  { ssr: false }
);

/**
 * The full single-page PAPER PRESS layout, used by every route.
 * The home page and each clean-URL section route (/work, /about, ...) render
 * the exact same scenes; SmoothScrollProvider then scrolls to whichever
 * section matches the current URL.
 *
 * Every content section is server-rendered: crawlers and no-JS visitors see
 * all content on the page. The GSAP/Motion choreography runs client-side on
 * top of that server HTML and never gates it.
 */
export default function PortfolioSections() {
  return (
    <>
      <PressNav />
      <FrontPage />
      <InkTicker />
      <PressWork />
      <Colophon />
      <SpecimenSheet />
      <AskPortfolioLazy />
      <FieldQueries />
      <Imprint />
      <PressFooter />
    </>
  );
}