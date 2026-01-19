"use client";
import { WA_LINK, WA_NUMBER } from "@/lib/whatsApp";
import { MessageCircle, Phone, MapPin, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translationsHome } from "@/lib/translationsHome";

export default function Footer() {
  const { language, isReady } = useLanguage(); // Importando isReady
  const t = translationsHome[language];

  return (
    <>
      {/* Team Section */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-opacity duration-500 ${
              isReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t.nossaEquipe}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              {t.conhecaProfissionais}
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-opacity duration-700 ${
              isReady ? "opacity-100" : "opacity-0"
            }`}
          >
            {t.equipe.map((membro: any, index: number) => (
              <div
                key={index}
                className="group bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 group-hover:scale-105 transition-transform">
                  <img
                    src={`/team/${membro.foto}`}
                    alt={membro.nome}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src = "/placeholder-user.jpg")
                    }
                  />
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {membro.nome}
                </h3>
                <p className="text-sm text-[#005F8C] font-bold uppercase tracking-wider mb-4">
                  {membro.cargo}
                </p>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {membro.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-[#005F8C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12 transition-opacity duration-500 ${
              isReady ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Brand */}
            <div className="space-y-4">
              <div className="text-3xl font-bold tracking-tight">
                RJ Transfer
              </div>
              <p className="text-white/80 leading-relaxed max-w-sm">
                {t.footerDescription}
              </p>
            </div>

            {/* Contato Rápido */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-4">Fale Conosco</h4>
              <a
                href={`tel:+${WA_NUMBER}`}
                className="flex items-center gap-3 text-white/90 hover:text-white hover:translate-x-1 transition-all"
              >
                <Phone className="w-5 h-5" /> <span>+55 {WA_NUMBER}</span>
              </a>
              <div className="flex items-center gap-3 text-white/90">
                <Mail className="w-5 h-5" /> <span>contato@rjtransfer.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <MapPin className="w-5 h-5" /> <span>Rio de Janeiro, RJ</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-start gap-4">
              <h4 className="font-bold text-lg mb-2">Reserve Agora</h4>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#005F8C] px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 hover:bg-slate-50 transition-all w-full md:w-auto justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                {t.reservarWhatsapp}
              </a>
              <p className="text-xs text-white/60 mt-2">
                Atendimento 24h para agendamentos.
              </p>
            </div>
          </div>

          <div
            className={`mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60 transition-opacity duration-700 delay-100 ${
              isReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <span>
              © {new Date().getFullYear()} RJ Transfer. {t.footerCopyright}
            </span>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer transition-colors">
                Termos
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Privacidade
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
