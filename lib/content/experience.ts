export type ExperienceItem = {
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Network Planning & Analytics Specialist / Network Data Scientist",
    company: "JamboJet",
    companyUrl: "https://www.jambojet.com/",
    location: "Nairobi, Kenya",
    start: "Dec 2023",
    end: "Present",
    highlights: [
      "Analyse 3M+ passenger, booking, scheduling, operational and commercial records annually to identify demand patterns, network opportunities, capacity constraints, route performance drivers and revenue improvement opportunities.",
      "Develop demand forecasting, predictive and scenario models supporting capacity allocation, frequency optimisation, schedule adjustments, route development, seasonal planning and commercial decision-making.",
      "Evaluate booking trends, passenger demand, load factors, aircraft utilisation, RASK, route profitability, schedule performance and operational reliability to support network and revenue optimisation.",
      "Develop automated Power BI dashboards, KPI frameworks and analytical workflows, reducing reporting turnaround time by 40%+ and strengthening visibility of network, commercial and operational performance.",
      "Partner with Revenue Management, Commercial, Finance, Operations, Engineering and senior stakeholders to translate complex analytical findings into business cases, network actions and measurable recommendations.",
    ],
  },
  {
    role: "Data Analyst",
    company: "Astral Aviation Ltd",
    companyUrl: "https://astral-aviation.com/",
    location: "Nairobi, Kenya",
    start: "Sep 2021",
    end: "Nov 2023",
    highlights: [
      "Elevated safety standards by 25% through rigorous analysis of Safety Management Systems (SMS) data and the creation of performance metrics, KPIs, and dynamic dashboards using Tableau and MS Excel.",
      "Developed and deployed an R script for efficient data mining, cleaning, and population of 1,500+ rows of delay data from in-house operational messages.",
      "Enhanced operational efficiency by automating the manual load sheet calculation process, saving 30 minutes per flight using MS Excel automation techniques.",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "Astral Aviation Ltd",
    companyUrl: "https://astral-aviation.com/",
    location: "Nairobi, Kenya",
    start: "May 2021",
    end: "Aug 2021",
    highlights: [
      "Engineered a data error detection system using Microsoft Excel macros, reducing data inaccuracies by 50%.",
      "Implemented a system to assign numerical values to critical functions, resulting in a 10% increase in data collection accuracy.",
    ],
  },
];

export type EducationItem = {
  qualification: string;
  institution: string;
  institutionUrl: string;
  location: string;
};

export const EDUCATION: EducationItem[] = [
  {
    qualification: "Bachelor of Applied Science in Statistics",
    institution: "Mount Kenya University",
    institutionUrl: "https://www.mku.ac.ke/",
    location: "Thika, Kenya",
  },
];

export type Certification = {
  name: string;
  provider: string;
  url?: string;
};

export const CERTIFICATIONS: Certification[] = [
  { name: "IATA Network, Fleet & Schedule Planning", provider: "IATA" },
  {
    name: "Google Data Analytics Professional Certificate",
    provider: "Google via Coursera",
    url: "https://www.coursera.org/account/accomplishments/verify/DSHCLUW3C7Z6",
  },
  { name: "Microsoft Fabric Analyst in a Day", provider: "Microsoft" },
];
