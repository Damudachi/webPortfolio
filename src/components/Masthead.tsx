"use client";

import { useEffect, useState } from "react";
import { Monogram } from "./Monogram";
import { MASTHEAD_RUN, NAV } from "@/lib/content";

/**
 * A quarter of the press beat, so the descriptor makes one full pass over its
 * four readings in the twenty seconds the rest of the page runs on.
 */
const TURN = 5_000;

export function Masthead() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [say, setSay] = useState(0);

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

  /**
   * The masthead is the only thing on screen at every point in the book, so
   * it carries the loop a reader cannot scroll past. The first reading is
   * `SITE.descriptor`, which is what this bar has always said and what the
   * server renders — so the line a reader meets before hydration is the one
   * they would have met anyway, and nothing moves until the page is live.
   *
   * No `aria-live`: the text is read when a screen reader reaches it and the
   * turns are never announced. Four facts already stated elsewhere on the
   * page are not worth interrupting anyone for.
   */
  useEffect(() => {
    if (!document.documentElement.dataset.motion) return;
    const timer = setInterval(() => setSay((n) => (n + 1) % MASTHEAD_RUN.length), TURN);
    return () => clearInterval(timer);
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
          {/* Every reading is rendered, stacked in one grid cell, and all but
              the current one is `visibility: hidden`. That is what holds the
              bar still: the cell is as wide as the widest reading because the
              widest reading is in it, rather than because of a width measured
              off the string length — which was wrong, since the mono face
              carries letter-spacing and a `ch` is narrower than a character.
              Hidden also means hidden from a screen reader, so only the
              reading on show is ever in the accessibility tree. */}
          <span className="mono masthead__descriptor">
            {MASTHEAD_RUN.map((line, i) => (
              <span className="masthead__say" key={line} data-on={i === say ? "" : undefined}>
                {line}
              </span>
            ))}
          </span>
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
