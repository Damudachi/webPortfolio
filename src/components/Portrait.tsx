"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import shades from "@/images/portrait-shades.webp";
import smile from "@/images/portrait-smile.webp";
import { PORTRAIT } from "@/lib/content";

const CYCLE = 10_000;

/**
 * The page's opening plate: two exposures of one sitting, registered to the
 * same crop so the swap reads as a face changing rather than two photographs
 * trading places.
 *
 * It wears the same chrome as every figure below it — a bar that names the
 * plate and counts the exposures, the frame, a read-out — so the hero
 * announces the book instead of standing apart from it. On load the picture
 * arrives as a lattice of samples of itself and the hero's reading head
 * resolves it; after that it turns over on its own every ten seconds, holds
 * the second exposure while a reader is pointing at it, and can be pinned by
 * click or keyboard.
 *
 * The unattended cycle and the resolve both stop under reduced motion: a
 * picture that changes by itself is exactly what that setting asks us not to
 * do, so the photograph simply arrives finished.
 */
export function Portrait() {
  const [ticked, setTicked] = useState(false);
  const [held, setHeld] = useState(false);
  const [pointed, setPointed] = useState(false);

  /**
   * The clock free-runs. It is deliberately neither torn down, paused, nor
   * skipped while a reader is pointing at the plate: `serious` below already
   * pins the second exposure under the pointer, so suppressing the turn
   * underneath buys nothing and loses the cycle's place.
   *
   * Losing it was the bug. A turn skipped while exposure 02 was up left
   * `ticked` true, so 02 held for twenty seconds instead of ten — and every
   * further hover across a turn added another ten. The plate read as stuck on
   * the second face. Letting the clock run means a hover extends the exposure
   * it is holding by the length of the hover and no more, and the plate drops
   * back onto the real cycle the moment the pointer leaves.
   */
  useEffect(() => {
    if (!document.documentElement.dataset.motion) return;
    const timer = setInterval(() => setTicked((on) => !on), CYCLE);
    return () => clearInterval(timer);
  }, []);

  const serious = held || pointed || ticked;
  const state = PORTRAIT.states[serious ? 1 : 0];

  /**
   * The sweep that marks an exposure change belongs to a turn, and the first
   * render is not one. Mounting it unconditionally put a second scanning head
   * across the plate at load — harmless while the plate was still hidden,
   * but plainly wrong now that it is painted from the first frame.
   */
  const [turn, setTurn] = useState(0);
  const was = useRef(serious);
  useEffect(() => {
    if (was.current === serious) return;
    was.current = serious;
    setTurn((n) => n + 1);
  }, [serious]);

  return (
    <figure className="portrait">
      <div className="fig portrait__fig">
        <div className="fig__bar">
          <span className="mono">{PORTRAIT.bar}</span>
          <span className="mono" aria-hidden="true">
            {`EXP. ${serious ? "02" : "01"} / 02`}
          </span>
        </div>

        <button
          type="button"
          className="portrait__plate"
          aria-pressed={held}
          aria-label={`${PORTRAIT.alt} Press to hold the second exposure.`}
          onPointerEnter={() => setPointed(true)}
          onPointerLeave={() => setPointed(false)}
          onFocus={() => setPointed(true)}
          onBlur={() => setPointed(false)}
          onClick={() => setHeld((on) => !on)}
        >
          <span className="portrait__frame">
            {/* Both exposures load eagerly: this plate is the first thing on
                the page, and it is painted from the first frame. */}
            <span className="portrait__sample">
              <Image
                className="portrait__img"
                data-on={serious ? undefined : ""}
                src={smile}
                alt=""
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1060px) 336px, 92vw"
              />
              <Image
                className="portrait__img"
                data-on={serious ? "" : undefined}
                src={shades}
                alt=""
                fill
                loading="eager"
                sizes="(min-width: 1060px) 336px, 92vw"
              />
            </span>

            <span className="portrait__scan" aria-hidden="true" />
            {turn > 0 ? (
              <span className="portrait__pass" key={turn} aria-hidden="true" />
            ) : null}
            <span className="portrait__reg" aria-hidden="true" />
          </span>

          <span className="portrait__read">
            <span className="mono">{state.label}</span>
            <span className="mono">{held ? "Held" : state.hint}</span>
          </span>
        </button>
      </div>

      <figcaption className="fig__cap">
        <span className="mono">{PORTRAIT.fig}</span>
        <span className="note">{PORTRAIT.note}</span>
      </figcaption>
    </figure>
  );
}
