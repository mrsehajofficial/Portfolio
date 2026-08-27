"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg("Fill in every field before sending.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus("error");
      setErrorMsg("Enter a valid email address.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
        // Client-side guard mirroring the server's upstream timeout.
        signal: AbortSignal.timeout(15_000),
      });

      // The API always answers with a visitor-safe `{ error }`, so surface it
      // verbatim when present; fall back to generic text only when the body
      // itself is unreadable (e.g. an HTML page from a proxy).
      if (!res.ok) {
        let serverMsg = "";
        try {
          serverMsg = String(
            ((await res.json()) as { error?: string }).error ?? "",
          );
        } catch {
          /* non-JSON failure body */
        }
        setStatus("error");
        setErrorMsg(
          serverMsg ||
            `Sending failed (${res.status}). Email me at mr.sehaj.official@gmail.com instead.`,
        );
        return;
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof DOMException && err.name === "TimeoutError"
          ? "The request timed out. Check your connection and try again."
          : "Network hiccup — couldn't reach the server. Try again or email directly.",
      );
    }
  }

  function clearErrorOnEdit() {
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
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
              marginBottom: 64,
              maxWidth: 900,
            }}
          >
            Let&rsquo;s connect and discuss automation ideas.
          </h2>
          <p
            style={{
              color: "var(--ink-dim)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: 48,
            }}
          >
            I&rsquo;m always interested in discussing workflow automation,
            backend challenges, or open-source collaborations. Drop me an email
            or find me online.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span
              className="mono"
              style={{ fontSize: 12, color: "var(--ink-faint)", marginRight: 4 }}
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

        <div className="contact-grid">
          <Reveal delay={0.05}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              style={{ display: "flex", flexDirection: "column", gap: 24 }}
            >
              <div>
                <label
                  htmlFor="name"
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: "var(--ink-faint)",
                    display: "block",
                    marginBottom: 10,
                  }}
                >
                  name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  style={inputStyle}
                  onChange={clearErrorOnEdit}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--signal)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--hairline-strong)")
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: "var(--ink-faint)",
                    display: "block",
                    marginBottom: 10,
                  }}
                >
                  email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  style={inputStyle}
                  onChange={clearErrorOnEdit}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--signal)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--hairline-strong)")
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: "var(--ink-faint)",
                    display: "block",
                    marginBottom: 10,
                  }}
                >
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What are you building?"
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: 120,
                    maxHeight: 280,
                  }}
                  onChange={clearErrorOnEdit}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--signal)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--hairline-strong)")
                  }
                />
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  style={{ color: "var(--signal-error)", fontSize: 13 }}
                >
                  {errorMsg}
                </p>
              )}

              {status === "sent" ? (
                <p
                  className="mono"
                  style={{ color: "var(--signal)", fontSize: 14 }}
                  role="status"
                >
                  message sent — I&rsquo;ll reply within a day or two.
                </p>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  data-cursor-hover
                  className="mono"
                  style={{
                    padding: "16px 32px",
                    background: "var(--signal)",
                    color: "var(--bg)",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    width: "fit-content",
                    opacity: status === "sending" ? 0.6 : 1,
                  }}
                >
                  {status === "sending" ? "sending…" : "send message"}
                </button>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
                paddingTop: 4,
              }}
            >
              <ContactLink
                label="email"
                value="mr.sehaj.official@gmail.com"
                href="mailto:mr.sehaj.official@gmail.com"
              />
              <ContactLink
                label="github"
                value="github.com/mrsehajofficial"
                href="https://github.com/mrsehajofficial"
              />
              <ContactLink
                label="location"
                value="India — open to remote work"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 80px;
        }
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}

function ContactLink({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <p
        className="mono"
        style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 6 }}
      >
        {label}
      </p>
      <p style={{ fontSize: 16, color: "var(--ink)" }}>{value}</p>
    </>
  );

  return (
    <div
      style={{
        borderBottom: "1px solid var(--hairline)",
        paddingBottom: 20,
      }}
    >
      {href ? (
        <a
          href={href}
          data-cursor-hover
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "1px solid var(--hairline-strong)",
  borderRadius: 8,
  padding: "14px 16px",
  color: "var(--ink)",
  fontSize: 15,
  fontFamily: "var(--font-body)",
  transition: "border-color 0.2s ease",
  outline: "none",
};
