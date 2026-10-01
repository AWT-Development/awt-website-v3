import { BriefingForm } from "@/components/briefing/BriefingForm";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site, whatsappHref } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { renderEmphasis } from "@/lib/emphasis";

type ContactProps = { lang: Locale; dict: Dictionary["contact"] };

export function Contact({ lang, dict }: ContactProps) {
  const channels = [
    { label: dict.channels.email, text: site.email, href: `mailto:${site.email}` },
    { label: dict.channels.phone, text: site.phone, href: whatsappHref(lang) },
    {
      label: dict.channels.instagram,
      text: site.instagram.handle,
      href: site.instagram.href,
    },
  ];

  return (
    <section
      id="contato"
      className="relative z-10 -mt-10 scroll-mt-4 rounded-t-panel bg-orange-500 py-24 text-ink-950 md:py-36"
    >
      <Container className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="contents lg:sticky lg:top-24 lg:col-span-5 lg:block">
          <div data-reveal className="order-1 min-w-0 lg:order-none">
            <p className="label text-ink-950/70">{dict.label}</p>
            <h2 className="mt-6 text-display text-balance">
              {renderEmphasis(dict.title, "text-paper")}
            </h2>
            <p className="mt-6 max-w-md text-body-lg text-ink-950/80">
              {dict.intro}
            </p>

            <div className="mt-10 flex flex-col items-start gap-4">
              <p className="text-ink-950/80">{dict.direct}</p>
              <a
                href={whatsappHref(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("dark")}
              >
                {dict.whatsapp} <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <ul data-reveal className="order-3 flex min-w-0 flex-col gap-4 border-t border-ink-950/20 pt-8 lg:order-none lg:mt-12">
            {channels.map((channel) => (
              <li key={channel.label} className="flex flex-col gap-1">
                <span className="label text-ink-950/60">{channel.label}</span>
                <a
                  href={channel.href}
                  {...(channel.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="w-fit max-w-full text-h3 [overflow-wrap:anywhere] underline-offset-4 hover:underline"
                >
                  {channel.text}
                </a>
              </li>
            ))}
            <li className="flex flex-col gap-1">
              <span className="label text-ink-950/60">
                {dict.channels.location}
              </span>
              <span className="text-h3">{site.location}</span>
            </li>
          </ul>
        </div>

        <div data-reveal className="order-2 min-w-0 lg:order-none lg:col-span-7">
          <BriefingForm lang={lang} dict={dict.form} />
        </div>
      </Container>
    </section>
  );
}
