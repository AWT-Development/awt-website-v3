"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import { AwtLogo } from "@/components/brand/AwtLogo";
import { BriefingLink } from "@/components/briefing/BriefingLink";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { LOCALE_COOKIE, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { lenisRef } from "@/lib/lenis";
import { navLinks } from "@/lib/nav";

type HeaderProps = { lang: Locale; dict: Dictionary };

const CLOSED = "polygon(100% 0, 100% 0, 100% 0)";
// Triângulo que cobre a tela, crescendo a partir do canto superior direito.
const OPEN = "polygon(100% 0, -110% 0, 100% 210%)";

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenisRef.current) lenisRef.current.scrollTo(target);
  else target.scrollIntoView({ behavior: "smooth" });
}

export function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const home = localePath(lang);
  const onHome = pathname === home;
  const sectionHref = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);

  // A seção sob o header define o link ativo e o tom do glass.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      const section = document
        .elementsFromPoint(window.innerWidth / 2, 48)
        .find((element): element is HTMLElement => element.tagName === "SECTION");

      setOnLight(section?.dataset.headerTheme === "light");
      setActive(
        section && navLinks.some((link) => link.id === section.id)
          ? section.id
          : null,
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Menu aberto: trava o scroll, fecha com ESC e prende o foco.
  useEffect(() => {
    if (!open) return;

    lenisRef.current?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !overlayRef.current) return;

      const focusable = [
        buttonRef.current,
        ...overlayRef.current.querySelectorAll<HTMLElement>("a, button"),
      ].filter((element): element is HTMLElement => Boolean(element));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const media = window.matchMedia("(min-width: 1280px)");
    const onMedia = () => media.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    media.addEventListener("change", onMedia);
    return () => {
      lenisRef.current?.start();
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onMedia);
    };
  }, [open]);

  // Fecha o menu e rola até a seção. Fora da home, a navegação normal leva até ela.
  const goTo = (id: string) => (event: MouseEvent) => {
    setOpen(false);
    if (!onHome) return;
    event.preventDefault();
    // Espera o scroll ser liberado pelo fechamento do menu.
    window.setTimeout(() => scrollToSection(id), 60);
  };

  const otherLocale: Locale = lang === "pt" ? "en" : "pt";
  const pagePath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const localeHref = `${localePath(otherLocale, pagePath)}${onHome && active ? `#${active}` : ""}`;
  const rememberLocale = () => {
    document.cookie = `${LOCALE_COOKIE}=${otherLocale}; path=/; max-age=31536000; samesite=lax`;
  };

  // Com o menu aberto o fundo é escuro, qualquer que seja a seção por baixo.
  const light = onLight && !open;
  const tone = light ? "text-ink-950" : "text-paper";
  const surface =
    open || !scrolled
      ? "border-transparent bg-transparent"
      : light
        ? "border-ink-950/10 bg-paper/65 backdrop-blur-xl backdrop-saturate-150"
        : "border-white/10 bg-ink-950/60 backdrop-blur-xl backdrop-saturate-150";

  const localeLink = (className: string) => (
    <Link
      href={localeHref}
      hrefLang={otherLocale}
      onClick={rememberLocale}
      className={className}
    >
      {dict.nav.switchLocale}
    </Link>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,color] duration-500 ease-out-expo ${tone} ${surface}`}
      >
        <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
          <Link
            href={onHome ? "#inicio" : home}
            aria-label={site.name}
            onClick={goTo("inicio")}
            className="shrink-0"
          >
            <AwtLogo className="h-7 w-auto md:h-8" />
          </Link>

          <nav
            aria-label="Principal"
            className="label hidden items-center gap-7 xl:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={sectionHref(link.id)}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative py-2 transition-opacity duration-(--dur-short) hover:opacity-100 ${
                  active === link.id ? "opacity-100" : "opacity-60"
                }`}
              >
                {dict.nav[link.key]}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full transition-[opacity,transform] duration-(--dur-short) ease-spring ${
                    light ? "bg-orange-700" : "bg-orange-500"
                  } ${active === link.id ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            {localeLink(
              "label hidden opacity-60 transition-opacity hover:opacity-100 sm:inline",
            )}

            {/* Invólucro: `hidden` no próprio botão perderia para o `inline-flex` dele. */}
            <div className="hidden md:block">
              <BriefingLink size="sm">{dict.nav.cta}</BriefingLink>
            </div>

            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
              onClick={() => setOpen((value) => !value)}
              className="relative -mr-2 grid size-11 place-items-center xl:hidden"
            >
              <span
                aria-hidden
                className={`absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-500 ease-out-expo ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                aria-hidden
                className={`absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-500 ease-out-expo ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </Container>
      </header>

      <div
        id="mobile-menu"
        ref={overlayRef}
        inert={!open}
        aria-hidden={!open}
        data-lenis-prevent
        style={{ clipPath: open ? OPEN : CLOSED }}
        className="fixed inset-0 z-40 flex flex-col justify-between gap-10 overflow-y-auto bg-ink-950 px-(--gutter) pt-28 pb-10 text-paper transition-[clip-path] duration-700 ease-in-out-quart"
      >
        <nav aria-label="Principal">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <li
                key={link.id}
                style={{ transitionDelay: open ? `${180 + index * 55}ms` : "0ms" }}
                className={`transition-[opacity,transform] duration-700 ease-out-expo ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <Link
                  href={sectionHref(link.id)}
                  onClick={goTo(link.id)}
                  className={`text-h2 block py-1.5 transition-colors ${
                    active === link.id ? "text-orange-500" : "hover:text-orange-500"
                  }`}
                >
                  {dict.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          style={{ transitionDelay: open ? "600ms" : "0ms" }}
          className={`flex flex-col items-start gap-6 transition-[opacity,transform] duration-700 ease-out-expo ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Link
            href={sectionHref("contato")}
            onClick={goTo("contato")}
            className={buttonClass("primary")}
          >
            {dict.nav.cta} <span aria-hidden>→</span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted">
            {localeLink("label transition-colors hover:text-paper")}
            <a
              href={`mailto:${site.email}`}
              className="text-sm transition-colors hover:text-paper"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
