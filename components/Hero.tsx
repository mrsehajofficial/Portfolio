"use client";

import { scrollToSection } from "@/lib/scrollToSection";

const PIPELINE_NODES = [
  { id: "ingest", label: "ingest", x: 40, y: 60 },
  { id: "parse", label: "parse", x: 160, y: 24 },
  { id: "llm", label: "llm.infer", x: 160, y: 96 },
  { id: "validate", label: "validate", x: 280, y: 60 },
  { id: "deploy", label: "deploy", x: 400, y: 60 },
];

const PIPELINE_EDGES = [
  { from: "ingest", to: "parse" },
  { from: "ingest", to: "llm" },
  { from: "parse", to: "validate" },
  { from: "llm", to: "validate" },
  { from: "validate", to: "deploy" },
];

function getNode(id: string) {
  return PIPELINE_NODES.find((n) => n.id === id)!;
}

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 120,
        paddingBottom: 80,
        overflow: "hidden",
      }}
    >
      <div className="container">
        <h1
          style={{
            fontSize: "clamp(2.6rem, 7vw, 6.2rem)",
            color: "var(--ink)",
            maxWidth: 1100,
          }}
        >
          <span
            className="hero-line hero-line-1"
            style={{ display: "block" }}
          >
            <span>
              I automate the boring{" "}
            </span>
          </span>
          <span
            className="hero-line hero-line-2"
            style={{ display: "block" }}
          >
            <span>
              stuff, orchestrate{" "}
              <em style={{ fontStyle: "italic", color: "var(--signal)" }}>
                LLM agents
              </em>
              ,{" "}
            </span>
          </span>
          <span
            className="hero-line hero-line-3"
            style={{ display: "block" }}
          >
            <span>
              &amp; ship clean{" "}
              <em style={{ fontStyle: "italic", color: "var(--signal)" }}>
                backends
              </em>
              .
            </span>
          </span>
        </h1>

        {/* Soft radial accent behind the headline — gives the text-driven
            hero a premium focal point without shipping an image payload. */}
        <div
          aria-hidden="true"
          className="hero-glow"
          style={{
            position: "absolute",
            top: "-160px",
            left: "-10%",
            width: "120%",
            height: 460,
            pointerEvents: "none",
            background:
              "radial-gradient(closest-side, rgba(62, 207, 142, 0.13), transparent 70%)",
          }}
        />

        <p
          className="hero-sub"
          style={{
            fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
            color: "var(--ink-dim)",
            maxWidth: 560,
            marginTop: 36,
            lineHeight: 1.7,
          }}
        >
          Sehaj Varma is an AI Automation Engineer &amp; Backend Developer who
          builds LLM agents, RAG pipelines, automation scripts, and Flask
          backends that turn repetitive workflows into reliable software.
        </p>

        <div
          className="hero-cta"
          style={{ display: "flex", gap: 16, marginTop: 44, flexWrap: "wrap" }}
        >
          <button
            onClick={() => scrollToSection("work")}
            data-cursor-hover
            className="cta-primary"
            style={{
              padding: "16px 32px",
              background: "var(--signal)",
              color: "var(--bg)",
              borderRadius: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            view selected work →
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            data-cursor-hover
            className="cta-secondary"
            style={{
              padding: "16px 32px",
              border: "1px solid var(--hairline-strong)",
              color: "var(--ink)",
              borderRadius: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 14,
            }}
          >
            get in touch
          </button>
        </div>
      </div>

      <div style={{ marginTop: 72 }}>
        <div className="container">
          <svg
            viewBox="0 0 440 130"
            width="100%"
            style={{ maxWidth: 620, height: "auto", overflow: "visible" }}
            role="img"
            aria-label="Diagram of an automation pipeline: ingest, parse, LLM inference, validate, deploy"
            className="hero-diagram"
          >
            <title>Automation pipeline flow</title>

            {PIPELINE_EDGES.map((edge, i) => {
              const from = getNode(edge.from);
              const to = getNode(edge.to);
              return (
                <line
                  key={i}
                  className="pipeline-edge"
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--hairline-strong)"
                  strokeWidth={1}
                />
              );
            })}

            <circle
              className="pipeline-pulse-dot"
              r="3"
              fill="var(--signal)"
            />

            {PIPELINE_NODES.map((node) => (
              <g
                key={node.id}
                className="pipeline-node"
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={5}
                  fill="var(--bg)"
                  stroke={
                    node.id === "llm" ? "var(--signal)" : "var(--ink-faint)"
                  }
                  strokeWidth={1.5}
                />
                <text
                  x={node.x}
                  y={node.y + 22}
                  textAnchor="middle"
                  className="mono"
                  fontSize={10}
                  fill="var(--ink-faint)"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div
        className="hero-scroll-hint mono"
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          fontSize: 11,
          color: "var(--ink-faint)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
        aria-hidden="true"
      >
        scroll
      </div>

      <style>{`
        @keyframes heroIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseMove {
          0% { cx: 40px; cy: 60px; opacity: 0; }
          10% { opacity: 1; }
          35% { cx: 160px; cy: 24px; opacity: 1; }
          70% { cx: 280px; cy: 60px; opacity: 1; }
          90% { cx: 400px; cy: 60px; opacity: 1; }
          100% { cx: 400px; cy: 60px; opacity: 0; }
        }

        .hero-line-1 { animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-line-2 { animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both; }
        .hero-line-3 { animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.16s both; }
        .hero-sub { animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both; }
        .hero-cta { animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.32s both; }
        .hero-diagram { animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
        .hero-scroll-hint { animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.48s both; }

        .pipeline-pulse-dot {
          animation: pulseMove 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .cta-primary {
          transition: transform 0.25s var(--ease-power),
            box-shadow 0.25s var(--ease-power);
          box-shadow: 0 8px 28px rgba(62, 207, 142, 0.22);
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(62, 207, 142, 0.34);
        }
        .cta-secondary {
          color: var(--ink-dim);
          transition: color 0.25s var(--ease-power),
            border-color 0.25s var(--ease-power);
        }
        .cta-secondary:hover {
          color: var(--ink);
          border-color: var(--signal);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-line-1, .hero-line-2, .hero-line-3, .hero-sub, .hero-cta, .hero-diagram, .hero-scroll-hint {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .pipeline-pulse-dot {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

