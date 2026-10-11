import { PRINCIPLES } from "@/lib/content";

/** Three small diagrams, drawn in the same language as the plates. */
const ICONS = [
  // work passes through a review gate and loops back
  <>
    <path d="M2 9h13" />
    <path d="M15 4h8v10h-8z" />
    <path d="M23 9h19" />
    <path d="M42 9v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-3" />
    <path d="M2 15l3-3 3 3" />
  </>,
  // a graduated rule with a span measured off it
  <>
    <path d="M2 16h40" />
    <path d="M6 16v-5M12 16v-8M18 16v-5M24 16v-10M30 16v-5M36 16v-8" />
    <path d="M12 21h12M12 19v4M24 19v4" />
  </>,
  // the route the work actually takes between two steps
  <>
    <path d="M2 6h10v7H2z" />
    <path d="M32 13h10v7H32z" />
    <path d="M12 9.5h8v7h12" />
    <path d="M29 13.5l3 3-3 3" />
  </>,
];

export function Principles() {
  return (
    <section className="section" aria-labelledby="principles-heading">
      <div className="wrap section-pad">
        <div className="rail">
          <div className="rail-head">
            <p className="index">
              <span>02 /</span> HOW I BUILD
            </p>
          </div>

          <div>
            <h2 className="h2" id="principles-heading">
              Decisions I make before the model does.
            </h2>

            <div className="principles" style={{ marginTop: "clamp(28px, 3vw, 44px)" }}>
              {PRINCIPLES.map((principle, i) => (
                <div className="principle" key={principle.title}>
                  <svg
                    width="44"
                    height="26"
                    viewBox="0 0 44 26"
                    fill="none"
                    stroke="#D9DDE0"
                    strokeWidth="1"
                    aria-hidden="true"
                  >
                    {ICONS[i]}
                  </svg>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
