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
    role: "Network Analyst",
    company: "JamboJet",
    companyUrl: "https://www.jambojet.com/",
    location: "Nairobi, Kenya",
    start: "Dec 2023",
    end: "Present",
    highlights: [
      "Designed and developed production-level code to monitor market trends, capturing an 8% increase in seasonal demand fluctuations.",
      "Delivered impactful reports using advanced visualisations, contributing to a 5% increase in on-time performance (OTP) and a 7% reduction in turnaround time.",
      "Orchestrated 9-month flight schedules, leveraging Azure data to enhance operational efficiency by 15%.",
    ],
  },
  {
    role: "Data Analyst",
    company: "Astral Aviation Ltd",
    companyUrl: "https://astral-aviation.com/",
    location: "Nairobi, Kenya",
    start: "Sep 2021",
    end: "Oct 2023",
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
  {
    name: "Google Data Analytics Professional Certificate",
    provider: "Google via Coursera",
    url: "https://www.coursera.org/account/accomplishments/verify/DSHCLUW3C7Z6",
  },
  { name: "Microsoft Excel Data Analysis", provider: "Microsoft" },
  { name: "Tableau Desktop Specialist", provider: "Tableau" },
  { name: "Microsoft Fabric", provider: "DataCamp" },
  { name: "Azure Data Fundamentals", provider: "Microsoft" },
  { name: "Power BI Data Analyst Associate", provider: "Microsoft" },
];
