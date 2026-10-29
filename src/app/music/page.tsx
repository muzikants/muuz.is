import type { Metadata } from "next";
import { Panel } from "@/components/Panel";
import { SectionHead } from "@/components/SectionHead";
import { getMusicEntries, musicMeta } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Music",
  path: "/music",
});

export default function MusicIndexPage() {
  const music = getMusicEntries();

  return (
    <div className="page-shell">
      <SectionHead
        code="MUS-001 · releases as muuzis"
        title="Music"
        count={music.length}
      />

      <div className="work-grid">
        {music.map((entry, index) => (
          <Panel
            key={entry.slug}
            title={entry.data.title}
            meta={musicMeta(entry)}
            href={`/music/${entry.slug}`}
            cover={entry.data.cover}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
