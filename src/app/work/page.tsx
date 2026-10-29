import type { Metadata } from "next";
import { Panel } from "@/components/Panel";
import { SectionHead } from "@/components/SectionHead";
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
      <SectionHead
        code="WRK-001 · web / commercial / sound"
        title="Work"
        count={work.length}
      />

      <div className="work-grid">
        {work.map((entry, index) => (
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
    </div>
  );
}
