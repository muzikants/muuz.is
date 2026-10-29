import type { Metadata } from "next";
import { SectionHead } from "@/components/SectionHead";
import { SocialLinks } from "@/components/SocialLinks";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="page-shell">
      <SectionHead code="ABT-001 · Riga, LV" title="About" />

      <div className="max-w-md space-y-12">
        <p className="font-mono text-sm tracking-wide text-[var(--muted)]">
          Riga · music, sound design, web
        </p>

        <div>
          <p className="section-label mb-6">Links</p>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
