export const SPLASH_KEY = "awt-splash";

/** Quando a tela de abertura começa a sair, e quando some de vez (ms). */
export const SPLASH_LEAVE_MS = 2000;
export const SPLASH_DONE_MS = 2600;

/**
 * Roda no `<head>`, antes da primeira pintura: decide se a abertura aparece
 * (1ª visita da sessão, sem "reduzir movimento"). Sem JavaScript, ela nunca aparece.
 * Também marca o HTML com `js`, que liga as animações de revelação.
 */
export const splashScript = `var d=document.documentElement;d.classList.add("js");try{d.dataset.splash=sessionStorage.getItem("${SPLASH_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches?"done":"play"}catch(e){d.dataset.splash="done"}`;
