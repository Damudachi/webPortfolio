import { CREDENTIALS, LINKS, STACK } from "@/lib/content";

export function StackCreds() {
  return (
    <div id="stack">
      <section className="section" aria-labelledby="stack-heading">
        <div className="wrap section-pad">
          <div className="rail">
            <div className="rail-head">
              <p className="index">
                <span>05 /</span> TECHNICAL STACK
              </p>
            </div>

            <div>
              <h2 className="h2" id="stack-heading">
                What I reach for.
              </h2>

              <div className="stack" style={{ marginTop: "clamp(28px, 3vw, 44px)" }}>
                {STACK.map((group) => (
                  <div className="stack__row" key={group.group}>
                    <p className="mono">{group.group}</p>
                    <p className="stack__terms">
                      {group.terms.map((term) => (
                        <span key={term}>{term}</span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="credentials-heading">
        <div className="wrap section-pad">
          <div className="rail">
            <div className="rail-head">
              <p className="index">
                <span>06 /</span> CREDENTIALS
              </p>
            </div>

            <div>
              <h2 className="h2" id="credentials-heading" style={{ fontSize: "var(--t-title)" }}>
                Certificates and short courses.
              </h2>

              <div className="creds" style={{ marginTop: "clamp(22px, 2.4vw, 32px)" }}>
                {CREDENTIALS.map((credential) => (
                  <div className="cred" key={credential.title}>
                    <h3>{credential.title}</h3>
                    <p className="mono-plain">{credential.issuer}</p>
                    <p className="cred__year">{credential.year || "—"}</p>
                  </div>
                ))}
              </div>

              <p style={{ marginTop: 22 }}>
                <a
                  className="link"
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More credentials on LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
