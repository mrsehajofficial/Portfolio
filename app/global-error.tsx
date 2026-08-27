"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Last-resort boundary: fires only when the ROOT LAYOUT itself throws, which
 * means none of its CSS variables, fonts, or providers exist yet. So this file
 * renders its own <html>/<body> with hard-coded colors instead of var()
 * tokens — self-contained styling that cannot fail for the same reason twice.
 */
export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#0a0a0b",
          color: "#edebe6",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <div style={{ maxWidth: 480 }}>
            <p
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 13,
                letterSpacing: "0.02em",
                color: "#e2544a",
                margin: "0 0 16px",
              }}
            >
              fatal error
            </p>
            <h1
              style={{
                fontSize: "clamp(2rem, 6vw, 3.2rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                margin: "0 0 20px",
              }}
            >
              The site failed to start.
            </h1>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: "#a8a59d",
                margin: "0 0 36px",
              }}
            >
              A critical error prevented the page framework itself from
              loading. Reloading usually resolves it.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "14px 30px",
                background: "#3ecf8e",
                color: "#0a0a0b",
                border: "none",
                borderRadius: 8,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              reload the site
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}