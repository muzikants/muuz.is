import type { Metadata } from "next";

export const siteUrl = "https://muuz.is";
export const siteDescription =
  "Music, sound design, and web — one practice.";

export function pageTitle(title?: string): string {
  return title && title !== "muuz.is" ? `${title} · muuz.is` : "muuz.is";
}

export function createMetadata({
  title,
  description = siteDescription,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const resolvedTitle = pageTitle(title);

  return {
    metadataBase: new URL(siteUrl),
    title: resolvedTitle,
    description,
    openGraph: {
      title: resolvedTitle,
      description,
      url: `${siteUrl}${path}`,
      siteName: "muuz.is",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: ["/og-default.png"],
    },
  };
}
