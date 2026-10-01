"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { SPLASH_LEAVE_MS } from "@/lib/splash";

type SplitRevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Revela o texto linha a linha, subindo por trás de uma máscara. Espera a abertura sair. */
export function SplitReveal({
  as: Tag = "div",
  className,
  children,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;

      const delay =
        document.documentElement.dataset.splash === "play"
          ? SPLASH_LEAVE_MS / 1000
          : 0;

      // `autoSplit` refaz a quebra ao carregar as fontes; devolver a animação preserva o progresso.
      SplitText.create(ref.current, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1,
            ease: "expo.out",
            stagger: 0.08,
            delay,
          }),
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
