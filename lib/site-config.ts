export const SITE_NAME = "Felix Ogutu Odhiambo";
export const SITE_URL = "https://www.felixodhiambo.com";

export const PERSON = {
  name: "Felix Ogutu Odhiambo",
  role: "Aviation Analytics Professional",
  location: "Nairobi, Kenya",
  yearsExperience: 5,
  positioning:
    "Aviation analytics professional turning network, operations, and commercial data into decisions that improve performance.",
  supportingCopy:
    "Five-plus years across network planning, commercial analytics, and safety performance in East African aviation, building the dashboards, models, and reports that operators use to run the airline.",
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/FelixOgutuOdhiambo",
  linkedin: "https://www.linkedin.com/in/felixogutu889",
  whatsapp: "https://wa.me/254799311741",
} as const;

// TODO(felix): replace with a hosted PDF (e.g. Supabase Storage) once supplied.
export const CV_DOWNLOAD_URL =
  "https://drive.google.com/file/d/1C7_LRqyqUEDrk_Ov7Pc2BxKpEjXqfEQk/view";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/data-lab", label: "Data Lab" },
  { href: "/services", label: "Services" },
  { href: "/research", label: "Research" },
  { href: "/insights", label: "Insights" },
  { href: "/cv", label: "CV" },
] as const;
