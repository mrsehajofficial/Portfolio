import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Stack from "@/components/Stack";
import AskPortfolio from "@/components/AskPortfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/**
 * The full single-page layout, used by every route.
 * The home page and each clean-URL section route (/work, /about, ...) render
 * the exact same sections; SmoothScrollProvider then scrolls to whichever
 * section matches the current URL.
 *
 * AskPortfolio is deliberately optional garnish between Stack and Contact:
 * every essential section remains reachable through plain navigation without
 * touching the assistant.
 */
export default function PortfolioSections() {
  return (
    <>
      <Nav />
      <Hero />
      <Work />
      <About />
      <Stack />
      <AskPortfolio />
      <Contact />
      <Footer />
    </>
  );
}