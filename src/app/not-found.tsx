import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell not-found">
      <p className="section-label">ERR-404 · signal lost</p>
      <h1 className="not-found-code">404</h1>
      <p className="max-w-sm text-[var(--muted)]">
        Nothing on this frequency. The page moved, or never existed.
      </p>
      <ul className="not-found-links">
        <li>
          <Link href="/" className="case-study-back">
            ← muuz.is
          </Link>
        </li>
        <li>
          <Link href="/music" className="case-study-back">
            Music
          </Link>
        </li>
        <li>
          <Link href="/work" className="case-study-back">
            Work
          </Link>
        </li>
      </ul>
    </div>
  );
}
