import Link from "next/link";
import { Hero3D } from "@/components/Hero3D";
import { Panel } from "@/components/Panel";
import { getFeaturedWork } from "@/lib/content";

export default function HomePage() {
  const featuredWork = getFeaturedWork();

  return (
    <>
      <section className="relative flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden px-6 pt-[var(--spacing-nav)]">
        <Hero3D />
        <h1 className="hero-wordmark relative z-[1] text-display-xl font-medium text-[var(--text)]">
          muuz.is
        </h1>
      </section>

      <section className="page-shell border-t border-[var(--color-border)] pt-16">
        <div className="mb-10 flex items-baseline justify-between gap-4">
          <div>
            <p className="section-label mb-2">Featured</p>
            <h2 className="section-title">Selected work</h2>
          </div>
          <Link
            href="/work"
            className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase transition-colors hover:text-[var(--text)]"
          >
            View all →
          </Link>
        </div>

        <div className="work-grid">
          {featuredWork.map((entry, index) => (
            <Panel
              key={entry.slug}
              title={entry.data.title}
              meta={`${entry.data.role} · ${entry.data.year}`}
              href={`/work/${entry.slug}`}
              span={entry.data.gridSpan}
              offset={index === 1}
              cover={entry.data.cover}
            />
          ))}
        </div>
      </section>
    </>
  );
}
