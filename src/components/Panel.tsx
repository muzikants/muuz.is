import Link from "next/link";

type GridSpan = "large" | "wide" | "default";

const spanClass: Record<GridSpan, string> = {
  large: "grid-span-large",
  wide: "grid-span-wide",
  default: "grid-span-default",
};

type PanelProps = {
  title: string;
  meta: string;
  href?: string;
  span?: GridSpan;
  offset?: boolean;
};

export function Panel({
  title,
  meta,
  href = "#",
  span = "default",
  offset = false,
}: PanelProps) {
  return (
    <Link
      href={href}
      className={`panel group ${spanClass[span]}${offset ? " grid-offset" : ""}`}
    >
      <div className="panel-cover" aria-hidden="true" />
      <div>
        <p className="panel-title">{title}</p>
        <p className="panel-meta">{meta}</p>
      </div>
    </Link>
  );
}
