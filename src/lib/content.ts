import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { z } from "zod";
import { musicSchema, workSchema, type MusicData, type WorkData } from "./schemas";

export type WorkEntry = {
  slug: string;
  data: WorkData;
  body: string;
};

export type MusicEntry = {
  slug: string;
  data: MusicData;
  body: string;
};

const contentDir = path.join(process.cwd(), "content");

function readCollection<T>(
  subdir: string,
  schema: z.ZodType<T, z.ZodTypeDef, unknown>,
): Array<{ slug: string; data: T; body: string }> {
  const dir = path.join(contentDir, subdir);
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));

  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in ${subdir}/${file}: ${parsed.error.message}`,
      );
    }

    return { slug, data: parsed.data as T, body: content.trim() };
  });
}

function sortByYearAndTitle<T extends { year: number; title: string }>(
  a: { data: T },
  b: { data: T },
) {
  return b.data.year - a.data.year || a.data.title.localeCompare(b.data.title);
}

export function getWorkEntries(): WorkEntry[] {
  return readCollection("work", workSchema).sort(sortByYearAndTitle);
}

export function getMusicEntries(): MusicEntry[] {
  return readCollection("music", musicSchema).sort(sortByYearAndTitle);
}

export function getWorkBySlug(slug: string): WorkEntry | undefined {
  return getWorkEntries().find((entry) => entry.slug === slug);
}

export function getMusicBySlug(slug: string): MusicEntry | undefined {
  return getMusicEntries().find((entry) => entry.slug === slug);
}

export function getFeaturedWork(): WorkEntry[] {
  return getWorkEntries().filter((entry) => entry.data.featured);
}

export function musicMeta(entry: MusicEntry): string {
  const { format, year } = entry.data;
  return format ? `${format} · ${year}` : String(year);
}
