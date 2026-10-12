"use client";

import { useEffect } from "react";

/** How far up the window something must come before it is drawn in. */
const LINE = 0.92;

/**
 * Nothing on the page animates on its own except once, as it is first drawn.
 * This watches for anything marked `data-reveal` crossing into view and sets
 * `data-seen` on it; the stylesheet owns what that means.
 *
 * It measures rather than using an IntersectionObserver, because two of the
 * four reveals hide their element with `clip-path`, and an element clipped to
 * nothing has no intersection area to report — it would wait forever to be
 * told it was visible. A border box has no such problem.
 *
 * The hidden half of every reveal is gated behind `html[data-motion]`, which
 * an inline script in the document head sets before first paint. Without
 * JavaScript, or with reduced motion asked for, that attribute never appears
 * and the page simply renders finished.
 */
export function Motion() {
  useEffect(() => {
    if (!document.documentElement.dataset.motion) return;

    let waiting = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-seen])"),
    );
    let queued = false;

    const draw = () => {
      queued = false;
      const edge = window.innerHeight * LINE;
      waiting = waiting.filter((node) => {
        const box = node.getBoundingClientRect();
        /**
         * Only one test: has this come up past the line yet. Anything that
         * is already above the window has obviously passed it, and must be
         * drawn in rather than left waiting — a reader who lands on #contact,
         * presses End, or restores a scroll position has never watched the
         * sections in between cross the line, and those sections are hidden
         * until they are told otherwise. They used to stay hidden for good.
         */
        if (box.top > edge) return true;
        node.dataset.seen = "";
        return false;
      });
      if (waiting.length === 0) stop();
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(draw);
    };

    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    draw();

    return stop;
  }, []);

  return null;
}
