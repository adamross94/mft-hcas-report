// src/components/Header.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

const Header = () => {
  const defaultLinks = useMemo(
    () => [
      { href: "#executive-summary", label: "Executive Summary" },
      { href: "#context-goals", label: "Context & Goals" },
      { href: "#cost", label: "Cost-of-Living" },
      { href: "#evidence", label: "Evidence" },
      { href: "#service-and-workforce", label: "Service & Workforce" },
      { href: "#policy", label: "Policy Route" },
      { href: "#outcomes", label: "Outcomes" },
      { href: "#recommendations", label: "Recommendations" },
      { href: "#sources", label: "Sources & Methods" },
    ],
    []
  );

  // Start with defaults; then keep only those whose target exists in the DOM.
  const [links, setLinks] = useState(defaultLinks);
  useEffect(() => {
    const validated = defaultLinks.filter(({ href }) => {
      if (!href?.startsWith("#")) return true;
      const id = href.slice(1);
      return !!document.getElementById(id);
    });
    setLinks(validated.length ? validated : defaultLinks);
  }, [defaultLinks]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const mobileRef = useRef(null);
  const moreMenuRef = useRef(null);

  // Close drawer on hash change
  useEffect(() => {
    const onHash = () => setMobileMenuOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Trap focus when open + Esc to close + restore focus to button
  useEffect(() => {
    if (!mobileMenuOpen) {
      menuBtnRef.current?.focus({ preventScroll: true });
      return;
    }
    const el = mobileRef.current;
    if (!el) return;

    const getFocusable = () =>
      el.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');

    const onKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
      if (e.key !== "Tab") return;
      const focusables = getFocusable();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    // focus first item
    getFocusable()[0]?.focus({ preventScroll: true });

    el.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      el.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close desktop "More" flyout on outside click / Escape
  useEffect(() => {
    if (!moreMenuOpen) return;
    const onClick = (e) => {
      if (!moreMenuRef.current?.contains(e.target)) setMoreMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMoreMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreMenuOpen]);

  const handleAnchor = (e, href) => {
    if (!href?.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", href);
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  };

  const PRIMARY_LINK_LIMIT = 0;
  const primaryLinks = links.slice(0, PRIMARY_LINK_LIMIT);
  const secondaryLinks = links.slice(PRIMARY_LINK_LIMIT);

  return (
    <header className="sticky top-0 z-50 shadow-lg shadow-black/10">
      <nav className="bg-gradient-to-r from-[#003087] via-[#003c8f] to-[#005EB8] border-b border-white/10">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-20">
          {/* Logo & Branding */}
          <div className="flex items-center">
            <img
              src="../nhs-medway-logo-full.svg"
              alt="Medway NHS"
              className="h-12 w-auto"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Desktop Nav (auto-validated links) */}
          <div className="hidden md:flex items-center gap-3 text-sm font-semibold text-white">
            {primaryLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleAnchor(e, href)}
                className="px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {label}
              </a>
            ))}

            {secondaryLinks.length > 0 && (
              <div className="relative" ref={moreMenuRef}>
                <button
                  type="button"
                  onClick={() => setMoreMenuOpen((open) => !open)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#003087] shadow-md shadow-black/10 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition"
                  aria-haspopup="true"
                  aria-expanded={moreMenuOpen ? "true" : "false"}
                  aria-label="Open section menu"
                >
                  Sections
                  <svg
                    className={`h-4 w-4 transition-transform ${moreMenuOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.118l3.71-3.887a.75.75 0 111.08 1.04l-4.24 4.444a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {moreMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-60 rounded-2xl bg-white/95 text-[#003087] shadow-xl ring-1 ring-black/5 py-2 backdrop-blur"
                    role="menu"
                  >
                    {secondaryLinks.map(({ href, label }) => (
                      <a
                        key={href}
                        href={href}
                        onClick={(e) => handleAnchor(e, href)}
                        className="block px-4 py-2 text-sm font-semibold rounded-xl text-left hover:bg-[#e8f1fb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005EB8]"
                        role="menuitem"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              ref={menuBtnRef}
              onClick={() => {
                setMoreMenuOpen(false);
                setMobileMenuOpen((o) => !o);
              }}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen ? "true" : "false"}
              aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
              style={{ width: 44, height: 44 }}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav (conditionally rendered, auto-validated links) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#003087]" id="mobile-menu" ref={mobileRef} role="dialog" aria-modal="true">
          <div className="max-w-screen-xl mx-auto px-3 pt-2 pb-3 space-y-1">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleAnchor(e, href)}
                className="block px-3 py-3 rounded-md text-base font-medium text-white hover:bg-[#005EB8] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 block w-full text-left px-3 py-3 rounded-md text-base font-semibold text-white hover:bg-[#005EB8] focus:outline-none focus:ring-2 focus:ring-white"
            >
              Close menu
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
