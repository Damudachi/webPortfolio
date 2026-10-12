/**
 * A line of display type that resolves rather than appears.
 *
 * The hero's sentence is set as a lattice of samples of itself and turned
 * into ink by a reading head crossing it. Every other heading on the page
 * used to simply wipe up off its baseline, which made the frontispiece read
 * as a trick played once rather than as how this book is printed. Wrapping a
 * heading in this gives it the same pass: the outer span carries the head and
 * the band, the inner one carries the screen the head is resolving.
 *
 * Two elements, because an element cannot both wear a mask and carry a head
 * that rides outside it — masking the heading would mask its own head too.
 *
 * The stylesheet owns when it runs: put `data-reveal="resolve"` on the
 * heading and the page's one observer arms it as it is scrolled to.
 */
export function Ink({ children }: { children: React.ReactNode }) {
  return (
    <span className="ink">
      <span className="ink__body">{children}</span>
    </span>
  );
}
