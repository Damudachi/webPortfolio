import { TAPE } from "@/lib/content";

/**
 * The tape: the standing facts of the sheet, running.
 *
 * It closes the book rather than opening it. The frontispiece already has the
 * plate turning in it and the reading head crossing it, and a third moving
 * thing up there would be a fairground; down here, past the last section, a
 * slow strip of what this page is for is the last thing a reader passes on
 * the way to the colophon.
 *
 * Every token on it is derived from the key and the colophon above rather
 * than written again, because a ticker holding a fact the page has since
 * changed is worse than no ticker. It runs on three beats — the slowest loop
 * on the page — and stops while a reader is pointing at it, since a line of
 * type that will not hold still cannot be read.
 */
export function Tape() {
  return (
    <div className="tape">
      <div className="tape__run">
        <ul className="tape__set">
          {TAPE.map((item) => (
            <li className="mono" key={item}>
              {item}
            </li>
          ))}
        </ul>

        {/* The loop itself: the same list again, so the run can be moved by
            exactly half its own width and begin over with nothing to see at
            the join. It is held out of the reading order — one copy is the
            content, the other is the mechanism, and a screen reader should
            only ever meet the first. */}
        <ul className="tape__set" aria-hidden="true">
          {TAPE.map((item) => (
            <li className="mono" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
