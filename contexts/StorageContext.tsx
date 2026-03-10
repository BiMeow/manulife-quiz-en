"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface StorageContextType {
  quizStep: number;
  setQuizStep: (quizStep: number) => void;
  isPopupRulesOpen: boolean;
  setIsPopupRulesOpen: (isPopupRulesOpen: boolean) => void;
  isPopupQuizOpen: boolean;
  setIsPopupQuizOpen: (isPopupQuizOpen: boolean) => void;
  isPopupQuizCompleteOpen: boolean;
  setIsPopupQuizCompleteOpen: (isPopupQuizCompleteOpen: boolean) => void;
  yob: string;
  setYob: (yob: string) => void;
  activeStage: number;
  setActiveStage: (activeStage: number) => void;
  activeQuestion: number;
  setActiveQuestion: (activeQuestion: number) => void;
  listSelectedAnswer: any[];
  setListSelectedAnswer: (listSelectedAnswer: any[]) => void;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

interface StorageProviderProps {
  children: ReactNode;
}

export function StorageProvider({ children }: StorageProviderProps) {
  const [quizStep, setQuizStep] = useState(1);
  const [isPopupRulesOpen, setIsPopupRulesOpen] = useState(false);
  const [isPopupQuizOpen, setIsPopupQuizOpen] = useState(false);
  const [isPopupQuizCompleteOpen, setIsPopupQuizCompleteOpen] = useState(false);
  const [yob, setYob] = useState("");
  const [activeStage, setActiveStage] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [listSelectedAnswer, setListSelectedAnswer] = useState<any>([]);

  const value: StorageContextType = {
    isPopupRulesOpen,
    setIsPopupRulesOpen,
    isPopupQuizOpen,
    setIsPopupQuizOpen,
    isPopupQuizCompleteOpen,
    setIsPopupQuizCompleteOpen,
    quizStep,
    setQuizStep,
    yob,
    setYob,
    activeStage,
    setActiveStage,
    activeQuestion,
    setActiveQuestion,
    listSelectedAnswer,
    setListSelectedAnswer,
  };

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}

export function useStorage(): StorageContextType {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
}
