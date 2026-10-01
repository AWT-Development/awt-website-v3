import { Marquee } from "@/components/motion/Marquee";
import { Container } from "@/components/ui/Container";
import { technologyRows } from "@/content/technologies";
import type { Dictionary } from "@/i18n/dictionaries/pt";

const SECONDS_PER_NAME = 4.5;

function Names({
  items,
  outline,
}: {
  items: readonly string[];
  outline: boolean;
}) {
  return (
    <>
      {[...items, ...items].map((name, index) => (
        <span key={index} className="flex shrink-0 items-center gap-8 pr-8">
          <span
            className={`text-display whitespace-nowrap ${
              outline
                ? "text-transparent [-webkit-text-stroke:1.5px_rgb(242_240_235/0.45)]"
                : "text-paper"
            }`}
          >
            {name}
          </span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="size-6 shrink-0 fill-orange-500"
          >
            <polygon points="12,2 22,21 2,21" />
          </svg>
        </span>
      ))}
    </>
  );
}

export function Technologies({ dict }: { dict: Dictionary["technologies"] }) {
  return (
    <section
      id="tecnologias"
      className="relative overflow-hidden border-t border-line bg-ink-950 py-24 md:py-32"
    >
      <Container>
        <p className="label text-muted">{dict.label}</p>
        <h2 className="mt-6 max-w-3xl text-h2 text-balance">{dict.title}</h2>
        <p className="mt-6 max-w-xl text-body-lg text-muted">{dict.text}</p>
      </Container>

      <div className="mt-16 flex flex-col gap-4">
        {technologyRows.map((items, index) => (
          <Marquee
            key={index}
            duration={items.length * 2 * SECONDS_PER_NAME}
            direction={index % 2 === 0 ? 1 : -1}
          >
            <Names items={items} outline={index % 2 === 1} />
          </Marquee>
        ))}
      </div>
    </section>
  );
}
