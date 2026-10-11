const NOISE = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="180" height="180" filter="url(#n)"/></svg>`;

/** Just enough tooth to stop the flat black reading as a screenshot. */
export function Grain() {
  return (
    <div
      className="grain"
      aria-hidden="true"
      style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(NOISE)}")` }}
    />
  );
}
