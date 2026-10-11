import { CREDENTIALS, LINKS, STACK } from "@/lib/content";

export function StackCreds() {
  return (
    <div id="stack">
      <section className="section" data-reveal="rule" aria-labelledby="stack-heading">
        <div className="wrap section-pad" data-reveal="spine">
          <div className="rail">
            <div className="rail-head" data-reveal="set">
              <p className="index">
                <span>05 /</span> TECHNICAL STACK
              </p>
            </div>

            <div>
              <h2 className="h2" data-reveal="wipe" id="stack-heading">
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

      <section className="section" data-reveal="rule" aria-labelledby="credentials-heading">
        <div className="wrap section-pad" data-reveal="spine">
          <div className="rail">
            <div className="rail-head" data-reveal="set">
              <p className="index">
                <span>06 /</span> CREDENTIALS
              </p>
            </div>

            <div>
              <h2 className="h2" data-reveal="wipe" id="credentials-heading" style={{ fontSize: "var(--t-title)" }}>
                Certificates and short courses.
              </h2>

              <div className="creds" style={{ marginTop: "clamp(22px, 2.4vw, 32px)" }}>
                {CREDENTIALS.map((credential) => {
                  const face = (
                    <>
                      <h3>{credential.title}</h3>
                      <p className="mono-plain">{credential.issuer}</p>
                      <p className="cred__year">{credential.year || "—"}</p>
                    </>
                  );

                  /* Only a credential with an issuer page to point at becomes
                     a link, so nothing unverifiable is dressed up as proof. */
                  return credential.href ? (
                    <a
                      className="cred cred--go"
                      key={credential.title}
                      href={credential.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {face}
                      <span className="mono cred__verify">Show credential</span>
                    </a>
                  ) : (
                    <div className="cred" key={credential.title}>
                      {face}
                    </div>
                  );
                })}
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
