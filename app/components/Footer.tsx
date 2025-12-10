"use client";
import { WA_LINK, WA_NUMBER } from "@/lib/whatsApp";
import { MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
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
  );
}
