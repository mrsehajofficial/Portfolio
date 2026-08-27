"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (prefersReducedMotion) {
        gsap.set(
          [
            ".hero-eyebrow",
            ".hero-line",
            ".hero-sub",
            ".hero-cta",
            ".hero-scroll-hint",
          ],
          { opacity: 1, y: 0 }
        );
        gsap.set(".pipeline-edge", { strokeDashoffset: 0 });
        gsap.set(".pipeline-node", { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(".hero-line span", { yPercent: 110 });
      gsap.set(
        [".hero-eyebrow", ".hero-sub", ".hero-cta", ".hero-scroll-hint"],
        { opacity: 0, y: 16 }
      );
      gsap.set(".pipeline-edge", { strokeDashoffset: 1 });
      gsap.set(".pipeline-node", { opacity: 0, scale: 0.6 });

      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 })
        .to(
          ".hero-line span",
          {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(
          ".pipeline-node",
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(2)",
          },
          "-=0.5"
        )
        .to(
          ".pipeline-edge",
          {
            strokeDashoffset: 0,
            duration: 0.6,
            stagger: 0.06,
          },
          "-=0.6"
        )
        .to(".hero-scroll-hint", { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

      const pulseTl = gsap.timeline({ repeat: -1, delay: 2.6 });
      const waypoints = [
        getNode("ingest"),
        getNode("parse"),
        getNode("validate"),
        getNode("deploy"),
      ];
      gsap.set(".pipeline-pulse", {
        attr: { cx: waypoints[0].x, cy: waypoints[0].y },
        opacity: 0,
      });
      waypoints.forEach((point, i) => {
        if (i === 0) {
          pulseTl.to(".pipeline-pulse", { opacity: 1, duration: 0.2 });
          return;
        }
        pulseTl.to(".pipeline-pulse", {
          attr: { cx: point.x, cy: point.y },
          duration: 0.7,
          ease: "power1.inOut",
        });
      });
      pulseTl.to(".pipeline-pulse", { opacity: 0, duration: 0.3 });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
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
        <p
          className="hero-eyebrow mono"
          style={{
            fontSize: 13,
            color: "var(--signal)",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--signal)",
              display: "inline-block",
              boxShadow: "0 0 0 4px var(--signal-dim)",
            }}
          />
          available for automation &amp; backend work — open to new projects
        </p>

        <h1
          style={{
            fontSize: "clamp(2.6rem, 7vw, 6.2rem)",
            color: "var(--ink)",
            maxWidth: 1100,
          }}
        >
          <span
            className="hero-line"
            style={{ display: "block", overflow: "hidden" }}
          >
            <span style={{ display: "inline-block" }}>
              {/* Trailing {' '} keeps copy-paste/extraction punctuation
                  correct even though CSS makes these spans block-level. */}
              I automate the boring{" "}
            </span>
          </span>
          <span
            className="hero-line"
            style={{ display: "block", overflow: "hidden" }}
          >
            <span style={{ display: "inline-block" }}>
              stuff, orchestrate{" "}
              <em style={{ fontStyle: "italic", color: "var(--signal)" }}>
                LLM agents
              </em>
              ,{" "}
            </span>
          </span>
          <span
            className="hero-line"
            style={{ display: "block", overflow: "hidden" }}
          >
            <span style={{ display: "inline-block" }}>
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
            filter: "blur(40px)",
          }}
        />
        <style>{`
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
        `}</style>
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
          AI Automation Engineer &amp; Backend Developer — building LLM agents,
          RAG pipelines, automation scripts, and Flask backends that turn
          repetitive workflows into reliable software.
        </p>

        <div
          className="hero-cta"
          style={{ display: "flex", gap: 16, marginTop: 44, flexWrap: "wrap" }}
        >
          <a
            href="/work"
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
          </a>
          <a
            href="/contact"
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
          </a>
        </div>
      </div>

      <div
        style={{
          marginTop: 72,
          opacity: mounted ? 1 : 0,
        }}
      >
        <div className="container">
          <svg
            viewBox="0 0 440 130"
            width="100%"
            style={{ maxWidth: 620, height: "auto", overflow: "visible" }}
            role="img"
            aria-label="Diagram of an automation pipeline: ingest, parse, LLM inference, validate, deploy"
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
                  strokeDasharray={1}
                  style={{ strokeDashoffset: 1 }}
                  pathLength={1}
                />
              );
            })}

            <circle
              className="pipeline-pulse"
              r="2.5"
              fill="var(--signal)"
              opacity={0.9}
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
    </section>
  );
}
