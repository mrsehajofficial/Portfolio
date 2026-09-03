"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/scrollToSection";
import { PERSON } from "@/lib/content";

const LINKS = [
  { id: "work", label: "work", href: "/work" },
  { id: "about", label: "about", href: "/about" },
  { id: "stack", label: "stack", href: "/stack" },
  { id: "faq", label: "faq", href: "/faq" },
  { id: "contact", label: "contact", href: "/#contact" },
];

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
        if (goingDown && currentY > 150 && !menuOpen) {
          setNavHidden(true);
        } else {
          setNavHidden(false);
        }
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

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof LINKS)[number]
  ) => {
    if (isHome) {
      e.preventDefault();
      setNavHidden(false);
      scrollToSection(link.id);
    }
  };

  const handleMobileClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof LINKS)[number]
  ) => {
    setMenuOpen(false);
    if (isHome) {
      e.preventDefault();
      setNavHidden(false);
      setTimeout(() => {
        scrollToSection(link.id);
      }, 50);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={navHidden ? "press-nav hidden" : "press-nav"}
      >
        <div className="container nav-inner">
          <Link
            href="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                setNavHidden(false);
                scrollToSection(null);
              }
            }}
            data-cursor-hover
            className="brand-stamp"
          >
            {PERSON.shortName}.varma
          </Link>

          <div className="nav-links">
            {LINKS.map((link) => {
              const isActive = activePath === link.href;
              return (
                <Link
                  key={link.id}
                  href={isHome ? `/#${link.id}` : link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  data-cursor-hover
                  className={`nav-mark${isActive ? " active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/#contact"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                setNavHidden(false);
                scrollToSection("contact");
              }
            }}
            data-cursor-hover
            className="nav-cta"
          >
            lets talk
          </Link>

          <button
            type="button"
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
        <div
          className="container"
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {LINKS.map((link) => (
            <Link
              key={link.id}
              href={isHome ? `/#${link.id}` : link.href}
              onClick={(e) => handleMobileClick(e, link)}
              className={`drawer-link${
                activePath === link.href ? " active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}