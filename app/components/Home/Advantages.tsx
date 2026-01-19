"use client";
import { translationsHome } from "@/lib/translationsHome";
import { useLanguage } from "../../context/LanguageContext";
import { CheckCircle2 } from "lucide-react";

function FeatureCard({
  title,
  Icon,
}: {
  title: string;
  Icon: React.ComponentType<any>;
}) {
  return (
    <div className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#005F8C]/10 text-[#005F8C] mb-6 group-hover:bg-[#005F8C] group-hover:text-white transition-colors duration-300">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
      <div className="w-12 h-1 bg-slate-100 group-hover:bg-[#005F8C]/30 rounded-full transition-colors" />
    </div>
  );
}

export default function Advantages() {
  const { language, isReady } = useLanguage(); // Importando isReady
  const t = translationsHome[language];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho com Fade-In */}
        <div
          className={`text-center mb-16 max-w-3xl mx-auto transition-opacity duration-500 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#005F8C]/10 text-[#005F8C] text-sm font-bold mb-4">
            <CheckCircle2 className="w-4 h-4" /> POR QUE NOS ESCOLHER
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t.vantagens}
          </h2>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            {t.vantagensSubtitulo}
          </p>
        </div>

        {/* Grid de Cards com Fade-In */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-700 delay-100 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        >
          {t.FEATURES.map((f) => (
            <FeatureCard key={f.id} title={f.title} Icon={f.Icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
