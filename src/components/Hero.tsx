import { Portrait } from "./Portrait";
import { HERO, HERO_KEY, HERO_SHEET, HERO_SPEC } from "@/lib/content";

/**
 * The opening plate of the book.
 *
 * The sentence sets in the left column and the author's plate stands beside
 * it from the first row, registered to the same top edge rather than hanging
 * underneath — which is what buys the room for everything below it. Under the
 * lede, the three readings this page can actually prove, each keyed through
 * to the plate that proves it. Under both columns, one rule and the colophon:
 * what he is open to, where he is, when he is free and how to reach him,
 * stated once and above the fold, because that is the only thing a reader
 * with an internship to fill came here to find out.
 *
 * The plate sits before `.hero__say` in the document so that a phone and a
 * screen reader both meet the face directly after the headline; on a wide
 * screen the grid areas put it top-right without reordering anything.
 */
export function Hero() {
  return (
    <section className="wrap hero" aria-labelledby="hero-heading">
      <div className="rail">
        <div className="rail-head">
          <p className="index">
            <span>{HERO_SHEET.plate} /</span> {HERO_SHEET.label}
          </p>

          <div className="hero__marks" aria-hidden="true">
            {HERO_SHEET.marks.map((mark, i) => (
              <span className="mono" key={mark.k} style={{ "--i": i } as React.CSSProperties}>
                {mark.k} <b>{mark.v}</b>
              </span>
            ))}
          </div>

          <p className="note hero__hint">{HERO_SHEET.hint}</p>
        </div>

        <div className="hero__sheet">
          <p className="mono hero__eyebrow">{HERO.eyebrow}</p>

          <h1 className="h1 hero__h1" id="hero-heading">
            {HERO.headline.map((line, i) => (
              <span className="h1-line" key={line} style={{ "--i": i } as React.CSSProperties}>
                <span className="h1-line__ink">
                  {line}
                  {i < HERO.headline.length - 1 ? " " : null}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero__plate">
            <Portrait />
          </div>

          <div className="hero__say">
            <p className="lede">{HERO.support}</p>

            <ol className="hero__key" aria-label="Measured outcomes, keyed to the plates that prove them">
              {HERO_KEY.map((row) => (
                <li key={row.value}>
                  <a href={row.href}>
                    <span className="legend__n" aria-hidden="true">
                      {row.n}
                    </span>
                    <b>{row.value}</b>
                    <span className="mono">{row.source}</span>
                  </a>
                </li>
              ))}
            </ol>

            <div className="hero__cta">
              <a className="link-out link-out--solid" href="#work">
                Explore selected work
              </a>
              <a className="link-out" href={HERO_SPEC.reachHref}>
                Email me
              </a>
            </div>
          </div>

          <dl className="hero__spec">
            {HERO_SPEC.rows.map((row) => (
              <div key={row.k}>
                <dt className="mono">
                  {row.live ? <i aria-hidden="true" /> : null}
                  {row.k}
                </dt>
                <dd>
                  {row.href ? (
                    <a className="link" href={row.href}>
                      {row.v}
                    </a>
                  ) : (
                    row.v
                  )}
                </dd>
                {row.go ? <dd className="mono hero__go">{row.go}</dd> : null}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
