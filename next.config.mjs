/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Compression is handled by the custom server (server.js) via the
  // `compression` middleware — see the comment there. Disabling Next's own
  // layer prevents double-encoding.
  compress: false,
  poweredByHeader: false,
  // Allow the dev server to serve JS chunks / HMR to devices on your local
  // network (e.g. testing the site on your phone). Update this with your
  // device's IP if it changes, or add more (e.g. '192.168.1.6').
  allowedDevOrigins: ["192.168.1.5"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Canonicalize the site to https://sehaj.wasmer.app/.
  //
  // The previous domain (bitbridge.work.gd) is retired. Both of its hosts —
  // the apex and www — permanently 301 to the new origin, preserving the path
  // so any shared or indexed deep link still lands on the right content and
  // Google collapses all signals onto the single new canonical origin.
  //
  // These host redirects are listed FIRST so old-domain requests move to the
  // new origin in one hop before any other rule applies.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bitbridge.work.gd" }],
        destination: "https://sehaj.wasmer.app/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bitbridge.work.gd" }],
        destination: "https://sehaj.wasmer.app/:path*",
        permanent: true,
      },
      // The detail sections now live on their own routes (/work, /about,
      // /stack, /faq) with the same section IDs, so navigating the homepage
      // and clicking through pages stays consistent. Contact remains a
      // homepage-only section: permanently 301 old /contact URLs home so any
      // previously shared links (and their SEO signals) survive.
      { source: "/contact", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
        ],
      },
      // Content-addressable static assets: cache hard for repeat visits so the
      // browser never re-validates them. (Next.js already emits immutable
      // caching for the hashed /_next/static build output; this extends the
      // same guarantee to versioned files served from /public.)
      {
        source: "/:path*.(svg|png|jpg|jpeg|gif|webp|avif|ico|woff2|woff|ttf|otf|css|js|pdf|map)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
