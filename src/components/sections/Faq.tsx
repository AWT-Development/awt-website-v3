import { BriefingLink } from "@/components/briefing/BriefingLink";
import { Container } from "@/components/ui/Container";
import { FaqList } from "@/components/sections/FaqList";
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
          <p data-reveal className="label text-ink-950/60">{dict.label}</p>
          <h2 data-reveal className="mt-6 text-h2 text-balance">
            {renderEmphasis(dict.title, "text-orange-700")}
          </h2>

          <div data-reveal className="mt-10 flex flex-col items-start gap-4">
            <p className="text-ink-950/70">{dict.ctaTitle}</p>
            <BriefingLink>
              {dict.cta} <span aria-hidden>→</span>
            </BriefingLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <FaqList
            items={faqItems.map((item) => ({
              id: item.id,
              question: item.question[lang],
              answer: item.answer[lang],
            }))}
          />
        </div>
      </Container>
    </section>
  );
}
