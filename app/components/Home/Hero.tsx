"use client";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
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

  // Textos variáveis para evitar lógica complexa no JSX
  const ctaText =
    language === "pt"
      ? "Criar Tour Personalizado"
      : language === "es"
      ? "Crear Tour Personalizado"
      : "Create Custom Tour";
  const subText =
    language === "pt"
      ? "Monte seu roteiro ideal e explore o Rio de Janeiro do seu jeito"
      : language === "es"
      ? "Crea tu itinerario ideal y explora Río de Janeiro a tu manera"
      : "Build your ideal itinerary and explore Rio de Janeiro your way";

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* 1. Camada de Fundo (Renderiza imediatamente, sem esperar 'mounted') */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
          poster="/images/etios-hero.png" // Importante: imagem estática enquanto o vídeo carrega
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay Gradiente Premium */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#005F8C]/60 via-[#005F8C]/30 to-black/70" />
      </div>

      {/* 2. Conteúdo de Texto */}
      {/* Usamos opacity-0 e transition para fazer o texto aparecer suavemente apenas quando a língua estiver pronta */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white transition-opacity duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl text-balance leading-[1.1] mb-6">
          {t.viagensConfiaveisSeguras}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto drop-shadow-md mb-10 leading-relaxed">
          {subText}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/tours/tour-personalizado"
            className="group relative inline-flex items-center gap-3 bg-white text-[#005F8C] px-8 py-4 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 font-bold text-lg"
          >
            <Sparkles className="w-5 h-5 text-[#005F8C] group-hover:animate-pulse" />
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
