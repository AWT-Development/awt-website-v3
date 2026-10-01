"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

const SHADE_OPACITY = 0.78;

type StackCardsProps = {
  className?: string;
  /**
   * Media query em que os cards ficam `sticky` (o CSS dos cards usa o mesmo
   * breakpoint). Fora dela são uma lista comum, sem animação.
   */
  media?: string;
  children: ReactNode;
};

/**
 * Cards `sticky` que se empilham: o card coberto recua e escurece. Cada card
 * precisa de `data-stack-card` e de um filho `data-stack-shade` (véu escuro,
 * `opacity-0`). Anima-se a opacidade do véu, não `filter: brightness()`, que
 * partia de preto e fazia o card piscar.
 */
export function StackCards({
  className,
  media = "(min-width: 0px)",
  children,
}: StackCardsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;

      const root = ref.current;
      const mm = gsap.matchMedia();

      mm.add(media, () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-stack-card]",
          root,
        );

        cards.slice(0, -1).forEach((card, index) => {
          const next = cards[index + 1];
          const shade = card.querySelector("[data-stack-shade]");

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: next,
              start: "top 85%",
              // O próximo card para no valor de `top` que o CSS definiu para ele.
              end: () => `top ${parseFloat(getComputedStyle(next).top)}px`,
              scrub: true,
            },
          });

          timeline.fromTo(
            card,
            { scale: 1 },
            { scale: 0.94, transformOrigin: "50% 0%" },
            0,
          );

          if (shade) {
            timeline.fromTo(shade, { opacity: 0 }, { opacity: SHADE_OPACITY }, 0);
          }
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
