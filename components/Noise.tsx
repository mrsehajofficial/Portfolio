"use client";

import { useEffect, useState } from "react";

/**
 * Film-grain texture overlay.
 *
 * Deferred until AFTER the page load window: this full-viewport
 * mix-blend-mode overlay is expensive to composite and previously rendered on
 * the very first frames, competing with the LCP element's paint (and forcing
 * extra raster work under it). Mounting it on window load + idle keeps the
 * visual identical for humans while keeping it out of the LCP critical path.
 */
export default function Noise() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const mount = () => {
      if (cancelled) return;
      const idle = (
        window as unknown as {
          requestIdleCallback?: (cb: () => void) => number;
        }
      ).requestIdleCallback;
      if (idle) idle(() => !cancelled && setReady(true));
      else setTimeout(() => !cancelled && setReady(true), 300);
    };

    if (document.readyState === "complete") mount();
    else window.addEventListener("load", mount, { once: true });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0.025,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
