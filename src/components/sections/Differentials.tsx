import { BriefingLink } from "@/components/briefing/BriefingLink";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { differentials } from "@/content/differentials";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { renderEmphasis } from "@/lib/emphasis";

type DifferentialsProps = { lang: Locale; dict: Dictionary["differentials"] };

export function Differentials({ lang, dict }: DifferentialsProps) {
  return (
    <section
      id="diferenciais"
      className="relative z-10 -mt-10 rounded-t-panel bg-ink-950 py-24 md:py-36"
    >
      <Container>
        <p className="label text-muted">{dict.label}</p>
        <h2 className="mt-6 max-w-3xl text-display text-balance">
          {renderEmphasis(dict.title)}
        </h2>

        <Reveal
          as="ul"
          className="mt-16 grid border-b border-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {differentials.map((item, index) => (
            <li
              key={item.id}
              className="border-t border-line p-7 transition-colors duration-(--dur-base) ease-out-expo hover:bg-ink-900 md:p-10"
            >
              <span className="font-tech text-xl text-orange-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-h3">{item.title[lang]}</h3>
              <p className="mt-4 max-w-sm text-muted">{item.text[lang]}</p>
            </li>
          ))}
        </Reveal>

        <div className="mt-16 flex justify-start md:justify-center">
          <BriefingLink>
            {dict.cta} <span aria-hidden>→</span>
          </BriefingLink>
        </div>
      </Container>
    </section>
  );
}
