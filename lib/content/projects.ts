export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  context: string;
  dataDescription: string;
  methodology: string[];
  pipeline?: string[];
  results: string[];
  impact: string;
  limitations: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
};

export const PROJECT_CATEGORIES = [
  "Sustainability & Emissions",
  "Network & Commercial Analytics",
  "Safety & Operations Analytics",
  "Data Quality",
] as const;

export const PROJECTS: Project[] = [
  {
    slug: "european-aviation-emissions",
    title: "European Aviation Emissions Analytics",
    category: "Sustainability & Emissions",
    summary:
      "An end-to-end analytics pipeline quantifying CO₂ emissions across European aviation using Eurocontrol data, from raw flight records to an interactive Power BI model.",
    problem:
      "European aviation lacks an easily interrogable, flight-level view of its carbon footprint. Operators, regulators, and researchers need to see where emissions concentrate, by country, by season, and over time, to prioritise sustainability action.",
    context:
      "A personal research project built on public Eurocontrol flight data, structured as a production-style analytics pipeline rather than a one-off notebook.",
    dataDescription:
      "Eurocontrol flight-level records covering European air traffic, aggregated to roughly 135 million flights.",
    methodology: [
      "Ingested and cleaned raw flight data in a Microsoft Fabric Lakehouse",
      "Modelled the data with PySpark and SQL into a semantic layer",
      "Computed per-flight and aggregate CO₂ estimates",
      "Published an interactive Power BI model, filterable by country, season, and year",
    ],
    pipeline: ["Notebook", "Lakehouse", "SQL", "Semantic Model", "Power BI"],
    results: [
      "~2.8 billion tonnes of CO₂ quantified across the dataset",
      "~135 million flights analysed",
      "~20.93 tonnes average CO₂ per flight",
      "A clear 2020 dip and post-pandemic recovery visible in the emissions trend",
      "Seasonal peaks identified during summer months",
      "Country-level variance in emissions efficiency surfaced",
    ],
    impact:
      "Provides a reusable framework for aviation sustainability tracking. The same pipeline pattern extends to network planning and fleet-efficiency questions beyond emissions.",
    limitations:
      "Figures are dynamic and vary with dashboard filters. This is a personal research build on public data, not an operational system deployed at an airline.",
    technologies: ["Microsoft Fabric", "PySpark", "SQL", "Power BI", "Jupyter Notebook"],
    githubUrl: "https://github.com/FelixOgutuOdhiambo/european-aviation-emissions",
    featured: true,
  },
  {
    slug: "jambojet-network-analytics",
    title: "Network & Commercial Performance Analytics",
    category: "Network & Commercial Analytics",
    summary:
      "Production analytics supporting JamboJet's network planning: market-trend monitoring, on-time performance reporting, and multi-month schedule coordination.",
    problem:
      "Network and commercial teams needed reliable, current visibility into demand shifts, on-time performance, and turnaround efficiency in order to plan schedules and respond to seasonal change.",
    context: "Ongoing role as Network Analyst at JamboJet, Dec 2023–present.",
    dataDescription:
      "Internal market, schedule, and operational performance data hosted on Azure.",
    methodology: [
      "Built production-level code to monitor market trends on an ongoing basis",
      "Produced advanced visualisations and reports on OTP and turnaround time",
      "Coordinated 9-month flight schedules using Azure-hosted data",
    ],
    results: [
      "Captured an 8% increase in seasonal demand fluctuations",
      "Contributed to a 5% increase in on-time performance (OTP)",
      "Contributed to a 7% reduction in turnaround time",
      "Enhanced scheduling efficiency by 15% across 9-month planning cycles",
    ],
    impact:
      "Gives network and operations teams a current, data-backed view of demand and performance that informs schedule and resourcing decisions.",
    limitations:
      "Internal, employer-owned work. Code and dashboards are not publicly available.",
    technologies: ["Azure", "Excel", "Data Visualisation"],
    featured: true,
  },
  {
    slug: "astral-safety-operations-analytics",
    title: "Safety & Operations Analytics",
    category: "Safety & Operations Analytics",
    summary:
      "SMS dashboards, an automated delay-data pipeline, and load sheet automation built over two years as Data Analyst at Astral Aviation.",
    problem:
      "Safety and operations teams needed structured KPIs from Safety Management System (SMS) data, faster processing of high-volume delay records, and less manual time spent on load sheet calculations.",
    context: "Data Analyst, Astral Aviation Ltd, Sep 2021–Oct 2023.",
    dataDescription:
      "Safety Management System (SMS) reports, in-house operational delay messages, and flight load data.",
    methodology: [
      "Analysed SMS data to define performance metrics and KPIs",
      "Built dynamic dashboards in Tableau and MS Excel",
      "Developed an R script to mine, clean, and populate 1,500+ rows of delay data from operational messages",
      "Automated the manual load sheet calculation process in MS Excel",
    ],
    results: [
      "Elevated safety standards by 25%",
      "Mined and structured 1,500+ rows of delay data via R automation",
      "Saved 30 minutes per flight on load sheet calculations",
    ],
    impact:
      "Freed analyst and ground-crew time from manual processes and gave safety teams a clearer, metric-driven view of SMS performance.",
    limitations:
      "Internal, employer-owned work. Dashboards and scripts are not publicly available.",
    technologies: ["R", "Tableau", "Excel"],
    featured: true,
  },
  {
    slug: "data-quality-error-detection",
    title: "Data Quality & Error Detection System",
    category: "Data Quality",
    summary:
      "An Excel macro-based error detection system built during a data analytics internship to catch and correct data inaccuracies.",
    problem:
      "Manual data entry processes were producing inaccuracies that undermined downstream analysis.",
    context: "Data Analyst Intern, Astral Aviation Ltd, May–Aug 2021.",
    dataDescription: "Manually entered operational data subject to human error.",
    methodology: [
      "Engineered a data error detection system using Microsoft Excel macros",
      "Implemented a numerical scoring system for critical functions to standardise data collection",
    ],
    results: [
      "Reduced data inaccuracies by 50%",
      "Increased data collection accuracy by 10%",
    ],
    impact: "Established a lightweight, reusable QA layer for manual data entry.",
    limitations:
      "Internal, employer-owned work from an internship. Not publicly available.",
    technologies: ["Excel", "VBA / Macros"],
    featured: false,
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
