"use client";

import type React from "react";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Header from "../components/Header";

export default function Contato() {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Erro ao enviar mensagem");
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar a mensagem");
      console.error("Erro ao enviar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Entre em Contato</h1>
          <p className="text-muted-foreground">
            Envie sua mensagem e responderemos o mais breve possível.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Telefone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              placeholder="(21) 99999-9999"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mensagem</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none"
              placeholder="Sua mensagem aqui..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-bold mb-6">Outras formas de contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-1">Telefone</h3>
              <p className="text-muted-foreground">(35) 98433-1369</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">E-mail</h3>
              <p className="text-muted-foreground">
                paulo.cesar.sarmento@hotmail.com
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Horário de Atendimento</h3>
              <p className="text-muted-foreground">Seg - Dom: 7h às 23h</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Localização</h3>
              <p className="text-muted-foreground">Rio de Janeiro, RJ</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
