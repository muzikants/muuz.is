import type { ReactNode } from "react";

type ReleaseLink = { label: string; href: string };

type ReleaseProps = {
  title: string;
  format?: string;
  year: number;
  cover?: string;
  embedUrl?: string;
  links: ReleaseLink[];
  children: ReactNode;
  footer: ReactNode;
};

export function Release({
  title,
  format,
  year,
  cover,
  embedUrl,
  links,
  children,
  footer,
}: ReleaseProps) {
  return (
    <article className="release">
      <div className="release-art">
        {cover ? (
          <img
            src={cover}
            alt={`${title} cover art`}
            className="release-cover"
            width={640}
            height={640}
          />
        ) : (
          <div className="release-cover release-cover-empty" aria-hidden="true">
            <span className="panel-placeholder-code">artwork pending</span>
            <span className="panel-placeholder-title">{title}</span>
          </div>
        )}
      </div>

      <div className="release-info">
        <header className="space-y-4">
          <p className="case-study-code">
            REL-{String(year).slice(-2)} · {format ?? "Release"}
          </p>
          <h1 className="text-display-lg font-medium text-[var(--text)]">
            {title}
          </h1>
          <p className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase">
            muuzis · {year}
          </p>
        </header>

        <div className="prose-case">{children}</div>

        {embedUrl && (
          <iframe
            src={embedUrl}
            title={`${title} on Spotify`}
            className="release-embed"
            height={352}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        )}

        {links.length > 0 && (
          <ul className="release-links">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="release-link"
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="release-footer">{footer}</div>
    </article>
  );
}
