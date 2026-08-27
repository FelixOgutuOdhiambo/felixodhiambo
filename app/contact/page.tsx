import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/brand-icons";
import { PageHeader } from "@/components/page-header";
import { FadeIn } from "@/components/fade-in";
import { ContactForm } from "@/components/contact-form";
import { PERSON, SOCIAL_LINKS } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Felix Ogutu Odhiambo for consulting, analytics roles, research collaboration, or speaking opportunities.",
};

const CHANNELS = [
  {
    icon: WhatsappIcon,
    label: "WhatsApp",
    value: "+254 799 311 741",
    href: SOCIAL_LINKS.whatsapp,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/felixogutu889",
    href: SOCIAL_LINKS.linkedin,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/FelixOgutuOdhiambo",
    href: SOCIAL_LINKS.github,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Work with me"
        description="Open to consulting, analytics roles, research collaboration, and speaking or training opportunities."
      />

      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <FadeIn className="space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Direct
              </p>
              <ul className="mt-4 space-y-3">
                {CHANNELS.map((channel) => (
                  <li key={channel.label}>
                    <Link
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
                    >
                      <channel.icon className="size-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{channel.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {channel.value}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {PERSON.location}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
