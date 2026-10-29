import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { createMetadata, siteUrl } from "@/lib/metadata";
import { socialLinks } from "@/components/SocialLinks";
import "./globals.css";

export const metadata: Metadata = createMetadata();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "muuzis",
  url: siteUrl,
  location: { "@type": "Place", name: "Riga, Latvia" },
  sameAs: socialLinks.filter((link) => link.external).map((link) => link.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
