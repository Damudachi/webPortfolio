"use client";

import { useEffect, useRef, useState } from "react";
import { Outward } from "./Outward";
import type { Engineering, TraceStation } from "@/lib/content";

/** How long the head dwells on a station when the trace runs itself. */
const DWELL = 1_700;

/**
 * The signature figure: a request traced through the system it runs on.
 *
 * At rest the whole wire is drawn — that is the sheet a reader without
 * JavaScript, or with reduced motion asked for, receives, and it is complete.
 * Running the trace takes it back to the first station and lets the reading
 * head draw each wire in turn, the same head that resolves every heading on
 * the page, now carrying data instead of type.
 *
 * It runs once by itself the first time the panel is actually on screen —
 * which can only happen because a reader chose the Engineering view — and
 * never again unless asked. It never moves the page: the reader scrolls, the
 * trace only redraws itself in place. Any touch on a station or a step
 * control stops the run, because the reader is now driving.
 */
export function Trace({ stations, name }: { stations: TraceStation[]; name: string }) {
  const last = stations.length;
  const [at, setAt] = useState(last);
  const [playing, setPlaying] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const node = root.current;
    if (!node || !document.documentElement.dataset.motion) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (ran.current || !entries.some((e) => e.isIntersecting)) return;
        ran.current = true;
        observer.disconnect();
        setAt(1);
        setPlaying(true);
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      setAt((n) => {
        if (n + 1 >= last) setPlaying(false);
        return Math.min(n + 1, last);
      });
    }, DWELL);
    return () => clearTimeout(timer);
  }, [playing, at, last]);

  const go = (n: number) => {
    setPlaying(false);
    setAt(Math.max(1, Math.min(last, n)));
  };

  const run = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    setAt(1);
    setPlaying(true);
  };

  const now = stations[at - 1];

  return (
    <div className="trace" ref={root} data-playing={playing ? "" : undefined}>
      <div className="trace__head">
        <p className="mono">
          Trace · {name} · <span className="trace__count">{String(at).padStart(2, "0")}</span> /{" "}
          {String(last).padStart(2, "0")}
        </p>
        <div className="trace__ctl">
          <button type="button" className="trace__btn" onClick={() => go(at - 1)} disabled={at <= 1}>
            Back
          </button>
          <button type="button" className="trace__btn" onClick={() => go(at + 1)} disabled={at >= last}>
            Next
          </button>
          <button type="button" className="trace__btn trace__btn--run" onClick={run}>
            {playing ? "Stop" : "Run the trace"}
          </button>
        </div>
      </div>

      <ol className="trace__map">
        {stations.map((station, i) => {
          const n = i + 1;
          const state = n < at ? "past" : n === at ? "now" : "next";
          return (
            <li className="trace__stn" key={station.label} data-state={state}>
              {i > 0 ? (
                <span className="trace__wire" aria-hidden="true">
                  <i />
                </span>
              ) : null}
              <button
                type="button"
                className="trace__node"
                aria-current={n === at ? "step" : undefined}
                onClick={() => go(n)}
              >
                <span className="legend__n" aria-hidden="true">
                  {n}
                </span>
                <span className="trace__label">
                  <b>{station.label}</b>
                  <span className="mono-plain">{station.sub}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="trace__read" aria-live={playing ? "off" : "polite"}>
        <h4 className="h4">{now.title}</h4>
        <p className="prose">{now.body}</p>
      </div>
    </div>
  );
}

/** The engineering side of a plate: the trace, the decisions, the evidence. */
export function EngineeringView({ data, name }: { data: Engineering; name: string }) {
  return (
    <div className="eng">
      <figure className="plate__figure">
        <div className="fig">
          <div className="fig__bar">
            <span className="mono">{name} / request trace</span>
            <span className="mono">From the source</span>
          </div>
          <Trace stations={data.trace} name={name} />
        </div>
        <figcaption className="fig__cap">
          <span className="mono">The path one piece of work takes through the system</span>
        </figcaption>
      </figure>

      <div className="eng__cols">
        <section aria-label="Decisions and trade-offs">
          <p className="mono eng__k">Decisions & trade-offs</p>
          <ul className="eng__list">
            {data.decisions.map((d) => (
              <li key={d.title}>
                <b>{d.title}</b>
                <span>{d.body}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Testing and evaluation">
          <p className="mono eng__k">Testing & evaluation</p>
          <dl className="eng__checks">
            {data.checks.map((c) => (
              <div key={c.k}>
                <dt className="mono">{c.k}</dt>
                <dd>
                  <b>{c.v}</b>
                  {c.note ? <span>{c.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
          <p className="note eng__limits">{data.limits}</p>
          {data.source ? (
            <a className="link eng__src" href={data.source.href} target="_blank" rel="noopener noreferrer">
              {data.source.label}
              <Outward />
            </a>
          ) : null}
        </section>
      </div>
    </div>
  );
}
