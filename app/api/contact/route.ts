import { NextRequest, NextResponse } from "next/server";

// Canonical origin shared with layout/sitemap/robots — used both as the
// apparent submitting context for the mail relay and in visitor-safe copy.
import { SITE_URL } from "@/lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Forward submissions to FormSubmit (the same service used by the original
// portfolio). It delivers the message to the address below without requiring
// an SMTP server or API keys.
const CONTACT_TARGET = "mr.sehaj.official@gmail.com";

// Never leave the HTTP connection hanging on a slow upstream relay.
const UPSTREAM_TIMEOUT_MS = 10_000;

// Fixed-window rate limiter, keyed by client IP. Memory-only and local to
// this server instance — enough to blunt drive-by spam for a single-origin
// portfolio site. If this ever scales horizontally, swap the Map for a
// shared store (e.g. Upstash Redis).
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic pruning so the map can't grow without bound.
  if (hits.size > 1_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX_REQUESTS;
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Parse the request body as JSON; any malformation becomes null. */
async function readJson(
  req: NextRequest,
): Promise<Record<string, unknown> | null> {
  try {
    const parsed = await req.json();
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  // ---- Abuse control first: reject floods before doing any work. ----
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error:
          "Too many messages from your network. Wait a minute and send again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(RATE_WINDOW_MS / 1000)),
        },
      },
    );
  }

  // ---- Parsing: shape failures are 400, but ONLY here. Upstream delivery
  // failures must never fall into the same bucket. ----
  const body = await readJson(req);
  if (!body) {
    return NextResponse.json(
      { error: "Malformed request. Expected a JSON object." },
      { status: 400 },
    );
  }

  // ---- Honeypot: the visible UI never sends this field, so only scraper
  // scripts do. Pretend success without forwarding, so bots learn nothing.
  if (String(body._honey ?? "").trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // ---- Validation (visitor-safe messages; no internals leak). ----
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!email) missing.push("email");
  if (!message) missing.push("message");
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}.` },
      { status: 400 },
    );
  }

  // RFC-max sensible lengths; 413 tells clients it's about payload size.
  if (email.length > 320 || name.length > 200 || message.length > 5_000) {
    return NextResponse.json(
      { error: "Message too long. Shorten it and send again." },
      { status: 413 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 },
    );
  }

  // ---- Delivery: isolated so upstream failures get 502, not 400. ----
  type FormSubmitResult = { success?: string | boolean; message?: string };

  const form = new FormData();
  form.set("name", name);
  form.set("email", email);
  form.set("message", message);
  form.set("_subject", `Portfolio message from ${name}`);
  form.set("_replyto", email);
  form.set("_captcha", "false");
  // Rendered submissions as an aligned HTML table in the inbox — easier to
  // scan than FormSubmit's default plain template.
  form.set("_template", "table");

  let upstream: Response;
  try {
    upstream = await fetch(`https://formsubmit.co/ajax/${CONTACT_TARGET}`, {
      method: "POST",
      body: form,
      // FormSubmit's relay inspects the web context of each submission.
      // A bare server-to-server fetch has no Origin/Referer and trips their
      // "open this page through a web server" heuristic — so declare the
      // canonical site explicitly, exactly as the visitor's own browser
      // would when posting from the deployed contact form.
      headers: {
        Accept: "application/json",
        Origin: SITE_URL.replace(/\/$/, ""),
        Referer: `${SITE_URL}contact`,
      },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (err) {
    // TimeoutError lands here too — report availability problems as 502.
    console.error("[contact] FormSubmit unreachable:", err);
    return NextResponse.json(
      {
        error:
          "The mail relay didn't respond. Email me directly at mr.sehaj.official@gmail.com.",
      },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.error(
      "[contact] FormSubmit rejected submission:",
      upstream.status,
      detail.slice(0, 500),
    );
    return NextResponse.json(
      {
        error:
          "The mail relay rejected the message. Try again shortly or email me directly.",
      },
      { status: 502 },
    );
  }

  // FormSubmit's AJAX endpoint can answer HTTP 200 while STILL refusing
  // delivery (pending email activation, throttling, …) using a JSON flag.
  // Trust the flag, not the status, or visitors would see a false
  // "message sent" while nothing ever arrives.
  let result: FormSubmitResult | null = null;
  try {
    result = (await upstream.json()) as FormSubmitResult;
  } catch {
    // No parsable body: defer to the 2xx status above (older behavior).
  }

  const delivered =
    result === null ||
    String(result.success ?? "true").toLowerCase() !== "false";

  if (!delivered) {
    console.error("[contact] FormSubmit refused delivery:", result?.message);
    return NextResponse.json(
      {
        error:
          "The mail relay couldn't accept the message right now. Try again soon or email me directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}