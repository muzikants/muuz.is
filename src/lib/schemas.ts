import { z } from "zod";

export const musicSchema = z.object({
  title: z.string(),
  year: z.number(),
  format: z.string().optional(),
  featured: z.boolean().default(false),
  gridSpan: z.enum(["large", "wide", "default"]).default("default"),
  cover: z.string().optional(),
  spotify: z.string().url().optional(),
  bandcamp: z.string().url().optional(),
  soundcloud: z.string().url().optional(),
});

export const workSchema = z.object({
  title: z.string(),
  year: z.number(),
  role: z.string(),
  featured: z.boolean().default(false),
  gridSpan: z.enum(["large", "wide", "default"]).default("default"),
  cover: z.string().optional(),
  video: z.string().optional(),
  url: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  accent: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Accent must be a 6-digit hex color")
    .optional(),
});

export type MusicData = z.output<typeof musicSchema>;
export type WorkData = z.output<typeof workSchema>;
