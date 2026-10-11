"use client";

import { useEffect, useState } from "react";
import { Monogram } from "./Monogram";
import { NAV, SITE } from "@/lib/content";

export function Masthead() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -62% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="masthead">
      <div className="wrap masthead__inner">
        <div className="masthead__left">
          <a className="wordmark" href="#top">
            <Monogram size={19} uid="as-nav" />
            <span className="wordmark__name">Aldrich Sabando</span>
          </a>
          <span className="wordmark__rule" aria-hidden="true" />
          <span className="mono masthead__descriptor">{SITE.descriptor}</span>
        </div>

        <nav className="nav-desktop" aria-label="Sections">
          <ul className="nav">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  className="nav__link"
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="link-out masthead__cta" href="#contact">
            Open to internships
          </a>
        </nav>

        <button
          type="button"
          className="menu-btn nav-toggle"
          aria-expanded={open}
          aria-controls="menu-panel"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
          <svg width="13" height="9" viewBox="0 0 13 9" aria-hidden="true">
            {open ? (
              <>
                <path d="M1 1l11 7" stroke="currentColor" />
                <path d="M12 1L1 8" stroke="currentColor" />
              </>
            ) : (
              <>
                <path d="M0 1.5h13" stroke="currentColor" />
                <path d="M0 7.5h13" stroke="currentColor" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="menu-panel" id="menu-panel">
          <div className="wrap">
            <ul>
              {NAV.map((item, i) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                    {item.label}
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" onClick={() => setOpen(false)}>
                  Open to internships
                  <span>Status</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </header>
  );
}
