import { BarChart3, Plane, Compass } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { FadeIn } from "@/components/fade-in";

const GROUPS = [
  {
    icon: BarChart3,
    title: "Data & Analytics",
    items: [
      "Statistical analysis",
      "KPI & dashboard design (Tableau, Power BI)",
      "Data mining, cleaning & automation (R, Excel)",
      "Business & performance reporting",
    ],
  },
  {
    icon: Plane,
    title: "Aviation Analytics",
    items: [
      "Network & commercial analytics",
      "Safety Management System (SMS) analytics",
      "Operations performance & turnaround analysis",
      "Flight schedule planning (Azure)",
    ],
  },
  {
    icon: Compass,
    title: "Decision Support",
    items: [
      "Market & demand trend monitoring",
      "On-time performance (OTP) reporting",
      "Sustainability & emissions analytics",
      "Data quality & error detection systems",
    ],
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Expertise"
          title="Where data meets aviation decisions"
          description="Capability built across airline network planning, safety analytics, and independent sustainability research, not a generic data-science toolkit."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((group, i) => (
            <FadeIn key={group.title} delay={i * 0.08}>
              <div className="h-full rounded-lg border border-border bg-card p-6">
                <group.icon className="size-5 text-primary" />
                <h3 className="mt-4 font-serif text-lg font-medium">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
