"use client";
import Link from "next/link";
import Header from "../components/Header";
import { Card } from "../components/card";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "@/lib/translations";

// Dados dos tours disponíveis
const tours = [
  {
    id: "tour-rio-classico",
    name: "Tour Clássico do Rio",
    description:
      "Conheça os principais pontos turísticos do Rio de Janeiro em um dia completo.",
    image: "/images/tour-rio-classico.jpg",
    duration: "8-10 horas",
    highlights: ["Cristo Redentor", "Copacabana", "Ipanema", "Pão de Açúcar"],
    capacity: "1-4 pessoas",
    price: "Consultar",
  },
  {
    id: "tour-praias-rio",
    name: "Tour das Praias do Rio",
    description:
      "Um dia tranquilo explorando as praias mais incríveis da zona sul.",
    image: "/images/tour-praias-rio.jpg",
    duration: "8 horas",
    highlights: ["Copacabana", "Ipanema", "Leblon", "Praia Vermelha"],
    capacity: "1-4 pessoas",
    price: "Consultar",
  },
  {
    id: "tour-lagos-completo",
    name: "Tour Completo Região dos Lagos",
    description: "Explore toda a Região dos Lagos em um dia inesquecível.",
    image: "/images/tour-lagos-completo.jpg",
    duration: "10-12 horas",
    highlights: [
      "Armação dos Búzios",
      "Arraial do Cabo",
      "Cabo Frio",
      "Mais opções",
    ],
    capacity: "1-4 pessoas",
    price: "Consultar",
  },
  {
    id: "tour-buzios-dia",
    name: "Dia em Armação dos Búzios",
    description:
      "Um dia completo neste paraíso com praias e restaurantes paradisíacos.",
    image: "/images/tour-buzios-dia.jpg",
    duration: "9-10 horas",
    highlights: ["Praia da Ferradura", "Geribá", "Marina", "Vida noturna"],
    capacity: "1-4 pessoas",
    price: "Consultar",
  },
  {
    id: "tour-aventura",
    name: "Tour de Aventura",
    description:
      "Para os mais aventureiros! Trilhas e atividades radicais na região.",
    image: "/images/tour-aventura.jpg",
    duration: "8-10 horas",
    highlights: ["Trilhas", "Cachoeiras", "Esportes radicais", "Natureza"],
    capacity: "1-4 pessoas",
    price: "Consultar",
  },
  {
    id: "tour-cultural",
    name: "Tour Cultural e Histórico",
    description: "Mergulhe na história e cultura do Rio de Janeiro.",
    image: "/images/tour-cultural.jpg",
    duration: "6-8 horas",
    highlights: ["Centro Histórico", "Museus", "Arquitetura Colonial", "Arte"],
    capacity: "1-4 pessoas",
    price: "Consultar",
  },
  {
    id: "tour-gastronomico",
    name: "Tour Gastronômico",
    description: "Descubra os melhores sabores e restaurantes locais.",
    image: "/images/tour-gastronomico.jpg",
    duration: "6-8 horas",
    highlights: [
      "Restaurantes gourmet",
      "Comida local",
      "Bebidas regionais",
      "Mercados",
    ],
    capacity: "1-4 pessoas",
    price: "Consultar",
  },
  {
    id: "tour-personalizado",
    name: "Tour Personalizado",
    description: "Crie seu próprio roteiro! Escolha os locais e horários.",
    image: "/images/tour-personalizado.jpg",
    duration: "Flexível",
    highlights: [
      "Customizável",
      "Sua escolha",
      "Flexibilidade total",
      "Até 12h",
    ],
    capacity: "1-4 pessoas",
    price: "Consultar",
  },
];

export default function ToursPage() {
  const { language } = useLanguage();

  const t = translations[language];

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t.toursTitulo}
          </h1>
          <p className="text-lg opacity-90">{t.toursSubtitulo}</p>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-muted">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Como Funcionam Nossos Tours?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <h3 className="font-semibold text-foreground mb-2">
                Escolha seu tour
              </h3>
              <p className="text-sm text-muted-foreground">
                Selecione um dos tours pré-montados ou crie seu próprio roteiro
                personalizado
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <h3 className="font-semibold text-foreground mb-2">
                Dia inteiro
              </h3>
              <p className="text-sm text-muted-foreground">
                Aproveite o dia inteiro visitando diversos locais com transporte
                confortável
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <h3 className="font-semibold text-foreground mb-2">
                Retorno garantido
              </h3>
              <p className="text-sm text-muted-foreground">
                Voltamos para qualquer local da região ao final do dia para sua
                conveniência
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <Link key={tour.id} href={`/tours/${tour.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <div className="relative overflow-hidden bg-muted h-48">
                  <img
                    src={
                      tour.image ||
                      "/placeholder.svg?height=192&width=400&query=tour"
                    }
                    alt={tour.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {tour.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {tour.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs font-medium text-primary">
                      {tour.duration}
                    </span>
                    <span className="text-xs text-muted-foreground">→</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Pronto para sua aventura?
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Entre em contato para reservar seu tour ou esclarecer dúvidas
        </p>
        <Link
          href="/contato"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition"
        >
          Agende Agora
        </Link>
      </section>
    </div>
  );
}
