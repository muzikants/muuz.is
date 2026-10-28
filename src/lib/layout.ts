type Spanned = { data: { gridSpan: "large" | "wide" | "default" } };

/** Alternate large panels left/right so the dense grid packs without holes. */
export function flipFlags(entries: Spanned[]): boolean[] {
  let large = 0;
  return entries.map((entry) =>
    entry.data.gridSpan === "large" ? large++ % 2 === 1 : false,
  );
}
