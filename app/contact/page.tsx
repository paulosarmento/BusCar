"use client";

import type React from "react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLanguage } from "../context/LanguageContext";
import { contactTexts } from "@/lib/contactTexts";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  Clock,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { WA_NUMBER, WA_LINK } from "@/lib/whatsApp";

export default function Contato() {
  const { language, isReady } = useLanguage();
  const t = contactTexts[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: formatPhone(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor, preencha os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Falha na requisição");
      }

      toast.success(t.toast?.success || "Mensagem enviada com sucesso!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Erro ao enviar:", error);
      toast.error(
        t.toast?.error || "Erro ao enviar mensagem. Tente pelo WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-24 md:pt-32 pb-12">
      <Toaster position="top-center" />

      <main
        className={`flex-grow container mx-auto px-4 lg:px-8 transition-all duration-700 ease-in-out ${
          isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-7xl mx-auto">
          {/* LADO ESQUERDO: Informações */}
          <div className="space-y-10 lg:sticky lg:top-32">
            <div>
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#005F8C]/10 text-[#005F8C] font-bold text-sm mb-6">
                <MessageCircle className="w-4 h-4" />
                <span>Fale Conosco</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                {t.pageTitle || "Entre em contato"}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {t.pageDescription ||
                  "Planeje sua viagem dos sonhos com total segurança e conforto. Nossa equipe está pronta para atender você e tirar todas as suas dúvidas."}
              </p>
            </div>

            <div className="grid gap-5">
              {/* Card Email */}
              <div className="group flex items-start gap-5 p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300">
                <div className="p-3.5 rounded-xl bg-blue-50 text-[#005F8C] group-hover:bg-[#005F8C] group-hover:text-white transition-colors duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Email</h3>
                  <a
                    href="mailto:contato@rjtransfer.com"
                    className="text-slate-600 hover:text-[#005F8C] transition-colors block mt-1 font-medium"
                  >
                    contato@rjtransfer.com
                  </a>
                  <p className="text-slate-400 text-sm mt-1">
                    Resposta em até 24h
                  </p>
                </div>
              </div>

              {/* Card WhatsApp */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-5 p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="p-3.5 rounded-xl bg-green-50 text-green-600 group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    WhatsApp / Telefone
                  </h3>
                  <p className="text-slate-600 mt-1 font-medium">
                    +55 {WA_NUMBER}
                  </p>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Seg a Dom, 24h</span>
                  </div>
                </div>
              </a>

              {/* Card Localização */}
              <div className="group flex items-start gap-5 p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-orange-900/5 hover:-translate-y-1 transition-all duration-300">
                <div className="p-3.5 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Localização
                  </h3>
                  <p className="text-slate-600 mt-1 font-medium">
                    Rio de Janeiro & Região dos Lagos
                  </p>
                  <p className="text-slate-400 text-sm mt-1">Brasil</p>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: Formulário */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-8 lg:p-10 border border-slate-100 relative overflow-hidden">
            {/* Efeito decorativo no topo do card */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#005F8C] to-[#00a8f3]" />

            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Envie uma mensagem
            </h2>
            <p className="text-slate-500 mb-8 text-sm">
              Preencha o formulário abaixo e retornaremos em breve.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  {t.form?.fullNameLabel || "Nome Completo"}
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.form?.fullNamePlaceholder || "Seu nome"}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005F8C] focus:ring-4 focus:ring-[#005F8C]/10 transition-all outline-none placeholder:text-slate-400 font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    {t.form?.emailLabel || "Email"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.form?.emailPlaceholder || "seu@email.com"}
                    required
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005F8C] focus:ring-4 focus:ring-[#005F8C]/10 transition-all outline-none placeholder:text-slate-400 font-medium text-slate-800"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    {t.form?.phoneLabel || "Telefone"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    inputMode="tel"
                    placeholder={t.form?.phonePlaceholder || "+55 (21) ..."}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005F8C] focus:ring-4 focus:ring-[#005F8C]/10 transition-all outline-none placeholder:text-slate-400 font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  {t.form?.messageLabel || "Mensagem"}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    t.form?.messagePlaceholder || "Como podemos ajudar?"
                  }
                  rows={4}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005F8C] focus:ring-4 focus:ring-[#005F8C]/10 transition-all outline-none resize-none placeholder:text-slate-400 font-medium text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#005F8C] hover:bg-[#004a6e] text-white font-bold py-4 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 mt-4 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.form?.submittingButton || "Enviando..."}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t.form?.submitButton || "Enviar Mensagem"}
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-xs text-slate-400 mt-2 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Seus dados estão protegidos
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
