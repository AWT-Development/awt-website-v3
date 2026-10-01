import Image from "next/image";

import { StackCards } from "@/components/motion/StackCards";
import { Container } from "@/components/ui/Container";
import { categoryLabels, sortedProjects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { renderEmphasis } from "@/lib/emphasis";

type ProjectsProps = { lang: Locale; dict: Dictionary["projects"] };

export function Projects({ lang, dict }: ProjectsProps) {
  return (
    <section
      id="projetos"
      className="relative z-10 -mt-10 rounded-t-panel bg-ink-900 py-24 md:py-36"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="label text-muted">{dict.label}</p>
          <h2 className="mt-6 text-display text-balance">
            {renderEmphasis(dict.title)}
          </h2>
        </div>

        <StackCards
          media="(min-width: 1024px)"
          className="mt-16 flex flex-col gap-6 md:mt-24"
        >
          {sortedProjects.map((project, index) => (
            <article
              key={project.slug}
              data-stack-card
              style={{ top: `calc(5.5rem + ${index} * 0.75rem)` }}
              className="group relative grid gap-8 overflow-hidden lg:sticky rounded-[2rem] bg-ink-800 p-6 md:p-10 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-12 lg:items-center lg:gap-12"
            >
              <span
                data-stack-shade
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 bg-ink-950 opacity-0"
              />

              <div
                aria-hidden
                style={{ backgroundColor: project.accentColor }}
                className="pointer-events-none absolute -right-16 top-1/2 size-64 -translate-y-1/2 rounded-full opacity-20 blur-[100px] md:-right-24 md:size-[32rem] md:blur-[120px]"
              />

              <div className="relative flex flex-col gap-6 lg:col-span-5">
                <span className="font-tech text-xl text-orange-500">
                  {String(index + 1).padStart(2, "0")}
                  <span className="text-muted">
                    {" "}
                    / {String(sortedProjects.length).padStart(2, "0")}
                  </span>
                </span>

                <h3 className="text-display text-balance">{project.name}</h3>

                <p className="max-w-md text-body-lg text-muted">
                  {project.summary[lang]}
                </p>

                <ul className="flex flex-wrap gap-2">
                  <li className="rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink-950">
                    {categoryLabels[project.category][lang]}
                  </li>
                  {project.services[lang].map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-4 py-2 text-sm text-paper/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {project.note && !project.liveUrl && (
                  <p className="label text-muted">{project.note[lang]}</p>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex w-fit items-center gap-2 text-paper transition-colors hover:text-orange-500"
                  >
                    {dict.visit} <span aria-hidden>↗</span>
                  </a>
                )}
              </div>

              {/* Sem zoom no hover: as capas têm conteúdo até a borda e o zoom as cortava. */}
              <div className="relative overflow-hidden transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 lg:col-span-7">
                <Image
                  src={project.cover}
                  alt={`${project.name}: ${categoryLabels[project.category][lang]}`}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="block h-auto w-full"
                />
              </div>
            </article>
          ))}
        </StackCards>

        <a
          href="#contato"
          className="group mt-16 inline-flex items-center gap-3 text-h3 transition-colors hover:text-orange-500"
        >
          {dict.cta}
          <span
            aria-hidden
            className="transition-transform duration-300 ease-out-expo group-hover:translate-x-2"
          >
            →
          </span>
        </a>
      </Container>
    </section>
  );
}
