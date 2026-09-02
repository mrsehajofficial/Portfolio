/**
 * lib/content.ts — single source of truth for every word on the site.
 *
 * The PAPER PRESS rebuild runs all copy through one module so three things can
 * never drift apart: what pages render, what JSON-LD declares, and what
 * llms.txt / llms-full.txt feed to answer engines. When the copy changes, it
 * changes here and everywhere follows.
 *
 * Voice rules for anything added here (the "not generated" contract):
 * - uneven sentence rhythm; fragments allowed
 * - first person on visible pages (third person stays in metadata/schema)
 * - specificity over adjectives — real details beat claims
 * - one honest admission beats five polished promises
 */

export const PERSON = {
  name: "Sehaj Varma",
  shortName: "Sehaj",
  handle: "mrsehajofficial",
  role: "AI Automation Engineer & Backend Developer",
  email: "mr.sehaj.official@gmail.com",
  github: "https://github.com/mrsehajofficial",
  githubRepo: "https://github.com/mrsehajofficial/Amai-Yuki",
  location: "India",
  locationLine: "India — open to remote work worldwide",
} as const;

/* ── Front page (hero) ──────────────────────────────────────────────────── */

export const HERO = {
  slug: "Job Nº 001 — approved for press",
  lines: ["I automate the boring", "parts, wire up LLM agents,", "& ship backends that hold up."],
  sub: "I'm Sehaj Varma — an AI automation and backend engineer from India. I build Python/Flask APIs, LLM agents, RAG pipelines, and the scripts that quietly do the work nobody wants to do twice.",
  ctaPrimary: "see the work",
  ctaSecondary: "get in touch",
  edge: "Portfolio — 2026 edition",
  footLeft: "pull the sheet ↓",
  footRight: "set in ink · India · ships worldwide",
} as const;

export const TICKER = [
  "AI automation",
  "LLM agents",
  "RAG pipelines",
  "Flask backends",
  "workflow scripts",
  "API integrations",
] as const;

/* ── Work ───────────────────────────────────────────────────────────────── */

export type Project = {
  id: string;
  formNo: string;
  title: string;
  subtitle: string;
  problem: string;
  built: string[];
  result: string;
  tags: string[];
  sourceUrl: string;
  year: string;
};

export const FLAGSHIP: Project = {
  id: "amai-yuki",
  formNo: "02",
  title: "Amai Yuki",
  subtitle: "A real-time messaging app, from zero to shipped",
  problem:
    "Off-the-shelf messaging backends own your data flow, your latency, and every feature they never bothered to expose. I wanted the protocol layer and the camera module to be mine — so I stopped negotiating with someone else's API and built the thing from zero.",
  built: [
    "A Flask REST backend on SQLite. Every route validates its input — the first version didn't, and it bit me exactly once before I fixed that permanently.",
    "Direct and group chat running over the project's own protocol layer, not a rented one.",
    "A camera module built into the Flutter app itself — the capture features other backends simply don't expose.",
    "LLM features layered into chat, driven by prompt orchestration so they behave on a Tuesday as well as they did in the demo.",
  ],
  result:
    "It works. The frontend is open-source and you can run it today; the backend stays private, partly for security and partly because the early migrations embarrass me. Frontend polish moved faster with AI tooling — under my direction, not the other way around.",
  tags: ["Python", "Flask", "Provider", "LLM", "Flutter"],
  sourceUrl: "https://github.com/mrsehajofficial/Amai-Yuki",
  year: "2026",
};

export const EVIDENCE = [
  {
    id: "automation",
    title: "Automation scripts",
    body: "10+ private Python tools — scheduled jobs, file-processing pipelines, API-to-API glue. One of them runs at 6am, moves three kinds of files, and emails me only when something goes wrong. That's the whole point: the good ones you never think about.",
  },
  {
    id: "ai-rag",
    title: "AI / RAG experiments",
    body: "OpenAI and Gemini integrations, prompt orchestration systems, RAG architecture studies. Most of it feeds Amai Yuki's LLM-assisted features. The interesting engineering isn't the demo — it's the gap between demo and reliable.",
  },
  {
    id: "this-site",
    title: "This site itself",
    body: "A static Next.js build — server-rendered so crawlers see everything, zero external calls, and a small client-side retrieval engine that answers questions from the site's own facts. It's also the reason this page loads fast.",
  },
] as const;

/* ── About ──────────────────────────────────────────────────────────────── */

export const ABOUT = {
  eyebrow: "Form 03 — the person behind it",
  title: "I like problems with edges. Software has the most edges.",
  paragraphs: [
    "I'm Sehaj. I build automation and backends from India, and I work remotely with anyone, anywhere.",
    "The whole thing clicked for me because of logic puzzles. There's a specific satisfaction in watching a script do, in six seconds, the task you used to lose an afternoon to. Every manual step I script away is a step nobody ever does again — that math is addictive.",
    "Right now I'm deep in AI integrations: prompt orchestration, RAG architecture, agents that actually call external APIs instead of hallucinating an answer. The gap between a demo and something reliable is where all the interesting engineering lives, and that's where I've been camping.",
    "On the backend side I ship Flask REST APIs on clean SQLite schemas. Input validation on every route, modular structure, and documentation good enough that future-me doesn't curse present-me.",
  ],
  pills: ["Workflow Automation", "Clean API Structures", "AI API Integrations", "System Scripting"],
  stats: [
    { value: 10, suffix: "+", label: "automation scripts built" },
    { value: 4, suffix: "+", label: "AI integration prototypes" },
    { value: 4, suffix: "+", label: "deployment platforms shipped to" },
  ],
} as const;

