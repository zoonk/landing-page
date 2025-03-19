import { LanguageParams } from "@/types";
import PrivacyPolicyEN from "./en";
import PrivacyPolicyPT from "./pt";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";

interface PrivacyPageProps {
  params: LanguageParams;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const t = await getDictionary(params.lang);

  return {
    title: t.privacy.metadata.title,
    description: t.privacy.metadata.description,
  };
}

export default function PrivacyPolicy({ params }: PrivacyPageProps) {
  if (params.lang == "en") return <PrivacyPolicyEN />;
  if (params.lang == "pt") return <PrivacyPolicyPT />;
}
