"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("mr.sehaj.official@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section
      id="contact"
      style={{
        padding: "160px 0 100px",
        borderTop: "1px solid var(--hairline)",
      }}
    >
      <div className="container">
        <Reveal>
          <p
            className="mono"
            style={{ fontSize: 13, color: "var(--signal)", marginBottom: 16 }}
          >
            get in touch
          </p>
          <h2
            style={{
              fontSize: "clamp(2.6rem, 6.5vw, 5.4rem)",
              color: "var(--ink)",
              marginBottom: 28,
              maxWidth: 900,
            }}
          >
            Let&rsquo;s connect and discuss automation ideas.
          </h2>
          <p
            style={{
              color: "var(--ink-dim)",
              fontSize: 16,
              lineHeight: 1.75,
              maxWidth: 620,
              marginBottom: 36,
            }}
          >
            I&rsquo;m always interested in discussing workflow automation,
            backend architecture, or open-source collaborations. Reach out
            directly via email or GitHub.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
              marginBottom: 64,
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: 12,
                color: "var(--ink-faint)",
                marginRight: 4,
              }}
            >
              currently available for:
            </span>
            {[
              "AI automation",
              "Python backends",
              "API integration",
              "freelance projects",
            ].map((area) => (
              <span
                key={area}
                className="mono"
                style={{
                  fontSize: 12,
                  color: "var(--ink-dim)",
                  border: "1px solid var(--hairline-strong)",
                  padding: "5px 12px",
                  borderRadius: 100,
                }}
              >
                {area}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="contact-cards-grid">
            {/* Email Card */}
            <div className="contact-card">
              <p
                className="mono"
                style={{
                  fontSize: 12,
                  color: "var(--signal)",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                direct email
              </p>
              <h3
                style={{
                  fontSize: "clamp(1.25rem, 2.2vw, 1.65rem)",
                  color: "var(--ink)",
                  fontWeight: 500,
                  marginBottom: 12,
                  wordBreak: "break-all",
                }}
              >
                mr.sehaj.official@gmail.com
              </h3>
              <p
                style={{
                  color: "var(--ink-faint)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}
              >
                Direct inbox for engineering discussions, automation projects,
                and freelance proposals.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <a
                  href="mailto:mr.sehaj.official@gmail.com"
                  data-cursor-hover
                  className="mono btn-primary"
                  style={{
                    padding: "12px 24px",
                    background: "var(--signal)",
                    color: "var(--bg)",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  send email ↗
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  data-cursor-hover
                  className="mono btn-secondary"
                  style={{
                    padding: "12px 20px",
                    border: "1px solid var(--hairline-strong)",
                    color: "var(--ink)",
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                >
                  {copied ? "copied to clipboard!" : "copy address"}
                </button>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="contact-card">
              <p
                className="mono"
                style={{
                  fontSize: 12,
                  color: "var(--signal)",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                github profile
              </p>
              <h3
                style={{
                  fontSize: "clamp(1.25rem, 2.2vw, 1.65rem)",
                  color: "var(--ink)",
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                github.com/mrsehajofficial
              </h3>
              <p
                style={{
                  color: "var(--ink-faint)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}
              >
                Explore open-source code repositories, the Amai Yuki frontend,
                and active development projects.
              </p>
              <div>
                <a
                  href="https://github.com/mrsehajofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="mono btn-secondary"
                  style={{
                    padding: "12px 24px",
                    border: "1px solid var(--hairline-strong)",
                    color: "var(--ink)",
                    borderRadius: 8,
                    fontSize: 13,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  view github profile ↗
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              marginTop: 48,
              borderTop: "1px solid var(--hairline)",
              paddingTop: 32,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--signal)",
                  display: "inline-block",
                }}
              />
              <p className="mono" style={{ fontSize: 13, color: "var(--ink-dim)" }}>
                Location: India · Available for remote work worldwide
              </p>
            </div>
            <p className="mono" style={{ fontSize: 12, color: "var(--ink-faint)" }}>
              Response time: typically within 24 hours
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
        .contact-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .contact-card {
          border: 1px solid var(--hairline);
          border-radius: 12px;
          padding: 36px 32px;
          background: var(--bg-card);
          transition: border-color 0.25s var(--ease-power), transform 0.25s var(--ease-power);
        }
        .contact-card:hover {
          border-color: var(--hairline-strong);
          transform: translateY(-2px);
        }
        .btn-primary {
          transition: transform 0.2s var(--ease-power), box-shadow 0.2s var(--ease-power);
          box-shadow: 0 4px 18px rgba(62, 207, 142, 0.2);
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(62, 207, 142, 0.3);
        }
        .btn-secondary {
          transition: border-color 0.2s var(--ease-power), color 0.2s var(--ease-power);
        }
        .btn-secondary:hover {
          border-color: var(--signal);
          color: var(--ink);
        }
        @media (max-width: 860px) {
          .contact-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .contact-card {
            padding: 28px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
