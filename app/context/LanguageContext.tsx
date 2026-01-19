"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "pt" | "en" | "es";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isReady: boolean; // Nova propriedade global
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");
  const [isReady, setIsReady] = useState(false); // Começa invisível/falso

  useEffect(() => {
    // Roda uma única vez ao carregar o site
    const storedLang = localStorage.getItem("language") as Language;
    if (storedLang && ["pt", "en", "es"].includes(storedLang)) {
      setLanguageState(storedLang);
    }
    // Marca como pronto imediatamente após ler o localStorage
    setIsReady(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
