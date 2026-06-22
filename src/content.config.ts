import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const music = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/music" }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    format: z.string().optional(),
    featured: z.boolean().default(false),
    gridSpan: z.enum(["large", "wide", "default"]).default("default"),
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
    gridSpan: z.enum(["large", "wide", "default"]).default("default"),
    cover: z.string().optional(),
    url: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { music, work };
