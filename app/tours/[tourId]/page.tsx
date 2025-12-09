import { Card } from "@/app/components/card";
import Header from "@/app/components/Header";
import Link from "next/link";

// Dados dos tours - replicado para uso na página individual
const toursData: Record<string, any> = {
  "tour-rio-classico": {
    name: "Tour Clássico do Rio",
    description:
      "Conheça os principais pontos turísticos do Rio de Janeiro em um dia completo.",
    image: "/images/tour-rio-classico.jpg",
    duration: "8-10 horas",
    highlights: ["Cristo Redentor", "Copacabana", "Ipanema", "Pão de Açúcar"],
    capacity: "1-4 pessoas",
    price: "Consultar",
    fullDescription:
      "Este é o tour mais completo para conhecer o Rio de Janeiro em um único dia. Visitaremos os principais cartões postais da cidade, incluindo o famoso Cristo Redentor com sua vista panorâmica de 360 graus, as praias de Copacabana e Ipanema, além do icônico Pão de Açúcar. Você terá tempo para fotos, compras e até uma parada para refeição.",
    itinerary: [
      "Manhã: Saída para Cristo Redentor",
      "Almoço em local escolhido",
      "Tarde: Praias de Copacabana e Ipanema",
      "Final da tarde: Pão de Açúcar ou outras atrações",
      "Retorno ao local de partida",
    ],
    includes: [
      "Transporte confortável durante todo o dia",
      "Motorista experiente e conhecedor da cidade",
      "Flexibilidade de horários e paradas",
      "Dicas locais e recomendações",
      "Retorno garantido ao final do dia",
    ],
    notIncludes: [
      "Ingressos de atrações",
      "Refeições",
      "Bebidas",
      "Compras pessoais",
    ],
    bestFor: "Visitantes pela primeira vez, famílias, grupos de amigos",
  },
  "tour-praias-rio": {
    name: "Tour das Praias do Rio",
    description:
      "Um dia tranquilo explorando as praias mais incríveis da zona sul.",
    image: "/images/tour-praias-rio.jpg",
    duration: "8 horas",
    highlights: ["Copacabana", "Ipanema", "Leblon", "Praia Vermelha"],
    capacity: "1-4 pessoas",
    price: "Consultar",
    fullDescription:
      "Passe um dia perfeito em algumas das praias mais incríveis do Rio de Janeiro. Este tour é ideal para quem quer relaxar, aproveitar o mar e mergulhar na cultura de praia carioca.",
    itinerary: [
      "Manhã: Praia de Copacabana",
      "Meio da manhã: Transição para Ipanema",
      "Almoço em restaurante à beira-mar",
      "Tarde: Leblon e Praia Vermelha",
      "Final da tarde: Retorno ao ponto de saída",
    ],
    includes: [
      "Transporte entre praias",
      "Conhecimento de melhores pontos de cada praia",
      "Dicas de segurança e cultura local",
      "Paradas para fotos",
    ],
    notIncludes: ["Refeições", "Bebidas", "Aluguel de cadeiras e guarda-sol"],
    bestFor: "Amantes de praia, relaxamento, famílias com crianças",
  },
  "tour-lagos-completo": {
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
    fullDescription:
      "Descubra a beleza única da Região dos Lagos, com suas praias de águas cristalinas, chalés coloridos e a famosa vida noturna. Este é um tour de dia inteiro para explorar os melhores destinos.",
    itinerary: [
      "Saída cedo para a Região dos Lagos",
      "Parada em Armação dos Búzios",
      "Almoço em Arraial do Cabo ou Cabo Frio",
      "Exploração de múltiplos pontos turísticos",
      "Retorno ao final da tarde",
    ],
    includes: [
      "Transporte confortável por toda a região",
      "Conhecimento de praias secretas",
      "Recomendações de restaurantes",
      "Flexibilidade de roteiro",
    ],
    notIncludes: ["Refeições", "Atividades aquáticas", "Combustível adicional"],
    bestFor: "Turistas aventureiros, grupos, lua de mel",
  },
  "tour-buzios-dia": {
    name: "Dia em Armação dos Búzios",
    description:
      "Um dia completo neste paraíso com praias e restaurantes paradisíacos.",
    image: "/images/tour-buzios-dia.jpg",
    duration: "9-10 horas",
    highlights: ["Praia da Ferradura", "Geribá", "Marina", "Vida noturna"],
    capacity: "1-4 pessoas",
    price: "Consultar",
    fullDescription:
      "Armação dos Búzios é um dos destinos mais românticos e belíssimos da Região dos Lagos. Passe o dia inteiro neste paraíso, com suas praias paradisíacas e atmosfera sofisticada.",
    itinerary: [
      "Saída para Búzios",
      "Manhã: Exploração de praias",
      "Almoço em restaurante local",
      "Tarde: Compras na Rua das Pedras",
      "Final da tarde: Retorno",
    ],
    includes: [
      "Transporte ida e volta",
      "Dicas de melhores praias",
      "Recomendações de restaurantes",
      "Informações sobre a vida noturna",
    ],
    notIncludes: ["Refeições", "Atividades aquáticas", "Roupas de praia"],
    bestFor: "Casais, românticos, visitantes sofisticados",
  },
  "tour-aventura": {
    name: "Tour de Aventura",
    description:
      "Para os mais aventureiros! Trilhas e atividades radicais na região.",
    image: "/images/tour-aventura.jpg",
    duration: "8-10 horas",
    highlights: ["Trilhas", "Cachoeiras", "Esportes radicais", "Natureza"],
    capacity: "1-4 pessoas",
    price: "Consultar",
    fullDescription:
      "Para os mais corajosos e amantes da natureza! Este tour oferece experiências radicais e trilhas emocionantes na região.",
    itinerary: [
      "Manhã: Trilhas em contato com a natureza",
      "Parada em cachoeiras para banho",
      "Almoço tipo piquenique",
      "Tarde: Atividades radicais selecionadas",
      "Retorno ao final do dia",
    ],
    includes: [
      "Transporte a locais remotos",
      "Conhecimento de trilhas seguras",
      "Orientações de segurança",
      "Contato com natureza",
    ],
    notIncludes: [
      "Equipamento especializado",
      "Refeições elaboradas",
      "Seguros adicionais",
    ],
    bestFor: "Aventureiros, jovens ativos, grupos de amigos",
  },
  "tour-cultural": {
    name: "Tour Cultural e Histórico",
    description: "Mergulhe na história e cultura do Rio de Janeiro.",
    image: "/images/tour-cultural.jpg",
    duration: "6-8 horas",
    highlights: ["Centro Histórico", "Museus", "Arquitetura Colonial", "Arte"],
    capacity: "1-4 pessoas",
    price: "Consultar",
    fullDescription:
      "Explore o lado histórico e cultural do Rio, visitando museus, arquitetura colonial e conhecendo mais sobre a formação da cidade.",
    itinerary: [
      "Manhã: Centro Histórico e seus pontos culturais",
      "Visita a museus selecionados",
      "Almoço em restaurante histórico",
      "Tarde: Exploração de bairros culturais",
      "Retorno",
    ],
    includes: [
      "Transporte entre locais culturais",
      "Conhecimento histórico do motorista",
      "Recomendações de museus",
      "Dicas culturais",
    ],
    notIncludes: ["Ingressos de museus", "Refeições", "Guia profissional"],
    bestFor: "Curiosos pela história, intelectuais, acadêmicos",
  },
  "tour-gastronomico": {
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
    fullDescription:
      "Para os apaixonados por gastronomia! Visite os melhores restaurantes, mercados e experimente as delícias locais.",
    itinerary: [
      "Manhã: Mercados e feiras locais",
      "Brunch em restaurante selecionado",
      "Almoço gourmet",
      "Tarde: Cafés e atrações culinárias",
      "Finalização com compras gastronômicas",
    ],
    includes: [
      "Transporte entre restaurantes",
      "Recomendações personalizadas",
      "Conhecimento de melhores pratos",
      "Dicas de melhor custo-benefício",
    ],
    notIncludes: ["Refeições e bebidas", "Degustações pré-pagas"],
    bestFor: "Amantes de gastronomia, food lovers, grupos sociais",
  },
  "tour-personalizado": {
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
    fullDescription:
      "Quer um tour totalmente personalizado? Crie seu próprio roteiro de acordo com seus interesses e preferências. Você escolhe os locais, horários e atividades.",
    itinerary: [
      "Discutir preferências e interesses",
      "Montar roteiro customizado",
      "Executar tour conforme planejado",
      "Flexibilidade para mudanças durante o dia",
      "Retorno conforme combinado",
    ],
    includes: [
      "Transporte durante o dia inteiro",
      "Flexibilidade total de horários",
      "Motorista experiente e conhecedor",
      "Adaptações conforme necessário",
    ],
    notIncludes: [
      "Ingressos específicos",
      "Refeições",
      "Atividades extras com custo",
    ],
    bestFor: "Todos! Máxima flexibilidade para sua experiência perfeita",
  },
};

interface Params {
  tourId: string;
}

export async function generateStaticParams() {
  return Object.keys(toursData).map((tourId) => ({
    tourId,
  }));
}

export default function TourDetailPage({ params }: { params: Params }) {
  const tour = toursData[params.tourId];

  if (!tour) {
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Tour não encontrado
          </h1>
          <Link href="/tours" className="text-primary hover:underline">
            Voltar para Tours
          </Link>
        </div>
      </div>
    );
  }

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
    </div>
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const tour = toursData[params.tourId];
  return {
    title: tour?.name || "Tour",
    description:
      tour?.description || "Um tour personalizado pelo Rio de Janeiro",
  };
}
