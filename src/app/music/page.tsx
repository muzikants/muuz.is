import type { Metadata } from "next";
import { Panel } from "@/components/Panel";
import { SectionLabel } from "@/components/SectionLabel";
import { getMusicEntries, musicMeta } from "@/lib/content";
import { flipFlags } from "@/lib/layout";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Music",
  path: "/music",
});

export default function MusicIndexPage() {
  const music = getMusicEntries();
  const flips = flipFlags(music);

  return (
    <div className="page-shell">
      <SectionLabel code="MUS-001" label="Music" />

      <div className="work-grid">
        {music.map((entry, index) => (
          <Panel
            key={entry.slug}
            title={entry.data.title}
            meta={musicMeta(entry)}
            href={`/music/${entry.slug}`}
            span={entry.data.gridSpan}
            offset={index === 1}
            cover={entry.data.cover}
            index={index}
            flip={flips[index]}
          />
        ))}
      </div>
    </div>
  );
}
