"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      style={{
        borderTop: "1px solid var(--hairline)",
        padding: "32px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <p className="mono" style={{ fontSize: 12, color: "var(--ink-faint)" }}>
          © {new Date().getFullYear()} sehaj varma — built with next.js
        </p>

        <p
          className="mono"
          suppressHydrationWarning
          style={{ fontSize: 12, color: "var(--ink-faint)" }}
        >
          {time || "—"} local
        </p>
      </div>
    </footer>
  );
}
