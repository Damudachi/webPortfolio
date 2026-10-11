import { CONTACT, HERO } from "@/lib/content";

export function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="wrap section-pad">
        <div className="rail">
          <div className="rail-head">
            <p className="index">
              <span>07 /</span> GET IN TOUCH
            </p>
            <p className="mono">{HERO.availability}</p>
          </div>

          <div>
            <h2 className="h2 contact__h" id="contact-heading">
              {CONTACT.headline}
            </h2>
            <p className="lede">{CONTACT.support}</p>

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
