"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Route-level error boundary — styled as a press failure sheet. It stays free
 * of app-level components so it renders even if a client dependency crashed.
 */
export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[portfolio] Unhandled UI error:", error);
  }, [error]);

  return (
    <section
      style={{
        padding: "170px 0 140px",
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <p className="page-eyebrow mono" style={{ marginBottom: 22, color: "var(--vermilion)" }}>
          error 500 — press fault
        </p>
        <h1 className="page-h1">
          Something broke <em className="accent-over">on my side.</em>
        </h1>
        <p className="lead">
          An unexpected error interrupted this view. Retrying usually fixes it —
          if it keeps happening, tell me straight.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 40 }}>
          <button type="button" onClick={reset} data-cursor-hover className="cta-press">
            try again
          </button>
          <a
            href="mailto:mr.sehaj.official@gmail.com"
            data-cursor-hover
            className="cta-plate"
          >
            report it via email
          </a>
        </div>

        {error.digest ? (
          <p className="mono" style={{ marginTop: 40, fontSize: 12, color: "var(--ink-50)" }}>
            reference: {error.digest}
          </p>
        ) : null}
      </div>
    </section>
  );
}