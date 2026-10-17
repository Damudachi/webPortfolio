"use client";

import { useRef, useState } from "react";
import { useHashTarget } from "./plate-parts";

const VIEWS = [
  { key: "product", label: "Product", sub: "what it does" },
  { key: "engineering", label: "Engineering", sub: "how it runs" },
] as const;

type View = (typeof VIEWS)[number]["key"];

/**
 * Two readings of one plate: the product as a user meets it, and the system
 * as it is built. A tab pair rather than a toggle, because each side is a
 * panel with a name a screen reader should announce.
 *
 * Both panels are in the document from the server — the inactive one is
 * `hidden`, not unmounted — so the engineering account is there to be found
 * without JavaScript and is never a fetch away.
 */
export function ViewSwitch({
  name,
  slug,
  product,
  engineering,
}: {
  name: string;
  /** Names the panels `{slug}-product` and `{slug}-engineering`, so a link can open one. */
  slug: string;
  product: React.ReactNode;
  engineering: React.ReactNode;
}) {
  const [view, setView] = useState<View>("product");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const box = useRef<HTMLDivElement>(null);

  // The panel a link points at is `hidden` until it is chosen, so the
  // browser had nothing to scroll to: choose it, then bring the tabs up.
  const open = (next: View) => {
    setView(next);
    requestAnimationFrame(() => box.current?.scrollIntoView({ block: "start" }));
  };
  useHashTarget(`${slug}-product`, () => open("product"));
  useHashTarget(`${slug}-engineering`, () => open("engineering"));

  const onKey = (event: React.KeyboardEvent, i: number) => {
    const step = { ArrowRight: 1, ArrowLeft: -1, Home: -i, End: VIEWS.length - 1 - i }[
      event.key
    ];
    if (step === undefined) return;
    event.preventDefault();
    const next = (i + step + VIEWS.length) % VIEWS.length;
    setView(VIEWS[next].key);
    tabs.current[next]?.focus();
  };

  return (
    <div className="views" ref={box}>
      <div className="views__bar" role="tablist" aria-label={`${name}: choose a view`}>
        {VIEWS.map((v, i) => (
          <button
            key={v.key}
            ref={(node) => {
              tabs.current[i] = node;
            }}
            type="button"
            role="tab"
            id={`${slug}-${v.key}-tab`}
            aria-controls={`${slug}-${v.key}`}
            aria-selected={view === v.key}
            tabIndex={view === v.key ? 0 : -1}
            className="views__tab"
            onClick={() => setView(v.key)}
            onKeyDown={(event) => onKey(event, i)}
          >
            <b>{v.label}</b>
            <span className="mono">{v.sub}</span>
          </button>
        ))}
      </div>

      <div
        className="views__panel"
        role="tabpanel"
        id={`${slug}-product`}
        aria-labelledby={`${slug}-product-tab`}
        hidden={view !== "product"}
      >
        {product}
      </div>
      <div
        className="views__panel"
        role="tabpanel"
        id={`${slug}-engineering`}
        aria-labelledby={`${slug}-engineering-tab`}
        hidden={view !== "engineering"}
      >
        {engineering}
      </div>
    </div>
  );
}
