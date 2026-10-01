"use client";

import { useEffect, useSyncExternalStore } from "react";

import { AwtSymbol } from "@/components/brand/AwtSymbol";
import { SPLASH_DONE_MS, SPLASH_KEY, SPLASH_LEAVE_MS } from "@/lib/splash";

const noSubscription = () => () => {};
const browserLanguage = () => navigator.languages?.[0] ?? navigator.language ?? "";

/** Abertura: o símbolo se desenha e a saudação aparece no idioma do navegador. */
export function Splash() {
  // No servidor o idioma é desconhecido: a saudação só aparece depois da hidratação.
  const language = useSyncExternalStore(noSubscription, browserLanguage, () => "");
  const greeting = language.toLowerCase().startsWith("pt")
    ? "Bem-vindo!"
    : language
      ? "Welcome!"
      : "";

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.splash !== "play") return;

    const leave = window.setTimeout(() => {
      html.dataset.splash = "leaving";
    }, SPLASH_LEAVE_MS);
    const done = window.setTimeout(() => {
      html.dataset.splash = "done";
      sessionStorage.setItem(SPLASH_KEY, "1");
    }, SPLASH_DONE_MS);

    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, []);

  return (
    <div
      id="splash"
      aria-hidden
      className="fixed inset-0 z-[100] grid place-items-center bg-splash"
    >
      <div className="flex flex-col items-center gap-8">
        <AwtSymbol className="splash-draw w-36 md:w-48" />
        <p className="splash-greeting text-h2">{greeting}</p>
      </div>
    </div>
  );
}
