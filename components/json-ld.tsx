import { PERSON, SITE_URL, SOCIAL_LINKS } from "@/lib/site-config";

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    jobTitle: PERSON.role,
    description: PERSON.positioning,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "Kenya",
    },
    knowsAbout: [
      "Aviation Analytics",
      "Data Analysis",
      "Network Analytics",
      "Safety Management Systems",
      "Sustainability & Emissions Analytics",
      "Tableau",
      "Power BI",
      "R Programming",
    ],
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
