import { Tally } from "./Tally";
import { FACTS, FACTS_NOTE } from "@/lib/content";

export function SystemFacts() {
  return (
    <section className="section" aria-label="Measured outcomes" data-reveal="rule">
      <div className="wrap section-pad" data-reveal="spine">
        <div className="rail">
          <div className="rail-head" data-reveal="set">
            <p className="index">
              <span>00 /</span> MEASURED
            </p>
            <p className="note">{FACTS_NOTE}</p>
          </div>

          <dl className="facts">
            {FACTS.map((fact, i) => (
              <div
                className="fact"
                key={fact.source}
                data-reveal="set"
                style={{ "--i": i } as React.CSSProperties}
              >
                <dt className="fact__n">
                  <Tally value={fact.value} />
                </dt>
                <dd>
                  <span className="fact__label">{fact.label}</span>
                  <span className="mono fact__src">{fact.source}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
