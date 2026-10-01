/** Só chamar no cliente (dentro de efeitos). */
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
