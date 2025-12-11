"use client";
import { WA_LINK } from "@/lib/whatsApp";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { useEffect, useState } from "react";
import { translationsHome } from "@/lib/translationsHome";

export default function Hero() {
  const { language } = useLanguage();
  const t = translationsHome[language];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative w-full">
        <div className="h-[70vh] md:h-[72vh] lg:h-[80vh] relative overflow-hidden">
          <Image
            src="/images/etios-hero.png"
            alt="Toyota Etios Hatch prata com vista para o Rio de Janeiro"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,95,140,0.55)] to-[rgba(0,0,0,0.2)]" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full">
      <div className="h-[70vh] md:h-[72vh] lg:h-[80vh] relative overflow-hidden">
        <Image
          src="/images/etios-hero.png"
          alt="Toyota Etios Hatch prata com vista para o Rio de Janeiro"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,95,140,0.55)] to-[rgba(0,0,0,0.2)]" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-7xl mx-auto text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-md">
              {t.viagensConfiaveisSeguras}
            </h1>

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{t.reservarWhatsapp}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
