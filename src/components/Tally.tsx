"use client";

import { useLayoutEffect, useRef } from "react";

const DURATION = 1100;
const LINE = 0.92;

/**
 * A measured figure settling, the way a needle does: it starts at zero, runs
 * quickly, and eases into the real number. The digits are zero-padded so the
 * reading never changes width mid-count.
 *
 * React renders the finished figure and the count is written straight to the
 * node, so the server, a reader without JavaScript and a reader who has asked
 * for reduced motion all get the number and nothing else.
 */
export function Tally({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || !document.documentElement.dataset.motion) return;

    const parsed = /^(\d+)(.*)$/.exec(value);
    if (!parsed) return;
    const target = Number(parsed[1]);
    const width = parsed[1].length;
    const suffix = parsed[2];

    const print = (n: number) => {
      node.textContent = String(n).padStart(width, "0") + suffix;
    };

    let frame = 0;
    let begun = 0;

    const tick = (now: number) => {
      const t = Math.min((now - begun) / DURATION, 1);
      print(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    const look = () => {
      if (node.getBoundingClientRect().top > window.innerHeight * LINE) return;
      window.removeEventListener("scroll", look);
      frame = requestAnimationFrame((now) => {
        begun = now;
        tick(now);
      });
    };

    print(0);
    window.addEventListener("scroll", look, { passive: true });
    look();

    return () => {
      window.removeEventListener("scroll", look);
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span className={className} ref={ref}>
      {value}
    </span>
  );
}
