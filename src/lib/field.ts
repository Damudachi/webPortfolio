/**
 * The hero artifact: a single field in which hand-made marks anneal into
 * structure. Read left to right it goes scrawl -> wobbling trace -> coherent
 * contour -> discrete node lattice. Everything is generated from a fixed seed
 * so the server and the client agree, and so the drawing never changes.
 */

type Pt = [number, number];

export type Stroke = {
  d: string;
  len: number;
  delay: number;
};

export type Node = {
  x: number;
  y: number;
  delay: number;
};

export type Edge = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 1-2-1 smoothing, applied a few times, turns white noise into a believable drift. */
function smooth(values: number[], passes: number) {
  let out = values.slice();
  for (let p = 0; p < passes; p += 1) {
    const next = out.slice();
    for (let i = 1; i < out.length - 1; i += 1) {
      next[i] = (out[i - 1] + 2 * out[i] + out[i + 1]) / 4;
    }
    out = next;
  }
  return out;
}

function polyline(points: Pt[]) {
  let len = 0;
  for (let i = 1; i < points.length; i += 1) {
    len += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  }
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join("");
  return { d, len: Math.ceil(len) };
}

export const FIELD_W = 1000;
export const FIELD_H = 560;

const LINES = 22;
const SAMPLES = 54;
const X0 = 70;
const X1 = 930;
const TOP = 48;
const BOTTOM = 512;

/** Columns of the node lattice, expressed as sample indices on the contour. */
const NODE_COLS = [40, 44, 48, 52];
const NODE_ROWS = [1, 4, 7, 10, 13, 16, 19];

function buildField() {
  const rand = mulberry32(20260411);
  const dx = (X1 - X0) / (SAMPLES - 1);
  const rowStep = (BOTTOM - TOP) / (LINES - 1);

  const lines: Stroke[] = [];
  const grid: Pt[][] = [];

  for (let i = 0; i < LINES; i += 1) {
    const y0 = TOP + i * rowStep;
    const noise = smooth(
      Array.from({ length: SAMPLES }, () => rand() * 2 - 1),
      3,
    );
    const points: Pt[] = [];

    for (let s = 0; s < SAMPLES; s += 1) {
      const x = X0 + s * dx;
      // 0 while the trace is still hand-made, 1 once it has resolved
      const t = Math.min(1, Math.max(0, (x - 150) / 470));
      const jitter = noise[s] * 34 * (1 - t);
      const u = x / FIELD_W;
      const terrain =
        Math.sin(u * 3.4 + i * 0.27) * 24 + Math.sin(u * 7.1 - i * 0.16) * 11;
      points.push([x, y0 + jitter + terrain * t]);
    }

    grid.push(points);
    const { d, len } = polyline(points);
    lines.push({ d, len, delay: 140 + i * 26 });
  }

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  NODE_ROWS.forEach((row, r) => {
    NODE_COLS.forEach((col, c) => {
      const [x, y] = grid[row][col];
      nodes.push({ x: +x.toFixed(1), y: +y.toFixed(1), delay: 1020 + (c * 7 + r) * 16 });
    });
  });

  // A lattice, not a mesh: alternating columns of ties and a few contour chords,
  // so the field reads as sampled rather than re-drawn.
  NODE_ROWS.forEach((row, r) => {
    if (r === NODE_ROWS.length - 1) return;
    const nextRow = NODE_ROWS[r + 1];
    [1, 3].forEach((c) => {
      const col = NODE_COLS[c];
      const a = grid[row][col];
      const b = grid[nextRow][col];
      edges.push({
        x1: +a[0].toFixed(1),
        y1: +a[1].toFixed(1),
        x2: +b[0].toFixed(1),
        y2: +b[1].toFixed(1),
        delay: 1180 + r * 24,
      });
    });
  });

  NODE_ROWS.forEach((row, r) => {
    if (r % 2 !== 0) return;
    for (let c = 0; c < NODE_COLS.length - 1; c += 1) {
      const a = grid[row][NODE_COLS[c]];
      const b = grid[row][NODE_COLS[c + 1]];
      edges.push({
        x1: +a[0].toFixed(1),
        y1: +a[1].toFixed(1),
        x2: +b[0].toFixed(1),
        y2: +b[1].toFixed(1),
        delay: 1240 + (r + c) * 22,
      });
    }
  });

  return { lines, nodes, edges };
}

/**
 * Loose marks on a ruled page. Used at the left of the hero field and, at a
 * smaller size, inside the TulongGuro submission panel.
 */
export function buildScrawl(options: {
  seed: number;
  x: number;
  width: number;
  y: number;
  rows: number;
  rowStep: number;
  amplitude?: number;
  samples?: number;
  stagger?: number;
}) {
  const {
    seed,
    x,
    width,
    y,
    rows,
    rowStep,
    amplitude = 3.4,
    samples = 16,
    stagger = 26,
  } = options;
  const rand = mulberry32(seed);
  const rules: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const marks: Stroke[] = [];
  let order = 0;

  for (let r = 0; r < rows; r += 1) {
    const baseY = y + r * rowStep;
    rules.push({ x1: x, y1: baseY, x2: x + width, y2: baseY });

    // one or two runs of writing per rule, each stopping short like real text
    const runs = rand() > 0.74 ? 1 : 2;
    let cursor = x + rand() * width * 0.04;

    for (let n = 0; n < runs; n += 1) {
      const remaining = x + width - cursor;
      if (remaining < width * 0.16) break;
      const runWidth = remaining * (0.34 + rand() * (runs === 1 ? 0.6 : 0.42));
      const noise = smooth(
        Array.from({ length: samples }, () => rand() * 2 - 1),
        1,
      );
      const points: Pt[] = [];
      for (let s = 0; s < samples; s += 1) {
        const px = cursor + (runWidth * s) / (samples - 1);
        points.push([px, baseY - 3.2 + noise[s] * amplitude]);
      }
      const { d, len } = polyline(points);
      marks.push({ d, len, delay: order * stagger });
      order += 1;
      cursor += runWidth + width * (0.03 + rand() * 0.05);
    }
  }

  return { rules, marks };
}

export const FIELD = buildField();

export const FIELD_INK = buildScrawl({
  seed: 7781,
  x: 58,
  width: 236,
  y: 86,
  rows: 11,
  rowStep: 38,
  amplitude: 4.2,
  samples: 18,
  stagger: 22,
});
