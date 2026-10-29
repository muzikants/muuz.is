import Link from "next/link";

type PagerEntry = { href: string; title: string };

type EntryPagerProps = {
  backHref: string;
  backLabel: string;
  prev?: PagerEntry;
  next?: PagerEntry;
};

export function EntryPager({ backHref, backLabel, prev, next }: EntryPagerProps) {
  return (
    <nav className="entry-pager" aria-label="More entries">
      <Link href={backHref} className="entry-pager-back">
        ← {backLabel}
      </Link>
      <div className="entry-pager-links">
        {prev && (
          <Link href={prev.href} className="entry-pager-link" rel="prev">
            <span className="entry-pager-dir">Prev</span>
            <span className="entry-pager-title">{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link
            href={next.href}
            className="entry-pager-link entry-pager-link-next"
            rel="next"
          >
            <span className="entry-pager-dir">Next</span>
            <span className="entry-pager-title">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
