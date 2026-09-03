"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { scrollToSection } from "@/lib/scrollToSection";
import { onIdleAsync, loadGsap } from "@/lib/idle";
import { HERO, PERSON } from "@/lib/content";

// The GSAP ScrollTrigger below uses `pin: true`, which wraps the <section> in
// a pin-spacer div — i.e. it REPARENTS a React-managed node. If React deletes
// that node (client-side navigation away from the home page) while it is still
// inside the pin-spacer, removeChild throws:
//   "Failed to execute 'removeChild' on 'Node': The node to be removed is not
//    a child of this node."
// A passive useEffect cleanup runs AFTER React has already removed the DOM
// nodes on unmount — too late to revert the pin. A LAYOUT effect's cleanup
// runs synchronously BEFORE the DOM deletion, so mm.revert() can unwrap the
// pin-spacer in time. (useEffect fallback on the server avoids the SSR
// useLayoutEffect warning; this component never schedules anything there.)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * FrontPage — the specimen sheet. This is the hero "press" scene.
 *
 * The ENTRANCE is pure CSS (see .front-line-inner keyframes in globals.css):
 * the headline lines stamp in over ~1s with zero JavaScript, so the first
 * viewport can never be blank — even if every script fails, the server HTML
 * shows the full headline.
 *
 * GSAP is loaded lazily (code-split — nothing in the initial bundle) and only
   * adds a scroll CHOREOGRAPHY layer after the browser goes idle:
 *   - the sheet PINS for ~35% of scroll (roughly one viewport),
 *   - then the whole stage drifts up and fades as it leaves (scrub).
 * Everything animates FROM visible, never TO hidden — no blank states exist.
 */
export default function FrontPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let teardown: (() => void) | undefined;

    const cancel = onIdleAsync(async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          motionOk: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop, motionOk } = context.conditions as {
            desktop: boolean;
            motionOk: boolean;
          };
          if (!desktop || !motionOk || !sectionRef.current) return;

                                        // Pin the sheet, then drift it away as the visitor scrolls past.
          // Start values = "visible", so the hero is never gated.
          // Pin ends at +=35% (one viewport) so the hero doesn't outstay its
          // welcome, and a progress bar fills during the pin so the visitor
          // always knows more content is loading below.
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=35%",
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const progress = self.progress;
              gsap.set(".front-progress-fill", { scaleX: progress });
            },
          });

          gsap.to(stageRef.current, {
            opacity: 0,
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=35%",
              scrub: 1,
            },
                    });
        }
      );

      teardown = () => mm.revert();
    });

    return () => {
      cancel();
      teardown?.();
    };
  }, []);

  return (
    <section className="front" ref={sectionRef}>
      <div className="container front-stage" ref={stageRef}>
        <p className="front-slug mono">
          <strong>{HERO.slug}</strong>
          <span className="sep">//</span>
          <span>
            {PERSON.name} · {PERSON.role}
          </span>
        </p>

        <h1 className="front-title">
          <span className="front-line">
            <span className="front-line-inner">I AUTOMATE THE BORING PARTS,</span>
          </span>
          <span className="front-line">
            <span className="front-line-inner">
              WIRE UP <em className="accent-over">LLM AGENTS,</em>
            </span>
          </span>
          <span className="front-line">
            <span className="front-line-inner">
              &amp; SHIP <em className="accent-over">BACKENDS</em> THAT HOLD UP.
            </span>
          </span>
        </h1>

        <p className="front-sub">{HERO.sub}</p>

        <div className="front-cta">
          <button
            onClick={() => scrollToSection("work")}
            data-cursor-hover
            className="cta-press"
          >
            {HERO.ctaPrimary} →
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            data-cursor-hover
            className="cta-plate"
          >
            {HERO.ctaSecondary}
          </button>
        </div>
            </div>

      <div>
        <span className="front-edge mono" aria-hidden="true">
          {HERO.edge}
        </span>

        {/* Scroll progress bar — scales via transform only (GPU-accelerated).
            Visible during the pin so visitors see "content loading below". */}
        <div className="front-progress" aria-hidden="true">
          <div className="front-progress-fill" />
        </div>

        <div className="front-foot mono" aria-hidden="true">
          <span>{HERO.footLeft}</span>
          <span>{HERO.footRight}</span>
        </div>
      </div>
    </section>
  );
}