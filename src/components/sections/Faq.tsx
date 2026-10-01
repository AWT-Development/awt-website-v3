import { BriefingLink } from "@/components/briefing/BriefingLink";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { faqItems } from "@/content/faq";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { renderEmphasis } from "@/lib/emphasis";

type FaqProps = { lang: Locale; dict: Dictionary["faq"] };

export function Faq({ lang, dict }: FaqProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question[lang],
      acceptedAnswer: { "@type": "Answer", text: item.answer[lang] },
    })),
  };

  return (
    <section
      id="faq"
      data-header-theme="light"
      className="relative z-10 -mt-10 rounded-t-panel bg-paper py-24 text-ink-950 md:py-36"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <p className="label text-ink-950/60">{dict.label}</p>
          <h2 className="mt-6 text-h2 text-balance">
            {renderEmphasis(dict.title, "text-orange-700")}
          </h2>

          <div className="mt-10 flex flex-col items-start gap-4">
            <p className="text-ink-950/70">{dict.ctaTitle}</p>
            <BriefingLink>
              {dict.cta} <span aria-hidden>→</span>
            </BriefingLink>
          </div>
        </div>

        <Reveal as="div" className="lg:col-span-7" stagger={0.06}>
          {faqItems.map((item) => (
            <details
              key={item.id}
              name="faq"
              className="faq-item border-t border-line-ink last:border-b"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-h3">
                {item.question[lang]}
                <span
                  aria-hidden
                  className="faq-icon grid size-10 shrink-0 place-items-center rounded-full border border-line-ink text-xl"
                >
                  +
                </span>
              </summary>
              <p className="max-w-xl pb-8 text-body-lg text-ink-950/70">
                {item.answer[lang]}
              </p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
