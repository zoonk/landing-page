import { LanguageParams } from "@/types";
import TermsOfServiceEN from "./en";
import TermsOfServicePT from "./pt";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";

interface TermsPageProps {
  params: LanguageParams;
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const t = await getDictionary(params.lang);

  return {
    title: t.terms.metadata.title,
    description: t.terms.metadata.description,
  };
}

export default function TermsOfService({ params }: TermsPageProps) {
  if (params.lang == "en") return <TermsOfServiceEN />;
  if (params.lang == "pt") return <TermsOfServicePT />;
}
