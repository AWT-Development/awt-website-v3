import { ScrubText } from "@/components/motion/ScrubText";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/i18n/dictionaries/pt";

export function Manifesto({ dict }: { dict: Dictionary["manifesto"] }) {
  return (
    <section
      id="sobre"
      className="relative border-t border-line py-32 md:py-48"
    >
      <Container className="grid gap-10 lg:grid-cols-12">
        <p className="label text-muted lg:col-span-3">{dict.label}</p>

        <ScrubText
          as="p"
          text={dict.text}
          className="text-manifesto text-balance lg:col-span-9"
        />
      </Container>
    </section>
  );
}
