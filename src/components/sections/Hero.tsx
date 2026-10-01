import { AwtSymbol } from "@/components/brand/AwtSymbol";
import { BlueprintGrid } from "@/components/brand/BlueprintGrid";
import { TypedText } from "@/components/motion/TypedText";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/i18n/dictionaries/pt";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-end overflow-hidden pt-32 pb-16"
    >
      <BlueprintGrid />
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div
          className="aura left-[68%] top-[34%] size-[58vw] bg-violet-700/30 blur-[150px] [--orbit-duration:26s] [--orbit-radius:12vw]"
        />
        <div
          className="aura left-[28%] top-[72%] size-[38vw] bg-orange-500/10 blur-[130px] [--orbit-duration:34s] [--orbit-radius:9vw] [animation-direction:reverse]"
        />
      </div>

      <Container className="relative grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="text-display-xl text-balance">
            <TypedText text={dict.title} />
          </h1>

          <p className="mt-8 max-w-xl text-body-lg text-muted">
            {dict.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="#contato">{dict.primaryCta}</ButtonLink>
            <ButtonLink href="#projetos" variant="outline">
              {dict.secondaryCta} <span aria-hidden>→</span>
            </ButtonLink>
          </div>
        </div>

        <div className="order-first lg:order-none lg:col-span-4">
          <div
            aria-hidden
            className="symbol-draw relative ml-auto w-44 lg:w-full lg:max-w-md"
          >
            <AwtSymbol
              tone="violet"
              style={{ "--draw-delay": "0.4s" } as React.CSSProperties}
              className="absolute inset-0 size-full translate-x-[4%] translate-y-[5%] opacity-60"
            />
            <AwtSymbol className="relative w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