/* ── Stack ──────────────────────────────────────────────────────────────── */

export type Capability = { name: string; items: readonly string[]; where: string };

export const STACK: readonly Capability[] = [
  {
    name: "AI",
    items: ["OpenAI", "Gemini", "RAG", "Agents", "Prompt orchestration"],
    where: "OpenAI and Gemini integrations run inside Amai Yuki's chat features. Prompt orchestration is what keeps the outputs boring (in the good way). RAG architecture and agents that call external APIs are the current deep-dive — the goal is answers from real data, not confident guesses.",
  },
  {
    name: "Backend",
    items: ["Python", "Flask", "REST APIs", "SQLite"],
    where: "The pattern: Flask REST APIs on clean SQLite schemas. Modular code, validation on every route, docs you can actually read. Amai Yuki's messaging backend is the flagship example.",
  },
  {
    name: "Automation",
    items: ["Python scripting", "Scheduled jobs", "File processing", "API integrations"],
    where: "10+ private Python scripts across scheduled jobs, file pipelines, and API-to-API glue. Each one exists because I got tired of doing the same thing twice. The best ones run for months without anyone remembering they exist.",
  },
  {
    name: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "Flutter", "Dart"],
    where: "Amai Yuki's Flutter/Dart frontend on Provider-based state — including the custom camera module. Plus hand-rolled HTML/CSS/JS like the page you're reading right now.",
  },
  {
    name: "Deployment",
    items: ["Vercel", "Netlify", "Render", "Wasmer"],
    where: "Four platforms so far, each picked per project rather than by habit. This portfolio runs as a static Next.js build on Wasmer — prerendered, gzip-compressed, and checked against Lighthouse every time I touch it.",
  },
];

export const STACK_NOTE =
  "My selection criterion is deliberately boring: prefer the tool that's documented, debuggable, and still maintained in five years over the one that demos well. Python and Flask over trendier frameworks, SQLite until a project genuinely outgrows it, Flutter when one codebase has to reach both platforms. The stack serves the work, never the reverse.";

/* ── FAQ ────────────────────────────────────────────────────────────────── */

export type Faq = { question: string; answer: string };

export const FAQS: readonly Faq[] = [
  {
    question: "Who is Sehaj Varma?",
    answer:
      "An AI Automation Engineer and Backend Developer from India, open to remote work worldwide. I build LLM agents, RAG pipelines, Python automation suites, and Flask backends — mostly for people who are tired of doing the same manual workflow for the hundredth time.",
  },
  {
    question: "What does he specialize in?",
    answer:
      "Two things that overlap a lot: workflow automation (Python scripts for scheduled jobs, file processing, API-to-API integration) and backend engineering (Flask REST APIs on clean SQLite schemas, with validation and documentation I'm not ashamed of).",
  },
  {
    question: "What is Amai Yuki?",
    answer:
      "My flagship project — a cross-platform real-time messaging app with direct and group chats, a custom in-app camera module, and Provider-based state architecture. Python/Flask backend with SQLite, Flutter/Dart frontend. The frontend is open-source and runnable today; the backend is private but fully functional.",
  },
  {
    question: "What AI technologies does he work with?",
    answer:
      "OpenAI and Gemini API integrations, prompt orchestration, RAG (Retrieval-Augmented Generation) architecture, and conversational agents wired to external APIs so they answer from real data instead of guessing.",
  },
  {
    question: "What is his tech stack?",
    answer:
      "Five groups — AI (OpenAI, Gemini, RAG, agents, prompt orchestration), Backend (Python, Flask, REST, SQLite), Automation (scripting, scheduled jobs, file processing, API integrations), Frontend (HTML/CSS/JavaScript, Flutter, Dart), and Deployment (Vercel, Netlify, Render, Wasmer).",
  },
  {
    question: "Is Sehaj Varma available for freelance work?",
    answer:
      "Yes — AI automation, Python backends, API integration, freelance projects. Email mr.sehaj.official@gmail.com or find me on GitHub at github.com/mrsehajofficial. I reply within a day, usually faster.",
  },
];

/* ── Contact ────────────────────────────────────────────────────────────── */

export const CONTACT = {
  eyebrow: "Final form — pull a proof",
  title: "Got a workflow that annoys you?",
  titleAccent: "That's my favorite kind of project.",
  sub: "Tell me what's eating your afternoons and I'll give you an honest read on whether a script is actually the right answer. Sometimes it isn't — saying that early is worth more than shipping the wrong thing quickly.",
  availability: ["AI automation", "Python backends", "API integration", "freelance projects"],
  status: "India · remote worldwide · replies within a day, usually faster",
  copyCta: "copy the address",
  copiedCta: "copied — go write it",
} as const;

/* ── Footer ─────────────────────────────────────────────────────────────── */

export const FOOTER = {
  line: "set, proofed & pressed with next.js",
  endMark: "end of form",
} as const;
