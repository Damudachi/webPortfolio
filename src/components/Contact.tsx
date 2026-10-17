import { Ink } from "./Ink";
import { CONTACT, HERO, RESUME } from "@/lib/content";

export function Contact() {
  return (
    <section className="section" data-reveal="rule" id="contact" aria-labelledby="contact-heading">
      <div className="wrap section-pad" data-reveal="spine">
        <div className="rail">
          <div className="rail-head" data-reveal="set">
            <p className="index">
              <span>07 /</span> GET IN TOUCH
            </p>
            <p className="mono">{HERO.availability}</p>
          </div>

          <div>
            <h2 className="h2 contact__h" data-reveal="resolve" id="contact-heading">
              <Ink>{CONTACT.headline}</Ink>
            </h2>
            <p className="lede" data-reveal="read">{CONTACT.support}</p>

            <div className="channels">
              {CONTACT.channels.map((channel) => (
                <a
                  className="channel"
                  key={channel.label}
                  href={channel.href}
                  {...(channel.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="mono">{channel.label}</span>
                  <span className="channel__val">{channel.value}</span>
                  <span className="channel__go">{channel.go}</span>
                </a>
              ))}
              {RESUME.href ? (
                <a className="channel" href={RESUME.href} download>
                  <span className="mono">{RESUME.label}</span>
                  <span className="channel__val">PDF</span>
                  <span className="channel__go">Download</span>
                </a>
              ) : (
                <div className="channel channel--pending">
                  <span className="mono">{RESUME.label}</span>
                  <span className="channel__val">{RESUME.pending}</span>
                  <span className="channel__go">Pending</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
