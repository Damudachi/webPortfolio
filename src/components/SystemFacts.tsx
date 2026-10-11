import { FACTS, FACTS_NOTE } from "@/lib/content";

export function SystemFacts() {
  return (
    <section className="section" aria-label="Measured outcomes">
      <div className="wrap section-pad">
        <div className="rail">
          <div className="rail-head">
            <p className="index">
              <span>00 /</span> MEASURED
            </p>
            <p className="note">{FACTS_NOTE}</p>
          </div>

          <dl className="facts">
            {FACTS.map((fact) => (
              <div className="fact" key={fact.source}>
                <dt className="fact__n">{fact.value}</dt>
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
