import type { ReactNode } from "react";

/** Converte `*trecho*` em ênfase laranja, mantendo o texto no dicionário. */
export function renderEmphasis(
  text: string,
  colorClass = "text-orange-500",
): ReactNode[] {
  return text.split("*").map((part, index) =>
    index % 2 === 1 ? (
      <em key={index} className={`${colorClass} not-italic`}>
        {part}
      </em>
    ) : (
      part
    ),
  );
}
