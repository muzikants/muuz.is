import type { CSSProperties, ReactNode } from "react";

type CaseStudyProps = {
  title: string;
  role: string;
  year: number;
  tags: string[];
  accent?: string;
  url?: string;
  urlLabel?: string;
  media?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export function CaseStudy({
  title,
  role,
  year,
  tags,
  accent,
  url,
  urlLabel = "View project",
  media,
  footer,
  children,
}: CaseStudyProps) {
  const accentStyle = accent
    ? ({ "--case-accent": accent } as CSSProperties)
    : undefined;

  return (
    <article className="case-study" style={accentStyle}>
      <header className="case-study-header">
        <div className="case-study-rail">
          <p className="case-study-code">CS-{String(year).slice(-2)}</p>
          <p className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase">
            {role} · {year}
          </p>
          {tags.length > 0 && (
            <ul className="case-study-tags">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
          {url && (
            <a
              href={url}
              className="case-study-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {urlLabel} →
            </a>
          )}
        </div>

        <div className="case-study-intro">
          <h1 className="text-display-lg font-medium text-[var(--text)]">
            {title}
          </h1>
        </div>
      </header>

      {media ? <div className="case-study-media">{media}</div> : null}

      <div className="case-study-body">{children}</div>

      {footer ? <footer className="case-study-footer">{footer}</footer> : null}
    </article>
  );
}
