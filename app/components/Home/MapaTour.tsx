"use client";
import { useState } from "react";
import { Map, MousePointerClick } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function MapaTour() {
  const [interativo, setInterativo] = useState(false);
  const { isReady } = useLanguage(); // Usamos apenas o isReady aqui por enquanto

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção com Fade-In */}
        <div
          className={`text-center mb-10 transition-opacity duration-500 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <Map className="w-6 h-6 text-[#005F8C]" />
            Explore Nossos Destinos
          </h2>
          <p className="text-slate-600 mt-2">
            Veja as áreas onde atuamos no Rio de Janeiro e Região dos Lagos
          </p>
        </div>

        {/* Container do Mapa - Fade-in suave também */}
        <div
          className={`relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group transition-opacity duration-700 delay-100 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
          onMouseLeave={() => setInterativo(false)}
        >
          {/* Overlay de Ativação */}
          {!interativo && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition-opacity"
              onClick={() => setInterativo(true)}
            >
              <div className="bg-white/90 backdrop-blur text-slate-900 px-6 py-3 rounded-full shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-all font-bold">
                <MousePointerClick className="w-5 h-5 text-[#005F8C]" />
                Clique para interagir com o mapa
              </div>
            </div>
          )}

          <iframe
            src="https://www.google.com/maps/d/embed?mid=1r9vC9ULvWNTrnJddxmBia12w9diieyE&ehbc=2E312F"
            className={`w-full h-full transition-all duration-500 ${
              interativo
                ? "pointer-events-auto grayscale-0"
                : "pointer-events-none grayscale-[50%]"
            }`}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
