"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "pt" as const, label: "Português", flag: "🇧🇷" },
    { code: "en" as const, label: "English", flag: "🇺🇸" },
    { code: "es" as const, label: "Español", flag: "🇪🇸" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white rounded-full p-3 shadow-lg hover:shadow-xl transition flex items-center justify-center w-14 h-14"
        title="Change language"
      >
        <span className="text-xl">🌐</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white border border-border rounded-lg shadow-lg p-2 space-y-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded transition ${
                language === lang.code
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 text-foreground"
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
