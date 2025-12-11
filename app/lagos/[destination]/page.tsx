"use client";
import Link from "next/link";
import { ArrowLeft, MapPin, Users, Clock } from "lucide-react";
import Header from "@/app/components/Header";
import { Button } from "@/app/components/button";
import { useLanguage } from "@/app/context/LanguageContext";
import { translationsLagos } from "@/lib/translationsLagos";
import React from "react";

export default function LagosDestinationPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { language } = useLanguage();
  const t = translationsLagos[language];

  const { destination } = React.use(params);
  const data =
    t.DESTINATIONSDETAILS[destination as keyof typeof t.DESTINATIONSDETAILS] ||
    t.DESTINATIONSDETAILS["buzios"];

  return (
    <div>
      <Header />

      {/* Hero Section com Imagem */}
      <section className="relative w-full h-96 overflow-hidden">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              {data.name}
            </h1>
            <p className="text-lg text-white/90">{data.description}</p>
          </div>
        </div>
      </section>

      {/* Navigation Back */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/lagos">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t.voltarParaViagens}
            </Button>
          </Link>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-sm max-w-none">
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                {t.sobre} {data.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {data.fullDescription}
              </p>

              <h3 className="text-xl font-bold mb-4 text-foreground">
                {t.destaques}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {data.highlights.map((highlight: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Info */}
          <div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">
                    {t.capacidade}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {data.passengers}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">
                    {t.melhorHorario}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">{data.bestTime}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">
                    {t.custoEstimado}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {data.estimatedCost}
                </p>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">
                {t.solicitarCorrida}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Destinations */}
      <section className="bg-muted/50 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            {t.outrosDestinos}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(t.DESTINATIONSDETAILS)
              .filter((key) => key !== destination)
              .slice(0, 4)
              .map((key) => (
                <Link key={key} href={`/lagos/${key}`}>
                  <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <p className="font-semibold text-foreground text-sm">
                      {
                        t.DESTINATIONSDETAILS[
                          key as keyof typeof t.DESTINATIONSDETAILS
                        ].name
                      }
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      → {t.conhecerMais}
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
