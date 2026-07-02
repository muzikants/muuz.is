import type { Metadata } from "next";
import { Panel } from "@/components/Panel";
import { SectionLabel } from "@/components/SectionLabel";
import { getWorkEntries } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Work",
  path: "/work",
});

export default function WorkIndexPage() {
  const work = getWorkEntries();

  return (
    <div className="page-shell">
      <SectionLabel code="WRK-001" label="Work" />

      <div className="work-grid">
        {work.map((entry, index) => (
          <Panel
            key={entry.slug}
            title={entry.data.title}
            meta={`${entry.data.role} · ${entry.data.year}`}
            href={`/work/${entry.slug}`}
            span={entry.data.gridSpan}
            offset={index === 1}
          />
        ))}
      </div>
    </div>
  );
}
