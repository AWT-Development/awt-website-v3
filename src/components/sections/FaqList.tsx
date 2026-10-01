"use client";

import { useState } from "react";

type FaqListItem = { id: string; question: string; answer: string };

/** Acordeão: um item aberto por vez; a altura anima via `grid-template-rows` (0fr → 1fr). */
export function FaqList({ items }: { items: FaqListItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {items.map((item, index) => {
        const open = openId === item.id;

        return (
          <div
            key={item.id}
            data-reveal
            style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
            className="border-t border-line-ink last:border-b"
          >
            <h3>
              <button
                type="button"
                id={`faq-q-${item.id}`}
                aria-expanded={open}
                aria-controls={`faq-a-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-h3"
              >
                {item.question}
                <span
                  aria-hidden
                  className={`grid size-10 shrink-0 place-items-center rounded-full border border-line-ink text-xl transition-[transform,background-color] duration-500 ease-out-expo ${
                    open ? "rotate-45 bg-ink-950/5" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>

            <div
              id={`faq-a-${item.id}`}
              role="region"
              aria-labelledby={`faq-q-${item.id}`}
              inert={!open}
              className={`grid transition-[grid-template-rows,opacity] duration-600 ease-out-expo ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-xl pb-8 text-body-lg text-ink-950/70">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
