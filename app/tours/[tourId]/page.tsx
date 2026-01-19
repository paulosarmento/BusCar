"use client";

import React, { use } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { translationsTours } from "@/lib/translationsTours";
import Link from "next/link";
import {
  Clock,
  Users,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  MapPin,
  ChevronRight,
  Calendar,
} from "lucide-react";
import CustomTourBuilder from "./CustomTourBuilder";

export default function TourDetailPage({
  params,
}: {
  params: Promise<{ tourId: string }>;
}) {
  const { language, isReady } = useLanguage();
  const t = translationsTours[language];
  const { tourId } = use(params);

  // 1. SE FOR O TOUR PERSONALIZADO, RENDERIZA O COMPONENTE BUILDER
  if (tourId === "tour-personalizado") {
    return <CustomTourBuilder />;
  }

  // 2. LÓGICA PADRÃO DE DETALHES DO TOUR
  const tour =
    t.DESTINATIONSDETAILS[tourId as keyof typeof t.DESTINATIONSDETAILS] ||
    t.DESTINATIONSDETAILS[
      "tour-rio-classico" as keyof typeof t.DESTINATIONSDETAILS
    ]; // Fallback de segurança

  if (!tour) return null;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header - Imagem Grande com Fade-In */}
      <section className="relative h-[50vh] min-h-[400px] bg-slate-900">
        <div className="absolute inset-0">
          <img
            src={tour.image || "/placeholder.svg?query=tour"}
            alt={tour.name}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isReady ? "opacity-80" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        </div>

        <div
          className={`relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 transition-all duration-700 ${
            isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/tours"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 w-fit hover:bg-white/10 px-3 py-1.5 -ml-3 rounded-lg transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.toursVoltar || "Voltar para Tours"}
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 shadow-sm tracking-tight">
            {tour.name}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl font-light leading-relaxed">
            {tour.description}
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 transition-opacity duration-700 delay-200 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Coluna da Esquerda (Informações Detalhadas) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Sobre */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#005F8C]" />
                {t.sobreTitulo || "Sobre o Passeio"}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg font-light">
                {tour.fullDescription}
              </p>
            </div>

            {/* Itinerário com Linha do Tempo */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                {t.itinerarioTitulo || "Roteiro Previsto"}
              </h2>
              <div className="space-y-0 relative border-l-2 border-slate-100 ml-3">
                {tour.itinerary.map((item: string, index: number) => (
                  <div key={index} className="relative pl-8 pb-8 last:pb-0">
                    <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#005F8C] border-4 border-white shadow-sm ring-1 ring-slate-100" />
                    <p className="text-slate-700 font-medium text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusos / Não Inclusos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-full">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  {t.inclusoTitulo || "Incluso"}
                </h3>
                <ul className="space-y-3">
                  {tour.includes.map((item: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-600 text-sm"
                    >
                      <span className="text-emerald-500 font-bold mt-0.5">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-full">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  {t.exclusoesTitulo || "Não Incluso"}
                </h3>
                <ul className="space-y-3">
                  {tour.notIncludes.map((item: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-600 text-sm"
                    >
                      <span className="text-red-400 font-bold mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Sticky (Card de Reserva) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="space-y-6">
                  {/* Detalhes Rápidos */}
                  <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                    <div>
                      <p className="text-xs uppercase text-slate-400 font-bold mb-1">
                        {t.duracao || "Duração"}
                      </p>
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <Clock className="w-4 h-4 text-[#005F8C]" />{" "}
                        {tour.duration}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-slate-400 font-bold mb-1">
                        {t.capacidade || "Capacidade"}
                      </p>
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <Users className="w-4 h-4 text-[#005F8C]" />{" "}
                        {tour.capacity}
                      </div>
                    </div>
                  </div>

                  <div className="pb-6 border-b border-slate-100">
                    <p className="text-xs uppercase text-slate-400 font-bold mb-1">
                      Investimento Estimado
                    </p>
                    <p className="text-3xl font-bold text-[#005F8C]">
                      {tour.price}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-400 font-bold mb-3">
                      {t.destaquesTour || "Destaques"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map(
                        (highlight: string, index: number) => (
                          <span
                            key={index}
                            className="bg-[#005F8C]/5 text-[#005F8C] px-3 py-1 rounded-lg text-xs font-bold border border-[#005F8C]/10"
                          >
                            {highlight}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <Link href="/contact" className="block">
                    <button className="w-full bg-[#005F8C] hover:bg-[#004a6e] text-white py-4 rounded-xl transition-all font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:-translate-y-0.5">
                      <Calendar className="w-5 h-5" />
                      {t.solicitarReserva || "Reservar Agora"}
                    </button>
                  </Link>

                  <p className="text-xs text-center text-slate-400">
                    Melhor para: {tour.bestFor}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros Destinos (Footer Nav) */}
      <section
        className={`bg-white py-16 border-t border-slate-200 mt-8 transition-opacity duration-700 delay-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            {t.outrosDestinos || "Veja Também"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.keys(t.DESTINATIONSDETAILS)
              .filter((key) => key !== tourId)
              .slice(0, 4)
              .map((key) => {
                const item =
                  t.DESTINATIONSDETAILS[
                    key as keyof typeof t.DESTINATIONSDETAILS
                  ];
                return (
                  <Link
                    key={key}
                    href={`/tours/${key}`}
                    className="group block h-full"
                  >
                    <article className="bg-slate-50 border border-slate-100 rounded-xl p-3 hover:border-[#005F8C]/30 hover:shadow-lg transition-all cursor-pointer h-full hover:-translate-y-1">
                      <div className="w-full h-32 rounded-lg bg-slate-200 mb-3 overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <p className="font-bold text-slate-800 text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#005F8C] mt-2 flex items-center font-bold">
                        {t.conhecerMais || "Ver detalhes"}{" "}
                        <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                      </p>
                    </article>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
