"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import shades from "@/images/portrait-shades.webp";
import smile from "@/images/portrait-smile.webp";
import { PORTRAIT } from "@/lib/content";

const CYCLE = 10_000;

/**
 * Two exposures of one sitting, registered to the same crop so the swap
 * reads as a face changing rather than two photographs trading places.
 *
 * It turns over on its own every ten seconds, holds the second exposure
 * while a reader is pointing at it, and can be held by click or keyboard.
 * The unattended cycle stops entirely under reduced motion: a picture that
 * changes by itself is exactly what that setting is asking us not to do.
 */
export function Portrait() {
  const [ticked, setTicked] = useState(false);
  const [held, setHeld] = useState(false);
  const [pointed, setPointed] = useState(false);

  // The unattended turn restarts whenever the reader lets go, so leaving the
  // plate is never immediately followed by it changing on its own.
  useEffect(() => {
    if (!document.documentElement.dataset.motion || pointed) return;
    const timer = setInterval(() => setTicked((on) => !on), CYCLE);
    return () => clearInterval(timer);
  }, [pointed]);

  const serious = held || pointed || ticked;
  const state = PORTRAIT.states[serious ? 1 : 0];

  return (
    <figure className="portrait" data-reveal="frame">
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
          <Image
            className="portrait__img"
            data-on={serious ? undefined : ""}
            src={smile}
            alt=""
            fill
            sizes="(min-width: 860px) 32vw, 88vw"
            placeholder="blur"
          />
          <Image
            className="portrait__img"
            data-on={serious ? "" : undefined}
            src={shades}
            alt=""
            fill
            sizes="(min-width: 860px) 32vw, 88vw"
            placeholder="blur"
          />
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
