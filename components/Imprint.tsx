"use client";

import { useState } from "react";
import CurtainReveal from "./CurtainReveal";
import { CONTACT, PERSON } from "@/lib/content";

/**
 * Imprint — the contact scene, printed in solid vermilion like a heavy
 * second pass of ink. The email is the largest type on the page; copying
 * it stamps a "copied" state onto the button.
 */
export default function Imprint() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(PERSON.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="contact" className="imprint">
      <div className="container">
        <CurtainReveal>
          <p className="form-eyebrow mono">{CONTACT.eyebrow}</p>
          <h2 className="imprint-title">
            {CONTACT.title} <em style={{ fontStyle: "normal", color: "#f2efe8" }}>{CONTACT.titleAccent}</em>
          </h2>
          <p className="imprint-sub">{CONTACT.sub}</p>

          <a
            href={`mailto:${PERSON.email}`}
            data-cursor-hover
            className="imprint-email"
          >
            {PERSON.email}
          </a>

          <div className="imprint-actions">
            <button
              type="button"
              onClick={copyEmail}
              data-cursor-hover
              className={`copy-btn${copied ? " copied" : ""}`}
            >
              {copied ? CONTACT.copiedCta : CONTACT.copyCta}
            </button>
            <a
              href={PERSON.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="copy-btn"
            >
              github.com/mrsehajofficial ↗
            </a>
          </div>

          <div className="avail-row">
            <span className="avail-label">currently available for</span>
            {CONTACT.availability.map((area) => (
              <span className="avail-pill" key={area}>
                {area}
              </span>
            ))}
          </div>

          <div className="imprint-status">
            <span aria-hidden="true">● open to remote work</span>
            <span>{CONTACT.status}</span>
          </div>
        </CurtainReveal>
      </div>
    </section>
  );
}