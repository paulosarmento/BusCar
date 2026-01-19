"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { translationsRio } from "@/lib/translationsRio";
import { MapPin, Users, ArrowRight } from "lucide-react";

export default function RioPage() {
  const { language, isReady } = useLanguage();
  const t = translationsRio[language];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {" "}
      {/* pt-20 para compensar header fixo */}
      {/* Hero Section com Fade-In */}
      <section className="bg-white border-b border-slate-200">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center transition-opacity duration-700 ${
            isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-[#005F8C]/10 text-[#005F8C] text-sm font-bold mb-4 tracking-wide">
            CIDADE MARAVILHOSA
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            {t.regiaoRioTitulo}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            {t.regiaoRioDescricao}
          </p>
        </div>
      </section>
      {/* Destinations Grid com Delay */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-opacity duration-700 delay-200 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        >
          {t.DESTINATIONS.map((destination) => (
            <Link
              key={destination.id}
              href={`/rio/${destination.id}`}
              className="group h-full block"
            >
              <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden">
                {/* Imagem do Card */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {destination.passengers}
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[#005F8C] mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Ponto Turístico
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#005F8C] transition-colors">
                    {destination.name}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {destination.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                      Ver detalhes
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
