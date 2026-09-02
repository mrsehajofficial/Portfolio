"use client";

import { useEffect, useState } from "react";

/**
 * BackToTop — "return to top of form": an ink chip with a vermilion hard
 * shadow, revealed after the visitor scrolls past the top.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
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
    <button
      onClick={handleClick}
      data-cursor-hover
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      aria-label="Back to top"
      title="Back to top of form"
      className={`back-to-top${visible ? " visible" : ""}`}
    >
      ↑ top
    </button>
  );
}