import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { PRIVACY_IS_DRAFT, privacy, privacyUpdated } from "@/content/privacy";
import { hasLocale, htmlLang, localePath } from "@/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/privacidade">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  return {
    title: privacy.title[lang],
    description: privacy.description[lang],
    alternates: { canonical: localePath(lang, "/privacidade") },
  };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacidade">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const updated = new Intl.DateTimeFormat(htmlLang[lang], {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(privacyUpdated));

  return (
    <main className="flex-1 pt-36 pb-24 md:pt-44 md:pb-36">
      <Container className="max-w-3xl">
        <h1 className="text-display text-balance">{privacy.title[lang]}</h1>
        <p className="label mt-6 text-muted">
          {privacy.updatedLabel[lang]}: {updated}
        </p>

        {PRIVACY_IS_DRAFT && (
          <p className="mt-8 border border-orange-500/40 px-5 py-4 text-orange-300">
            {privacy.draftNotice[lang]}
          </p>
        )}

        <div className="mt-14 flex flex-col gap-12">
          {privacy.sections.map((section) => (
            <section key={section.heading.en}>
              <h2 className="text-h3">{section.heading[lang]}</h2>
              <div className="mt-4 flex flex-col gap-4 text-body-lg text-muted">
                {section.body[lang].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
