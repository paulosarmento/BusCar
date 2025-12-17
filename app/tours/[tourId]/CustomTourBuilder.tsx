"use client";

import { useState } from "react";
import Link from "next/link";
import { availableDestinations, translations } from "@/lib/translations";
import { useLanguage } from "@/app/context/LanguageContext";
import { Card } from "@/app/components/card";
import { Button } from "@/app/components/button";
import toast, { Toaster } from "react-hot-toast";
import { WA_LINK } from "@/lib/whatsApp";

interface Destination {
  id: string;
  name: string;
  category: "rio" | "lagos";
}

export default function CustomTourBuilder() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedDestinations, setSelectedDestinations] = useState<
    Destination[]
  >([]);
  const [customDestination, setCustomDestination] = useState("");
  const [notes, setNotes] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

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
    }
  };

  const handleRemoveDestination = (id: string) => {
    setSelectedDestinations(selectedDestinations.filter((d) => d.id !== id));
  };

  const handleRequestQuote = async () => {
    if (selectedDestinations.length === 0) {
      toast.error("Selecione pelo menos um destino");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/custom-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinations: selectedDestinations,
          notes: notes,
          cel: phoneNumber,
        }),
      });

      if (response.ok) {
        toast.success(
          t.contato ||
            "Solicitação enviada com sucesso! Entraremos em contato em breve."
        );
        setSelectedDestinations([]);
        setNotes("");
        setPhoneNumber("");
        window.location.href = WA_LINK;
      } else {
        toast.error("Erro ao enviar solicitação. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar tour personalizado:", error);
      toast.success(
        "Solicitação enviada com sucesso! Entraremos em contato em breve."
      );
      setSelectedDestinations([]);
      setNotes("");
      setPhoneNumber("");
    } finally {
      setLoading(false);
    }
  };

  const estimatedDuration =
    selectedDestinations.length === 0
      ? "-"
      : selectedDestinations.length === 1
      ? "4-6 horas"
      : selectedDestinations.length === 2
      ? "6-8 horas"
      : "8-12 horas";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setPhoneNumber(
        value.replace(/\D/g, "").slice(0, 11) // apenas números
      );
      return;
    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/tours"
            className="text-primary-foreground/80 hover:text-primary-foreground mb-4 inline-block"
          >
            ← {t.tourPersonalizado.voltar}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t.tourPersonalizado.titulo}
          </h1>
          <p className="text-lg opacity-90">{t.tourPersonalizado.subtitulo}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Destination Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descrição */}
            <Card className="p-6">
              <p className="text-muted-foreground">
                {t.tourPersonalizado.descricao}
              </p>
            </Card>
            {/* Celular para contato */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t.tourPersonalizado.celular}
              </h2>
              {phoneNumber === "" && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 px-4 py-3 rounded-lg mb-4">
                  "Coloque o numero do celular 444"
                </div>
              )}
              <input
                type="tel"
                name="phone"
                value={phoneNumber}
                onChange={handlePhoneChange}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="+00 (00) 00000-4444"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>

            {/* Seleção de Destinos */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t.tourPersonalizado.selecionarDestinos}
              </h2>
              {selectedDestinations.length >= 3 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 px-4 py-3 rounded-lg mb-4">
                  {t.tourPersonalizado.limiteDestinos}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableDestinations.map((destination) => {
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
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : isDisabled
                          ? "border-border bg-muted/50 opacity-50 cursor-not-allowed"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {destination.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {destination.category === "rio"
                              ? "Rio de Janeiro"
                              : "Região dos Lagos"}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="text-primary text-xl">✓</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Adicionar Destino Customizado */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t.tourPersonalizado.adicionarCustomizado}
              </h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  placeholder={t.tourPersonalizado.placeholder}
                  disabled={selectedDestinations.length >= 3}
                  className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddCustomDestination();
                    }
                  }}
                />
                <Button
                  onClick={handleAddCustomDestination}
                  disabled={
                    !customDestination.trim() ||
                    selectedDestinations.length >= 3
                  }
                >
                  {t.tourPersonalizado.adicionar}
                </Button>
              </div>
            </div>

            {/* Observações */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t.tourPersonalizado.observacoes}
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.tourPersonalizado.observacoesPlaceholder}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
          </div>

          {/* Right Column - Summary */}
          <div>
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t.tourPersonalizado.destinosSelecionados}
              </h3>

              {selectedDestinations.length === 0 ? (
                <p className="text-sm text-muted-foreground mb-6">
                  {t.tourPersonalizado.nenhumDestinoSelecionado}
                </p>
              ) : (
                <ul className="space-y-2 mb-6">
                  {selectedDestinations.map((destination, index) => (
                    <li
                      key={destination.id}
                      className="flex items-center justify-between bg-muted p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">
                          {index + 1}.
                        </span>
                        <span className="text-sm text-foreground">
                          {destination.name}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveDestination(destination.id)}
                        className="text-destructive hover:text-destructive/80 text-sm"
                      >
                        {t.tourPersonalizado.remover}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="space-y-4 border-t border-border pt-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.tourPersonalizado.destinos}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {selectedDestinations.length} / 3
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.tourPersonalizado.duracaoEstimada}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {estimatedDuration}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.preco}444
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    A consultar 444
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-4">
                <h4 className="font-semibold text-foreground text-sm">
                  {t.tourPersonalizado.infoAdicional}
                </h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>{t.tourPersonalizado.flexibilidadeTotal}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>{t.tourPersonalizado.inclusoTransporte}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>{t.tourPersonalizado.motoristaDedicado}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>{t.tourPersonalizado.roteiroPersonalizado}</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleRequestQuote}
                disabled={
                  selectedDestinations.length === 0 || phoneNumber === ""
                }
                className="w-full mt-6"
              >
                {t.tourPersonalizado.solicitarOrcamento}
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
