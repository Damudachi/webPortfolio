"use client";

import {
  CaseNotes,
  ContributionLine,
  Legend,
  PlateHead,
  PlateLinks,
  StackList,
  SvgCallout,
  stateOf,
  usePressRun,
} from "./plate-parts";
import { Shot } from "./Shot";
import { EngineeringView } from "./Trace";
import { ViewSwitch } from "./ViewSwitch";
import { LITURGYGEN as P } from "@/lib/content";
import calendar from "@/images/shot-liturgygen-calendar.webp";
import day from "@/images/shot-liturgygen-day.webp";

const SHOTS = { day, calendar };

const RUNGS = [
  { y: 56, label: "RESOLVE LITURGICAL DATE" },
  { y: 100, label: "RETRIEVE READINGS" },
  { y: 144, label: "MATCH PRAYERS" },
  { y: 188, label: "RENDER .DOCX" },
];

/** Nine lines of body text on the front page, set to uneven measures. */
const BODY_LINES = [0.98, 1, 0.94, 1, 0.86, 1, 0.97, 0.72, 0.9];

const TICKS = Array.from({ length: 90 }, (_, i) => i);

export function PlateLiturgyGen() {
  const { active, onActive } = usePressRun(P.legend.length);
  const st = (n: number) => stateOf(active, n);

  return (
    <article className="plate" id="liturgygen">
      <PlateHead plate={P.plate} title={P.title} category={P.category} year={P.year} />

      <div className="plate__intro">
        <div>
          <h3 className="h3">{P.title}</h3>
          <p className="mono" style={{ marginTop: 10 }}>
            {P.descriptor}
          </p>
        </div>
        <div className="plate__intro-say">
          <p className="lede" data-reveal="read">{P.summary}</p>
          <PlateLinks links={P.links} note={P.demoNote} />
          <ContributionLine data={P.contribution} />
          <CaseNotes slug="liturgygen" data={P.notes} />
        </div>
      </div>

      <ViewSwitch
        name={P.title}
        slug="liturgygen"
        engineering={<EngineeringView data={P.engineering} name={P.title} />}
        product={
          <>
            <div className="plate__shots">
              {P.shots.map((shot) => (
                <Shot
                  key={shot.src}
                  src={SHOTS[shot.src as keyof typeof SHOTS]}
                  alt={shot.alt}
                  bar={shot.bar}
                  fig={shot.fig}
                  href={P.links[0].href}
                />
              ))}
            </div>

            <div className="plate__body plate__body--pair">
              <figure className="plate__figure">
                <div className="fig" aria-hidden="true">
                  <div className="fig__bar">
                    <span className="mono">LiturgyGen / press sheet</span>
                    <span className="mono">Illustrative</span>
                  </div>

                  <div className="fig__pan">
                    <div className="fig__sheet press">
                      <svg viewBox="0 0 520 372" fill="none">
                      {/* 1 — processing sequence */}
                      <g className="zone" data-state={st(1)}>
                        <rect
                          className="zone__ring"
                          x="32"
                          y="44"
                          width="232"
                          height="162"
                          stroke="#D9DDE0"
                          strokeWidth="1"
                        />
                        <SvgCallout n={1} x={44} y={30} state={st(1)} />
                        <text className="svg-micro" x="62" y="34">
                          PROCESSING SEQUENCE
                        </text>

                        <line x1="50" y1="56" x2="50" y2="188" stroke="#303438" strokeWidth="1" />
                        {RUNGS.map((rung) => (
                          <g key={rung.label}>
                            <rect
                              x="44"
                              y={rung.y - 6}
                              width="12"
                              height="12"
                              fill="#0D0F11"
                              stroke="#858B91"
                              strokeWidth="1"
                            />
                            <line
                              x1="56"
                              y1={rung.y}
                              x2="70"
                              y2={rung.y}
                              stroke="#303438"
                              strokeWidth="1"
                            />
                            <text className="svg-label" x="78" y={rung.y + 3.4}>
                              {rung.label}
                            </text>
                          </g>
                        ))}
                      </g>

                      {/* 3 — queue, cache, stream */}
                      <g className="zone" data-state={st(3)}>
                        <rect
                          className="zone__ring"
                          x="32"
                          y="216"
                          width="232"
                          height="82"
                          stroke="#D9DDE0"
                          strokeWidth="1"
                        />
                        <SvgCallout n={3} x={44} y={228} state={st(3)} />
                        <text className="svg-micro" x="62" y="232">
                          PROGRESS STREAM
                        </text>

                        <line
                          x1="44"
                          y1="254"
                          x2="250"
                          y2="254"
                          stroke="#303438"
                          strokeWidth="1"
                          strokeDasharray="2 4"
                        />
                        <line
                          x1="44"
                          y1="254"
                          x2="198"
                          y2="254"
                          stroke="#D9DDE0"
                          strokeWidth="1"
                          opacity="0.8"
                        />
                        <line x1="198" y1="247" x2="198" y2="261" stroke="#D9DDE0" strokeWidth="1" />

                        {["QUEUE", "CACHE", "BATCH"].map((chip, i) => (
                          <g key={chip}>
                            <rect
                              x={44 + i * 64}
                              y="270"
                              width="58"
                              height="17"
                              stroke="#303438"
                              strokeWidth="1"
                            />
                            <text className="svg-micro" x={44 + i * 64 + 29} y="281.5" textAnchor="middle">
                              {chip}
                            </text>
                          </g>
                        ))}
                      </g>

                      {/* 2 — print-ready output */}
                      <g className="zone" data-state={st(2)}>
                        <rect
                          className="zone__ring"
                          x="270"
                          y="44"
                          width="234"
                          height="232"
                          stroke="#D9DDE0"
                          strokeWidth="1"
                        />
                        <SvgCallout n={2} x={300} y={30} state={st(2)} />
                        <text className="svg-micro" x="318" y="34">
                          PRINT-READY OUTPUT
                        </text>

                        {[0, 1, 2].map((i) => (
                          <rect
                            key={`back${i}`}
                            x={286 + i * 14}
                            y={56 + i * 14}
                            width="104"
                            height="142"
                            fill="#0F1215"
                            stroke="#303438"
                            strokeWidth="1"
                          />
                        ))}

                        <rect
                          x="328"
                          y="98"
                          width="104"
                          height="142"
                          fill="#171A1E"
                          stroke="#585E63"
                          strokeWidth="1"
                        />
                        <rect x="340" y="108" width="42" height="5" fill="#D9DDE0" opacity="0.5" />
                        <line x1="340" y1="120" x2="420" y2="120" stroke="#585E63" strokeWidth="1" />
                        {BODY_LINES.map((w, i) => (
                          <line
                            key={`bl${i}`}
                            x1="340"
                            y1={132 + i * 9}
                            x2={340 + 80 * w}
                            y2={132 + i * 9}
                            stroke="#858B91"
                            strokeWidth="1"
                            opacity="0.45"
                          />
                        ))}
                        <line x1="340" y1="219" x2="420" y2="219" stroke="#585E63" strokeWidth="1" />
                        <line
                          x1="340"
                          y1="228"
                          x2="404"
                          y2="228"
                          stroke="#858B91"
                          strokeWidth="1"
                          opacity="0.45"
                        />
                        <text className="svg-micro" x="420" y="235" textAnchor="end">
                          IV
                        </text>

                        {/* crop marks on the sheet that goes to press */}
                        <g stroke="#858B91" strokeWidth="1" opacity="0.85">
                          <path d="M310 98h12M328 80v12" />
                          <path d="M438 98h12M432 80v12" />
                          <path d="M310 240h12M328 246v12" />
                          <path d="M438 240h12M432 246v12" />
                        </g>
                      </g>

                      {/* 4 — test suite */}
                      <g className="zone" data-state={st(4)}>
                        <rect
                          className="zone__ring"
                          x="32"
                          y="304"
                          width="472"
                          height="60"
                          stroke="#D9DDE0"
                          strokeWidth="1"
                        />
                        <SvgCallout n={4} x={44} y={316} state={st(4)} />
                        <text className="svg-micro" x="62" y="320">
                          152 AUTOMATED TESTS
                        </text>
                        {TICKS.map((i) => (
                          <rect
                            key={`t${i}`}
                            x={44 + i * 5}
                            y="334"
                            width="2"
                            height="16"
                            fill="#D9DDE0"
                            opacity={0.42}
                          />
                        ))}
                        <text className="svg-label" x="500" y="348" textAnchor="end">
                          +
                        </text>
                      </g>
                      </svg>
                    </div>
                  </div>
                  <p className="mono fig__hint">Pan to read the sheet</p>
                </div>

                <figcaption className="fig__cap">
                  <span className="mono">FIG. 2.1 — GENERATION RUN, SOURCE TO SHEET</span>
                  <span className="note">
                    A specimen of the publishing workflow, not a rendered missalette.
                  </span>
                </figcaption>
              </figure>

              <Legend items={P.legend} active={active} onActive={onActive} />
            </div>

            <div className="plate__foot">
              <p className="prose" style={{ fontSize: "var(--t-small)" }}>
                {P.context}
              </p>
              <StackList terms={P.stack} />
            </div>
          </>
        }
      />
    </article>
  );
}
