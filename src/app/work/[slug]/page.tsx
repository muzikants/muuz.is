import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { CaseStudy } from "@/components/CaseStudy";
import { EntryPager } from "@/components/EntryPager";
import { SectionLabel } from "@/components/SectionLabel";
import { WorkVideo } from "@/components/WorkVideo";
import {
  excerpt,
  getAdjacent,
  getWorkBySlug,
  getWorkEntries,
} from "@/lib/content";
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
    description: excerpt(entry.body),
    path: `/work/${slug}`,
    image: entry.data.cover,
  });
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { title, role, year, url, tags, video, cover, accent } = entry.data;
  const { prev, next } = getAdjacent(getWorkEntries(), slug);

  const media = video ? (
    <WorkVideo src={video} poster={cover} title={title} />
  ) : cover ? (
    <img
      src={cover}
      alt={`${title} preview`}
      className="case-study-cover"
      loading="lazy"
    />
  ) : null;

  return (
    <div className="page-shell">
      <SectionLabel code="WRK-002" label="Work" />

      <CaseStudy
        title={title}
        role={role}
        year={year}
        tags={tags}
        accent={accent}
        url={url}
        urlLabel={role === "Web" ? "Visit site" : "View project"}
        media={media}
        footer={
          <EntryPager
            backHref="/work"
            backLabel="All work"
            prev={prev && { href: `/work/${prev.slug}`, title: prev.data.title }}
            next={next && { href: `/work/${next.slug}`, title: next.data.title }}
          />
        }
      >
        <div className="prose-case">
          <ReactMarkdown>{entry.body}</ReactMarkdown>
        </div>
      </CaseStudy>
    </div>
  );
}
