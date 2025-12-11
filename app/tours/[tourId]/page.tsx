"use client";
import { Card } from "@/app/components/card";
import Header from "@/app/components/Header";
import { useLanguage } from "@/app/context/LanguageContext";
import { translationsTours } from "@/lib/translationsTours";
import Link from "next/link";
import React from "react";

export default function TourDetailPage({
  params,
}: {
  params: Promise<{ tourId: string }>;
}) {
  const { language } = useLanguage();
  const t = translationsTours[language];

  const { tourId } = React.use(params);

  const tour =
    t.DESTINATIONSDETAILS[tourId as keyof typeof t.DESTINATIONSDETAILS] ||
    t.DESTINATIONSDETAILS[
      "rio-de-janeiro" as keyof typeof t.DESTINATIONSDETAILS
    ];
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-muted py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/tours"
            className="text-primary hover:underline mb-4 inline-block"
          >
            ← Voltar para Tours
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            {tour.name}
          </h1>
          <p className="text-lg text-muted-foreground">{tour.description}</p>
        </div>
      </section>

      {/* Main Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-hidden rounded-lg h-96 bg-muted">
          <img
            src={
              tour.image || "/placeholder.svg?height=384&width=1200&query=tour"
            }
            alt={tour.name}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Sobre este Tour
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {tour.fullDescription}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Itinerário
              </h2>
              <ul className="space-y-3">
                {tour.itinerary.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold">●</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  O que está incluído
                </h3>
                <ul className="space-y-2">
                  {tour.includes.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  O que NÃO está incluído
                </h3>
                <ul className="space-y-2">
                  {tour.notIncludes.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground">-</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="p-6 sticky top-4">
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <p className="text-sm text-muted-foreground mb-1">Duração</p>
                  <p className="text-lg font-semibold text-foreground">
                    {tour.duration}
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Capacidade
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {tour.capacity}
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <p className="text-sm text-muted-foreground mb-1">Preço</p>
                  <p className="text-lg font-semibold text-foreground">
                    {tour.price}
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Melhor para
                  </p>
                  <p className="text-sm text-foreground">{tour.bestFor}</p>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Destaques do tour:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tour.highlights.map((highlight: string, index: number) => (
                      <span
                        key={index}
                        className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold">
                  Solicitar Reserva
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Pronto para este tour?
          </h2>
          <p className="text-muted-foreground mb-8">
            Entre em contato para agendar sua experiência
          </p>
          <Link
            href="/contato"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition"
          >
            Fale Conosco
          </Link>
        </div>
      </section>
      <section className="bg-muted/50 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Outros Destinos
            {/* {t.outrosDestinos} */}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(t.DESTINATIONSDETAILS)
              .filter((key) => key !== tourId)
              .slice(0, 4)
              .map((key) => (
                <Link key={key} href={`/rio/${key}`}>
                  <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <p className="font-semibold text-foreground text-sm">
                      {
                        t.DESTINATIONSDETAILS[
                          key as keyof typeof t.DESTINATIONSDETAILS
                        ].name
                      }
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Conhecer mais
                      {/* → {t.conhecerMais} */}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
