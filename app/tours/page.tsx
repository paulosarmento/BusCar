"use client";
import Link from "next/link";
import Header from "../components/Header";
import { Card } from "../components/Ui/card";
import { useLanguage } from "../context/LanguageContext";
import { translationsTours } from "@/lib/translationsTours";

export default function ToursPage() {
  const { language } = useLanguage();

  const t = translationsTours[language];

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
            {t.toursInfoTitulo}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.STEPS.map((step) => (
              <div key={step.id}>
                <div className="text-3xl font-bold text-primary mb-2">
                  {step.id}
                </div>

                <h3 className="font-semibold text-foreground mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.DESTINATIONS.map((tour) => (
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
          {t.toursCTATitulo}
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          {t.toursCTADescricao}
        </p>
        <Link
          href="/contact"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition"
        >
          {t.toursCTAButton}
        </Link>
      </section>
    </div>
  );
}
