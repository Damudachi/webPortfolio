import Image, { type StaticImageData } from "next/image";
import { CAPTURED } from "@/lib/content";
import { Outward } from "./Outward";

/**
 * A real capture, tipped into the plate book. It is printed in grey like
 * everything else on the page and comes back to full colour under the
 * reader's pointer — the only colour here belongs to the running software,
 * not to the page.
 */
export function Shot({
  src,
  alt,
  bar,
  fig,
  note,
  href,
  sizes = "(min-width: 1060px) 46vw, 92vw",
  captured = CAPTURED,
}: {
  src: StaticImageData;
  alt: string;
  bar: string;
  fig: string;
  note?: string;
  href?: string;
  sizes?: string;
  /** When this capture was taken, if not on the page's main capture day. */
  captured?: string;
}) {
  const frame = (
    <span className="fig shot__fig">
      <span className="fig__bar">
        <span className="mono">{bar}</span>
        <span className="mono shot__stamp">
          {href ? <Outward /> : null}
          {captured}
        </span>
      </span>
      <span className="shot__img">
        <Image src={src} alt={alt} sizes={sizes} placeholder="blur" />
      </span>
    </span>
  );

  return (
    <figure className="shot" data-reveal="frame">
      {href ? (
        <a className="shot__link" href={href} target="_blank" rel="noopener noreferrer">
          {frame}
        </a>
      ) : (
        frame
      )}
      <figcaption className="fig__cap">
        <span className="mono">{fig}</span>
        {note ? <span className="note">{note}</span> : null}
      </figcaption>
    </figure>
  );
}
