import type { ReactNode } from "react";

/**
 * MotionProvider — previously wrapped the app in LazyMotion from motion/react.
 * motion/react has been removed: CurtainReveal now uses plain CSS transitions
 * + IntersectionObserver, eliminating the m[] reconciliation conflict that
 * caused the "removeChild" and "site failed to start" errors on page load.
 *
 * This component is kept as a passthrough so the import in layout.tsx needs
 * no change. It can be deleted entirely in a future cleanup pass.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}