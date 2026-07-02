type SectionLabelProps = {
  code?: string;
  label: string;
};

export function SectionLabel({ code, label }: SectionLabelProps) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      {code && <span className="section-label">{code}</span>}
      <h1 className="section-title">{label}</h1>
    </div>
  );
}
