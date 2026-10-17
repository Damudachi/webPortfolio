"use client";

import {
  CaseNotes,
  ContributionLine,
  Legend,
  Measures,
  PlateHead,
  PlateLinks,
  StackList,
  SvgCallout,
  stateOf,
  usePressRun,
} from "./plate-parts";
import { ModelOutput } from "./ModelOutput";
import { EngineeringView } from "./Trace";
import { ViewSwitch } from "./ViewSwitch";
import { INTELSY as P } from "@/lib/content";

/** An abstract stand-in for a person on a floor. No faces, no photograph. */
function Worker({ x, y, s, tone }: { x: number; y: number; s: number; tone: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={tone}>
      <rect x="-17" y="-56" width="10" height="56" />
      <rect x="7" y="-56" width="10" height="56" />
      <path d="M-26 -54L26 -54L22 -134L-22 -134Z" />
      <path d="M-22 -132L-34 -64L-25 -62L-14 -128Z" />
      <path d="M22 -132L34 -64L25 -62L14 -128Z" />
      <ellipse cx="0" cy="-150" rx="13.5" ry="15" />
      <rect x="-24" y="-168" width="48" height="6" />
      <path d="M-19 -168a19 19 0 0 1 38 0Z" />
    </g>
  );
}

function DetectionBox({
  x,
  y,
  w,
  h,
  label,
  labelBelow,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  labelBelow?: boolean;
}) {
  const tick = 7;
  const labelW = label.length * 5.4 + 9;
  const labelY = labelBelow ? y + h : y - 12;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} stroke="#D9DDE0" strokeWidth="1" opacity="0.9" />
      <g stroke="#D9DDE0" strokeWidth="2">
        <path d={`M${x} ${y + tick}V${y}h${tick}`} />
        <path d={`M${x + w - tick} ${y}h${tick}v${tick}`} />
        <path d={`M${x} ${y + h - tick}V${y + h}h${tick}`} />
        <path d={`M${x + w - tick} ${y + h}h${tick}v${-tick}`} />
      </g>
      <rect x={x} y={labelY} width={labelW} height={12} fill="#D9DDE0" />
      <text
        x={x + 4.5}
        y={labelY + 8.5}
        fill="#090A0B"
        style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.1em" }}
      >
        {label}
      </text>
    </g>
  );
}

const ABLATION = [
  0.22, 0.34, 0.5, 0.68, 0.82, 0.3, 0.46, 0.62, 0.78, 0.9, 0.38, 0.55, 0.7, 0.86, 0.96,
];

