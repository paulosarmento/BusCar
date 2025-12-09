import Link from "next/link";
import { ArrowLeft, MapPin, Users, Clock } from "lucide-react";
import Header from "@/app/components/Header";
import { Button } from "@/app/components/button";

// Dados detalhados de cada destino da Região dos Lagos
const destinationDetails: Record<string, any> = {
  buzios: {
    name: "Armação dos Búzios",
    image: "/images/buzios-armacao-beach.jpg",
    description:
      "Armação dos Búzios é um destino turístico paradisíaco, conhecida por suas praias selvagens e atmosfera cosmopolita.",
    fullDescription: `Localizado a 168 km do Rio de Janeiro, Búzios é um dos destinos mais procurados da Região dos Lagos. Com mais de 20 praias incríveis, cada uma com características únicas, oferece desde praias selvagens até praias mais infraestruturadas. A vila de Búzios combina charme rústico com sofisticação, com restaurantes premiados, galerias de arte e vida noturna animada. O pôr do sol em Búzios é especialmente famoso.`,
    highlights: [
      "Mais de 20 praias espetaculares",
      "Pôr do sol romance",
      "Charme cosmopolita",
      "Restaurantes sofisticados",
      "Galerias de arte e vida cultural",
    ],
    passengers: "1-4",
    bestTime: "O ano todo, especialmente primavera e verão (setembro a março)",
    estimatedCost: "A partir de R$ 80,00 até R$ 120,00 do centro do Rio",
  },
  "arraial-do-cabo": {
    name: "Arraial do Cabo",
    image: "/images/arraial-do-cabo-beach.jpg",
    description:
      "Arraial do Cabo é conhecida como a 'Caribe brasileira' com águas cristalinas e praias de areia branca.",
    fullDescription: `Arraial do Cabo é famosa por suas águas cristalinas e praia de areia branca, lembrando o Caribe. Localizada a 160 km do Rio, é ideal para mergulho e atividades aquáticas. A Praia do Forno é a mais famosa, com águas transparentes. O Pontal do Atalaia oferece vistas panorâmicas incríveis.`,
    highlights: [
      "Águas cristalinas tipo Caribe",
      "Praias de areia branca",
      "Mergulho espetacular",
      "Pontal do Atalaia com vista panorâmica",
      "Fauna marinha abundante",
    ],
    passengers: "1-4",
    bestTime: "Verão (dezembro a março)",
    estimatedCost: "A partir de R$ 85,00 até R$ 125,00 do centro do Rio",
  },
  "cabo-frio": {
    name: "Cabo Frio",
    image: "/images/cabo-frio-lighthouse.jpg",
    description:
      "Balneário tradicional com farol histórico, praias bonitas e movimentação comercial.",
    fullDescription: `Cabo Frio é um balneário tradicional da Região dos Lagos, a 165 km do Rio de Janeiro. Conhecido pelo seu farol histórico de 1881, pela Praia do Forte (antiga Praia do Centro) e pela infraestrutura turística completa. É um importante destino de turismo aquático e oferece ótimas praias para banho.`,
    highlights: [
      "Farol histórico de 1881",
      "Praias com infraestrutura",
      "Forte de São Mateus histórico",
      "Centro comercial vibrante",
      "Ótimo para famílias",
    ],
    passengers: "1-4",
    bestTime: "O ano todo, especialmente verão",
    estimatedCost: "A partir de R$ 75,00 até R$ 110,00 do centro do Rio",
  },
  "sao-pedro": {
    name: "São Pedro da Aldeia",
    image: "/images/sao-pedro-aldeia-beach.jpg",
    description:
      "Município histórico com praias tranquilas e rica herança cultural e colonial.",
    fullDescription: `São Pedro da Aldeia é um município com rica herança histórica e colonial, localizado a 140 km do Rio. Famoso por sua Igreja de São Pedro datada de 1632, oferece praias tranquilas e um ambiente mais calmo que Búzios. A região é conhecida também pela produção de sal e lagoa.`,
    highlights: [
      "Igreja histórica de 1632",
      "Patrimônio cultural colonial",
      "Praias tranquilas",
      "Lagoa do Araruama",
      "Ambiente cultural preservado",
    ],
    passengers: "1-4",
    bestTime: "O ano todo",
    estimatedCost: "A partir de R$ 65,00 até R$ 100,00 do centro do Rio",
  },
  "rio-ostras": {
    name: "Rio das Ostras",
    image: "/images/rio-ostras-beach.jpg",
    description:
      "Praia tranquila e acolhedora, perfeita para famílias com infraestrutura completa.",
    fullDescription: `Rio das Ostras é conhecida como a 'Capital do Turismo de Bem-estar' pela sua atmosfera tranquila e acolhedora. Localizada a 155 km do Rio, oferece praias limpas, seguras e com ótima infraestrutura. É popular entre famílias por suas águas calmas e ambiente seguro.`,
    highlights: [
      "Praias tranquilas e seguras",
      "Ótima infraestrutura",
      "Ideal para famílias",
      "Natureza bem preservada",
      "Ambiente acolhedor",
    ],
    passengers: "1-4",
    bestTime: "O ano todo",
    estimatedCost: "A partir de R$ 70,00 até R$ 105,00 do centro do Rio",
  },
  macae: {
    name: "Macaé",
    image: "/images/macae-beach-rio-de-janeiro.jpg",
    description:
      "Polo industrial e turístico com praias selvagens e natureza exuberante.",
    fullDescription: `Macaé é um polo industrial importante também conhecido como destino turístico com praias selvagens. Localizado a 180 km do Rio, oferece uma natureza exuberante com praias menos exploradas e ambiente preservado. A região é famosa pelo pôr do sol.`,
    highlights: [
      "Praias selvagens",
      "Natureza preservada",
      "Pôr do sol espetacular",
      "Menos turismo de massa",
      "Infraestrutura em crescimento",
    ],
    passengers: "1-4",
    bestTime: "Primavera e verão",
    estimatedCost: "A partir de R$ 90,00 até R$ 130,00 do centro do Rio",
  },
  araruama: {
    name: "Araruama",
    image: "/images/araruama-lagoon.jpg",
    description:
      "Conhecida por sua lagoa única com águas quentes, ideal para relaxamento e turismo.",
    fullDescription: `Araruama é famosa pela sua lagoa única com águas termais naturais, perfeita para relaxamento e terapia. Localizada a 120 km do Rio, é mais próxima e oferece praias com águas mornas o ano todo. A lagoa é conhecida por seus benefícios terapêuticos.`,
    highlights: [
      "Lagoa com águas termais",
      "Benefícios terapêuticos",
      "Praias com águas mornas",
      "Mais próxima do Rio",
      "Relaxamento garantido",
    ],
    passengers: "1-4",
    bestTime: "O ano todo, especialmente inverno",
    estimatedCost: "A partir de R$ 50,00 até R$ 85,00 do centro do Rio",
  },
  iguaba: {
    name: "Iguaba Grande",
    image: "/images/iguaba-grande-beach.jpg",
    description:
      "Pérola da Região dos Lagos com praias selvagens, natureza preservada e tranquilidade.",
    fullDescription: `Iguaba Grande é considerada a pérola da Região dos Lagos, com praias selvagens e preservadas. Localizada a 145 km do Rio, oferece um ambiente tranquilo, pouco explorado turisticamente, com natureza exuberante e praias intocadas. Perfeita para quem busca paz e contato com a natureza.`,
    highlights: [
      "Praias selvagens e preservadas",
      "Natureza exuberante",
      "Ambiente tranquilo",
      "Menos turismo comercial",
      "Contato com a natureza",
    ],
    passengers: "1-4",
    bestTime: "O ano todo",
    estimatedCost: "A partir de R$ 70,00 até R$ 110,00 do centro do Rio",
  },
};

export default function LagosDestinationPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const destination = (params as any).destination;
  const data = destinationDetails[destination] || destinationDetails["buzios"];

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
              Voltar para Viagens
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
                Sobre {data.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {data.fullDescription}
              </p>

              <h3 className="text-xl font-bold mb-4 text-foreground">
                Destaques
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
                  <h4 className="font-semibold text-foreground">Capacidade</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {data.passengers}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">
                    Melhor Horário
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">{data.bestTime}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">
                    Custo Estimado
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {data.estimatedCost}
                </p>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">
                Solicitar Corrida
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Destinations */}
      <section className="bg-muted/50 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Outros Destinos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(destinationDetails)
              .filter((key) => key !== destination)
              .slice(0, 4)
              .map((key) => (
                <Link key={key} href={`/lagos/${key}`}>
                  <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <p className="font-semibold text-foreground text-sm">
                      {destinationDetails[key].name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      → Conhecer mais
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

export async function generateStaticParams() {
  return Object.keys(destinationDetails).map((destination) => ({
    destination,
  }));
}
