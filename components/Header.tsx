import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.svg";
import icon from "@/images/icon.svg";
import type { Locale } from "@/types";

interface HeaderProps {
  locale: Locale;
}

export default async function Header({ locale }: HeaderProps) {
  return (
    <header className="flex justify-between gap-4">
      <Link href={`/${locale}`} aria-label="Home">
        <Image
          src={logo}
          alt="Logo"
          priority
          height={40}
          unoptimized
          className="hidden sm:block"
        />

        <Image
          src={icon}
          height={40}
          alt="Logo"
          priority
          unoptimized
          className="sm:hidden"
        />
      </Link>
    </header>
  );
}
