import Image from "next/image";

import { Marquee } from "@/components/motion/Marquee";
import { Container } from "@/components/ui/Container";
import { clients } from "@/content/clients";
import type { Dictionary } from "@/i18n/dictionaries/pt";

const SECONDS_PER_ITEM = 5;
const MIN_ITEMS = 8;

export function Clients({ dict }: { dict: Dictionary["clients"] }) {
  // Com poucos clientes, repete a lista até a faixa cobrir telas largas.
  const repeats = Math.max(1, Math.ceil(MIN_ITEMS / clients.length));
  const items = Array.from({ length: repeats }, () => clients).flat();

  return (
    <section
      id="clientes"
      data-header-theme="light"
      className="relative border-t border-line-ink bg-paper pt-14 pb-24 text-ink-950 md:pt-20 md:pb-28"
    >
      <Container>
        <p className="label text-ink-950/60">{dict.label}</p>
      </Container>

      <Marquee
        duration={items.length * SECONDS_PER_ITEM}
        className="mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        {items.map((client, index) => (
          <span
            key={index}
            className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16"
          >
            {client.logo ? (
              <Image
                src={client.logo}
                alt={client.name}
                className="h-9 w-auto opacity-60 brightness-0 transition-opacity duration-(--dur-short) hover:opacity-100 md:h-11"
              />
            ) : (
              <span className="text-h2 whitespace-nowrap text-ink-950/55 transition-colors duration-(--dur-short) hover:text-ink-950">
                {client.name}
              </span>
            )}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-4 shrink-0 fill-orange-700/70"
            >
              <polygon points="12,2 22,21 2,21" />
            </svg>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
