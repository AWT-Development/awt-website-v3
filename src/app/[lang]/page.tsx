import { notFound } from "next/navigation";

import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import { Differentials } from "@/components/sections/Differentials";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";
import { site } from "@/content/site";
import { hasLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: dict.meta.description,
    url: `${site.url}${localePath(lang)}`,
    image: `${site.url}/${lang}/opengraph-image`,
    email: site.email,
    telephone: site.phone,
    sameAs: [site.instagram.href],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Goiânia",
      addressRegion: "GO",
      addressCountry: "BR",
    },
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero dict={dict.hero} />
      <Manifesto dict={dict.manifesto} />
      <Services lang={lang} dict={dict.services} />
      <Clients dict={dict.clients} />
      <Projects lang={lang} dict={dict.projects} />
      <Process lang={lang} dict={dict.process} />
      <Differentials lang={lang} dict={dict.differentials} />
      <Technologies dict={dict.technologies} />
      <Faq lang={lang} dict={dict.faq} />
      <Contact lang={lang} dict={dict.contact} />
    </main>
  );
}
