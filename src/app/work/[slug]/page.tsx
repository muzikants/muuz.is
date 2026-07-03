import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { WorkVideo } from "@/components/WorkVideo";
import { SectionLabel } from "@/components/SectionLabel";
import { getWorkBySlug, getWorkEntries } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) return {};

  return createMetadata({
    title: entry.data.title,
    path: `/work/${slug}`,
  });
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { title, role, year, url, tags, video, cover } = entry.data;

  return (
    <div className="page-shell">
      <SectionLabel code="WRK-002" label="Work" />

      <article className={`space-y-10 ${video ? "max-w-4xl" : "max-w-2xl"}`}>
        <header className="space-y-4">
          <p className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase">
            {role} · {year}
          </p>
          <h1 className="text-display-lg font-medium text-[var(--text)]">
            {title}
          </h1>
          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-xs tracking-wide text-[var(--muted)] uppercase"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {video && (
          <WorkVideo src={video} poster={cover} title={title} />
        )}

        <div className="prose-invert space-y-4 text-[var(--text)]">
          <ReactMarkdown>{entry.body}</ReactMarkdown>
        </div>

        {url && (
          <p>
            <a
              href={url}
              className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase transition-colors hover:text-[var(--text)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              View project →
            </a>
          </p>
        )}

        <p>
          <Link
            href="/work"
            className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase transition-colors hover:text-[var(--text)]"
          >
            ← All work
          </Link>
        </p>
      </article>
    </div>
  );
}
