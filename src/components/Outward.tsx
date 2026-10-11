/** The mark on anything that leaves the page: a corner, opening outward. */
export function Outward() {
  return (
    <svg
      className="outward"
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 8L8 1" />
      <path d="M3 1h5v5" />
    </svg>
  );
}
