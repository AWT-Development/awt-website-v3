import type { ComponentProps } from "react";

type AwtLogoProps = ComponentProps<"svg"> & {
  /** `mono` pinta o símbolo com a cor do texto (para marcas d'água). */
  tone?: "brand" | "mono";
};

/** Logo completa (símbolo + "WT"), de `src/assets/brand/logo-full.svg`. As letras seguem `currentColor`. */
export function AwtLogo({
  tone = "brand",
  className = "",
  ...props
}: AwtLogoProps) {
  return (
    <svg
      viewBox="0 0 894 278"
      fill="none"
      role="img"
      aria-label="AWT Development"
      className={className}
      {...props}
    >
      <path
        d="M107.608 149.65L52.0125 238.527H164.127L36.4089 37.687C150.833 116.12 214.985 160.094 329.409 238.527L187.821 21.5275L138.157 107.432"
        strokeWidth={21}
        strokeMiterlimit={16}
        className={tone === "brand" ? "stroke-logo" : "stroke-current"}
      />
      <path
        d="M690.937 7.03333H893.298V43.4654H813.219V259.533H770.655V43.4654H690.937V7.03333Z"
        fill="currentColor"
      />
      <path
        d="M305.162 7.03333H350.973L418.787 232.84H407.965L475.78 7.03333H517.622L585.797 232.84H574.976L642.429 7.03333H686.437L600.947 259.533H556.94L490.569 41.3012L501.39 41.6619L433.937 259.533H390.29L305.162 7.03333Z"
        fill="currentColor"
      />
    </svg>
  );
}
