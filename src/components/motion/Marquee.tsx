"use client";

import { useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

type MarqueeProps = {
  className?: string;
  /** Segundos para percorrer uma cópia. */
  duration?: number;
  /** 1 anda para a esquerda; -1 para a direita. */
  direction?: 1 | -1;
  children: ReactNode;
};

/** Faixa infinita que acelera com o scroll. O conteúdo é duplicado para o loop; a cópia é decorativa. */
export function Marquee({
  className = "",
  duration = 40,
  direction = 1,
  children,
}: MarqueeProps) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el || prefersReducedMotion()) return;

      const loop = gsap.fromTo(
        el,
        { xPercent: direction === 1 ? 0 : -50 },
        {
          xPercent: direction === 1 ? -50 : 0,
          duration,
          ease: "none",
          repeat: -1,
        },
      );

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 8);
          gsap
            .timeline({ overwrite: true })
            .to(loop, { timeScale: boost, duration: 0.3 })
            .to(loop, { timeScale: 1, duration: 1.2 });
        },
      });
    },
    { scope: track },
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="marquee-track flex w-max">
        <div className="marquee-copy flex shrink-0">{children}</div>
        <div aria-hidden className="marquee-copy flex shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}
