"use client";

import { useEffect, useState } from "react";

import { site } from "@/content/site";
import { htmlLang, type Locale } from "@/i18n/config";

export function LocalTime({ lang }: { lang: Locale }) {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const format = new Intl.DateTimeFormat(htmlLang[lang], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: site.timeZone,
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, [lang]);

  // Reserva a largura para o horário não deslocar o texto ao aparecer.
  return <span className="inline-block min-w-[3ch]">{time ?? " "}</span>;
}
