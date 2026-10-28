import Link from "next/link";
import { Hero3D } from "@/components/Hero3D";
import { Panel } from "@/components/Panel";
import { getFeaturedWork } from "@/lib/content";

export default function HomePage() {
  const featuredWork = getFeaturedWork();

  return (
    <>
      <section className="hero-section relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6">
        <Hero3D />
        <div className="relative z-[1] flex flex-col items-center gap-6 text-center">
          <h1 className="hero-wordmark text-display-xl font-medium text-[var(--text)]">
            muuz.is
          </h1>
          <p className="hero-tagline font-mono text-xs tracking-[0.3em] text-[var(--muted)] uppercase">
            music · sound · web
          </p>
        </div>
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
              index={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
