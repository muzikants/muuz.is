import type { MetadataRoute } from "next";
import { getMusicEntries, getWorkEntries } from "@/lib/content";
import { siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/music", "/about"];
  const now = new Date();

  const workRoutes = getWorkEntries().map((entry) => ({
    url: `${siteUrl}/work/${entry.slug}`,
    lastModified: now,
  }));

  const musicRoutes = getMusicEntries().map((entry) => ({
    url: `${siteUrl}/music/${entry.slug}`,
    lastModified: now,
  }));

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
    })),
    ...workRoutes,
    ...musicRoutes,
  ];
}
