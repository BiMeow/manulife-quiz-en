"use client";

import { ReactNode, ComponentType } from "react";
import { MainProvider } from "@/contexts/MainContext";
import { StorageProvider } from "@/contexts/StorageContext";
import { IntlProvider } from "@/i18n/IntlProvider";

interface ProviderProps {
  children: ReactNode;
}

type ProviderComponent = ComponentType<ProviderProps>;

const providers: ProviderComponent[] = [IntlProvider, MainProvider, StorageProvider];

export function ComposeProviders({ children }: ProviderProps) {
  return providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, <>{children}</>);
}
