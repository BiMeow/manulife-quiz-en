"use client";

import { createContext, ReactNode, useContext, useState, useCallback } from "react";

interface MainContextType {
  initAnimation: () => void;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

interface MainProviderProps {
  children: ReactNode;
}

export function MainProvider({ children }: MainProviderProps) {
  const initAnimation = useCallback(() => {
    console.log("initAnimation");
  }, []);

  const value: MainContextType = {
    initAnimation,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

export function useMain(): MainContextType {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMain must be used within a MainProvider");
  }
  return context;
}
