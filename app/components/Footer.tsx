import { WA_LINK, WA_NUMBER } from "@/lib/whatsApp";
import { MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#005F8C] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="text-2xl font-semibold">RJ Transfer</div>
            <p className="mt-2 text-sm text-white/80 max-w-md">
              Transporte particular e confortável para o Rio de Janeiro —
              partindo de outras cidades.
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
              Reservar pelo WhatsApp
            </a>

            <a
              href={`tel:+${WA_NUMBER}`}
              className="inline-flex items-center gap-2 text-white/90"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm">Contato</span>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm text-white/80">
            © {new Date().getFullYear()} RJ Transfer — Todos os direitos
            reservados
          </span>

          <div className="inline-flex items-center gap-2 bg-white text-[#005F8C] px-3 py-2 rounded-full shadow-sm">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Atendimento 24h</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
