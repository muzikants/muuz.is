import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-[var(--muted)] uppercase">
          muuz.is · {year}
        </span>
        <SocialLinks compact />
      </div>
    </footer>
  );
}
