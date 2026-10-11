import { FIELD, FIELD_H, FIELD_INK, FIELD_W } from "@/lib/field";

/**
 * Drawn once, on load. Left to right: marks on a ruled page, a trace that
 * still wobbles, a measured contour field, and finally the discrete lattice
 * a system can actually compute over.
 */
export function HeroField() {
  return (
    <svg
      className="field"
      viewBox={`0 0 ${FIELD_W} ${FIELD_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="field-fade"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={FIELD_W}
          y2="0"
        >
          <stop offset="0" stopColor="#D9DDE0" stopOpacity="0" />
          <stop offset="0.12" stopColor="#D9DDE0" stopOpacity="0.17" />
          <stop offset="0.34" stopColor="#D9DDE0" stopOpacity="0.4" />
          <stop offset="0.58" stopColor="#D9DDE0" stopOpacity="0.56" />
          <stop offset="0.74" stopColor="#D9DDE0" stopOpacity="0.4" />
          <stop offset="0.9" stopColor="#D9DDE0" stopOpacity="0.07" />
          <stop offset="1" stopColor="#D9DDE0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* the page: ruling and marks */}
      <g>
        {FIELD_INK.rules.map((rule, i) => (
          <line
            key={`r${i}`}
            x1={rule.x1}
            y1={rule.y1}
            x2={rule.x2}
            y2={rule.y2}
            stroke="#303438"
            strokeWidth="1"
            opacity="0.55"
          />
        ))}
        {FIELD_INK.marks.map((mark, i) => (
          <path
            key={`m${i}`}
            className="field__ink"
            d={mark.d}
            stroke="#858B91"
            opacity="0.72"
            style={
              {
                "--len": mark.len,
                "--d": `${mark.delay}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </g>

      {/* the field: wobble resolving into contour */}
      {FIELD.lines.map((line, i) => (
        <path
          key={`l${i}`}
          className="field__line"
          d={line.d}
          stroke="url(#field-fade)"
          style={
            {
              "--len": line.len,
              "--d": `${line.delay}ms`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* the lattice: the field, sampled */}
      {FIELD.edges.map((edge, i) => (
        <line
          key={`e${i}`}
          className="field__edge"
          x1={edge.x1}
          y1={edge.y1}
          x2={edge.x2}
          y2={edge.y2}
          style={{ "--d": `${edge.delay}ms` } as React.CSSProperties}
        />
      ))}

      {FIELD.nodes.map((node, i) => (
        <g
          key={`n${i}`}
          className="field__node"
          style={
            {
              "--d": `${node.delay}ms`,
              transformOrigin: `${node.x}px ${node.y}px`,
            } as React.CSSProperties
          }
        >
          <circle cx={node.x} cy={node.y} r="3.2" fill="#0D0F11" stroke="#D9DDE0" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}
