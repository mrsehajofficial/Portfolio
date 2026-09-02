"use client";

import { useEffect, useRef } from "react";
import CurtainReveal from "./CurtainReveal";
import { FLAGSHIP, EVIDENCE, PERSON } from "@/lib/content";
import { onIdleAsync, loadGsap } from "@/lib/idle";
import { SITE_URL } from "@/lib/site";

/**
 * PressWork — the flagship case study on the inverted ink-density sheet.
 * GSAP is code-split and set up only after idle: it scrubs the build log in
 * one-by-one, fills the vermilion ink bar, and parallaxes the ghost form
 * number — all fromTo with immediateRender:false, so every element is
 * VISIBLE by default and can never be stranded hidden.
 */
export default function PressWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let teardown: (() => void) | undefined;

    const cancel = onIdleAsync(async () => {
      const { gsap } = await loadGsap();
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

          // FromTo + immediateRender:false → the build log starts VISIBLE and
          // only becomes hidden the moment its scrub range actually begins.
          const items = gsap.utils.toArray<HTMLElement>(".buildlog-item");
          gsap.fromTo(
            items,
            { opacity: 0, yPercent: 18 },
            {
              opacity: 1,
              yPercent: 0,
              duration: 0.5,
              stagger: 0.12,
              ease: "power2.out",
              force3D: true,
              immediateRender: false,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 45%",
                scrub: 1,
              },
            }
          );

          // Ghost form number parallax + ink bar fill — both also start from
          // their current/visible values until the scrub begins.
          gsap.fromTo(
            ".presswork .form-no",
            { yPercent: 10 },
            {
              yPercent: -8,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );

          gsap.fromTo(
            ".ink-bar-fill",
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 45%",
                scrub: 1,
              },
            }
          );
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
    <section id="work" className="presswork" ref={sectionRef}>
      <div className="container">
        <CurtainReveal>
          <header className="section-head">
            <div>
              <p className="form-eyebrow mono">Form 02 — selected work</p>
              <h2 className="section-title">
                A project built from scratch,{" "}
                <em className="accent-over">end to end.</em>
              </h2>
            </div>
            <p className="section-note">
              Proof over promises — one flagship product shipped end to end,
              plus the automation and AI work behind the numbers.
            </p>
          </header>
        </CurtainReveal>

        <div className="spread">
          <div className="form-no" aria-hidden="true">
            {FLAGSHIP.formNo}
          </div>

          <div>
            <h3 className="case-title">{FLAGSHIP.title}</h3>
            <p className="case-sub">{FLAGSHIP.subtitle}</p>

            <p className="case-label mono">01 — the problem</p>
            <p className="case-body">{FLAGSHIP.problem}</p>

            <p className="case-label mono">02 — build log</p>
            <div className="buildlog">
              {FLAGSHIP.built.map((line, i) => (
                <div className="buildlog-item" key={line}>
                  <span className="buildlog-num mono">
                    step {String(i + 1).padStart(2, "0")}
                  </span>
                  <p>{line}</p>
                </div>
              ))}
            </div>

            <p className="case-label mono">03 — the result</p>
            <p className="case-body">{FLAGSHIP.result}</p>

            <div className="tag-row">
              {FLAGSHIP.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>

            <div className="plate-actions">
              <a
                href={FLAGSHIP.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="plate-source"
              >
                view source ↗
              </a>
              <span className="plate-year mono">
                shot &amp; shipped {FLAGSHIP.year}
              </span>
            </div>

            <div className="ink-bar" aria-hidden="true">
              <div className="ink-bar-fill" />
            </div>
          </div>
        </div>

        <CurtainReveal className="ev-wrap">
          <p className="eyebrow-late mono">appendix — more evidence</p>
          <div className="ev-grid">
            {EVIDENCE.map((card) => (
              <div className="ev-card" data-cursor-hover key={card.id}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </CurtainReveal>
      </div>

      {/* Structured data so search engines attribute the repo properly. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: "Amai Yuki",
            description:
              "Cross-platform real-time messaging application with a Python/Flask backend and Flutter frontend, including direct/group chats and a custom in-app camera module.",
            codeRepository: PERSON.githubRepo,
            programmingLanguage: ["Dart", "Python", "TypeScript"],
            author: { "@type": "Person", name: PERSON.name, url: SITE_URL },
          }),
        }}
      />
    </section>
  );
}