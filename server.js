/**
 * Custom Next.js server entry.
 *
 * Compression: handled natively by Next itself (`compress: true` in
 * next.config.mjs). Next gzips every compressible response (HTML, JS, CSS,
 * SVG, JSON) inside this same process and sets `Vary: Accept-Encoding`, so
 * the platform proxy (Wasmer) passes the encoded response through untouched.
 * No separate `compression` middleware here — that previously caused
 * double-encoding risk and duplicated what Next already does.
 */
const { createServer } = require("node:http");
const next = require("next");

const port = Number(process.env.PORT) || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});