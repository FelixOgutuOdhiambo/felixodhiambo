import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/brand-icons";
import { NAV_LINKS, PERSON, SOCIAL_LINKS } from "@/lib/site-config";

const FOOTER_LINKS: { href: string; label: string }[] = [
  ...NAV_LINKS,
  { href: "/contact", label: "Contact" },
];

const SOCIALS = [
  { icon: LinkedinIcon, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { icon: GithubIcon, label: "GitHub", href: SOCIAL_LINKS.github },
  { icon: WhatsappIcon, label: "WhatsApp", href: SOCIAL_LINKS.whatsapp },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-oat/10 bg-espresso text-oat">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-medium tracking-tight">
              Felix Odhiambo<span className="text-primary">.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-oat/60 text-pretty">
              {PERSON.positioning}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-xs font-medium uppercase tracking-wider text-oat/40">
              Site
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-oat/70 transition-colors hover:text-oat"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-oat/40">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-oat/70 transition-colors hover:text-oat"
                  >
                    <social.icon className="size-3.5" />
                    {social.label}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-oat/50">{PERSON.location}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-oat/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-oat/40">
            © {year} {PERSON.name}. All rights reserved.
          </p>
          <Link
            href="/contact"
            className="text-xs font-medium text-primary hover:underline"
          >
            Work with me →
          </Link>
        </div>
      </div>
    </footer>
  );
}
