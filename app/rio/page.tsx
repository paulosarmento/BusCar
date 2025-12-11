"use client";
import Link from "next/link";
import Header from "../components/Header";
import { Card } from "../components/card";
import { useLanguage } from "../context/LanguageContext";
import { translationsRio } from "@/lib/translationsRio";

export default function RioPage() {
  const { language } = useLanguage();

  const t = translationsRio[language];
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t.regiaoRioTitulo}
          </h1>
          <p className="text-lg opacity-90">{t.regiaoRioDescricao}</p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.DESTINATIONS.map((destination) => (
            <Link key={destination.id} href={`/rio/${destination.id}`}>
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
                      {destination.passengers}
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
