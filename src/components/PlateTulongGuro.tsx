import { Lab } from "./Lab";
import { ContributionLine, Measures, PlateHead, PlateLinks, StackList } from "./plate-parts";
import { Shot } from "./Shot";
import { EngineeringView } from "./Trace";
import { ViewSwitch } from "./ViewSwitch";
import { TULONGGURO as P } from "@/lib/content";
import tulongguro from "@/images/shot-tulongguro.webp";

/**
 * Plate I used to end on a drawing of the grading loop that a reader could
 * point at but not use. The drawing is now the Lab: the same four zones —
 * submission, rubric, draft, approval — as a loop a reader runs themselves.
 */
export function PlateTulongGuro() {
  return (
    <article className="plate" id="tulongguro">
      <PlateHead plate={P.plate} title={P.title} category={P.category} year={P.year} />

      <div className="plate__body plate__body--lead">
        <div className="plate__file">
          <div>
            <h3 className="h3">{P.title}</h3>
            <p className="mono" style={{ marginTop: 10 }}>
              {P.descriptor}
            </p>
          </div>

          <p className="lede" data-reveal="read">{P.summary}</p>
          <p className="prose">{P.detail}</p>

          <ContributionLine data={P.contribution} />
          <PlateLinks links={P.links} />
          <StackList terms={P.stack} />
        </div>

        <Shot
          src={tulongguro}
          alt={P.shot.alt}
          bar={P.shot.bar}
          fig={P.shot.fig}
          note={P.shot.note}
          href={P.demo}
          sizes="(min-width: 1060px) 48vw, 92vw"
        />
      </div>

      <ViewSwitch
        name={P.title}
        product={
          <>
            <Measures items={P.measures} note={P.measuresNote} source={P.measuresSource} />
            <Lab />
          </>
        }
        engineering={<EngineeringView data={P.engineering} name={P.title} />}
      />
    </article>
  );
}
