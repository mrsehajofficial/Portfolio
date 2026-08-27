/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
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
  // Canonicalize the site to https://www.bitbridge.work.gd/.
  //
  // Both the apex (bitbridge.work.gd) and www hosts currently serve the same
  // content, which is a duplicate-content risk for SEO. Rather than duplicating
  // the non-www URLs in robots.txt / sitemap.xml (which would *worsen* the
  // duplicate-content problem), we permanently 301 the non-www host to the www
  // host. Google then collapses all signals onto the single canonical origin,
  // and robots.txt / sitemap.xml correctly reference only that canonical host.
  //
  // Works only when this Next.js server receives traffic for both hosts (as it
  // does now — both return 200). If you later move behind a CDN/proxy, prefer
  // a host-level redirect there instead.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bitbridge.work.gd" }],
        destination: "https://www.bitbridge.work.gd/:path*",
        permanent: true,
      },
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
