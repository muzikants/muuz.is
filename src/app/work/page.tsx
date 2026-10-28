import type { Metadata } from "next";
import { Panel } from "@/components/Panel";
import { SectionLabel } from "@/components/SectionLabel";
import { getWorkEntries } from "@/lib/content";
import { flipFlags } from "@/lib/layout";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Work",
  path: "/work",
});

export default function WorkIndexPage() {
  const work = getWorkEntries();
  const flips = flipFlags(work);

  return (
    <div className="page-shell">
      <SectionLabel code="WRK-001" label="Work" />

      <p className="mb-12 max-w-xl text-[var(--muted)]">
        Selected projects across web, commercial, and sound — asymmetric grid,
        detail on click.
      </p>

      <div className="work-grid">
        {work.map((entry, index) => (
          <Panel
            key={entry.slug}
            title={entry.data.title}
            meta={`${entry.data.role} · ${entry.data.year}`}
            href={`/work/${entry.slug}`}
            span={entry.data.gridSpan}
            offset={index % 3 === 1}
            cover={entry.data.cover}
            index={index}
            flip={flips[index]}
          />
        ))}
      </div>
    </div>
  );
}
