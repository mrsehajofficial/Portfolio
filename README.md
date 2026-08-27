# Sehaj Varma — Portfolio

The personal portfolio of **Sehaj Varma — AI Automation Engineer & Backend Developer**.
A cinematic Next.js portfolio: server-rendered for SEO, GSAP + Lenis for
scroll-driven motion, zero external UI kit — every component is hand-built.

Live at **https://www.bitbridge.work.gd/**

## Stack

- **Next.js** (App Router) — server-rendered HTML for SEO, file-based routing
- **GSAP + ScrollTrigger** — scroll-triggered reveals, hero pipeline animation, counters
- **Lenis** — smooth scroll
- **TypeScript**, strict mode
- No component library, no Tailwind — plain CSS variables + inline styles

## Run it locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Structure

- `app/layout.tsx` — metadata, Open Graph, JSON-LD (`Person` schema), meta robots
- `app/robots.ts` — search-engine **and** AI-bot-friendly rules (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, etc.)
- `app/sitemap.ts` — sitemap with all on-page sections
- `app/api/contact/route.ts` — validates the form server-side, then forwards to
  FormSubmit which emails `mr.sehaj.official@gmail.com`
- `components/` — Nav, Hero, Work, About, Stack, Contact, Footer + effect helpers

## Content

The site uses **real, honest content only**:

- **Hero / About / Stack** — from the Portfolio-main build that scored 100% in
  PageSpeed Insights & SEO
- **Stats** — `10+ automation scripts`, `4+ AI prototypes`, `100% focus` (no
  invented numbers)
- **Selected work** — one real, open-source project: **Amai Yuki**
  (real-time messaging app, Flutter) → `https://github.com/mrsehajofficial/Amai-Yuki`
- **No fabricated metrics** — no fake latency/throughput/uptime claims

## SEO checklist (done)

- [x] Server-rendered HTML
- [x] `sitemap.xml` auto-generated at `/sitemap.xml`
- [x] `robots.txt` auto-generated at `/robots.txt` — allows all major crawlers
      and AI bots
- [x] JSON-LD structured data (`Person` schema)
- [x] Open Graph + Twitter Card meta tags (uses `public/og-image.svg`)
- [x] `google1088e161c042d899.html` verification file in `public/`
- [x] Semantic HTML, one `<h1>` per page, alt/ARIA labels on the hero SVG

## Contact form

The form posts to `/api/contact`, which forwards the submission to FormSubmit
(`formsubmit.co/ajax/...`) addressed to `mr.sehaj.official@gmail.com`. The
first time someone submits, FormSubmit asks you to confirm the email address —
open the confirmation link it sends, and deliveries start immediately.

## Accessibility notes

- `prefers-reduced-motion` respected globally — every GSAP animation has a
  reduced-motion branch
- Custom cursor and film-grain overlay disabled on touch devices and under
  reduced-motion
- Visible focus rings on all interactive elements
- Skip-to-content link for keyboard/screen-reader users
