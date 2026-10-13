"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import shades from "@/images/portrait-shades.webp";
import smile from "@/images/portrait-smile.webp";
import { PORTRAIT } from "@/lib/content";

/**
 * Half the press beat.
 *
 * `--beat` in the stylesheet is 20s and every loop on this page is a harmonic
 * of it; the plate turns on the second. This constant and `--beat-turn` are
 * therefore the same number stated in two languages, and they have to stay
 * that way — the meter in the plate's bar is the visible half of this clock,
 * and a meter that fills at a different rate than the plate turns is worse
 * than no meter at all.
 */
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
 * resolves it; after that it turns over on its own every ten seconds against
 * a lattice that never quite settles, holds the second exposure while a
 * reader is pointing at it, and can be pinned for one cycle by click or
 * keyboard.
 *
 * Nothing a reader can do stops the turn for good. That was the bug, twice
 * over, and both halves of it are documented below.
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
   * Losing it was the first bug. A turn skipped while exposure 02 was up left
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

  /**
   * The pin releases itself after one full cycle.
   *
   * It used to be indefinite, and that was the second bug — the one that
   * actually froze the face. A click pinned `held`; the same click also
   * focused the button, and `onFocus` pinned `pointed`; and that focus
   * outlives the pointer. So one click and a mouse moved away left the plate
   * on exposure 02 for good, and clicking again cleared only half of it.
   *
   * A reader who wants the second exposure now gets a whole cycle of it,
   * named in the read-out, and then the press takes the plate back.
   */
  useEffect(() => {
    if (!held) return;
    const release = setTimeout(() => setHeld(false), CYCLE);
    return () => clearTimeout(release);
  }, [held]);

  /**
   * A pointer that leaves without saying so. If the window loses focus or the
   * tab is hidden while the cursor is resting on the plate, `pointerleave`
   * never fires — and the cursor may be somewhere else entirely by the time
   * the reader comes back to a plate still holding 02. Dropping the hold on
   * the way out costs nothing: if the pointer really is still there, the next
   * movement over the plate enters again.
   */
  useEffect(() => {
    const drop = () => setPointed(false);
    window.addEventListener("blur", drop);
    document.addEventListener("visibilitychange", drop);
    return () => {
      window.removeEventListener("blur", drop);
      document.removeEventListener("visibilitychange", drop);
    };
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

          {/* The loop, made visible. Keyed on `ticked` rather than `turn`,
              because only a turn of the clock should restart it: keyed on
              `turn`, a hover would reset the meter mid-cycle and the bar
              would lie about when the next exposure is due. Remounting on
              every tick is also what keeps it honest over a long sitting —
              the CSS animation and the interval are re-registered together,
              so the two cannot drift apart. */}
          <span className="portrait__meter" key={`turn-${ticked}`} aria-hidden="true" />
        </div>

        <button
          type="button"
          className="portrait__plate"
          aria-pressed={held}
          aria-label={`${PORTRAIT.alt} Press to hold the second exposure for one cycle.`}
          onPointerEnter={() => setPointed(true)}
          onPointerLeave={() => setPointed(false)}
          onPointerCancel={() => setPointed(false)}
          onFocus={(event) => {
            /**
             * Only a keyboard focus holds the plate. A mouse click focuses
             * this button too, and that focus stays behind once the pointer
             * has gone — which is the half of the freeze that survived
             * clicking a second time. `:focus-visible` is the browser's own
             * answer to whether a focus came from the keyboard, and it has
             * already been decided by the time this fires.
             */
            if (event.currentTarget.matches(":focus-visible")) setPointed(true);
          }}
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

            {/* The lattice the plate was printed from, never quite settling.
                The resolve ends with the mask fully open, so the samples it
                worked through are gone and the face is simply a photograph
                again; this lays the screen back over it at a quarter of the
                beat, at a strength a reader has to look for. The plate is
                alive between turns rather than waiting for one. */}
            <span className="portrait__breath" aria-hidden="true" />

            <span className="portrait__scan" aria-hidden="true" />
            {turn > 0 ? (
              <span className="portrait__pass" key={turn} aria-hidden="true" />
            ) : null}
            <span className="portrait__reg" aria-hidden="true" />
          </span>

          <span className="portrait__read">
            <span className="mono">{state.label}</span>
            <span className="mono">{held ? PORTRAIT.pinned : state.hint}</span>
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
