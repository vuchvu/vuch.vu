type SectionProps = {
  title: string;
  id?: string;
  headingClassName?: string;
  children: React.ReactNode;
};

export function Section({
  title,
  id,
  headingClassName = "",
  children,
}: SectionProps) {
  // section がランドマーク (region) として支援技術に公開される。
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section id={id} aria-labelledby={headingId} className="space-y-3">
      <h2
        id={headingId}
        className={`text-xl font-semibold ${headingClassName}`.trim()}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
