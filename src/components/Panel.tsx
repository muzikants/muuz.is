import Image from "next/image";
import Link from "next/link";

type PanelProps = {
  title: string;
  meta: string;
  href?: string;
  cover?: string;
  index?: number;
};

export function Panel({
  title,
  meta,
  href = "#",
  cover,
  index,
}: PanelProps) {
  return (
    <Link
      href={href}
      className="panel group"
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
        <span className="panel-index">
          {typeof index === "number" ? String(index + 1).padStart(2, "0") : "—"}
        </span>
        <p className="panel-title">{title}</p>
        <p className="panel-meta">{meta}</p>
      </div>
    </Link>
  );
}
