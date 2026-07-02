import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { SectionLabel } from "@/components/SectionLabel";
import { getMusicBySlug, getMusicEntries, musicMeta } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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
    path: `/music/${slug}`,
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

  const links = [
    spotify && { label: "Spotify", href: spotify },
    bandcamp && { label: "Bandcamp", href: bandcamp },
    soundcloud && { label: "SoundCloud", href: soundcloud },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="page-shell">
      <SectionLabel code="MUS-002" label="Music" />

      <article className="max-w-2xl space-y-10">
        <header className="space-y-4">
          <p className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase">
            {format ? `${format} · ${year}` : year}
          </p>
          <h1 className="text-display-lg font-medium text-[var(--text)]">
            {title}
          </h1>
        </header>

        {cover && (
          <img
            src={cover}
            alt={`${title} cover art`}
            className="aspect-square w-full max-w-sm border border-[var(--color-border)] object-cover"
            loading="lazy"
          />
        )}

        <div className="prose-invert space-y-4 text-[var(--text)]">
          <ReactMarkdown>{entry.body}</ReactMarkdown>
        </div>

        {links.length > 0 && (
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase transition-colors hover:text-[var(--text)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} →
                </a>
              </li>
            ))}
          </ul>
        )}

        <p>
          <Link
            href="/music"
            className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase transition-colors hover:text-[var(--text)]"
          >
            ← All music
          </Link>
        </p>
      </article>
    </div>
  );
}
