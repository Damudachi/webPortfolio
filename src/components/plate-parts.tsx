"use client";

import { useEffect, useState } from "react";
import { Outward } from "./Outward";
import type { LegendItem } from "@/lib/content";

export type ZoneState = "on" | "off" | undefined;

/**
 * One pass over a plate's zones, in the time the frontispiece takes to turn
 * its exposure. The step is whatever divides that evenly, so a four-zone
 * diagram advances every 2.5s and a five-zone one every 2s, and either way
 * the pass lands back on the downbeat with the plate upstairs.
 */
const PASS = 10_000;

/**
 * A diagram that runs itself.
 *
 * These sheets could only ever be read by pointing at the legend beside them,
 * which meant that for a reader who never pointed — most of them — the plate
 * was a dark still of a pipeline rather than a pipeline. Now the zones light
 * in order on their own, and the reader takes the sheet off the press the
 * moment they point at a row: `pointed` simply wins.
 *
 * The run is not paused while they are pointing. It is the same argument as
 * the portrait's clock: the override already holds the zone under the
 * pointer, so stopping the thing underneath buys nothing and loses the
 * pass's place, which is what made that plate read as stuck.
 *
 * Without `data-motion` the step never starts and `active` stays null, which
 * is exactly the neutral, nothing-dimmed sheet these plates shipped as.
 */
export function usePressRun(count: number) {
  const [step, setStep] = useState<number | null>(null);
  const [pointed, setPointed] = useState<number | null>(null);

  useEffect(() => {
    if (!document.documentElement.dataset.motion) return;
    // No opening setStep: the first tick already yields zone 1, because
    // ((null ?? 0) % count) + 1 is 1. Setting it synchronously here would
    // only buy a cascading render and a zone lighting during hydration.
    const timer = setInterval(() => setStep((n) => ((n ?? 0) % count) + 1), PASS / count);
    return () => clearInterval(timer);
  }, [count]);

  return { active: pointed ?? step, onActive: setPointed };
}

/** Nothing is dimmed until the reader points at something. */
export function stateOf(active: number | null, n: number): ZoneState {
  if (active === null) return undefined;
  return active === n ? "on" : "off";
}

export function PlateHead({
  plate,
  title,
  category,
  year,
}: {
  plate: string;
  title: string;
  category: string;
  year: string;
}) {
  return (
    <div className="plate__head">
      <div className="plate__id">
        <span className="index">{plate}</span>
        <span className="mono">{title}</span>
      </div>
      <div className="plate__meta">
        <span className="mono">{category}</span>
        <span className="mono">{year}</span>
      </div>
    </div>
  );
}

/** A callout drawn over an HTML zone. */
export function Callout({
  n,
  state,
  inline,
  style,
}: {
  n: number;
  state: ZoneState;
  inline?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={inline ? "callout callout--inline" : "callout"}
      data-state={state}
      style={style}
      aria-hidden="true"
    >
      {n}
    </span>
  );
}

/** The same callout, placed in viewBox coordinates inside a figure. */
export function SvgCallout({
  n,
  x,
  y,
  state,
}: {
  n: number;
  x: number;
  y: number;
  state: ZoneState;
}) {
  return (
    <g className="callout-svg" data-state={state}>
      <circle cx={x} cy={y} r="10.5" />
      <text x={x} y={y} dy="0.35em" textAnchor="middle">
        {n}
      </text>
    </g>
  );
}

/**
 * The key to the plate. Each row drives one callout on the drawing, which is
 * the only way the figure and the facts stay tied together.
 */
export function Legend({
  items,
  active,
  onActive,
}: {
  items: LegendItem[];
  active: number | null;
  onActive: (n: number | null) => void;
}) {
  return (
    <ul className="legend">
      {items.map((item) => (
        <li key={item.n}>
          <button
            type="button"
            className="legend__row"
            aria-pressed={active === item.n}
            onMouseEnter={() => onActive(item.n)}
            onMouseLeave={() => onActive(null)}
            onFocus={() => onActive(item.n)}
            onBlur={() => onActive(null)}
            onClick={() => onActive(active === item.n ? null : item.n)}
          >
            <span className="legend__n">{item.n}</span>
            <span className="legend__text">
              <b>{item.title}</b>
              <span>{item.body}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export type PlateLink = { label: string; href: string; lead: boolean };

/** Where a project can actually be opened, stated once and high up. */
export function PlateLinks({ links, note }: { links: PlateLink[]; note?: string }) {
  return (
    <div className="plate__links">
      <div className="plate__links-row">
        {links.map((link) => (
          <a
            className={link.lead ? "link-out link-out--solid" : "link-out"}
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
            <Outward />
          </a>
        ))}
      </div>
      {note ? <p className="note">{note}</p> : null}
    </div>
  );
}

export function StackList({ terms }: { terms: string[] }) {
  return (
    <div>
      <p className="mono" style={{ marginBottom: 8 }}>
        Stack
      </p>
      <p className="plate__tags">
        {terms.map((term) => (
          <span key={term}>{term}</span>
        ))}
      </p>
    </div>
  );
}
