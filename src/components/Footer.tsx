import { Monogram } from "./Monogram";
import { SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__inner">
        <span className="mono">
          © {SITE.year} {SITE.name}
        </span>
        <Monogram size={15} uid="as-foot" />
        <span className="mono">{SITE.location}</span>
      </div>
    </footer>
  );
}
