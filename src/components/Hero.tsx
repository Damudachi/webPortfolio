import { Portrait } from "./Portrait";
import { HERO } from "@/lib/content";

/**
 * The page's one orchestrated moment. The marks in the margin set first, the
 * headline is wiped on a line at a time off its own baseline, everything it
 * rests on follows, and the plate holding the author's photograph arrives
 * last — as a lattice of samples that a scanning head resolves into the
 * picture. Everything below this section waits to be scrolled to.
 */
export function Hero() {
  return (
    <section className="wrap hero" aria-labelledby="hero-heading">
      <div className="rail">
        <div className="rail-head hero__annot" aria-hidden="true">
          {HERO.annotations.map((word, i) => (
            <span className="mono" key={word} style={{ "--i": i } as React.CSSProperties}>
              <b>{String(i + 1).padStart(2, "0")}</b> {word}
            </span>
          ))}
        </div>

        <div>
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

          <div className="hero__grid">
            <div className="hero__say">
              <p className="lede">{HERO.support}</p>

              <div className="hero__cta">
                <a className="link-out link-out--solid" href="#work">
                  Explore selected work
                </a>
                <a className="link-out" href="#contact">
                  Get in touch
                </a>
              </div>

              <p className="hero__status">
                <i aria-hidden="true" />
                <span className="mono">{HERO.availability}</span>
              </p>
            </div>

            <div className="hero__plate">
              <Portrait />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
