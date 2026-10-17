"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { INTELSY } from "@/lib/content";
import pred1 from "@/images/intelsy-val-pred.jpg";
import labels1 from "@/images/intelsy-val-labels.jpg";
import pred2 from "@/images/intelsy-val2-pred.jpg";
import labels2 from "@/images/intelsy-val2-labels.jpg";

const O = INTELSY.output;

const FRAMES: Record<string, { pred: StaticImageData; labels: StaticImageData }> = {
  "1": { pred: pred1, labels: labels1 },
  "2": { pred: pred2, labels: labels2 },
};

type Boxes = "pred" | "labels";

/**
 * The model's own work, unretouched, with the answer key one press away.
 *
 * Every image is YOLO's validation-batch render from the final run. Within a
 * batch both renders are stacked in one cell and the switch only changes
 * which is opaque, so the reader compares two registered frames rather than
 * two pictures that happen to be the same size. This is the one figure on the
 * page that is printed in full colour from the start: the colour of the boxes
 * is the model's class key, and greying it would remove information rather
 * than tone.
 *
 * Nothing here is inference. The bar says "precomputed" before anything
 * else, because a picture of boxes is easy to mistake for a running model.
 * Only the chosen batch is mounted, so the second pair is never downloaded
 * by a reader who does not ask for it.
 */
export function ModelOutput() {
  const [batch, setBatch] = useState(O.batches[0].key);
  const [boxes, setBoxes] = useState<Boxes>("pred");
  const current = O.batches.find((b) => b.key === batch) ?? O.batches[0];
  const frame = FRAMES[current.key];

  return (
    <figure className="plate__figure">
      <div className="fig">
        <div className="fig__bar">
          <span className="mono output__badge">{O.badge}</span>
          <span className="output__controls">
            <span className="output__switch" role="group" aria-label="Which validation batch">
              {O.batches.map((b) => (
                <button
                  key={b.key}
                  type="button"
                  className="output__opt"
                  aria-pressed={batch === b.key}
                  onClick={() => setBatch(b.key)}
                >
                  {b.label}
                </button>
              ))}
            </span>
            <span className="output__switch" role="group" aria-label="Which boxes to show">
              {(["pred", "labels"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  className="output__opt"
                  aria-pressed={boxes === k}
                  onClick={() => setBoxes(k)}
                >
                  {O[k]}
                </button>
              ))}
            </span>
          </span>
        </div>
        <div className="output__frame" key={current.key}>
          {(["pred", "labels"] as const).map((k) => (
            <Image
              key={k}
              src={frame[k]}
              alt={current.alt[k]}
              sizes="(min-width: 1060px) 52vw, 92vw"
              placeholder="blur"
              data-on={boxes === k ? "" : undefined}
              aria-hidden={boxes !== k}
            />
          ))}
        </div>
      </div>
      <figcaption className="fig__cap">
        <span className="mono">{O.fig}</span>
        <span className="mono-plain">{O.model}</span>
        <span className="note">{O.note}</span>
        {"caveat" in current && current.caveat ? (
          <span className="note">{current.caveat}</span>
        ) : null}
        <span className="note">{O.live}</span>
      </figcaption>
    </figure>
  );
}
