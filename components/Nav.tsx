"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { scrollToSection } from "@/lib/scrollToSection";

// Every nav target, with the route it lives on. On the homepage these
// buttons smooth-scroll to the matching <section id="...">; on the detail
// pages (/work, /about, /stack, /faq) they become real page links with an
// active state. Contact always resolves to the homepage's #contact section.
const LINKS = [
  { id: "work", label: "work", href: "/work" },
  { id: "about", label: "about", href: "/about" },
  { id: "stack", label: "stack", href: "/stack" },
  { id: "faq", label: "faq", href: "/faq" },
  { id: "contact", label: "contact", href: "/#contact" },
];

// Routes that have their own dedicated page (i.e. anything but the homepage).
const DETAIL_PATHS = new Set(["/work", "/about", "/stack", "/faq"]);

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const pathname = usePathname();
  // Homepage = section scroll. Every other route = one of these detail pages.
  const isHome = pathname === "/";
  const activePath = isHome ? null : pathname;

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const goingDown = currentY > lastScrollY.current;
        const pastThreshold = currentY > 120;

        if (goingDown && pastThreshold && !menuOpen) {
          gsap.to(nav, { yPercent: -100, duration: 0.5, ease: "power3.out" });
        } else {
          gsap.to(nav, { yPercent: 0, duration: 0.5, ease: "power3.out" });
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(drawer, { display: "flex" });
      if (prefersReducedMotion) {
        gsap.set(drawer, { opacity: 1 });
      } else {
        gsap.fromTo(
          drawer,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          ".drawer-link",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            delay: 0.1,
            ease: "power3.out",
          }
        );
      }
    } else {
      document.body.style.overflow = "";
      if (prefersReducedMotion) {
        gsap.set(drawer, { display: "none", opacity: 0 });
      } else {
        gsap.to(drawer, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
         onComplete: () => {
  gsap.set(drawer, { display: "none" });
},
        });
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(10, 10, 11, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--hairline)",
          transition: "background 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 84,
        }}
      >
        <a
          href="/"
          data-cursor-hover
          className="mono"
          style={{ fontSize: 15, color: "var(--ink)", fontWeight: 500 }}
        >
          sehaj.varma
        </a>

        <div
          className="mono"
          style={{ display: "flex", gap: 40, fontSize: 13 }}
        >
          {LINKS.map((link) => {
            const isActive = activePath === link.href;
            return isHome ? (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                data-cursor-hover
                style={{ color: "var(--ink-dim)", fontSize: 13 }}
                className="nav-link-desktop mono"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.id}
                href={link.href}
                data-cursor-hover
                style={{
                  color: isActive ? "var(--ink)" : "var(--ink-dim)",
                  fontSize: 13,
                }}
                className="nav-link-desktop mono"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {isHome ? (
          <button
            onClick={() => scrollToSection("contact")}
            data-cursor-hover
            className="mono nav-cta-desktop"
            style={{
              fontSize: 13,
              color: "var(--bg)",
              background: "var(--ink)",
              padding: "10px 20px",
              borderRadius: 6,
            }}
          >
            let&rsquo;s talk
          </button>
        ) : (
          <Link
            href="/#contact"
            data-cursor-hover
            className="mono nav-cta-desktop"
            style={{
              fontSize: 13,
              color: "var(--bg)",
              background: "var(--ink)",
              padding: "10px 20px",
              borderRadius: 6,
            }}
          >
            let&rsquo;s talk
          </Link>
        )}

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="nav-menu-button mono"
          style={{
            display: "none",
            fontSize: 13,
            color: "var(--ink)",
            border: "1px solid var(--hairline-strong)",
            borderRadius: 6,
            padding: "8px 14px",
          }}
        >
          {menuOpen ? "close" : "menu"}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-link-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-menu-button { display: block !important; }
        }
      `}</style>
    </nav>

    <div
      ref={drawerRef}
      id="mobile-menu"
      style={{
        display: "none",
        position: "fixed",
        inset: "84px 0 0 0",
        background: "var(--bg)",
        flexDirection: "column",
        padding: "48px 0",
        zIndex: 99,
      }}
    >
      <div
        className="container"
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        {LINKS.map((link) =>
          isHome ? (
            <button
              key={link.id}
              onClick={() => {
                setMenuOpen(false);
                // Give the drawer a beat to restore body scrolling (its close
                // effect clears overflow:hidden) before gliding to the section.
                window.setTimeout(() => scrollToSection(link.id), 60);
              }}
              className="drawer-link mono"
              style={{
                width: "100%",
                textAlign: "left",
                fontSize: 28,
                color: "var(--ink)",
                padding: "16px 0",
                borderBottom: "1px solid var(--hairline)",
              }}
            >
              {link.label}
            </button>
          ) : (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="drawer-link mono"
              style={{
                width: "100%",
                textAlign: "left",
                fontSize: 28,
                color:
                  activePath === link.href ? "var(--signal)" : "var(--ink)",
                padding: "16px 0",
                borderBottom: "1px solid var(--hairline)",
              }}
            >
              {link.label}
            </Link>
          ),
        )}
      </div>
    </div>
  </>
);
}
