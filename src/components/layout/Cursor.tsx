"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, summary, [role='button']";

/** Troca o cursor do mouse por um pequeno triângulo laranja (só em telas com mouse). */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const html = document.documentElement;
    html.classList.add("custom-cursor");

    const move = (event: PointerEvent) => {
      const scale =
        event.target instanceof Element && event.target.closest(INTERACTIVE)
          ? 1.5
          : 1;
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) scale(${scale})`;
      el.style.opacity = "1";
    };
    const hide = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    return () => {
      html.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[200] opacity-0 transition-opacity duration-200"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" className="block origin-top-left">
        <polygon
          points="1,1 16,6 6,16"
          className="fill-orange-500 stroke-ink-950"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
