/**
 * One-time asset generator: rasterizes public/favicon.svg's tile design into
 * the PNG renditions referenced by app/layout.tsx metadata and app/manifest.ts
 *
 *   icon-192.png / icon-512.png           — "any" purpose launchers/favicons
 *   icon-maskable-192.png / -512.png      — full-bleed art inside Android's
 *                                           circular mask safe zone
 *   apple-touch-icon.png                  — opaque square iOS home-screen icon
 *                                           (Apple ignores SVG favicons)
 *
 * Run once whenever the brand mark changes:
 *   node scripts/generate-icons.mjs      (requires the `sharp` devDependency)
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import sharp from "sharp";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(root, "..", "public");

// The squircle tile straight out of public/favicon.svg. Rasterizing the SAME
// source keeps every rendition visually identical by construction.
const faviconSvg = await readFile(path.join(publicDir, "favicon.svg"));

// Maskable / apple-touch variant: drop the rounded-corner look (the OS rounds
// it) and shrink the glyph ~30% so it stays fully visible inside the maskable
// safe zone (a circle of radius 40% of the icon size, centered mid-tile).
const fullBleedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#09090f"/>
  <text x="16" y="20" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#818CF8">&lt;/&gt;</text>
</svg>`;

// An SVG's intrinsic size here is 32px @ 72dpi; raising density up-renders a
// vector-crisp output at each target size instead of blurry bitmap scaling.
const densityFor = (size) => Math.round((72 * size) / 32);

const targets = [
  { src: faviconSvg, name: "icon-192.png", size: 192 },
  { src: faviconSvg, name: "icon-512.png", size: 512 },
  { src: Buffer.from(fullBleedSvg), name: "icon-maskable-192.png", size: 192 },
  { src: Buffer.from(fullBleedSvg), name: "icon-maskable-512.png", size: 512 },
  // Opaque full-bleed square; Apple applies its own rounded mask on device.
  { src: Buffer.from(fullBleedSvg), name: "apple-touch-icon.png", size: 180 },
];

for (const { src, name, size } of targets) {
  const out = path.join(publicDir, name);
  await sharp(src, { density: densityFor(size) })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`✔ ${name} (${size}×${size})`);
}

console.log("\nAll icons written to public/.");
