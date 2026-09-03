/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Compression MUST stay enabled here. Lighthouse's 468 KiB "Enable text
  // compression" finding came from `compress: false`: the deployed platform
  // (Wasmer) runs `next start`, which served every HTML/JS/CSS response raw.
  // With `compress: true` Next gzips all compressible responses in-process
  // (HTML 31 KB → ~7 KB on the wire) and sets `Vary: Accept-Encoding`.
  // server.js deliberately does NOT add its own compression middleware —
  // that would double-encode.
  compress: true,
  poweredByHeader: false,
  // Allow the dev server to serve JS chunks / HMR to devices on your local
  // network (e.g. testing the site on your phone). Update this with your
  // device's IP if it changes, or add more (e.g. '192.168.1.6').
  allowedDevOrigins: ["192.168.1.5", "192.168.1.7", "192.168.1.*", "localhost:3000"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Redirect legacy /contact to homepage section
  async redirects() {
    return [
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';",
          },
        ],
      },
      // Static media & fonts in /public: cache for repeat visits.
      // JS/CSS assets are hashed and cached automatically by Next.js in production.
      {
        source: "/:path*.(svg|png|jpg|jpeg|gif|webp|avif|ico|woff2|woff|ttf|otf|pdf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
