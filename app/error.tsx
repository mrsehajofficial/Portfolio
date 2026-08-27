"use client";

import { useEffect } from "react";

// Next.js passes this shape to every error boundary component.
type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Route-level error boundary. Catches exceptions thrown while rendering any
 * page/segment beneath the root layout and offers recovery without a reload.
 *
 * Deliberately free of GSAP/Reveal/etc.: boundaries must render even if some
 * other client dependency is what crashed.
 */
export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Surface full detail in the console for debugging; the digest id lets a
    // server-side error report be correlated with what the visitor sees.
    console.error("[portfolio] Unhandled UI error:", error);
  }, [error]);

  return (
    <section
      style={{
        padding: "160px 0 140px",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <p
          className="mono"
          style={{ fontSize: 13, color: "var(--signal-error)", marginBottom: 16 }}
        >
          error 500
        </p>
        <h1
          style={{
            fontSize: "clamp(2.6rem, 6.5vw, 5.4rem)",
            color: "var(--ink)",
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          Something broke on my side.
        </h1>
        <p
          style={{
            color: "var(--ink-dim)",
            fontSize: 16,
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: 48,
          }}
        >
          An unexpected error interrupted this view. Retrying usually fixes
          it — if it keeps happening, tell me directly.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <button
            type="button"
            onClick={reset}
            data-cursor-hover
            className="mono"
            style={{
              padding: "16px 32px",
              background: "var(--signal)",
              color: "var(--bg)",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            try again
          </button>
          <a
            href="mailto:mr.sehaj.official@gmail.com"
            data-cursor-hover
            className="mono"
            style={{
              padding: "16px 32px",
              border: "1px solid var(--hairline-strong)",
              borderRadius: 8,
              fontSize: 14,
              color: "var(--ink)",
              transition: "border-color 0.2s ease",
            }}
          >
            report it via email
          </a>
        </div>

        {error.digest ? (
          <p
            className="mono"
            style={{ marginTop: 40, fontSize: 12, color: "var(--ink-faint)" }}
          >
            reference: {error.digest}
          </p>
        ) : null}
      </div>
    </section>
  );
}