import { TICKER } from "@/lib/content";

/**
 * InkTicker — a vermilion ink-roller strip riding across the sheet.
 * Pure CSS animation (translate3d), real DOM text for crawlers, duplicated
 * once for the seamless loop with the second copy aria-hidden. Pauses on
 * hover; static under prefers-reduced-motion.
 */
function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="ticker-group" aria-hidden={hidden || undefined}>
      {TICKER.map((item) => (
        <span className="ticker-item" key={item}>
          {item} <i aria-hidden="true">✳</i>
        </span>
      ))}
    </div>
  );
}

export default function InkTicker() {
  return (
    <div className="ticker" aria-label={`Capabilities: ${TICKER.join(", ")}`}>
      <div className="ticker-track">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}