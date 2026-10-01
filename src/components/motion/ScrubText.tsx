"use client";

import { useRef, type ElementType } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

type ScrubTextProps = {
  as?: ElementType;
  className?: string;
  /** `*trecho*` fica em laranja. */
  text: string;
};

export function ScrubText({ as: Tag = "p", className, text }: ScrubTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;

      gsap.fromTo(
        ref.current.querySelectorAll("[data-word]"),
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );

      // As fontes mudam a altura do bloco depois do primeiro layout.
      ScrollTrigger.refresh();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {text.split("*").map((part, group) =>
        part
          .split(/(\s+)/)
          .map((token, index) =>
            token.trim() === "" ? (
              token
            ) : (
              <span
                key={`${group}-${index}`}
                data-word
                className={group % 2 === 1 ? "text-orange-500" : undefined}
              >
                {token}
              </span>
            ),
          ),
      )}
    </Tag>
  );
}
