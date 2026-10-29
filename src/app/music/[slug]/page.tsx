import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { EntryPager } from "@/components/EntryPager";
import { Release } from "@/components/Release";
import { SectionLabel } from "@/components/SectionLabel";
import {
  excerpt,
  getAdjacent,
  getMusicBySlug,
  getMusicEntries,
  spotifyEmbedUrl,
} from "@/lib/content";
import { createMetadata, siteUrl } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const artistSpotify = "https://open.spotify.com/artist/6g0aXENYFr0qfxoLxPibhT";

export function generateStaticParams() {
  return getMusicEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getMusicBySlug(slug);
  if (!entry) return {};

  return createMetadata({
    title: entry.data.title,
    description: excerpt(entry.body),
    path: `/music/${slug}`,
    image: entry.data.cover,
  });
}

export default async function MusicDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getMusicBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { title, year, format, cover, spotify, bandcamp, soundcloud } =
    entry.data;
  const { prev, next } = getAdjacent(getMusicEntries(), slug);

  const links = [
    spotify && { label: "Spotify", href: spotify },
    bandcamp && { label: "Bandcamp", href: bandcamp },
    soundcloud && { label: "SoundCloud", href: soundcloud },
  ].filter(Boolean) as { label: string; href: string }[];

  if (links.length === 0) {
    links.push({ label: "Follow on Spotify", href: artistSpotify });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: title,
    datePublished: String(year),
    url: `${siteUrl}/music/${slug}`,
    ...(cover && { image: `${siteUrl}${cover}` }),
    byArtist: { "@type": "MusicGroup", name: "muuzis", url: siteUrl },
    ...(spotify && { sameAs: [spotify] }),
  };

  return (
    <div className="page-shell">
      <SectionLabel code="MUS-002" label="Music" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Release
        title={title}
        format={format}
        year={year}
        cover={cover}
        embedUrl={spotifyEmbedUrl(spotify)}
        links={links}
        footer={
          <EntryPager
            backHref="/music"
            backLabel="All music"
            prev={prev && { href: `/music/${prev.slug}`, title: prev.data.title }}
            next={next && { href: `/music/${next.slug}`, title: next.data.title }}
          />
        }
      >
        <ReactMarkdown>{entry.body}</ReactMarkdown>
      </Release>
    </div>
  );
}
