"use client";

import { Fragment, useEffect, useSyncExternalStore } from "react";
import { ROLES, type PlateId, type RoleKey } from "@/lib/content";

/**
 * One small store for the chosen role, shared by the picker and the plates.
 *
 * The role lives in the URL (`?role=ai`) so a recruiter can send the view
 * they are looking at, and on `<html data-role>` so the stack below can mark
 * its terms from the stylesheet without becoming a client component.
 *
 * The server always renders the page in its own order. `useSyncExternalStore`
 * hands hydration that server snapshot and only then re-renders with the URL's
 * role, so a shared link never trips a hydration mismatch.
 */
const listeners = new Set<() => void>();
let current: RoleKey | null | undefined;

function isRole(value: string | null): value is RoleKey {
  return ROLES.some((role) => role.key === value);
}

function read(): RoleKey | null {
  if (current === undefined) {
    const param = new URLSearchParams(window.location.search).get("role");
    current = isRole(param) ? param : null;
  }
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setRole(role: RoleKey | null) {
  current = role;
  const url = new URL(window.location.href);
  if (role) url.searchParams.set("role", role);
  else url.searchParams.delete("role");
  window.history.replaceState(window.history.state, "", url);
  listeners.forEach((listener) => listener());
}

function useRole() {
  return useSyncExternalStore(subscribe, read, () => null);
}

const OPTIONS: { key: RoleKey | null; label: string }[] = [
  { key: null, label: "All work" },
  ...ROLES.map((role) => ({ key: role.key, label: role.label })),
];

/**
 * The control. Native radios, so arrow keys, the group's name and the checked
 * state are the browser's rather than re-implemented; the label carries the
 * look. "All work" is a choice like any other, which is how the page goes
 * back to its own order.
 */
export function RolePicker() {
  const role = useRole();
  const active = ROLES.find((r) => r.key === role);

  useEffect(() => {
    const root = document.documentElement;
    if (role) root.dataset.role = role;
    else delete root.dataset.role;
  }, [role]);

  return (
    <div className="roles">
      <fieldset className="roles__set">
        <legend className="mono">Explore by role</legend>
        <div className="roles__opts">
          {OPTIONS.map((option) => (
            <label className="roles__opt" key={option.key ?? "all"}>
              <input
                type="radio"
                name="role"
                value={option.key ?? ""}
                checked={role === option.key}
                onChange={() => setRole(option.key)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="roles__say" aria-live="polite">
        {active ? (
          <>
            <p className="roles__summary">{active.summary}</p>
            <p className="mono roles__look-head">Look at, in this order</p>
            <ol className="roles__look">
              {active.look.map((item) => (
                <li key={item.href + item.label}>
                  <a className="link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <p className="note">
            Choose a role to put the most relevant work first and mark the matching stack. Nothing
            is hidden: all three projects stay on the page.
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * The plates, in the chosen role's order. They are moved in the document
 * rather than with CSS `order`, so the tab order and a screen reader follow
 * what the eye sees. Keys keep each plate's own state (the Lab, the views)
 * through a reorder.
 */
export function RolePlates({ plates }: { plates: Record<PlateId, React.ReactNode> }) {
  const role = useRole();
  const order = ROLES.find((r) => r.key === role)?.order ?? (Object.keys(plates) as PlateId[]);

  return (
    <div className="plates">
      {/* Fragments, not wrappers: `.plate:first-of-type` has to keep meaning
          the first plate on the sheet. */}
      {order.map((id) => (
        <Fragment key={id}>{plates[id]}</Fragment>
      ))}
    </div>
  );
}
