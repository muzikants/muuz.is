import Image from "next/image";
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
  cover?: string;
  index?: number;
  flip?: boolean;
};

export function Panel({
  title,
  meta,
  href = "#",
  span = "default",
  offset = false,
  cover,
  index,
  flip = false,
}: PanelProps) {
  return (
    <Link
      href={href}
      className={`panel group ${spanClass[span]}${offset ? " grid-offset" : ""}${flip ? " grid-flip" : ""}`}
    >
      <div className="panel-cover">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="panel-cover-img"
          />
        ) : (
          <div className="panel-placeholder" aria-hidden="true">
            <span className="panel-placeholder-code">
              {typeof index === "number"
                ? String(index + 1).padStart(3, "0")
                : "---"}{" "}
              · in progress
            </span>
            <span className="panel-placeholder-title">{title}</span>
          </div>
        )}
      </div>
      <div className="panel-caption">
        <p className="panel-title">{title}</p>
        <p className="panel-meta">{meta}</p>
      </div>
    </Link>
  );
}
