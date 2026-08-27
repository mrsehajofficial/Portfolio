# Assets

Static files under `public/` and identity routes generated from `app/`, all referenced by `app/layout.tsx`, `app/robots.ts`, or `app/manifest.ts`.

## Favicon & app icons (`public/`)

| File | Purpose |
| --- | --- |
| `favicon.svg` | Master vector mark (tab/bookmark icon; Sehaj Varma logo) |
| `icon-192.png` / `icon-512.png` | Raster renditions for platforms/crawlers that skip SVG icons |
| `icon-maskable-192.png` / `icon-maskable-512.png` | Full-bleed art padded for Android's circular launcher masks |
| `apple-touch-icon.png` | iOS/Safari home-screen icon (Safari does not support SVG touch icons) |

Regenerate all PNGs from the SVG source with:

```sh
node scripts/generate-icons.mjs
```

(requires the `sharp` devDependency already listed in `package.json`).

## Site identity & crawler surface

| Path | Source | Purpose |
| --- | --- | --- |
| `/manifest.webmanifest` | `app/manifest.ts` | PWA/site identity card (name, description, icons, colors) |
| `/robots.txt` | `app/robots.ts` | Crawl policy — allows all bots including AI agents, blocks `/api/` |
| `/sitemap.xml` | `app/sitemap.ts` | Canonical URL list for search engines |
| `llms.txt` | static copy | Human-written site summary read by LLM-based agents |

## Share preview

- `og-image.svg` — 1200×630 social share preview (NOTE: X/Twitter and Facebook don't render SVG previews; swap in a 1200×630 PNG if share cards look blank)

## Verification

- `google1088e161c042d899.html` — Google Search Console verification file
