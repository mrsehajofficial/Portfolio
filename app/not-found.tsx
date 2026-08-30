import type { Metadata } from "next";
import Link from "next/link";

// Not indexed on purpose: a missing URL shouldn't accumulate search signals.
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
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
          style={{ fontSize: 13, color: "var(--signal)", marginBottom: 16 }}
        >
          error 404
        </p>
        <h1
          style={{
            fontSize: "clamp(2.6rem, 6.5vw, 5.4rem)",
            color: "var(--ink)",
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          This route leads nowhere.
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
          The page you&rsquo;re after was moved, renamed, or never existed.
          Browse the sections below or head back to the homepage — one click
          away.
        </p>

        <Link
          href="/"
          data-cursor-hover
          className="mono"
          style={{
            display: "inline-block",
            padding: "16px 32px",
            background: "var(--signal)",
            color: "var(--bg)",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          back to the portfolio
        </Link>
      </div>
    </section>
  );
}