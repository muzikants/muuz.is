import Link from "next/link";
import { Hero3D } from "@/components/Hero3D";
import { Panel } from "@/components/Panel";
import { SectionHead } from "@/components/SectionHead";
import { getFeaturedWork } from "@/lib/content";

export default function HomePage() {
  const featuredWork = getFeaturedWork();

  return (
    <>
      <section className="hero-section">
        <Hero3D />
        <div className="hero-lockup">
          <h1 className="hero-wordmark">muuz.is</h1>
          <div className="hero-meta">
            <p className="hero-tagline">music · sound · web</p>
            <a href="#selected" className="hero-scroll">
              scroll ↓
            </a>
          </div>
        </div>
      </section>

      <section id="selected" className="page-shell home-selected">
        <SectionHead
          as="h2"
          code="Featured"
          title="Selected work"
          aside={
            <Link
              href="/work"
              className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase transition-colors hover:text-[var(--text)]"
            >
              View all →
            </Link>
          }
        />

        <div className="work-grid">
          {featuredWork.map((entry, index) => (
            <Panel
              key={entry.slug}
              title={entry.data.title}
              meta={`${entry.data.role} · ${entry.data.year}`}
              href={`/work/${entry.slug}`}
              cover={entry.data.cover}
              index={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
