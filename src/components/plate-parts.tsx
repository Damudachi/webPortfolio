"use client";

import { Outward } from "./Outward";
import type { LegendItem } from "@/lib/content";

export type ZoneState = "on" | "off" | undefined;

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
