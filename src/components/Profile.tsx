import { Ink } from "./Ink";
import { EDUCATION, EXPERIENCE, PROFILE_LEAD } from "@/lib/content";

export function Profile() {
  return (
    <div id="profile">
      <section className="section" data-reveal="rule" aria-labelledby="experience-heading">
        <div className="wrap section-pad" data-reveal="spine">
          <div className="rail">
            <div className="rail-head" data-reveal="set">
              <p className="index">
                <span>03 /</span> EXPERIENCE
              </p>
            </div>

            <div>
              <div className="profile__lead">
                <h2 className="h2" data-reveal="resolve" id="experience-heading">
                  <Ink>Where the work was done.</Ink>
                </h2>
                <p className="lede" data-reveal="read" style={{ marginTop: 20 }}>
                  {PROFILE_LEAD}
                </p>
              </div>

              <div className="cv" style={{ marginTop: "clamp(28px, 3vw, 44px)" }}>
                {EXPERIENCE.map((role) => (
                  <div className="cv__row" key={role.role}>
                    <div className="cv__when">
                      <span className="mono">{role.dates}</span>
                      {role.terms ? <span className="mono">{role.terms}</span> : null}
                    </div>
                    <div>
                      <h3 className="cv__role">{role.role}</h3>
                      <p className="cv__org">{role.org}</p>
                      <p>{role.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-reveal="rule" aria-labelledby="education-heading">
        <div className="wrap section-pad" data-reveal="spine">
          <div className="rail">
            <div className="rail-head" data-reveal="set">
              <p className="index">
                <span>04 /</span> EDUCATION
              </p>
            </div>

            <div className="edu">
              <div>
                <h2 className="h2" data-reveal="resolve" id="education-heading" style={{ fontSize: "var(--t-title)" }}>
                  <Ink>{EDUCATION.degree}</Ink>
                </h2>
                <p className="lede" data-reveal="read" style={{ marginTop: 12 }}>
                  {EDUCATION.school}
                </p>
                <p className="prose" style={{ marginTop: 18, fontSize: "var(--t-small)" }}>
                  Relevant coursework: {EDUCATION.coursework}
                </p>
              </div>

              <dl className="edu__facts">
                {EDUCATION.facts.map((fact) => (
                  <div className="edu__fact" key={fact.label}>
                    <dt className="mono">{fact.label}</dt>
                    <dd>
                      <b>{fact.value}</b>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
