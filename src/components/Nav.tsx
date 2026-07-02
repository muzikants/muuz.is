"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/music", label: "Music" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname() ?? "";

  return (
    <header className="fixed inset-x-0 top-0 z-10 border-b border-[var(--color-border)] bg-[var(--bg)]/85 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className={`font-mono text-sm tracking-[0.2em] uppercase transition-opacity hover:opacity-70 ${
            pathname === "/" ? "text-[var(--text)]" : "text-[var(--muted)]"
          }`}
        >
          muuz.is
        </Link>
        <ul className="flex gap-4 sm:gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(pathname, href) ? "page" : undefined}
                className={`font-mono text-xs tracking-widest uppercase transition-colors ${
                  isActive(pathname, href)
                    ? "text-[var(--text)]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
