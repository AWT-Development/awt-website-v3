import Link from "next/link";

import { AwtLogo } from "@/components/brand/AwtLogo";
import { BriefingLink } from "@/components/briefing/BriefingLink";
import { BackToTop } from "@/components/layout/BackToTop";
import { LocalTime } from "@/components/layout/LocalTime";
import { Container } from "@/components/ui/Container";
import { site, whatsappHref } from "@/content/site";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { navLinks } from "@/lib/nav";

type FooterProps = { lang: Locale; dict: Dictionary };

export function Footer({ lang, dict }: FooterProps) {
  const contacts = [
    { label: site.phone, href: whatsappHref(lang), external: true },
    { label: site.email, href: `mailto:${site.email}` },
    { label: site.instagram.handle, href: site.instagram.href, external: true },
  ];

  return (
    <footer className="relative z-10 -mt-10 overflow-hidden rounded-t-panel bg-ink-950 pt-20 md:pt-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <AwtLogo className="h-9 w-auto text-paper" />
            <p className="mt-6 max-w-sm text-body-lg text-muted">
              {dict.footer.tagline}
            </p>
            <BriefingLink className="mt-8">
              {dict.nav.cta} <span aria-hidden>→</span>
            </BriefingLink>
          </div>

          <nav aria-label={dict.footer.navigation} className="lg:col-span-3">
            <p className="label text-muted">{dict.footer.navigation}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {[...navLinks, { id: "contato", key: "contact" as const }].map(
                (link) => (
                  <li key={link.id}>
                    <Link
                      href={`${localePath(lang)}#${link.id}`}
                      className="transition-colors hover:text-orange-500"
                    >
                      {link.key === "contact"
                        ? dict.footer.contact
                        : dict.nav[link.key]}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="label text-muted">{dict.footer.contact}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {contacts.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    {...(contact.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="transition-colors hover:text-orange-500"
                  >
                    {contact.label}
                  </a>
                </li>
              ))}
              <li className="text-muted">{site.location}</li>
            </ul>
          </div>
        </div>

        <AwtLogo
          tone="mono"
          aria-hidden
          role="presentation"
          className="mt-16 h-auto w-full max-w-4xl text-paper/[0.06] md:mt-24"
        />

        <div className="flex flex-col gap-4 border-t border-line py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href={localePath(lang, "/privacidade")}
              className="transition-colors hover:text-paper"
            >
              {dict.footer.privacy}
            </Link>
            <p className="label">
              Goiânia · <LocalTime lang={lang} />
            </p>
            <BackToTop>{dict.footer.backToTop}</BackToTop>
          </div>
        </div>
      </Container>
    </footer>
  );
}
