import { Ink } from "./Ink";
import { CREDENTIALS, LINKS, ROLES, STACK } from "@/lib/content";

/** The roles a term is evidence for; Explore by role marks them from CSS. */
const rolesFor = (term: string) =>
  ROLES.filter((role) => role.stack.includes(term))
    .map((role) => role.key)
    .join(" ") || undefined;

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
              <h2 className="h2" data-reveal="resolve" id="stack-heading">
                <Ink>What I reach for.</Ink>
              </h2>

              <p className="note stack__lens">
                Marked for the role you chose: the terms the work above actually shows. The rest are
                listed, not demonstrated here.
              </p>

              <div className="stack" style={{ marginTop: "clamp(28px, 3vw, 44px)" }}>
                {STACK.map((group) => (
                  <div className="stack__row" key={group.group}>
                    <p className="mono">{group.group}</p>
                    <p className="stack__terms">
                      {group.terms.map((term) => (
                        <span key={term} data-for={rolesFor(term)}>
                          {term}
                        </span>
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
              <h2 className="h2" data-reveal="resolve" id="credentials-heading" style={{ fontSize: "var(--t-title)" }}>
                <Ink>Certificates and short courses.</Ink>
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

                  /* A credential links to its issuer page when there is one,
                     otherwise to the certificate file itself. */
                  if (credential.file) {
                    return (
                      <a
                        className="cred cred--go"
                        key={credential.title}
                        href={credential.file.href}
                        download={credential.file.download}
                      >
                        {face}
                        <span className="mono cred__verify">Download certificate</span>
                      </a>
                    );
                  }

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
