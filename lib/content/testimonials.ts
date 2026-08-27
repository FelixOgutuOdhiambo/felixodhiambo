export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  companyUrl: string;
  avatar: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Felix demonstrates strong analytical capabilities, consistently extracting valuable insights from complex datasets and presenting findings clearly. His meticulous approach and keen attention to detail enable him to identify patterns and trends that effectively guide business decisions.",
    name: "Dharmendra Vara",
    title: "Head of Procurement",
    company: "Astral Aviation Ltd",
    companyUrl: "https://astral-aviation.com/",
    avatar: "/images/people/dharmendra-vara.png",
  },
  {
    quote:
      "Felix is a Data Analyst who consistently meets deadlines and delivers quality analytical work. With expertise in statistical analysis and data visualization, he transforms datasets into actionable insights for business decisions.",
    name: "Charles Simiyu",
    title: "Commercial Director",
    company: "SAFE AIR COMPANY",
    companyUrl: "https://www.safeair.co.ke/",
    avatar: "/images/people/charles-simiyu.png",
  },
];
