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
        padding: "170px 0 140px",
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <p className="page-eyebrow mono" style={{ marginBottom: 22 }}>
          error 404 — misprint
        </p>
        <h1 className="page-h1">
          This route leads <em className="accent-over">nowhere.</em>
        </h1>
        <p className="lead">
          The page you&rsquo;re after was moved, renamed, or never existed.
          Somewhere between the plate and the press, this sheet got lost.
          Head back to the front of the form — one click away.
        </p>
        <div style={{ marginTop: 40 }}>
          <Link href="/" data-cursor-hover className="cta-press" style={{ display: "inline-block" }}>
            back to the portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}