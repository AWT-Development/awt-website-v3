import type { ComponentProps } from "react";

type AwtSymbolProps = ComponentProps<"svg"> & {
  tone?: "brand" | "violet";
};

/** Símbolo oficial (`src/assets/brand/logo-symbol.svg`); `pathLength={1}` permite desenhar o traço. */
export function AwtSymbol({
  tone = "brand",
  className = "",
  ...props
}: AwtSymbolProps) {
  return (
    <svg
      viewBox="0 0 368 278"
      fill="none"
      className={className}
      {...props}
    >
      <path
        data-symbol-path
        pathLength={1}
        d="M107.608 149.65L52.0125 238.527H164.127L36.4089 37.687C150.833 116.12 214.985 160.094 329.409 238.527L187.821 21.5275L138.157 107.432"
        strokeWidth={21}
        strokeMiterlimit={16}
        className={tone === "brand" ? "stroke-logo" : "stroke-violet-400"}
      />
    </svg>
  );
}