export function PlateIntelsy() {
  const { active, onActive } = usePressRun(P.legend.length);
  const st = (n: number) => stateOf(active, n);

  return (
    <article className="plate" id="intelsy">
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
          <PlateLinks links={P.links} note={P.teamNote} />
          <ContributionLine data={P.contribution} />
          <CaseNotes slug="intelsy" data={P.notes} />

          <Legend items={P.legend} active={active} onActive={onActive} />
          <StackList terms={P.stack} />
        </div>

        <figure className="plate__figure">
          <div className="fig" aria-hidden="true">
            <div className="fig__bar">
              <span className="mono">INTELSY / detection frame</span>
              <span className="mono">Illustrative</span>
            </div>

            <div className="fig__pan">
              <div className="fig__sheet vision">
                <svg viewBox="0 0 520 340" fill="none">
                <rect x="0" y="0" width="520" height="340" fill="#090A0B" />

                {/* corner reticles */}
                <g stroke="#585E63" strokeWidth="1">
                  <path d="M6 18V6h12" />
                  <path d="M514 18V6h-12" />
                  <path d="M6 322v12h12" />
                  <path d="M514 322v12h-12" />
                </g>

                <Worker x={130} y={272} s={0.95} tone="#454B50" />
                <Worker x={272} y={278} s={0.72} tone="#363B40" />
                <Worker x={392} y={282} s={0.58} tone="#2B2F33" />

                {/* 1 — the detections */}
                <g className="zone" data-state={st(1)}>
                  <DetectionBox x={103} y={90} w={54} h={58} label="HARDHAT" />
                  <DetectionBox x={101} y={146} w={58} h={80} label="VEST" labelBelow />
                  <DetectionBox x={258} y={164} w={28} h={22} label="MASK" />
                  <DetectionBox x={374} y={170} w={36} h={26} label="HARDHAT" />
                  <SvgCallout n={1} x={176} y={118} state={st(1)} />
                </g>

                {/* 2 — how inference is run */}
                <g className="zone" data-state={st(2)}>
                  <rect
                    className="zone__ring"
                    x="12"
                    y="14"
                    width="124"
                    height="44"
                    stroke="#D9DDE0"
                    strokeWidth="1"
                  />
                  <text className="svg-micro" x="20" y="26">
                    INFERENCE
                  </text>
                  <rect x="20" y="32" width="42" height="16" fill="#D9DDE0" />
                  <text
                    x="41"
                    y="43.5"
                    textAnchor="middle"
                    fill="#090A0B"
                    style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.1em" }}
                  >
                    LIVE
                  </text>
                  <rect x="68" y="32" width="48" height="16" stroke="#585E63" strokeWidth="1" />
                  <text className="svg-micro" x="92" y="43.5" textAnchor="middle">
                    BATCH
                  </text>
                  <SvgCallout n={2} x={150} y={36} state={st(2)} />
                </g>

                {/* 3 — the ablation sweep */}
                <g className="zone" data-state={st(3)}>
                  <rect
                    className="zone__ring"
                    x="352"
                    y="14"
                    width="156"
                    height="100"
                    stroke="#D9DDE0"
                    strokeWidth="1"
                  />
                  <text className="svg-micro" x="382" y="26">
                    ABLATION SWEEP
                  </text>
                  {ABLATION.map((value, i) => (
                    <rect
                      key={`ab${i}`}
                      x={382 + (i % 5) * 16}
                      y={34 + Math.floor(i / 5) * 16}
                      width="12"
                      height="12"
                      fill="#D9DDE0"
                      opacity={value * 0.72}
                    />
                  ))}
                  <text className="svg-micro" x="382" y="94">
                    IMAGE SIZE ×
                  </text>
                  <text className="svg-micro" x="382" y="106">
                    DATA FRACTION
                  </text>
                  <SvgCallout n={3} x={366} y={36} state={st(3)} />
                </g>

                {/* 4 — what was compared */}
                <g className="zone" data-state={st(4)}>
                  <rect
                    className="zone__ring"
                    x="12"
                    y="296"
                    width="496"
                    height="32"
                    stroke="#D9DDE0"
                    strokeWidth="1"
                  />
                  <line x1="16" y1="290" x2="504" y2="290" stroke="#303438" strokeWidth="1" />
                  <SvgCallout n={4} x={30} y={312} state={st(4)} />
                  {[
                    { x: 50, t: "PRECISION" },
                    { x: 124, t: "RECALL" },
                    { x: 180, t: "mAP@0.5" },
                    { x: 244, t: "mAP@0.5:0.95" },
                    { x: 342, t: "LATENCY" },
                  ].map((metric) => (
                    <text className="svg-label" key={metric.t} x={metric.x} y="315.5">
                      {metric.t}
                    </text>
                  ))}
                </g>
                </svg>
                <span className="vision__scan" aria-hidden="true" />
              </div>
            </div>
            <p className="mono fig__hint">Pan to read the frame</p>
          </div>

          <figcaption className="fig__cap">
            <span className="mono">FIG. 3.1 — THREE PPE CLASSES ON ONE FRAME</span>
            <span className="note">{P.caption}</span>
          </figcaption>
        </figure>
      </div>

      <ViewSwitch
        name={P.title}
        slug="intelsy"
        product={
          <div className="plate__evidence">
            <ModelOutput />
            <Measures items={P.measures} />
          </div>
        }
        engineering={<EngineeringView data={P.engineering} name={P.title} />}
      />
    </article>
  );
}
