"use client";
import Link from "next/link";
import Header from "../components/Header";
import { Card } from "../components/card";
import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import { translations } from "@/lib/translations";

// Dados dos destinos da Região dos Lagos
const destinations = [
  {
    id: "buzios",
    name: "Armação dos Búzios",
    description:
      "Destino turístico paradisíaco com praias selvagens, pôr do sol espetacular e charme cosmopolita.",
    image: "/images/buzios-armacao-beach.jpg",
    passengers: "1-4",
  },
  {
    id: "arraial-do-cabo",
    name: "Arraial do Cabo",
    description:
      "Conhecida como a 'Caribe brasileira' com águas cristalinas e praias de areia branca.",
    image: "/images/arraial-do-cabo-beach.jpg",
    passengers: "1-4",
  },
  {
    id: "cabo-frio",
    name: "Cabo Frio",
    description:
      "Balneário tradicional com farol histórico, praias bonitas e movimentação comercial.",
    image: "/images/cabo-frio-lighthouse.jpg",
    passengers: "1-4",
  },
  {
    id: "sao-pedro",
    name: "São Pedro da Aldeia",
    description:
      "Município histórico com praias tranquilas e rica herança cultural e colonial.",
    image: "/images/sao-pedro-aldeia-beach.jpg",
    passengers: "1-4",
  },
  {
    id: "rio-ostras",
    name: "Rio das Ostras",
    description:
      "Praia tranquila e acolhedora, perfeita para famílias com infraestrutura completa.",
    image: "/images/rio-ostras-beach.jpg",
    passengers: "1-4",
  },
  {
    id: "macae",
    name: "Macaé",
    description:
      "Polo industrial e turístico com praias selvagens e natureza exuberante.",
    image: "/images/macae-beach-rio-de-janeiro.jpg",
    passengers: "1-4",
  },
  {
    id: "araruama",
    name: "Araruama",
    description:
      "Conhecida por sua lagoa única com águas quentes, ideal para relaxamento e turismo.",
    image: "/images/araruama-lagoon.jpg",
    passengers: "1-4",
  },
  {
    id: "iguaba",
    name: "Iguaba Grande",
    description:
      "Pérola da Região dos Lagos com praias selvagens, natureza preservada e tranquilidade.",
    image: "/images/iguaba-grande-beach.jpg",
    passengers: "1-4",
  },
];

export default function LagosPage() {
  const { language } = useLanguage();

  const t = translations[language];

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t.regiaoLagosTitulo}
          </h1>
          <p className="text-lg opacity-90">{t.regiaoLagosDescricao}</p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Link key={destination.id} href={`/lagos/${destination.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <div className="relative overflow-hidden bg-muted h-48">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs font-medium text-primary">
                      Passageiros: {destination.passengers}
                    </span>
                    <span className="text-xs text-muted-foreground">→</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
