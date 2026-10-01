import type { StaticImageData } from "next/image";

export type Client = {
  name: string;
  /** Logo (de preferência de um traço só); sem ele, o nome aparece como texto. */
  logo?: StaticImageData;
};

// Só os nomes por enquanto; os logos entram depois (docs/BLUEPRINT.md, "Melhorias futuras").
export const clients: Client[] = [
  { name: "Hyperion Global" },
  { name: "Lucca" },
  { name: "Isotelhas Tapajós" },
  { name: "Azus Imobiliária" },
  { name: "Doces Finos" },
];
