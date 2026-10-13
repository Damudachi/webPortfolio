/**
 * The reading head, kept running.
 *
 * The head that resolves the frontispiece on load is this page's one moving
 * object, and it used to retire the moment the hero finished — which is the
 * note two earlier versions of this page were rejected on. This is the same
 * head on the long beat: once every `--beat` it crosses the window from top
 * to bottom, and the band it carries lifts the contrast of whatever is under
 * it as it goes, so the page reads as being continuously re-printed rather
 * than as having a line slide down it.
 *
 * It is markup and nothing else. The sweep, the band, the layer it sits in
 * and its stop under reduced motion all belong to the stylesheet, and without
 * `data-motion` it never paints at all — so it costs a reader who has asked
 * for stillness exactly one empty div.
 */
export function Reader() {
  return <div className="reader" aria-hidden="true" />;
}
