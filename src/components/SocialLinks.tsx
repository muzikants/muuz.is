const links = [
  { label: "SoundCloud", href: "https://soundcloud.com/muuzis", external: true },
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/6g0aXENYFr0qfxoLxPibhT",
    external: true,
  },
  { label: "Bandcamp", href: "https://muuzis.bandcamp.com/", external: true },
  { label: "Instagram", href: "https://www.instagram.com/_muuzis/", external: true },
  { label: "YouTube", href: "https://www.youtube.com/@muuzis", external: true },
  { label: "Email", href: "mailto:muuziba@gmail.com", external: false },
];

type SocialLinksProps = {
  compact?: boolean;
};

export function SocialLinks({ compact = false }: SocialLinksProps) {
  if (compact) {
    return (
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {links.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-[0.15em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--text)]"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {links.map(({ label, href }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-4"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-[var(--muted)] uppercase transition-colors group-hover:text-[var(--text)]">
              {label}
            </span>
            <span className="h-px w-8 bg-[var(--color-border)] transition-colors group-hover:bg-[var(--text)]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
