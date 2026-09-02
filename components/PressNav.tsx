"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/scrollToSection";
import { PERSON } from "@/lib/content";

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

const DETAIL_PATHS = new Set(["/work", "/about", "/stack", "/faq"]);

/**
 * PressNav — the masthead of the print shop. Name as an embossed stamp,
 * links as printer's marks (the active one sits on a solid ink chip), and a
 * vermilion "let's talk" button as the shop's job-request stamp.
 */
export default function PressNav() {
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [navHidden, setNavHidden] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const activePath = isHome ? null : pathname;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const goingDown = currentY > lastScrollY.current;
        if (goingDown && currentY > 120 && !menuOpen) setNavHidden(true);
        else setNavHidden(false);
        lastScrollY.current = currentY;
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const renderDesktopLink = (link: (typeof LINKS)[number]) => {
    const isActive = activePath === link.href;
    if (isHome) {
      return (
        <button
          key={link.id}
          onClick={() => scrollToSection(link.id)}
          data-cursor-hover
          className="nav-mark"
        >
          {link.label}
        </button>
      );
    }
    return (
      <Link
        key={link.id}
        href={link.href}
        data-cursor-hover
        className={`nav-mark${isActive ? " active" : ""}`}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
      <nav
        ref={navRef}
        className={navHidden ? "press-nav hidden" : "press-nav"}
      >
        <div className="container nav-inner">
          <a href="/" data-cursor-hover className="brand-stamp">
            {PERSON.shortName}.varma
          </a>

          <div className="nav-links">
            {LINKS.map(renderDesktopLink)}
          </div>

          {isHome ? (
            <button
              onClick={() => scrollToSection("contact")}
              data-cursor-hover
              className="nav-cta"
            >
              lets talk
            </button>
          ) : (
            <Link href="/#contact" data-cursor-hover className="nav-cta">
              lets talk
            </Link>
          )}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="nav-menu-button"
          >
            {menuOpen ? "close" : "menu"}
          </button>
        </div>
      </nav>

      <div
        ref={drawerRef}
        id="mobile-menu"
        className={menuOpen ? "mobile-drawer open" : "mobile-drawer"}
      >
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {LINKS.map((link) =>
            isHome ? (
              <button
                key={link.id}
                onClick={() => {
                  setMenuOpen(false);
                  window.setTimeout(() => scrollToSection(link.id), 60);
                }}
                className="drawer-link"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`drawer-link${
                  activePath === link.href ? " active" : ""
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
}