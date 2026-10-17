"use client";

import Image from "next/image";
import { useState } from "react";
import { INTELSY } from "@/lib/content";
import pred from "@/images/intelsy-val-pred.jpg";
import labels from "@/images/intelsy-val-labels.jpg";

const O = INTELSY.output;

/**
 * The model's own work, unretouched, with the answer key one press away.
 *
 * Both images are YOLO's validation-batch renders from the final run. They
 * are stacked in one cell and the switch only changes which is opaque, so the
 * reader compares two registered frames rather than two pictures that happen
 * to be the same size. This is the one figure on the page that is printed in
 * full colour from the start: the colour of the boxes is the model's class
 * key, and greying it would remove information rather than tone.
 */
export function ModelOutput() {
  const [key, setKey] = useState<"pred" | "labels">("pred");

  return (
    <figure className="plate__figure">
      <div className="fig">
        <div className="fig__bar">
          <span className="mono">INTELSY / colab_ppe_v_final</span>
          <span className="output__switch" role="group" aria-label="Which boxes to show">
            {(["pred", "labels"] as const).map((k) => (
              <button
                key={k}
                type="button"
                className="output__opt"
                aria-pressed={key === k}
                onClick={() => setKey(k)}
              >
                {O[k]}
              </button>
            ))}
          </span>
        </div>
        <div className="output__frame">
          <Image
            src={pred}
            alt={O.alt.pred}
            sizes="(min-width: 1060px) 52vw, 92vw"
            placeholder="blur"
            data-on={key === "pred" ? "" : undefined}
            aria-hidden={key !== "pred"}
          />
          <Image
            src={labels}
            alt={O.alt.labels}
            sizes="(min-width: 1060px) 52vw, 92vw"
            placeholder="blur"
            data-on={key === "labels" ? "" : undefined}
            aria-hidden={key !== "labels"}
          />
        </div>
      </div>
      <figcaption className="fig__cap">
        <span className="mono">{O.fig}</span>
        <span className="note">{O.note}</span>
      </figcaption>
    </figure>
  );
}
