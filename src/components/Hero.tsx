import { HeroField } from "./HeroField";
import { HERO } from "@/lib/content";

/**
 * The page's one orchestrated moment. The marks in the margin set first,
 * the headline is wiped on a line at a time off its own baseline, and the
 * field only begins to draw once the sentence has finished arriving.
 * Everything below here waits to be scrolled to.
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

            <figure className="hero__fig">
              <HeroField />
              <figcaption>
                <span className="mono">{HERO.figure.label}</span>
                <span className="note">{HERO.figure.caption}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
