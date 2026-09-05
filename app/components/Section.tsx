type SectionProps = {
  title: string;
  id?: string;
  children: React.ReactNode;
};

export function Section({ title, id, children }: SectionProps) {
  // section がランドマーク (region) として支援技術に公開される。
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section id={id} aria-labelledby={headingId} className="space-y-3">
      <h2 id={headingId} className="text-xl font-semibold">
        {title}
      </h2>
      <div className="space-y-3 text-sm">{children}</div>
    </section>
  );
}
