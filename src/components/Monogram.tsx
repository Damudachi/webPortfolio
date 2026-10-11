/**
 * The AS mark: a pointed A, a geometric S, the hairline that registers them,
 * and the small crossing star. Drawn rather than set, so it stays crisp at
 * 20px in the masthead and in the favicon.
 */
export function Monogram({
  size = 22,
  uid = "as",
  className,
}: {
  size?: number;
  uid?: string;
  className?: string;
}) {
  const grad = `${uid}-grad`;

  return (
    <svg
      className={className}
      width={(size * 124) / 72}
      height={size}
      viewBox="0 0 124 72"
      fill="none"
      role="img"
      aria-label="Aldrich Sabando monogram"
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="124" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7E858A" />
          <stop offset="0.48" stopColor="#F2F3F4" />
          <stop offset="1" stopColor="#9AA0A5" />
        </linearGradient>
      </defs>

      <path d="M67 0V72" stroke="#858B91" strokeWidth="1" opacity="0.5" />

      <path
        d="M6 64L32 14L58 64"
        stroke={`url(#${grad})`}
        strokeWidth="10"
        strokeLinejoin="miter"
        strokeMiterlimit="6"
      />
      <path
        d="M118 19H87a9.5 9.5 0 0 0 0 19h20a9.5 9.5 0 0 1 0 19H76"
        stroke={`url(#${grad})`}
        strokeWidth="10"
      />

      <path
        d="M67 30q0.7 6.4 6 8-5.3 1.6-6 8-0.7-6.4-6-8 5.3-1.6 6-8Z"
        fill="#F0F1F2"
      />
    </svg>
  );
}
