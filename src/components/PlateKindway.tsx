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
import { KINDWAY as P } from "@/lib/content";
import consent from "@/images/shot-kindway-consent.webp";
import reflection from "@/images/shot-kindway-reflection.webp";
import today from "@/images/shot-kindway-today.webp";

const SHOTS = { today, consent, reflection };

/** What the server does before and after the model, in order. */
const RUNGS = [
  { y: 72, label: "VERIFY TOKEN" },
  { y: 112, label: "CHECK CONSENT" },
  { y: 152, label: "LEDGER · CAP" },
  { y: 192, label: "MODEL · COUNCIL" },
  { y: 232, label: "WRITE AS SERVER" },
];

/** One consent per feature; follow-ups are drawn withdrawn. */
const SWITCHES = [
  { y: 84, label: "REFLECTION", on: true },
  { y: 144, label: "REVIEW", on: true },
  { y: 204, label: "FOLLOW-UP", on: false },
];

/** An entry on the phone, set to uneven measures. */
const ENTRY_LINES = [1, 0.92, 0.98, 0.7, 0.95, 0.84];

const TICKS = Array.from({ length: 90 }, (_, i) => i);

export function PlateKindway() {
  const { active, onActive } = usePressRun(P.legend.length);
  const st = (n: number) => stateOf(active, n);

  return (
    <article className="plate" id="kindway">
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
          <CaseNotes slug="kindway" data={P.notes} />
        </div>
      </div>

      <ViewSwitch
        name={P.title}
        slug="kindway"
        engineering={<EngineeringView data={P.engineering} name={P.title} />}
        product={
          <>
            <div className="plate__shots plate__shots--phone">
              {P.shots.map((shot) => (
                <Shot
                  key={shot.src}
                  src={SHOTS[shot.src as keyof typeof SHOTS]}
                  alt={shot.alt}
                  bar={shot.bar}
                  fig={shot.fig}
                  note={shot.note}
                  href={P.links[0].href}
                  captured={P.captured}
                  sizes="(min-width: 1060px) 30vw, 62vw"
                />
              ))}
            </div>

            <div className="plate__body plate__body--pair">
              <figure className="plate__figure">
                <div className="fig" aria-hidden="true">
                  <div className="fig__bar">
                    <span className="mono">Kindway / consent gate</span>
                    <span className="mono">Illustrative</span>
                  </div>

                  <div className="fig__pan">
                    <div className="fig__sheet press">
                      <svg viewBox="0 0 520 372" fill="none">
                      {/* 1 — the journal, on the device */}
                      <g className="zone" data-state={st(1)}>
                        <rect
                          className="zone__ring"
                          x="32"
                          y="44"
                          width="144"
                          height="252"
                          stroke="#D9DDE0"
                          strokeWidth="1"
                        />
                        <SvgCallout n={1} x={44} y={30} state={st(1)} />
                        <text className="svg-micro" x="62" y="34">
                          ON THE DEVICE
                        </text>

                        <rect
                          x="54"
                          y="60"
                          width="100"
                          height="220"
                          rx="12"
                          fill="#0F1215"
                          stroke="#585E63"
                          strokeWidth="1"
                        />
                        <line x1="90" y1="68" x2="118" y2="68" stroke="#303438" strokeWidth="2" />
                        <rect x="66" y="82" width="46" height="5" fill="#D9DDE0" opacity="0.5" />
                        {ENTRY_LINES.map((w, i) => (
                          <line
                            key={`el${i}`}
                            x1="66"
                            y1={100 + i * 10}
                            x2={66 + 76 * w}
                            y2={100 + i * 10}
                            stroke="#858B91"
                            strokeWidth="1"
                            opacity="0.45"
                          />
                        ))}
                        {[0, 1].map((i) => (
                          <rect
                            key={`tag${i}`}
                            x={66 + i * 38}
                            y="166"
                            width="32"
                            height="11"
                            rx="5.5"
                            stroke="#585E63"
                            strokeWidth="1"
                          />
                        ))}

                        {/* the trail of past entries */}
                        <path
                          d="M74 196c-6 14 6 26 0 40s6 24 0 34"
                          stroke="#585E63"
                          strokeWidth="1"
                        />
                        {[204, 230, 256].map((y, i) => (
                          <g key={`tr${y}`}>
                            <rect x="70" y={y - 4} width="4" height="9" fill="#D9DDE0" opacity={0.7 - i * 0.18} />
                            <line
                              x1="84"
                              y1={y}
                              x2={84 + 54 - i * 10}
                              y2={y}
                              stroke="#858B91"
                              strokeWidth="1"
                              opacity="0.45"
                            />
                          </g>
                        ))}
                      </g>

                      {/* the way out of the device, only through consent */}
                      <g stroke="#303438" strokeWidth="1" strokeDasharray="2 4">
                        <line x1="176" y1="170" x2="196" y2="170" />
                        <line x1="324" y1="170" x2="344" y2="170" />
                      </g>

                      {/* 2 — consent, one per feature */}
                      <g className="zone" data-state={st(2)}>
                        <rect
                          className="zone__ring"
                          x="196"
                          y="44"
                          width="128"
                          height="252"
                          stroke="#D9DDE0"
                          strokeWidth="1"
                        />
                        <SvgCallout n={2} x={208} y={30} state={st(2)} />
                        <text className="svg-micro" x="226" y="34">
                          CONSENT
                        </text>

                        {SWITCHES.map((s) => (
                          <g key={s.label}>
                            <text className="svg-micro" x="210" y={s.y}>
                              {s.label}
                            </text>
                            <text className="svg-micro" x="312" y={s.y} textAnchor="end">
                              v2
                            </text>
                            <rect
                              x="210"
                              y={s.y + 12}
                              width="34"
                              height="16"
                              rx="8"
                              fill={s.on ? "#303438" : "none"}
                              stroke="#585E63"
                              strokeWidth="1"
                            />
                            <circle
                              cx={s.on ? 236 : 218}
                              cy={s.y + 20}
                              r="5"
                              fill={s.on ? "#D9DDE0" : "none"}
                              stroke={s.on ? "none" : "#858B91"}
                              strokeWidth="1"
                            />
                            <text className="svg-micro" x="254" y={s.y + 23.5}>
                              {s.on ? "GIVEN" : "WITHDRAWN"}
                            </text>
                          </g>
                        ))}

                        <line x1="210" y1="256" x2="312" y2="256" stroke="#303438" strokeWidth="1" />
                        <text className="svg-micro" x="210" y="274">
                          CHECKED ON THE
                        </text>
                        <text className="svg-micro" x="210" y="286">
                          SERVER, EVERY TIME
                        </text>
                      </g>

                      {/* 3 — the server, which alone writes AI rows */}
                      <g className="zone" data-state={st(3)}>
                        <rect
                          className="zone__ring"
                          x="344"
                          y="44"
                          width="160"
                          height="252"
                          stroke="#D9DDE0"
                          strokeWidth="1"
                        />
                        <SvgCallout n={3} x={356} y={30} state={st(3)} />
                        <text className="svg-micro" x="374" y="34">
                          EDGE FUNCTION
                        </text>

                        <line x1="362" y1="72" x2="362" y2="232" stroke="#303438" strokeWidth="1" />
                        {RUNGS.map((rung) => (
                          <g key={rung.label}>
                            <rect
                              x="356"
                              y={rung.y - 6}
                              width="12"
                              height="12"
                              fill="#0D0F11"
                              stroke="#858B91"
                              strokeWidth="1"
                            />
                            <line
                              x1="368"
                              y1={rung.y}
                              x2="376"
                              y2={rung.y}
                              stroke="#303438"
                              strokeWidth="1"
                            />
                            <text className="svg-label" x="382" y={rung.y + 3.4}>
                              {rung.label}
                            </text>
                          </g>
                        ))}

                        <line x1="356" y1="256" x2="492" y2="256" stroke="#303438" strokeWidth="1" />
                        <text className="svg-micro" x="356" y="274">
                          USER: READ · DELETE
                        </text>
                        <text className="svg-micro" x="356" y="286">
                          NEVER WRITE
                        </text>
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
                          510 AUTOMATED TESTS
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
                  <span className="mono">FIG. 4.1 — FROM THE PHONE TO A MODEL, AND BACK</span>
                  <span className="note">
                    A specimen of how an entry reaches AI, not a screen from the app.
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
