"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  Calendar,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { translationsLagos } from "@/lib/translationsLagos";
import { WA_LINK } from "@/lib/whatsApp";

export default function LagosDestinationPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { language, isReady } = useLanguage();
  const t = translationsLagos[language];

  // Next.js 15: React.use para params
  const { destination } = React.use(params);

  const data =
    t.DESTINATIONSDETAILS[destination as keyof typeof t.DESTINATIONSDETAILS] ||
    t.DESTINATIONSDETAILS["buzios"];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] lg:h-[50vh] max-h-[600px] overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

        {/* A imagem também recebe fade-in suave */}
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.name}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-8 lg:pb-12">
          <div
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full transition-all duration-700 ${
              isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/lagos"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors text-sm font-medium hover:-translate-x-1 duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.voltarParaViagens}
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight shadow-sm">
              {data.name}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl font-light leading-snug">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 transition-opacity duration-700 delay-200 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Coluna Esquerda (Informações) */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                {t.sobre} {data.name}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base lg:text-lg font-light">
                {data.fullDescription}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-5 px-1">
                {t.destaques}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.highlights.map((highlight: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="mt-0.5 bg-[#005F8C]/10 p-1.5 rounded-full group-hover:bg-[#005F8C] transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#005F8C] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-slate-700 font-medium text-sm lg:text-base">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita (Sidebar Sticky) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Card de Informações */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">
                  Detalhes da Viagem
                </h3>

                <div className="space-y-5">
                  <div className="flex items-center gap-4 group">
                    <div className="p-2 bg-blue-50 text-[#005F8C] rounded-lg group-hover:bg-[#005F8C] group-hover:text-white transition-colors">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase">
                        Capacidade
                      </p>
                      <p className="text-slate-900 font-bold">
                        {data.passengers}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase">
                        Melhor Horário
                      </p>
                      <p className="text-slate-900 font-bold">
                        {data.bestTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase">
                        Preço Estimado
                      </p>
                      <p className="text-slate-900 font-bold">
                        {data.estimatedCost}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link href="/contact" className="w-full block">
                    <button className="w-full flex items-center justify-center gap-2 bg-[#005F8C] hover:bg-[#004a6e] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5">
                      <Calendar className="w-5 h-5" />
                      {t.solicitarCorrida}
                    </button>
                  </Link>
                  <p className="text-center text-xs text-slate-400 mt-3">
                    Agende com antecedência
                  </p>
                </div>
              </div>

              {/* Card de Suporte WhatsApp */}
              <div className="bg-slate-900 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold text-lg mb-1">Dúvidas?</h4>
                  <p className="text-slate-300 text-sm mb-4">
                    Fale diretamente com nossa equipe.
                  </p>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    <button className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-xl transition-all shadow-md">
                      <Phone className="w-4 h-4" />
                      WhatsApp
                    </button>
                  </a>
                </div>
                {/* Efeito visual de fundo */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nav - Outros Destinos */}
      <section
        className={`bg-white border-t border-slate-200 py-12 mt-12 transition-opacity duration-700 delay-300 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            {t.outrosDestinos}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(t.DESTINATIONSDETAILS)
              .filter((key) => key !== destination)
              .slice(0, 4)
              .map((key) => {
                const item =
                  t.DESTINATIONSDETAILS[
                    key as keyof typeof t.DESTINATIONSDETAILS
                  ];
                return (
                  <Link
                    key={key}
                    href={`/lagos/${key}`}
                    className="group block h-full"
                  >
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 hover:shadow-lg hover:border-[#005F8C]/30 transition-all cursor-pointer h-full hover:-translate-y-1">
                      <div className="w-full h-24 rounded-lg bg-slate-200 mb-3 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <p className="font-bold text-slate-800 text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#005F8C] mt-1 flex items-center font-bold">
                        Ver mais{" "}
                        <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
