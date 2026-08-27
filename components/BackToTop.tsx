"use client";

import { useEffect, useState } from "react";

/**
 * Floating "back to top" button.
 * Only visible once the user has scrolled below the top of the page;
 * hidden again when they return to the top.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        data-cursor-hover
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        aria-label="Back to top"
        title="Back to top"
        className="back-to-top mono"
        style={{
          position: "fixed",
          right: "clamp(16px, 4vw, 40px)",
          bottom: 54,
          zIndex: 95,
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          color: "var(--bg)",
          background: "var(--signal)",
          border: "1px solid var(--hairline-strong)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
          fontSize: 40,
          lineHeight: 1,
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          visibility: visible ? "visible" : "hidden",
          transform: visible
            ? "translateY(0)"
            : "translateY(16px)",
          transition:
            "opacity 0.3s var(--ease-power), visibility 0.3s var(--ease-power), transform 0.3s var(--ease-power), background 0.3s var(--ease-power), border-color 0.3s var(--ease-power)",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <span style={{ marginTop: -2, display: "inline-block" }}>↑</span>
      </button>

      <style>{`
        .back-to-top:hover {
          background: var(--ink) !important;
          color: var(--bg) !important;
          transform: translateY(-2px) !important;
        }
        .back-to-top:active {
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  );
}
