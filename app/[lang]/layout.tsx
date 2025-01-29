import { LanguageParams } from "@/types";
import type { Metadata, Viewport } from "next";
import colors from "tailwindcss/colors";

import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type RootLayoutProps = {
  children: React.ReactNode;
  params: LanguageParams;
};

export const viewport: Viewport = {
  themeColor: colors.white,
  colorScheme: "light",
};

export const metadata: Metadata = {
  manifest: "/site.webmanifest",
  category: "education",
  metadataBase: new URL("https://zoonk.org"),
};

export async function generateStaticParams(): Promise<LanguageParams[]> {
  return [{ lang: "en" }, { lang: "pt" }];
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html
      lang={params.lang}
      className="h-full scroll-smooth bg-white antialiased"
    >
      <body className="relative isolate bg-white">
        <div className="mx-auto flex flex-col gap-y-4 max-w-7xl min-h-dvh p-6 lg:p-8">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
            />
          </svg>

          <Header locale={params.lang} />
          <main className="flex-1">{children}</main>
          <Footer locale={params.lang} />
        </div>
      </body>
    </html>
  );
}
