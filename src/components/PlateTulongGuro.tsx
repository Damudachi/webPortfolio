"use client";

import { useState } from "react";
import { Callout, PlateHead, PlateLinks, StackList, stateOf } from "./plate-parts";
import { Shot } from "./Shot";
import { Tally } from "./Tally";
import { buildScrawl } from "@/lib/scrawl";
import { TULONGGURO as P } from "@/lib/content";
import tulongguro from "@/images/shot-tulongguro.webp";

const PAPER = buildScrawl({
  seed: 4412,
  x: 8,
  width: 168,
  y: 20,
  rows: 10,
  rowStep: 18,
  amplitude: 2.5,
  samples: 14,
  stagger: 0,
});

const RUBRIC = [
  { criterion: "Content accuracy", score: 4 },
  { criterion: "Reasoning", score: 3 },
  { criterion: "Organization", score: 4 },
  { criterion: "Mechanics", score: 4 },
];

export function PlateTulongGuro() {
  const [active, setActive] = useState<number | null>(null);
  const st = (n: number) => stateOf(active, n);

  return (
    <article className="plate" id="tulongguro">
      <PlateHead plate={P.plate} title={P.title} category={P.category} year={P.year} />

      <div className="plate__body plate__body--lead">
        <div className="plate__file">
          <div>
            <h3 className="h3">{P.title}</h3>
            <p className="mono" style={{ marginTop: 10 }}>
              {P.descriptor}
            </p>
          </div>

          <p className="lede" data-reveal="read">{P.summary}</p>
          <p className="prose">{P.detail}</p>

          <div className="plate__stats">
            {P.stats.map((stat) => (
              <div className="plate__stat" key={stat.label}>
                <b>
                  <Tally value={stat.value} />
                </b>
                <span className="mono">{stat.label}</span>
              </div>
            ))}
          </div>

          <StackList terms={P.stack} />

          <PlateLinks links={P.links} />
        </div>

        <Shot
          src={tulongguro}
          alt={P.shot.alt}
          bar={P.shot.bar}
          fig={P.shot.fig}
          note={P.shot.note}
          href={P.demo}
          sizes="(min-width: 1060px) 48vw, 92vw"
        />
      </div>

      <div className="plate__wide">
        <figure className="plate__figure">
          <div className="fig" aria-hidden="true">
            <div className="fig__bar">
              <span className="mono">TulongGuro / grading console</span>
              <span className="mono">Illustrative</span>
            </div>

            <div className="console">
              <div className="console__left zone" data-state={st(1)}>
                <Callout n={1} state={st(1)} />
                <p className="mono">Submission</p>
                <div className="paper" style={{ marginBlock: 11 }}>
                  <svg viewBox="0 0 184 200" fill="none">
                    {PAPER.rules.map((rule, i) => (
                      <line
                        key={`pr${i}`}
                        x1={rule.x1}
                        y1={rule.y1}
                        x2={rule.x2}
                        y2={rule.y2}
                        stroke="#303438"
                        strokeWidth="1"
                        opacity="0.7"
                      />
                    ))}
                    {PAPER.marks.map((mark, i) => (
                      <path
                        key={`pm${i}`}
                        d={mark.d}
                        stroke="#9AA0A5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.78"
                      />
                    ))}
                  </svg>
                </div>
                <p className="mono">Handwritten · scanned</p>
              </div>

              <div className="console__right">
                <div className="rubric zone" data-state={st(2)}>
                  <Callout n={2} state={st(2)} />
                  <p className="mono" style={{ marginBottom: 9 }}>
                    Rubric evaluation
                  </p>
                  {RUBRIC.map((row) => (
                    <div className="rubric__row" key={row.criterion}>
                      <span>{row.criterion}</span>
                      <span className="pips">
                        {[1, 2, 3, 4, 5].map((pip) => (
                          <i key={pip} data-on={pip <= row.score ? "1" : undefined} />
                        ))}
                      </span>
                      <span className="rubric__score">{row.score}/5</span>
                    </div>
                  ))}
                </div>

                <div className="draft zone" data-state={st(3)}>
                  <Callout n={3} state={st(3)} />
                  <p className="mono">Drafted feedback</p>
                  <p
                    style={{
                      marginTop: 10,
                      fontSize: "var(--t-small)",
                      color: "var(--color-silver)",
                      lineHeight: 1.5,
                    }}
                  >
                    Working is shown for each step, but the final answer drops its unit.
                    Ask for the unit to be carried through.
                  </p>
                  <div className="draft__lines">
                    <i style={{ width: "92%" }} />
                    <i style={{ width: "64%" }} />
                  </div>
                </div>
              </div>

              <div className="approve zone" data-state={st(4)}>
                <span className="approve__state">
                  <Callout n={4} state={st(4)} inline />
                  <span className="mono">Awaiting teacher approval</span>
                </span>
                <span className="approve__btns">
                  <span className="ghost-btn">Edit</span>
                  <span className="ghost-btn ghost-btn--primary">Approve</span>
                </span>
              </div>
            </div>
          </div>

          <figcaption className="fig__cap">
            <span className="mono">FIG. 1.2 — TEACHER-APPROVED GRADING LOOP</span>
            <span className="note">
              A drawing of how the grading loop runs, not a capture of the
              application.
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="pipeline">
        {P.steps.map((step, i) => (
          <button
            key={step.n}
            type="button"
            className="step"
            aria-pressed={active === step.n}
            onMouseEnter={() => setActive(step.n)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(step.n)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(active === step.n ? null : step.n)}
          >
            {i > 0 ? <span className="step__arrow" aria-hidden="true" /> : null}
            <span className="step__n">{step.n}</span>
            <span className="step__text">
              <b>{step.title}</b>
              <span>{step.body}</span>
            </span>
          </button>
        ))}
      </div>
    </article>
  );
}
