"use client";
import { WA_LINK, WA_NUMBER } from "@/lib/whatsApp";
import { MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translationsHome } from "@/lib/translationsHome";

export default function Footer() {
  const { language } = useLanguage();
  const t = translationsHome[language];

  return (
    <>
      {/* Team Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              {t.nossaEquipe}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.conhecaProfissionais}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.equipe.map((membro: any, index: number) => (
              <div
                key={index}
                className="bg-background rounded-lg overflow-hidden shadow-lg"
              >
                <div className="aspect-square relative bg-primary/10">
                  <img
                    src={`/team/${membro.foto}`}
                    alt={membro.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-foreground">
                    {membro.nome}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {membro.cargo}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {membro.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-[#005F8C] text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="text-2xl font-semibold">RJ Transfer</div>
              <p className="mt-2 text-sm text-white/80 max-w-md">
                {t.footerDescription}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#005F8C] px-4 py-2 rounded-xl shadow hover:scale-105 transition"
              >
                <MessageCircle className="w-5 h-5" />
                {t.reservarWhatsapp}
              </a>

              <a
                href={`tel:+${WA_NUMBER}`}
                className="inline-flex items-center gap-2 text-white/90"
              >
                <Phone className="w-5 h-5" />
                <span className="text-sm">{t.contato}</span>
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm text-white/80">
              © {new Date().getFullYear()} {t.footerCopyright}
            </span>

            <div className="inline-flex items-center gap-2 bg-white text-[#005F8C] px-3 py-2 rounded-full shadow-sm">
              <a href={`tel:+${WA_NUMBER}`} className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{t.atendimento}</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
