"use client";

import { useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

/**
 * Linha do tempo do processo: no desktop o bloco fica fixo e o scroll move a trilha
 * para o lado; no celular a linha se desenha na vertical.
 * Espera, em `children`: `[data-process-wrap]`, `[data-process-track]`,
 * `[data-process-line]` e `[data-process-marker]` (que ganha `is-reached`).
 */
export function ProcessScroller({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const wrap = root.querySelector<HTMLElement>("[data-process-wrap]");
      const track = root.querySelector<HTMLElement>("[data-process-track]");
      const line = root.querySelector<HTMLElement>("[data-process-line]");
      const markers = gsap.utils.toArray<HTMLElement>(
        "[data-process-marker]",
        root,
      );
      if (!wrap || !track || !line) return;

      if (prefersReducedMotion()) {
        markers.forEach((marker) => marker.classList.add("is-reached"));
        return;
      }

      const mm = gsap.matchMedia();

      // `toggleClass` apagaria o marcador ao sair da tela; aqui ele só apaga
      // quando o usuário volta para antes dele.
      const lightUp = (marker: HTMLElement, vars: ScrollTrigger.Vars) =>
        ScrollTrigger.create({
          ...vars,
          trigger: marker,
          onEnter: () => marker.classList.add("is-reached"),
          onLeaveBack: () => marker.classList.remove("is-reached"),
        });

      mm.add("(min-width: 1024px)", () => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const scrollLength = () => Math.round(distance() * 1.8);
        gsap.set(wrap, { overflowX: "hidden" });

        const move = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            pin: true,
            start: "top top",
            end: () => `+=${scrollLength()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(
          line,
          { scaleX: () => window.innerWidth / track.scrollWidth },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => `+=${scrollLength()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        markers.forEach((marker) => {
          lightUp(marker, { containerAnimation: move, start: "left 80%" });
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: "top 65%",
              end: "bottom 65%",
              scrub: true,
            },
          },
        );

        markers.forEach((marker) => {
          lightUp(marker, { start: "top 65%" });
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
