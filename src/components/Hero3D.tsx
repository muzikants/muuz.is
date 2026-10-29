"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Hero3DCanvas = dynamic(
  () =>
    import("./Hero3DCanvas").then((module) => ({
      default: module.Hero3DCanvas,
    })),
  { ssr: false },
);

function StaticFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 md:justify-end md:pr-[12vw]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 80"
        className="h-48 w-72 text-[var(--muted)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        aria-hidden="true"
      >
        <path d="M10 42 L60 30 L110 42 L60 50 Z" />
        <path d="M10 42 L60 40 L110 42 M60 30 L60 50" />
      </svg>
    </div>
  );
}

export function Hero3D() {
  const reducedMotion = useReducedMotion();
  const readoutRef = useRef<HTMLSpanElement>(null);
  const formRef = useRef<HTMLSpanElement>(null);

  // Write straight to the DOM — re-rendering React every frame is wasteful.
  const onMorph = useCallback((value: number) => {
    if (readoutRef.current) {
      readoutRef.current.textContent = `${String(Math.round(value * 100)).padStart(3, "0")}%`;
    }
    if (formRef.current) {
      formRef.current.textContent = value < 0.5 ? "A · stealth" : "B · organic";
    }
  }, []);

  return (
    <>
      {reducedMotion ? (
        <StaticFallback />
      ) : (
        <div
          className="hero-canvas pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <Hero3DCanvas onMorph={onMorph} />
        </div>
      )}

      <div className="hero-hud hero-hud-top" aria-hidden="true">
        <span>MZ-01 // codec</span>
        <span>56.95°N 24.11°E · Riga</span>
      </div>

      {!reducedMotion && (
        <div className="hero-hud hero-hud-readout" aria-hidden="true">
          <span>form</span>
          <span ref={formRef} className="text-[var(--text)]">
            A · stealth
          </span>
          <span>morph</span>
          <span ref={readoutRef} className="text-[var(--text)]">
            000%
          </span>
        </div>
      )}
    </>
  );
}
