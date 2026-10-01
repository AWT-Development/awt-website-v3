import { BriefingLink } from "@/components/briefing/BriefingLink";
import { ProcessScroller } from "@/components/motion/ProcessScroller";
import { Container } from "@/components/ui/Container";
import { processSteps } from "@/content/process";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { renderEmphasis } from "@/lib/emphasis";

type ProcessProps = { lang: Locale; dict: Dictionary["process"] };

export function Process({ lang, dict }: ProcessProps) {
  return (
    <section
      id="processo"
      data-header-theme="light"
      className="relative z-10 -mt-10 rounded-t-panel bg-paper text-ink-950"
    >
      <ProcessScroller className="flex flex-col justify-center gap-14 bg-paper py-24 lg:h-svh lg:gap-12 lg:py-16 lg:rounded-t-panel">
        <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label text-ink-950/60">{dict.label}</p>
            <h2 className="mt-6 max-w-3xl text-h2 text-balance">
              {renderEmphasis(dict.title, "text-orange-700")}
            </h2>
          </div>
          <BriefingLink className="shrink-0 self-start md:self-auto">
            {dict.cta} <span aria-hidden>→</span>
          </BriefingLink>
        </Container>

        <div data-process-wrap className="overflow-x-clip lg:overflow-x-auto">
          <ol
            data-process-track
            className="relative flex w-full flex-col gap-14 px-(--gutter) lg:w-max lg:flex-row lg:gap-0"
          >
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-[calc(var(--gutter)+0.625rem)] w-px bg-ink-950/15 lg:inset-x-0 lg:top-[0.625rem] lg:bottom-auto lg:left-0 lg:h-px lg:w-full"
            />
            <span
              aria-hidden
              data-process-line
              className="absolute top-2 bottom-2 left-[calc(var(--gutter)+0.625rem)] w-px origin-top bg-orange-700 lg:inset-x-0 lg:top-[0.625rem] lg:bottom-auto lg:left-0 lg:h-px lg:w-full lg:origin-left"
            />

            {processSteps.map((step, index) => (
              <li
                key={step.id}
                className="relative pl-12 lg:w-[26rem] lg:shrink-0 lg:pt-14 lg:pl-0 xl:w-[30rem]"
              >
                <span
                  aria-hidden
                  data-process-marker
                  className="process-marker absolute top-0 left-0 size-5 bg-ink-950/25 [clip-path:polygon(50%_0,100%_100%,0_100%)]"
                />

                <span className="font-tech text-xl text-orange-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-h2">{step.title[lang]}</h3>
                <p className="mt-4 max-w-sm text-body-lg text-ink-950/70 lg:pr-8">
                  {step.text[lang]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </ProcessScroller>
    </section>
  );
}
