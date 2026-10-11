"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import shades from "@/images/portrait-shades.webp";
import smile from "@/images/portrait-smile.webp";
import { PORTRAIT } from "@/lib/content";

const CYCLE = 10_000;

/**
 * The page's hero artifact: two exposures of one sitting, registered to the
 * same crop so the swap reads as a face changing rather than two photographs
 * trading places.
 *
 * On load the plate arrives as a lattice of samples of the photograph itself
 * and a scanning head resolves it, top to bottom, into the picture — the page
 * reading its own author the way every system on it reads its input. After
 * that it turns over on its own every ten seconds, holds the second exposure
 * while a reader is pointing at it, and can be pinned by click or keyboard.
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
   * Read by the timer rather than closed over, so that pointing at the plate
   * lets a turn pass instead of tearing the timer down and rebuilding it.
   * Rebuilding it meant a reader whose cursor came to rest anywhere on the
   * plate stopped the cycle for as long as it stayed there, and the picture
   * looked broken rather than held.
   */
  const holding = useRef(false);
  useEffect(() => {
    holding.current = pointed || held;
  }, [pointed, held]);

  useEffect(() => {
    if (!document.documentElement.dataset.motion) return;
    const timer = setInterval(() => {
      if (holding.current) return;
      setTicked((on) => !on);
    }, CYCLE);
    return () => clearInterval(timer);
  }, []);

  const serious = held || pointed || ticked;
  const state = PORTRAIT.states[serious ? 1 : 0];

  return (
    <figure className="portrait">
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
              the page, and it sits inside a clipped frame, where a lazy image
              has no intersection area to report and may never be fetched. */}
          <span className="portrait__sample">
            <Image
              className="portrait__img"
              data-on={serious ? undefined : ""}
              src={smile}
              alt=""
              fill
              priority
              sizes="(min-width: 1060px) 42vw, 88vw"
            />
            <Image
              className="portrait__img"
              data-on={serious ? "" : undefined}
              src={shades}
              alt=""
              fill
              loading="eager"
              sizes="(min-width: 1060px) 42vw, 88vw"
            />
          </span>

          <span className="portrait__scan" aria-hidden="true" />
          <span className="portrait__pass" key={String(serious)} aria-hidden="true" />
          <span className="portrait__reg" aria-hidden="true" />
        </span>

        <span className="portrait__read">
          <span className="mono">{state.label}</span>
          <span className="mono">{held ? "Held" : state.hint}</span>
        </span>
      </button>

      <figcaption className="fig__cap">
        <span className="mono">{PORTRAIT.fig}</span>
        <span className="note">{PORTRAIT.note}</span>
      </figcaption>
    </figure>
  );
}
