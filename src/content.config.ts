import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const music = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/music" }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    spotify: z.string().url().optional(),
    bandcamp: z.string().url().optional(),
    soundcloud: z.string().url().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    role: z.string(),
    featured: z.boolean().default(false),
    url: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { music, work };
