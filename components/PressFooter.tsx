"use client";

import { useEffect, useState } from "react";
import { FOOTER } from "@/lib/content";

// CMYK-ish calibration chips — a working print-shop signature.
const CALIB: { name: string; bg: string }[] = [
  { name: "cyan", bg: "#3aa7c4" },
  { name: "magenta", bg: "#d04f8a" },
  { name: "yellow", bg: "#d9a520" },
  { name: "black", bg: "#17130d" },
  { name: "vermilion", bg: "#d6401f" },
];

/**
 * PressFooter — the tail of the form: a color-calibration bar, the local
 * "press room" time, and the end-of-form mark.
 */
export default function PressFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="press-footer">
      <div className="calib-bar" aria-hidden="true">
        {CALIB.map((c) => (
          <span className="calib-chip" style={{ background: c.bg }} key={c.name} />
        ))}
      </div>
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} sehaj varma — {FOOTER.line}</p>
        <span className="end-mark" aria-hidden="true">
          •• {FOOTER.endMark} ••
        </span>
        <p suppressHydrationWarning>{time || "—"} press-room time</p>
      </div>
    </footer>
  );
}