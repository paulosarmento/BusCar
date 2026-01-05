"use client";

import type React from "react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLanguage } from "../context/LanguageContext";
import { contactTexts } from "@/lib/contactTexts";
import Header from "../components/Header";

export default function Contato() {
  const { language } = useLanguage();
  const t = contactTexts[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData({
        ...formData,
        phone: value.replace(/\D/g, "").slice(0, 11), // apenas números
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toast.success(t.toast.success);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.success(t.toast.success); // UX: nunca mostra erro
      console.error("Erro ao enviar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.pageTitle}</h1>
          <p className="text-muted-foreground">{t.pageDescription}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t.form.fullNameLabel}
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.form.fullNamePlaceholder}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.form.emailLabel}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.form.emailPlaceholder}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.form.phoneLabel}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={t.form.phonePlaceholder}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.form.messageLabel}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t.form.messagePlaceholder}
              rows={5}
              required
              className="w-full px-4 py-2 border rounded-lg resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg"
          >
            {loading ? t.form.submittingButton : t.form.submitButton}
          </button>
        </form>
      </main>
    </>
  );
}
