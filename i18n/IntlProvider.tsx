"use client";

import { ReactNode, useMemo } from "react";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { usePathname } from "next/navigation";
import viMessages from "@/messages/vi.json";
import enMessages from "@/messages/en.json";

type Locale = "vi" | "en";

const messagesMap: Record<Locale, AbstractIntlMessages> = {
  vi: viMessages,
  en: enMessages,
};

interface IntlProviderProps {
  children: ReactNode;
}

export function IntlProvider({ children }: IntlProviderProps) {
  const pathname = usePathname();

  const { locale, messages } = useMemo(() => {
    const isVi = pathname === "/vi" || pathname?.startsWith("/vi/");
    const resolvedLocale: Locale = isVi ? "vi" : "en";

    return {
      locale: resolvedLocale,
      messages: messagesMap[resolvedLocale],
    };
  }, [pathname]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

