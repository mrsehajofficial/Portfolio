"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Motion provider — wraps the app in LazyMotion with a *lazy* feature bundle.
 * The domAnimation feature set (+~15KB) is fetched in its own chunk only after
 * first render, keeping the initial JS payload small. `strict` ensures nobody
 * accidentally imports the heavier `motion` component.
 */
const loadFeatures = () =>
  import("./MotionFeatures").then((res) => res.default);

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}