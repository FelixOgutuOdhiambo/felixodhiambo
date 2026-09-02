import { BarChart3, Database, Leaf, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  deliverables: string[];
  idealFor: string;
};

export const SERVICES: Service[] = [
  {
    icon: Plane,
    title: "Network & Commercial Analytics",
    description:
      "Demand and market-trend monitoring, schedule coordination, and performance reporting for airline network and commercial teams.",
    deliverables: [
      "Market trend & seasonal demand monitoring",
      "On-time performance (OTP) and turnaround reporting",
      "Multi-month flight schedule data support",
    ],
    idealFor: "Airlines and aviation operators planning network and capacity.",
  },
  {
    icon: BarChart3,
    title: "Safety & Operations Analytics",
    description:
      "KPI dashboards and structured reporting built from Safety Management System (SMS) and operational data.",
    deliverables: [
      "SMS performance metrics & KPI dashboards (Tableau, Excel)",
      "Operational delay-data mining and cleaning (R)",
      "Manual process automation (e.g. load sheet calculations)",
    ],
    idealFor: "Airlines and ground handlers formalising safety reporting.",
  },
  {
    icon: Database,
    title: "Data Quality & Process Automation",
    description:
      "Error-detection systems and Excel/R automation that replace manual, error-prone data workflows.",
    deliverables: [
      "Excel macro-based error detection systems",
      "Data collection scoring & standardisation",
      "Manual-process automation and QA layers",
    ],
    idealFor: "Teams relying on manual spreadsheets for critical data entry.",
  },
  {
    icon: Leaf,
    title: "Sustainability & Emissions Analytics",
    description:
      "End-to-end pipelines, from raw flight data to a decision-ready Power BI model, for emissions and sustainability reporting.",
    deliverables: [
      "Lakehouse-based data ingestion & modelling (Fabric, PySpark, SQL)",
      "CO₂ / emissions estimation from flight-level data",
      "Interactive Power BI dashboards for sustainability tracking",
    ],
    idealFor:
      "Aviation organisations and researchers building emissions visibility.",
  },
];
