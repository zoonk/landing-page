import Image from "next/image";

import zoonkLogo from "@/images/zoonk.svg";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandThreads,
  IconBrandX,
} from "@tabler/icons-react";
import { Locale } from "@/types";
import { getDictionary } from "@/dictionaries";
import Link from "next/link";

const socialLinks = [
  { key: "github", icon: IconBrandGithub },
  { key: "x", icon: IconBrandX },
  { key: "linkedin", icon: IconBrandLinkedin },
  { key: "instagram", icon: IconBrandInstagram },
  { key: "threads", icon: IconBrandThreads },
  { key: "facebook", icon: IconBrandFacebook },
];

interface FooterProps {
  locale: Locale;
}

export default async function Footer({ locale }: FooterProps) {
  const t = await getDictionary(locale);

  return (
    <footer className="flex flex-col items-center border-t border-slate-400/10 mt-20 py-10 sm:flex-row-reverse sm:justify-between">
      <div className="flex gap-x-6">
        {socialLinks.map(({ key, icon: Icon }) => (
          <a
            key={key}
            href={t.social[key]}
            className="text-slate-500 hover:text-slate-600 transition-colors"
          >
            <Icon size={24} />
          </a>
        ))}
      </div>

      <ul className="text-slate-500 inline-flex gap-x-2 mt-6 sm:mt-0 text-xs">
        <li className="hover:underline">
          <Link href={`/${locale}/privacy`}>{t.footer.privacy}</Link>
        </li>

        <li className="hover:underline">
          <Link href={`/${locale}/terms`}>{t.footer.terms}</Link>
        </li>
      </ul>

      <p className="flex mt-6 gap-1 text-xs text-slate-500 sm:mt-0">
        <span>{t.footer.powered_by}</span>
        <a
          href="https://zoonk.com"
          className="hover:opacity-80 transition-opacity"
        >
          <Image src={zoonkLogo} height={16} alt="Zoonk logo" unoptimized />
        </a>
      </p>
    </footer>
  );
}
