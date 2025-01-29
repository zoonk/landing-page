import Card from "@/components/Card";
import Hero from "@/components/Hero";
import { getDictionary } from "@/dictionaries";
import type { LanguageParams } from "@/types";
import { IconDiscount2, IconInfinity } from "@tabler/icons-react";
import type { Metadata } from "next";

const WAILIST_FORM_URL = {
  en: "https://forms.gle/jHeTqPUkw1vA7wLh8",
  pt: "https://forms.gle/ZrYYBA2sjKfQR3Es8",
};

interface HomeProps {
  params: LanguageParams;
}

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const t = await getDictionary(params.lang);

  return {
    title: t.home.metadata.title,
    description: t.home.metadata.description,
    alternates: {
      canonical: "/en",
      languages: { en: "/en", pt: "/pt" },
    },
  };
}

export default async function Home({ params }: HomeProps) {
  const t = await getDictionary(params.lang);

  return (
    <article className="flex flex-col items-center justify-center">
      <Hero locale={params.lang} />

      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Card
          title={t.home.waitlist.title}
          description={t.home.waitlist.description}
          icon={<IconDiscount2 />}
          action={{
            href: WAILIST_FORM_URL[params.lang],
            label: t.home.waitlist.action,
          }}
        />

        <Card
          title={t.home.sponsor.title}
          description={t.home.sponsor.description}
          icon={<IconInfinity />}
          action={{
            href: "https://github.com/sponsors/ceolinwill?frequency=one-time",
            label: t.home.sponsor.action,
          }}
        />
      </section>
    </article>
  );
}
