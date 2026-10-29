import type { ReactNode } from "react";

type SectionHeadProps = {
  code: string;
  title: string;
  count?: number;
  as?: "h1" | "h2";
  aside?: ReactNode;
};

export function SectionHead({
  code,
  title,
  count,
  as: Heading = "h1",
  aside,
}: SectionHeadProps) {
  return (
    <header className="section-head">
      <div className="space-y-4">
        <p className="section-label">{code}</p>
        <Heading className="section-head-title">{title}</Heading>
      </div>
      <div className="section-head-side">
        {typeof count === "number" && (
          <span className="section-head-count">
            {String(count).padStart(2, "0")} entries
          </span>
        )}
        {aside}
      </div>
    </header>
  );
}
