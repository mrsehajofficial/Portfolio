"use client";

/**
 * Motion feature bundle — loaded lazily by LazyMotion (see app/layout.tsx).
 * Exported as its own chunk so the domAnimation feature set (+15 KB) never
 * enters the initial bundle: it is fetched only after first render, when the
 * first `m` component actually needs features.
 */
import { domAnimation } from "motion/react";

export default domAnimation;
