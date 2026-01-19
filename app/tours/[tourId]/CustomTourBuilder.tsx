"use client";

import { useState } from "react";
import Link from "next/link";
import { availableDestinations, translations } from "@/lib/translations"; // Ajuste o import conforme sua estrutura
import { useLanguage } from "@/app/context/LanguageContext";
import toast, { Toaster } from "react-hot-toast";
import { WA_LINK } from "@/lib/whatsApp";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Check,
  Smartphone,
  User,
  FileText,
  Send,
  MapPin,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface Destination {
  id: string;
  name: string;
  category: "rio" | "lagos";
}

interface FormErrors {
  contact?: string;
  phone?: string;
  destinations?: string;
}

export default function CustomTourBuilder() {
  const { language, isReady } = useLanguage();
  const t = translations[language]; // Assumindo que translations tem 'tourPersonalizado'

  const [selectedDestinations, setSelectedDestinations] = useState<
    Destination[]
  >([]);
  const [customDestination, setCustomDestination] = useState("");
  const [notes, setNotes] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Lógica de Toggle
  const handleToggleDestination = (destination: Destination) => {
    const isSelected = selectedDestinations.find(
      (d) => d.id === destination.id
    );
    if (isSelected) {
      setSelectedDestinations(
        selectedDestinations.filter((d) => d.id !== destination.id)
      );
    } else {
      if (selectedDestinations.length < 3) {
        setSelectedDestinations([...selectedDestinations, destination]);
        if (errors.destinations)
          setErrors({ ...errors, destinations: undefined });
      } else {
        toast.error("Máximo de 3 destinos permitidos");
      }
    }
  };

  const handleAddCustomDestination = () => {
    if (customDestination.trim() && selectedDestinations.length < 3) {
      const newDestination: Destination = {
        id: `custom-${Date.now()}`,
        name: customDestination.trim(),
        category: "rio",
      };
      setSelectedDestinations([...selectedDestinations, newDestination]);
      setCustomDestination("");
      if (errors.destinations)
        setErrors({ ...errors, destinations: undefined });
    }
  };

  const handleRemoveDestination = (id: string) => {
    setSelectedDestinations(selectedDestinations.filter((d) => d.id !== id));
  };
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);

    if (!digits.length) return "";

    const countryCode = digits.slice(0, Math.max(0, digits.length - 11));
    const local = digits.slice(-11);

    if (local.length <= 2) {
      return `+${countryCode} ${local}`;
    }

    if (local.length <= 7) {
      return `+${countryCode} ${local.replace(/^(\d{2})(\d+)/, "($1) $2")}`;
    }

    return `+${countryCode} ${local.replace(
      /^(\d{2})(\d{5})(\d+)/,
      "($1) $2-$3"
    )}`;
  };

  // const formatPhone = (value: string) => {
  //   const numbers = value.replace(/\D/g, "").slice(0, 11);

  //   if (numbers.length <= 2) {
  //     return numbers;
  //   }

  //   if (numbers.length <= 7) {
  //     return numbers.replace(/^(\d{2})(\d+)/, "($1) $2");
  //   }

  //   return numbers.replace(/^(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
  // };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhone(e.target.value));
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!contact.trim()) {
      newErrors.contact = "Nome obrigatório";
      isValid = false;
    }
    if (phoneNumber.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Telefone inválido";
      isValid = false;
    }
    if (selectedDestinations.length === 0) {
      newErrors.destinations = "Selecione ao menos 1 destino";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleRequestQuote = async () => {
    if (!validateForm()) {
      toast.error("Verifique os campos obrigatórios");
      return;
    }
    setLoading(true);

    try {
      // 1. Enviar para o Discord (API Route)
      await fetch("/api/custom-tour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact,
          cel: phoneNumber,
          destinations: selectedDestinations,
          notes,
        }),
      });
    } catch (error) {
      console.error("Erro ao notificar Discord", error);
      // Não paramos o fluxo se o Discord falhar, o cliente ainda quer o WhatsApp
    }

    // 2. Preparar e Abrir WhatsApp
    const destinationsList = selectedDestinations
      .map((d) => `• ${d.name}`)
      .join("\n");

    const message =
      `*Olá! Gostaria de um orçamento para Tour Personalizado:*\n\n` +
      `👤 *Nome:* ${contact}\n` +
      `📱 *Telefone:* ${phoneNumber}\n\n` +
      `📍 *Destinos Escolhidos:*\n${destinationsList}\n\n` +
      `📝 *Observações:* ${notes || "Nenhuma"}`;

    const baseUrl = WA_LINK
      ? WA_LINK.split("?")[0]
      : "https://wa.me/552199999999";
    const finalUrl = `${baseUrl}?text=${encodeURIComponent(message)}`;

    // Pequeno delay para garantir que o fetch não seja cancelado se a aba mudar muito rápido
    // e para dar feedback visual
    setTimeout(() => {
      window.open(finalUrl, "_blank");

      // Limpeza do formulário
      setLoading(false);
      setSelectedDestinations([]);
      setContact("");
      setPhoneNumber("");
      setNotes("");
      toast.success("Solicitação iniciada!");
    }, 500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <Toaster position="top-center" />

      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center transition-opacity duration-700 ${
            isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/tours"
            className="inline-flex items-center text-slate-500 hover:text-[#005F8C] mb-6 transition-colors text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />{" "}
            {t.tourPersonalizado.voltar || "Voltar para Tours"}
          </Link>
          <div className="flex justify-center mb-4">
            <div className="bg-[#005F8C]/10 p-3 rounded-full">
              <Sparkles className="w-8 h-8 text-[#005F8C]" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t.tourPersonalizado.titulo || "Monte seu Roteiro"}
          </h1>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
            {t.tourPersonalizado.subtitulo ||
              "Escolha os lugares que você quer visitar e nossa equipe organiza a logística."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-opacity duration-700 delay-200 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Esquerda: Formulário */}
          <div className="lg:col-span-2 space-y-8">
            {/* Inputs de Contato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`bg-white p-6 rounded-2xl border shadow-sm transition-all ${
                  errors.contact
                    ? "border-red-500 shadow-red-50"
                    : "border-slate-200 hover:border-[#005F8C]/30"
                }`}
              >
                <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#005F8C]" /> {t.nome || "Nome"}
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (errors.contact)
                      setErrors({ ...errors, contact: undefined });
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005F8C] focus:ring-4 focus:ring-[#005F8C]/10 transition-all outline-none font-medium text-slate-900"
                  placeholder="Seu nome"
                />
              </div>

              <div
                className={`bg-white p-6 rounded-2xl border shadow-sm transition-all ${
                  errors.phone
                    ? "border-red-500 shadow-red-50"
                    : "border-slate-200 hover:border-[#005F8C]/30"
                }`}
              >
                <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#005F8C]" />{" "}
                  {t.tourPersonalizado.celular || "WhatsApp"}
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005F8C] focus:ring-4 focus:ring-[#005F8C]/10 transition-all outline-none font-medium text-slate-900"
                />
              </div>
            </div>

            {/* Seleção de Destinos */}
            <div
              className={`bg-white p-8 rounded-2xl border shadow-sm ${
                errors.destinations ? "border-red-500" : "border-slate-200"
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#005F8C]" />
                  {t.tourPersonalizado.selecionarDestinos ||
                    "Selecione os Destinos"}
                </h2>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                    selectedDestinations.length >= 3
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {selectedDestinations.length}/3 Escolhidos
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableDestinations?.map((destination) => {
                  const isSelected = selectedDestinations.find(
                    (d) => d.id === destination.id
                  );
                  const isDisabled =
                    !isSelected && selectedDestinations.length >= 3;

                  return (
                    <button
                      key={destination.id}
                      onClick={() => handleToggleDestination(destination)}
                      disabled={isDisabled}
                      className={`
                        relative p-4 rounded-xl border-2 text-left transition-all duration-200 group flex items-center justify-between
                        ${
                          isSelected
                            ? "border-[#005F8C] bg-[#005F8C]/5 shadow-sm"
                            : isDisabled
                            ? "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
                            : "border-slate-100 hover:border-[#005F8C]/40 hover:bg-white bg-slate-50/50"
                        }
                      `}
                    >
                      <div>
                        <h3
                          className={`font-bold text-sm ${
                            isSelected ? "text-[#005F8C]" : "text-slate-800"
                          }`}
                        >
                          {destination.name}
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">
                          {destination.category}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0 ml-2 ${
                          isSelected
                            ? "bg-[#005F8C] text-white"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  {t.tourPersonalizado.adicionarCustomizado ||
                    "Outro lugar específico?"}
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={customDestination}
                    onChange={(e) => setCustomDestination(e.target.value)}
                    placeholder="Digite o nome do local..."
                    disabled={selectedDestinations.length >= 3}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005F8C] outline-none transition-all"
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddCustomDestination()
                    }
                  />
                  <button
                    onClick={handleAddCustomDestination}
                    disabled={
                      !customDestination.trim() ||
                      selectedDestinations.length >= 3
                    }
                    className="px-5 bg-[#005F8C] hover:bg-[#004a6e] text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Observações */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#005F8C]" />{" "}
                {t.tourPersonalizado.observacoes || "Observações"}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Alguma preferência de horário ou necessidade especial?"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005F8C] focus:ring-4 focus:ring-[#005F8C]/10 outline-none resize-none transition-all"
              />
            </div>
          </div>

          {/* Direita: Resumo */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 bg-slate-900 text-white">
                  <h3 className="text-lg font-bold">Resumo do Roteiro</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Revise antes de enviar
                  </p>
                </div>

                <div className="p-6">
                  {selectedDestinations.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                      <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-medium">
                        Nenhum destino
                        <br />
                        selecionado
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 relative">
                      <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-100" />
                      {selectedDestinations.map((destination, index) => (
                        <div
                          key={destination.id}
                          className="relative flex items-center justify-between bg-white border border-slate-100 p-3 rounded-lg shadow-sm z-10"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 bg-[#005F8C] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-md">
                              {index + 1}
                            </div>
                            <span className="font-bold text-slate-700 text-sm">
                              {destination.name}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleRemoveDestination(destination.id)
                            }
                            className="text-slate-300 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-200">
                  <button
                    onClick={handleRequestQuote}
                    disabled={loading}
                    className="w-full py-4 bg-[#005F8C] hover:bg-[#004a6e] text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      "Processando..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t.tourPersonalizado.solicitarOrcamento ||
                          "Solicitar Orçamento"}
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Resposta rápida via
                    WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
