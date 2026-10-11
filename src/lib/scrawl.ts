/**
 * Loose handwriting on a ruled page, generated from a fixed seed so the
 * server and the client agree and the drawing never changes between loads.
 * Used inside the TulongGuro plate to stand in for a student's submission.
 */

type Pt = [number, number];

export type Stroke = {
  d: string;
  len: number;
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
