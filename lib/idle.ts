/**
 * lib/idle.ts — tiny scheduling helpers.
 * Deferring non-critical work (animation scene setup, below-fold wiring)
 * until the browser is idle keeps LCP / FCP / TBT clean: the visible content
 * is already in the server HTML before any of this runs.
 */

type CancelIdle = () => void;

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      cb: () => void,
      opts?: { timeout: number }
    ) => number;
    cancelIdleCallback?: (id: number) => void;
  };

/** Run `cb` on idle (fallback: a short timeout). Returns a cancel fn. */
export function onIdle(cb: () => void, timeout = 3000): CancelIdle {
  if (typeof window === "undefined") return () => {};
  const w = window as IdleWindow;

  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(cb, 900);
  return () => window.clearTimeout(id);
}

/** Same as onIdle but supports async callbacks + rejects are swallowed. */
export function onIdleAsync(cb: () => Promise<void>, timeout = 4000): CancelIdle {
  return onIdle(() => {
    cb().catch(() => {
      /* scene setup is enhancement-only; silent failure keeps content visible */
    });
  }, timeout);
}

/** Dynamically loads GSAP + ScrollTrigger as one promise (code-split). */
export async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}