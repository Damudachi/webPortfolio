"use client";

import { useEffect, useReducer, useRef } from "react";
import { Outward } from "./Outward";
import { LAB, TULONGGURO, type LabSample } from "@/lib/content";

type Status = keyof typeof LAB.states;

type Entry = { at: number; status: Status | null; text: string };

type State = {
  stage: number;
  reached: number;
  sample: LabSample | null;
  cite: number | null;
  scores: number[];
  feedback: string;
  status: Status;
  log: Entry[];
  t0: number;
};

type Action =
  | { type: "choose"; sample: LabSample; now: number }
  | { type: "go"; stage: number }
  | { type: "cite"; line: number | null }
  | { type: "score"; i: number; value: number }
  | { type: "feedback"; text: string }
  | { type: "validate"; now: number }
  | { type: "release"; now: number }
  | { type: "reset" };

const LAST = LAB.stages.length - 1;
const CRITERIA = LAB.rubric.criteria;
const TOTAL = CRITERIA.reduce((sum, c) => sum + c.points, 0);

/** The draft as the teacher first meets it, flattened into one message. */
function draftText(sample: LabSample) {
  return [
    sample.strengths,
    ...sample.growth.map((g) => g.explanation),
    `Next: ${sample.steps.join(" ")}`,
  ].join("\n\n");
}

const EMPTY: State = {
  stage: 0,
  reached: 0,
  sample: null,
  cite: null,
  scores: [],
  feedback: "",
  status: "PENDING",
  log: [],
  t0: 0,
};

function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "choose":
      // Choosing again before anything is validated starts that paper over;
      // the draft and the ledger belong to one paper at a time.
      return {
        ...EMPTY,
        sample: action.sample,
        scores: action.sample.scores.map((s) => s.draft),
        feedback: draftText(action.sample),
        t0: action.now,
        log: [
          { at: 0, status: null, text: "Paper submitted against the rubric" },
          { at: 0, status: "PENDING", text: "Precomputed draft stored for review" },
        ],
      };
    case "go":
      if (action.stage < 0 || action.stage > Math.min(state.reached + 1, LAST)) return state;
      if (action.stage > 0 && !state.sample) return state;
      if (action.stage === LAST && state.status !== "RELEASED") return state;
      return {
        ...state,
        stage: action.stage,
        reached: Math.max(state.reached, action.stage),
        cite: null,
      };
    case "cite":
      return { ...state, cite: action.line };
    case "score": {
      if (state.status !== "PENDING") return state;
      const scores = state.scores.slice();
      scores[action.i] = Math.max(0, Math.min(CRITERIA[action.i].points, action.value));
      return { ...state, scores };
    }
    case "feedback":
      if (state.status !== "PENDING") return state;
      return { ...state, feedback: action.text };
    case "validate": {
      if (state.status !== "PENDING" || !state.sample) return state;
      const edits = changes(state);
      return {
        ...state,
        status: "GRADED",
        log: [
          ...state.log,
          {
            at: action.now - state.t0,
            status: "GRADED",
            text: edits.length
              ? `Validated by the teacher, ${edits.join(" and ")}`
              : "Validated by the teacher, draft accepted unchanged",
          },
        ],
      };
    }
    case "release":
      if (state.status !== "GRADED") return state;
      return {
        ...state,
        status: "RELEASED",
        reached: LAST,
        log: [
          ...state.log,
          { at: action.now - state.t0, status: "RELEASED", text: "Released — now visible to the learner" },
        ],
      };
    case "reset":
      return EMPTY;
  }
}

function changes(state: State) {
  if (!state.sample) return [];
  const out: string[] = [];
  const moved = state.scores.filter((v, i) => v !== state.sample!.scores[i].draft).length;
  if (moved) out.push(`${moved} score${moved > 1 ? "s" : ""} changed`);
  if (state.feedback.trim() !== draftText(state.sample).trim()) out.push("feedback rewritten");
  return out;
}

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

