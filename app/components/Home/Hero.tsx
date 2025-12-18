"use client";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { translationsHome } from "@/lib/translationsHome";
import { useLanguage } from "@/app/context/LanguageContext";

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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,95,140,0.55)] to-[rgba(0,0,0,0.2)]" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-7xl mx-auto text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-md text-balance">
              {t.viagensConfiaveisSeguras}
            </h1>

            <div className="mt-8 flex flex-col items-center gap-6">
              <Link
                href="/tours/tour-personalizado"
                className="group relative inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm text-[#005F8C] px-8 py-4 rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 border-2 border-white/20"
              >
                <Sparkles className="w-6 h-6 text-[#005F8C] group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-bold text-lg">
                  {language === "pt"
                    ? "Criar Tour Personalizado"
                    : language === "es"
                    ? "Crear Tour Personalizado"
                    : "Create Custom Tour"}
                </span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <p className="text-white/90 text-sm md:text-base font-medium drop-shadow-md max-w-2xl">
                {language === "pt"
                  ? "Monte seu roteiro ideal e explore o Rio de Janeiro do seu jeito"
                  : language === "es"
                  ? "Crea tu itinerario ideal y explora Río de Janeiro a tu manera"
                  : "Build your ideal itinerary and explore Rio de Janeiro your way"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
