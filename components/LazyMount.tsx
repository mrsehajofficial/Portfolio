"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyMountProps = {
  children: ReactNode;
  /** Reserve this much space so layout doesn't jump when content mounts. */
  minHeight?: string | number;
  /** How early before entering the viewport the content should mount. */
  rootMargin?: string;
  className?: string;
};

/**
 * Defers mounting (and therefore loading) of below-the-fold content until a
 * real visitor scrolls near it. Purely visual/above-the-fold cost stays lean.
 */
export default function LazyMount({
  children,
  minHeight = 0,
  rootMargin = "600px 0px",
  className,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {visible ? children : null}
    </div>
  );
}