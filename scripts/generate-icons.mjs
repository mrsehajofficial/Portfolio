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
import { readFile, writeFile } from "node:fs/promises";
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
  <rect width="32" height="32" fill="#0a0a0b"/>
  <text x="16" y="22" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="700" fill="#3ecf8e">&lt;/&gt;</text>
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

// Classic favicon.ico: a real multi-resolution ICO container (16/32/48) with
// PNG-compressed entries, packed by hand — sharp has no ICO writer. ICO is on
// Google Search's list of supported search-favicon formats (SVG is not), and
// legacy clients / some crawlers fetch /favicon.ico directly. Referenced
// first in app/layout.tsx's icons metadata.
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((size) =>
    sharp(faviconSvg, { density: densityFor(size) })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer(),
  ),
);

// ICO container: 6-byte header, one 16-byte directory entry per image, then
// the raw PNG payloads back to back.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved, must be 0
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(icoPngs.length, 4); // number of images

const directory = Buffer.alloc(16 * icoPngs.length);
let offset = header.length + directory.length;
icoPngs.forEach((png, i) => {
  const size = icoSizes[i];
  const entry = i * 16;
  directory.writeUInt8(size, entry); // width (0 would mean 256)
  directory.writeUInt8(size, entry + 1); // height
  directory.writeUInt8(0, entry + 2); // palette color count (0 = truecolor)
  directory.writeUInt8(0, entry + 3); // reserved
  directory.writeUInt16LE(1, entry + 4); // color planes
  directory.writeUInt16LE(32, entry + 6); // bits per pixel
  directory.writeUInt32LE(png.length, entry + 8); // image data size
  directory.writeUInt32LE(offset, entry + 12); // image data offset
  offset += png.length;
});

await writeFile(
  path.join(publicDir, "favicon.ico"),
  Buffer.concat([header, directory, ...icoPngs]),
);
console.log(`✔ favicon.ico (${icoSizes.join("/")})`);

console.log("\nAll icons written to public/.");
