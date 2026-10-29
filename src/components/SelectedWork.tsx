import { Ink } from "./Ink";
import { Outward } from "./Outward";
import { PlateIntelsy } from "./PlateIntelsy";
import { PlateKindway } from "./PlateKindway";
import { PlateLiturgyGen } from "./PlateLiturgyGen";
import { PlateTulongGuro } from "./PlateTulongGuro";
import { RolePicker, RolePlates } from "./RoleLens";
import { MORE_BUILDS } from "@/lib/content";

export function SelectedWork() {
  return (
    <section className="section" data-reveal="rule" id="work" aria-labelledby="work-heading">
      <div className="wrap section-pad" data-reveal="spine">
        <div className="rail">
          <div className="rail-head" data-reveal="set">
            <p className="index">
              <span>01 /</span> SELECTED WORK
            </p>
            <p className="mono">Applied AI / Computer vision / Automation / Mobile</p>
          </div>

          <div>
            <h2 className="h2" data-reveal="resolve" id="work-heading">
              <Ink>Built for real-world friction.</Ink>
            </h2>
            <p className="lede" data-reveal="read" style={{ marginTop: 18 }}>
              Four systems, each drawn with the artifact that actually explains it. Point at a
              line in the key and the drawing will show you where it lives.
            </p>

            <RolePicker />

            <RolePlates
              plates={{
                tulongguro: <PlateTulongGuro />,
                liturgygen: <PlateLiturgyGen />,
                kindway: <PlateKindway />,
                intelsy: <PlateIntelsy />,
              }}
            />

            <div className="builds" id="builds">
              <p className="index">More builds</p>
              <div className="builds__list">
                {MORE_BUILDS.map((build) => (
                  <div className="builds__row" key={build.title}>
                    <span className="mono">{build.n}</span>
                    <h3>
                      {build.href ? (
                        <a className="link" href={build.href} target="_blank" rel="noopener noreferrer">
                          {build.title}
                          <Outward />
                        </a>
                      ) : (
                        build.title
                      )}
                    </h3>
                    <p className="mono-plain">{build.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
