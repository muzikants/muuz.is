"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Hero3DCanvas = dynamic(
  () =>
    import("./Hero3DCanvas").then((module) => ({
      default: module.Hero3DCanvas,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10"
        aria-hidden="true"
      >
        <div className="h-24 w-24 rotate-45 border border-[var(--color-border)]" />
      </div>
    ),
  },
);

function StaticFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 80"
        className="h-32 w-48 text-[var(--muted)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        aria-hidden="true"
      >
        <path d="M10 42 L60 38 L110 42 L95 44 L60 40 L25 44 Z" />
        <path d="M60 38 L60 28 L68 38 Z" />
        <line x1="60" y1="40" x2="60" y2="52" />
      </svg>
    </div>
  );
}

export function Hero3D() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <StaticFallback />;
  }

  return (
    <div
      className="hero-canvas pointer-events-none absolute inset-0 opacity-60"
      aria-hidden="true"
    >
      <Hero3DCanvas />
    </div>
  );
}
