/**
 * One-time asset generator: rasterizes public/og-image.svg into a real PNG.
 *
 * Why: X/Twitter and Facebook do not render SVG Open Graph previews — links
 * shared from this site would show blank cards on those platforms. This
 * produces public/og-image.png at the exact 1200×630 spec referenced by
 * app/layout.tsx metadata.
 *
 * Run after any change to og-image.svg:
 *   node scripts/generate-og.mjs      (uses the `sharp` devDependency)
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import sharp from "sharp";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(root, "..", "public");

const svg = await readFile(path.join(publicDir, "og-image.svg"));

await sharp(svg, { density: 110 })
  .resize(1200, 630)
  .png({ compressionLevel: 9, palette: true })
  .toFile(path.join(publicDir, "og-image.png"));

console.log("✔ public/og-image.png (1200×630)");