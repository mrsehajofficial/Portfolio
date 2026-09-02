import Link from "next/link";
import CurtainReveal from "./CurtainReveal";
import { STACK, STACK_NOTE } from "@/lib/content";

/**
 * SpecimenSheet — the stack scene. Capability groups set as type-specimen
 * rows: on hover the whole row inverts to solid ink (an inked plate), with
 * the count + list reversed to paper. No logo wall ever.
 */
export default function SpecimenSheet() {
  return (
    <section id="stack" className="specimen">
      <div className="container">
        <CurtainReveal>
          <header className="section-head">
            <div>
              <p className="form-eyebrow mono">Form 04 — tools of the trade</p>
              <h2 className="section-title">
                What I <em className="accent-over">work</em> with.
              </h2>
            </div>
            <p className="section-note">
              Grouped by what I deliver, not by logo wall — everything below
              is something I&rsquo;ve shipped or used in real projects.
            </p>
          </header>

          <Link
            href="/stack"
            data-cursor-hover
            className="text-link"
          >
            the full stack page with the receipts →
          </Link>
        </CurtainReveal>

        <div className="ledger">
          {STACK.map((group, i) => (
            <CurtainReveal key={group.name} delay={i * 0.05}>
              <div className="ledger-row" data-cursor-hover>
                <span className="ledger-num">S.{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ledger-name">{group.name}</h3>
                <div>
                  <p className="ledger-items">
                    {group.items.map((item, j) => (
                      <span key={item}>
                        {j > 0 && (
                          <span aria-hidden="true" className="sep">
                            /
                          </span>
                        )}
                        {item}
                      </span>
                    ))}
                  </p>
                  <p className="spec-where">{group.where}</p>
                </div>
              </div>
            </CurtainReveal>
          ))}
        </div>

        <CurtainReveal delay={0.1}>
          <p className="spec-where" style={{ marginTop: 44, maxWidth: "72ch" }}>
            {STACK_NOTE}
          </p>
        </CurtainReveal>
      </div>
    </section>
  );
}