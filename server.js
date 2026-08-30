/**
 * Custom Next.js server with in-process gzip compression.
 *
 * Why: the deployed origin (Wasmer) proxies `next start` responses WITHOUT
 * content-encoding, so visitors download the fully uncompressed HTML (~70 KB)
 * and JS/CSS chunks. Compressing inside this process — before the platform
 * proxy — restores gzip for every compressible response and pulls it onto the
 * LCP critical path.
 *
 * `compress: false` is set in next.config.mjs because all compression happens
 * here via the `compression` middleware (prevents double-encoding).
 */
const { createServer } = require("node:http");
const next = require("next");
const compression = require("compression");

const port = Number(process.env.PORT) || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    // compression() negotiates Accept-Encoding: clients that don't accept
    // gzip/br get the plain response, so nothing breaks.
    compression()(req, res, () => handle(req, res));
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});