/**
 * Texto "digitado" só com CSS (`.type-char` em globals.css): todas as letras já
 * existem no HTML, então não há deslocamento de layout nem dependência de JavaScript.
 * O texto completo fica num `sr-only` para leitores de tela e buscadores.
 * `*trecho*` recebe `emphasisClass`.
 */
export function TypedText({
  text,
  emphasisClass = "text-orange-500",
}: {
  text: string;
  emphasisClass?: string;
}) {
  const plain = text.replaceAll("*", "");
  const total = plain.replace(/\s/g, "").length;
  let index = 0;

  const nodes = text.split("*").flatMap((part, group) =>
    part.split(/(\s+)/).map((token, position) => {
      if (token === "" || /^\s+$/.test(token)) return token && " ";

      const chars = [...token].map((char) => {
        const i = index++;
        return (
          <span
            key={i}
            className={i === total - 1 ? "type-char type-last" : "type-char"}
            style={{ "--i": i } as React.CSSProperties}
          >
            {char}
          </span>
        );
      });

      return (
        <span
          key={`${group}-${position}`}
          className={`inline-block whitespace-nowrap ${group % 2 === 1 ? emphasisClass : ""}`}
        >
          {chars}
        </span>
      );
    }),
  );

  return (
    <>
      <span className="sr-only">{plain}</span>
      <span aria-hidden>{nodes}</span>
    </>
  );
}
