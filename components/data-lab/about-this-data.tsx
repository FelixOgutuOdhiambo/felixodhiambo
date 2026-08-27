const FACTS = [
  {
    label: "Source",
    value:
      "Quantified results documented in Felix's professional experience and project case studies (JamboJet, Astral Aviation, and independent research).",
  },
  {
    label: "Period",
    value: "May 2021 to present.",
  },
  {
    label: "Scope",
    value:
      "Every measured, published percentage outcome across his projects. Achievements without a specific quantified figure are excluded.",
  },
  {
    label: "Limitations",
    value:
      "A small sample (7 outcomes across 3 employer/personal projects). Figures are self-reported role outcomes, not an independently audited or live operational dataset.",
  },
];

export function AboutThisData() {
  return (
    <dl className="grid gap-6 sm:grid-cols-2">
      {FACTS.map((fact) => (
        <div key={fact.label}>
          <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {fact.label}
          </dt>
          <dd className="mt-1.5 text-sm text-foreground/90">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
