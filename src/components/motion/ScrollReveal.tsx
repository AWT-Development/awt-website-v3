"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { prefersReducedMotion } from "@/lib/motion-prefs";

/**
 * Revela, com um fade-up leve, todo elemento marcado com `data-reveal` quando a
 * borda superior dele passa de um pouco acima do fim da tela (estilos em globals.css).
 * Também revela o que ficou para trás num scroll rápido, o que um
 * IntersectionObserver não faz: ele só avisa quando o elemento entra na tela.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let pending = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    ];

    if (prefersReducedMotion()) {
      pending.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    let timer = 0;

    const check = () => {
      timer = 0;
      const limit = window.innerHeight * 0.92;
      pending = pending.filter((element) => {
        if (element.getBoundingClientRect().top > limit) return true;
        element.classList.add("is-visible");
        return false;
      });
    };

    const schedule = () => {
      if (!timer) timer = window.setTimeout(check, 80);
    };

    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return null;
}
