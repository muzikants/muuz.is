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
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
} = {}): Metadata {
  const resolvedTitle = pageTitle(title);
  // SVG covers are not accepted by OG scrapers — fall back to the default card.
  const ogImage =
    image && !image.endsWith(".svg")
      ? { url: image }
      : { url: "/og-default.png", width: 1200, height: 630 };

  return {
    metadataBase: new URL(siteUrl),
    title: resolvedTitle,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      title: resolvedTitle,
      description,
      url: `${siteUrl}${path}`,
      siteName: "muuz.is",
      images: [ogImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [ogImage.url],
    },
  };
}
