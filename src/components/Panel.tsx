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
};

export function Panel({
  title,
  meta,
  href = "#",
  span = "default",
  offset = false,
  cover,
}: PanelProps) {
  return (
    <Link
      href={href}
      className={`panel group ${spanClass[span]}${offset ? " grid-offset" : ""}`}
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
        ) : null}
      </div>
      <div>
        <p className="panel-title">{title}</p>
        <p className="panel-meta">{meta}</p>
      </div>
    </Link>
  );
}
