"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { translationsTours } from "@/lib/translationsTours";
import { MapPin, Users, ArrowRight, Compass, Sparkles } from "lucide-react";

export default function ToursPage() {
  const { language, isReady } = useLanguage();
  const t = translationsTours[language];

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center transition-opacity duration-700 ${
            isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-[#005F8C]/10 text-[#005F8C] text-sm font-bold mb-4 tracking-wide">
            EXPERIÊNCIAS EXCLUSIVAS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            {t.tituloPrincipal}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            {t.subtituloPrincipal}
          </p>
        </div>
      </section>

      {/* Grid de Tours */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-700 delay-200 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Card Especial: Tour Personalizado */}
          <Link href="/tours/tour-personalizado" className="group h-full block">
            <article className="bg-gradient-to-br from-[#005F8C] to-[#004a6e] rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden text-white relative">
              <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

              <div className="p-8 flex flex-col h-full relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {t.cardPersonalizadoTitulo}
                </h3>
                <p className="text-white/80 mb-8 leading-relaxed flex-1">
                  {t.cardPersonalizadoDesc}
                </p>

                <div className="flex items-center gap-2 font-bold text-sm bg-white/10 w-fit px-4 py-3 rounded-lg hover:bg-white hover:text-[#005F8C] transition-colors">
                  Começar agora <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          </Link>

          {/* Cards de Tours Prontos */}
          {t.DESTINATIONS.map((tour) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.id}`}
              className="group h-full block"
            >
              <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden">
                {/* Imagem */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-[#005F8C]" />
                    {tour.capacity || "Privativo"}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[#005F8C] mb-3">
                    <Compass className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Tour Completo
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#005F8C] transition-colors">
                    {tour.name}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {tour.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                      Ver roteiro
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#005F8C] group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