function clock(ms: number) {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * TulongGuro's grading loop, small enough to hold in one hand.
 *
 * It is a simulation and says so twice — in its bar and on every draft —
 * because the failure it must never cause is a reader believing a model just
 * read this paper. What is real is the shape: the rubric is the app's own
 * built-in template, and a paper moves through the same three states the
 * application stores (PENDING → GRADED → released), with validating and
 * releasing kept as two separate acts for the same reason the app keeps them
 * apart. Nothing leaves the browser; there is no API behind this and no key
 * to leak.
 */
export function Lab() {
  const [state, dispatch] = useReducer(reduce, EMPTY);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // Focus follows the reader's own navigation, never the first render, so
  // the page does not jump to the Lab on load. Letting focus scroll is what
  // brings a new step into view on a phone, where the paper stacks above it
  // and Next is pressed from the foot of the previous one.
  useEffect(() => {
    if (!moved.current) return;
    heading.current?.focus();
  }, [state.stage]);

  const go = (stage: number) => {
    moved.current = true;
    dispatch({ type: "go", stage });
  };

  const { sample, stage, status } = state;
  const draftTotal = sample ? sum(sample.scores.map((s) => s.draft)) : 0;
  const total = sum(state.scores);
  const canNext =
    stage < LAST &&
    (stage === 0 ? Boolean(sample) : stage === LAST - 1 ? status === "RELEASED" : true);

  return (
    <section className="lab" id="lab" aria-labelledby="lab-title">
      <div className="lab__top">
        <div>
          <p className="mono">{LAB.plate} — TulongGuro Lab</p>
          <h4 className="h3 lab__title" id="lab-title">
            {LAB.title}
          </h4>
        </div>
        <p className="prose lab__intro">{LAB.intro}</p>
      </div>

      <div className="fig lab__fig">
        <div className="fig__bar">
          <span className="mono lab__sim">{LAB.label}</span>
          <a className="mono link-bare lab__real" href={TULONGGURO.demo} target="_blank" rel="noopener noreferrer">
            The real application <Outward />
          </a>
        </div>

        <ol className="lab__rail" aria-label="Walkthrough progress">
          {LAB.stages.map((s, i) => {
            const open = i <= state.reached && (i === 0 || sample) && (i < LAST || status === "RELEASED");
            return (
              <li key={s.key} data-state={i < stage ? "past" : i === stage ? "now" : "next"}>
                <button
                  type="button"
                  aria-current={i === stage ? "step" : undefined}
                  disabled={!open}
                  onClick={() => go(i)}
                >
                  <span className="legend__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="lab__body">
          <Paper sample={sample} cite={state.cite} status={status} />

          <div className="lab__panel" key={stage}>
            <p className="mono lab__step">
              Step {stage + 1} of {LAB.stages.length}
            </p>
            <h5 className="h4 lab__h" ref={heading} tabIndex={-1}>
              {LAB.stages[stage].title}
            </h5>

            {stage === 0 ? (
              <Choose current={sample} onChoose={(s) => dispatch({ type: "choose", sample: s, now: performance.now() })} />
            ) : null}

            {stage === 1 && sample ? (
              <Rubric sample={sample} cite={state.cite} onCite={(line) => dispatch({ type: "cite", line })} />
            ) : null}

            {stage === 2 && sample ? (
              <Draft sample={sample} total={draftTotal} cite={state.cite} onCite={(line) => dispatch({ type: "cite", line })} />
            ) : null}

            {stage === 3 && sample ? (
              <Edit
                state={state}
                sample={sample}
                total={total}
                onScore={(i, value) => dispatch({ type: "score", i, value })}
                onText={(text) => dispatch({ type: "feedback", text })}
              />
            ) : null}

            {stage === 4 && sample ? (
              <Approve
                status={status}
                draftTotal={draftTotal}
                total={total}
                edits={changes(state)}
                onValidate={() => dispatch({ type: "validate", now: performance.now() })}
                onRelease={() => dispatch({ type: "release", now: performance.now() })}
              />
            ) : null}

            {stage === LAST && sample ? (
              <Done state={state} sample={sample} draftTotal={draftTotal} total={total} />
            ) : null}
          </div>
        </div>

        <div className="lab__foot">
          <button type="button" className="trace__btn" onClick={() => go(stage - 1)} disabled={stage === 0}>
            Back
          </button>
          <span className="lab__meter" aria-hidden="true">
            <i style={{ "--p": stage / LAST } as React.CSSProperties} />
          </span>
          {stage < LAST ? (
            <button
              type="button"
              className="trace__btn trace__btn--run"
              onClick={() => go(stage + 1)}
              disabled={!canNext}
            >
              Next: {LAB.stages[stage + 1].title}
            </button>
          ) : (
            <button
              type="button"
              className="trace__btn trace__btn--run"
              onClick={() => {
                moved.current = true;
                dispatch({ type: "reset" });
              }}
            >
              Grade another paper
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

const STATUS_LABEL: Record<Status, string> = LAB.states;

/** A drawn minus or plus, on the same hairline as every other mark here. */
function Glyph({ plus }: { plus: boolean }) {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M0 4.5h9" />
      {plus ? <path d="M4.5 0v9" /> : null}
    </svg>
  );
}

function Paper({ sample, cite, status }: { sample: LabSample | null; cite: number | null; status: Status }) {
  if (!sample) {
    return (
      <div className="lab__paper lab__paper--empty">
        <p className="mono">No paper chosen</p>
        <p className="note">Choose one of the three sample papers to begin.</p>
      </div>
    );
  }

  return (
    <div className="lab__paper">
      <div className="lab__paper-head">
        <span className="mono">{sample.learner} · fictional</span>
        <span className="lab__status" data-status={status}>
          {STATUS_LABEL[status]}
        </span>
      </div>
      <p className="lab__activity">{sample.activity}</p>
      <p className="mono-plain">{sample.medium}</p>
      <ol className="lab__lines">
        {sample.lines.map((line, i) => (
          <li key={i} data-cited={cite === i ? "" : undefined}>
            {line}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Choose({ current, onChoose }: { current: LabSample | null; onChoose: (s: LabSample) => void }) {
  return (
    <>
      <p className="prose lab__say">
        Three papers written for this page by no real learner. Each comes with a draft that was
        written in advance — nothing is sent anywhere when you choose.
      </p>
      <ul className="lab__choices">
        {LAB.samples.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className="lab__choice"
              aria-pressed={current?.id === s.id}
              onClick={() => onChoose(s)}
            >
              <b>{s.activity}</b>
              <span className="mono-plain">
                {s.learner} · {s.medium}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function Rubric({
  sample,
  cite,
  onCite,
}: {
  sample: LabSample;
  cite: number | null;
  onCite: (line: number | null) => void;
}) {
  return (
    <>
      <p className="prose lab__say">
        <b>{LAB.rubric.name}</b> — {LAB.rubric.source}. The teacher chose it; the draft is scored
        against it, criterion by criterion. Select a criterion to see the line it rests on.
      </p>
      <ul className="lab__crit">
        {CRITERIA.map((c, i) => {
          const s = sample.scores[i];
          return (
            <li key={c.name}>
              <button
                type="button"
                className="lab__crit-row"
                aria-pressed={s.line !== undefined && cite === s.line}
                onClick={() => onCite(s.line === undefined || cite === s.line ? null : s.line)}
              >
                <span className="lab__crit-name">
                  <b>{c.name}</b>
                  <span>{c.description}</span>
                </span>
                <span className="lab__crit-score">
                  <span className="lab__bar" aria-hidden="true">
                    <i style={{ "--p": s.draft / c.points } as React.CSSProperties} />
                  </span>
                  <span className="mono-plain">
                    {s.draft} / {c.points}
                  </span>
                </span>
                <span className="lab__why">Draft reasoning: {s.why}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Draft({
  sample,
  total,
  cite,
  onCite,
}: {
  sample: LabSample;
  total: number;
  cite: number | null;
  onCite: (line: number | null) => void;
}) {
  return (
    <>
      <p className="lab__total">
        <span className="mono">Draft score</span>
        <b>
          {total}
          <span> / {TOTAL}</span>
        </b>
        <span className="lab__tag">Precomputed sample — not model output</span>
      </p>

      <div className="lab__block">
        <p className="mono">Strengths</p>
        <p>{sample.strengths}</p>
      </div>

      <div className="lab__block">
        <p className="mono">Areas for growth — select one to find it on the paper</p>
        <ul className="lab__growth">
          {sample.growth.map((g) => (
            <li key={g.quote}>
              <button
                type="button"
                aria-pressed={cite === g.line}
                onClick={() => onCite(cite === g.line ? null : g.line)}
              >
                <q>{g.quote}</q>
                <span>{g.explanation}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="lab__block">
        <p className="mono">Actionable steps</p>
        <ol className="lab__steps">
          {sample.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </>
  );
}

function Edit({
  state,
  sample,
  total,
  onScore,
  onText,
}: {
  state: State;
  sample: LabSample;
  total: number;
  onScore: (i: number, value: number) => void;
  onText: (text: string) => void;
}) {
  const locked = state.status !== "PENDING";
  return (
    <>
      <p className="prose lab__say">
        {locked
          ? "This paper is already validated. In the application a teacher re-opens it to change it; here, grade another paper."
          : "The draft is a starting point. Move any score you disagree with and rewrite the message — the ledger records what you changed."}
      </p>
      <ul className="lab__adjust">
        {CRITERIA.map((c, i) => {
          const draft = sample.scores[i].draft;
          const value = state.scores[i];
          return (
            <li key={c.name} data-changed={value !== draft ? "" : undefined}>
              <span className="lab__adjust-name">
                <b>{c.name}</b>
                <span className="mono-plain">draft {draft}</span>
              </span>
              <span className="lab__stepper" role="group" aria-label={`${c.name} score`}>
                <button
                  type="button"
                  aria-label={`Lower ${c.name}`}
                  disabled={locked || value <= 0}
                  onClick={() => onScore(i, value - 1)}
                >
                  <Glyph plus={false} />
                </button>
                <output aria-live="polite">
                  {value}
                  <span> / {c.points}</span>
                </output>
                <button
                  type="button"
                  aria-label={`Raise ${c.name}`}
                  disabled={locked || value >= c.points}
                  onClick={() => onScore(i, value + 1)}
                >
                  <Glyph plus />
                </button>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="lab__total lab__total--small">
        <span className="mono">Your total</span>
        <b>
          {total}
          <span> / {TOTAL}</span>
        </b>
      </p>
      <label className="lab__field">
        <span className="mono">Feedback the learner will read</span>
        <textarea
          value={state.feedback}
          onChange={(e) => onText(e.target.value)}
          readOnly={locked}
          rows={8}
          maxLength={1600}
        />
      </label>
      {!state.feedback.trim() ? (
        <p className="lab__warn" role="status">
          The message is empty. A learner would receive a score with no explanation.
        </p>
      ) : null}
    </>
  );
}

function Approve({
  status,
  draftTotal,
  total,
  edits,
  onValidate,
  onRelease,
}: {
  status: Status;
  draftTotal: number;
  total: number;
  edits: string[];
  onValidate: () => void;
  onRelease: () => void;
}) {
  const delta = total - draftTotal;
  return (
    <>
      <dl className="lab__compare">
        <div>
          <dt className="mono">Draft</dt>
          <dd>
            {draftTotal} / {TOTAL}
          </dd>
        </div>
        <div>
          <dt className="mono">Yours</dt>
          <dd>
            {total} / {TOTAL}
          </dd>
        </div>
        <div>
          <dt className="mono">Difference</dt>
          <dd>{delta === 0 ? "none" : `${delta > 0 ? "+" : "−"}${Math.abs(delta)}`}</dd>
        </div>
      </dl>
      <p className="note">{edits.length ? `You made changes: ${edits.join(", ")}.` : "You accepted the draft as it stands."}</p>

      <ol className="lab__acts">
        <li data-done={status !== "PENDING" ? "" : undefined}>
          <div>
            <b>Validate</b>
            <span>Your mark becomes the grade of record. The learner still sees nothing.</span>
          </div>
          <button
            type="button"
            className="trace__btn trace__btn--run"
            onClick={onValidate}
            disabled={status !== "PENDING"}
          >
            {status === "PENDING" ? "Validate" : "Validated"}
          </button>
        </li>
        <li data-done={status === "RELEASED" ? "" : undefined}>
          <div>
            <b>Release to student</b>
            <span>
              A separate act, so a teacher can recalibrate across a whole stack before anyone sees a
              mark.
            </span>
          </div>
          <button
            type="button"
            className="trace__btn trace__btn--run"
            onClick={onRelease}
            disabled={status !== "GRADED"}
          >
            {status === "RELEASED" ? "Released" : "Release"}
          </button>
        </li>
      </ol>
    </>
  );
}

function Done({
  state,
  sample,
  draftTotal,
  total,
}: {
  state: State;
  sample: LabSample;
  draftTotal: number;
  total: number;
}) {
  return (
    <>
      <p className="prose lab__say">
        The record the application keeps: the draft beside the final mark, and every change of
        state in order. In TulongGuro this ledger is append-only.
      </p>
      <ol className="lab__ledger">
        {state.log.map((entry, i) => (
          <li key={i}>
            <span className="mono-plain">{clock(entry.at)}</span>
            {entry.status ? (
              <span className="lab__status" data-status={entry.status}>
                {STATUS_LABEL[entry.status]}
              </span>
            ) : (
              <span className="lab__status">Submitted</span>
            )}
            <span>{entry.text}</span>
          </li>
        ))}
      </ol>
      <dl className="lab__compare">
        <div>
          <dt className="mono">AI draft (kept)</dt>
          <dd>
            {draftTotal} / {TOTAL}
          </dd>
        </div>
        <div>
          <dt className="mono">Grade of record</dt>
          <dd>
            {total} / {TOTAL}
          </dd>
        </div>
      </dl>
      <div className="lab__block">
        <p className="mono">What {sample.learner} now reads</p>
        <p className="lab__final">{state.feedback.trim() || "(no message — score only)"}</p>
      </div>
    </>
  );
}
