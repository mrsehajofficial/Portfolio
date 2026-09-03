"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Motion provider — wraps the app in LazyMotion with an *eager* feature
 * bundle. The features are loaded synchronously so that `m.*` components
 * (e.g. CurtainReveal) never race against a pending async feature import
 * on cold page visits, which previously caused the global-error boundary
 * to fire on the first load of any page (about, work, etc.).
 *
 * The domAnimation bundle is ~15KB gzipped — a worthwhile trade-off to
 * eliminate the "site failed to start" fatal error on first navigation.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}