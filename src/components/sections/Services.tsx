import { TriArt } from "@/components/brand/TriArt";
import { StackCards } from "@/components/motion/StackCards";
import { BriefingLink } from "@/components/briefing/BriefingLink";
import { Container } from "@/components/ui/Container";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { renderEmphasis } from "@/lib/emphasis";

type ServicesProps = { lang: Locale; dict: Dictionary["services"] };

export function Services({ lang, dict }: ServicesProps) {
  return (
    <section
      id="servicos"
      data-header-theme="light"
      className="relative rounded-t-panel bg-paper py-24 text-ink-950 md:py-36"
    >
      <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-4">
          <p className="label text-ink-950/60">{dict.label}</p>
          <h2 className="mt-6 text-h2 text-balance">
            {renderEmphasis(dict.title, "text-orange-700")}
          </h2>
          <p className="mt-6 max-w-sm text-body-lg text-ink-950/70">
            {dict.intro}
          </p>
        </div>

        <StackCards className="flex flex-col gap-6 lg:col-span-8">
          {services.map((service, index) => (
            <article
              key={service.slug}
              data-stack-card
              style={{ top: `calc(6rem + ${index} * 1.25rem)` }}
              className="group sticky flex min-h-[27rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-ink-900 p-7 text-paper md:min-h-[30rem] md:p-10"
            >
              <span
                data-stack-shade
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 bg-ink-950 opacity-0"
              />
              <TriArt
                variant={index}
                className="absolute top-5 right-5 w-16 opacity-80 transition-transform duration-700 ease-out-expo group-hover:rotate-6 group-hover:scale-110 md:top-6 md:right-8 md:w-60 md:opacity-90"
              />

              <div className="relative">
                <span className="font-tech text-xl text-orange-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 max-w-[14ch] text-h2 text-balance">
                  {service.title[lang]}
                </h3>
                <p className="mt-5 max-w-md text-muted">
                  {service.description[lang]}
                </p>
              </div>

              <div className="relative mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <ul className="flex flex-wrap gap-2">
                  {service.deliverables[lang].map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-4 py-2 text-sm text-paper/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <BriefingLink
                  service={service.slug}
                  className="shrink-0 self-start"
                >
                  {dict.cta} <span aria-hidden>↗</span>
                </BriefingLink>
              </div>
            </article>
          ))}
        </StackCards>
      </Container>
    </section>
  );
}
