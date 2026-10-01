"use client";

import type { ReactNode } from "react";

import { lenisRef } from "@/lib/lenis";

export function BackToTop({ children }: { children: ReactNode }) {
  const goTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      className="label inline-flex items-center gap-2 text-muted transition-colors hover:text-paper"
    >
      {children} <span aria-hidden>↑</span>
    </button>
  );
}
