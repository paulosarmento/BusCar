import Link from "next/link";
import { ArrowLeft, MapPin, Users, Clock } from "lucide-react";
import Header from "@/app/components/Header";
import { Button } from "@/app/components/button";

// Dados detalhados de cada destino
const destinationDetails: Record<string, any> = {
  copacabana: {
    name: "Copacabana",
    image: "/images/copacabana-beach-aerial-view.jpg",
    description:
      "Copacabana é uma das praias mais icônicas do Rio de Janeiro e do Brasil. Conhecida mundialmente por suas areias douradas, água cristalina e ambiente vibrante.",
    fullDescription: `Copacabana atrai turistas e moradores locais com sua praia extensa de 4,5 km. A região oferece uma vida noturna animada com bares, restaurantes e casas noturnas. Durante o dia, é possível desfrutar de praia, esportes aquáticos e eventos culturais. A orla é perfeita para caminhadas e tem diversos quiosques com comidas e bebidas típicas.`,
    highlights: [
      "Praia com 4,5 km de extensão",
      "Forte de Copacabana histórico",
      "Vida noturna vibrante",
      "Diversos restaurantes e bares",
      "Esportes aquáticos e atividades",
    ],
    passengers: "1-4",
    bestTime: "O ano todo, especialmente no verão (dezembro a fevereiro)",
    estimatedCost: "A partir de R$ 25,00",
  },
  "cristo-redentor": {
    name: "Cristo Redentor",
    image: "/images/cristo-redentor-statue-rio-de-janeiro.jpg",
    description:
      "O Cristo Redentor é o símbolo mais famoso do Rio de Janeiro e uma das Sete Maravilhas do Mundo.",
    fullDescription: `Localizado no topo do Morro do Corcovado, o Cristo Redentor oferece vistas panorâmicas 360 graus do Rio de Janeiro. Com 38 metros de altura e pesando 635 toneladas, é uma obra-prima da engenharia. Recebe mais de 2 milhões de visitantes por ano.`,
    highlights: [
      "Vistas panorâmicas 360 graus",
      "Patrimônio da UNESCO",
      "Uma das Sete Maravilhas",
      "Museu interativo",
      "Fácil acesso por trem ou van",
    ],
    passengers: "1-4",
    bestTime: "Dias claros, evitar dias muito nublados",
    estimatedCost: "A partir de R$ 30,00",
  },
  ipanema: {
    name: "Ipanema",
    image: "/images/ipanema-beach-rio-de-janeiro-sunset.jpg",
    description:
      "Ipanema é sinônimo de sofisticação, elegância e qualidade de vida no Rio.",
    fullDescription: `Bairro tradicional da zona sul carioca, Ipanema é conhecido por suas praias lindas, shoppings, restaurantes e bares sofisticados. É um importante ponto cultural e comercial da cidade. A praia de Ipanema é mais tranquila que Copacabana.`,
    highlights: [
      "Praia tranquila e charmosa",
      "Shoppings de qualidade",
      "Restaurantes sofisticados",
      "Galeria de arte e cultura",
      "Vida noturna elegante",
    ],
    passengers: "1-4",
    bestTime: "O ano todo, especialmente finais de semana",
    estimatedCost: "A partir de R$ 28,00",
  },
  galeao: {
    name: "Galeão - Aeroporto Internacional",
    image: "/images/rio-de-janeiro-international-airport.jpg",
    description:
      "O Aeroporto Internacional Tom Jobim (Galeão) é o principal aeroporto do Rio de Janeiro.",
    fullDescription: `O Galeão fica localizado na Ilha do Governador, a aproximadamente 20 km do centro do Rio. É o terminal de saídas e chegadas de voos internacionais e diversos voos domésticos. O aeroporto oferece ótimas instalações e conexões com a cidade.`,
    highlights: [
      "Aeroporto internacional",
      "A 20 km do centro",
      "Terminal moderno",
      "Boas conexões de transporte",
      "Serviços completos",
    ],
    passengers: "1-4",
    bestTime: "Disponível 24 horas",
    estimatedCost: "A partir de R$ 45,00 até o centro",
  },
  "santos-dumont": {
    name: "Santos Dumont - Aeroporto Central",
    image: "/images/santos-dumont-airport-downtown-rio.jpg",
    description:
      "O Aeroporto Santos Dumont é o aeroporto mais central do Rio de Janeiro.",
    fullDescription: `Localizado na Baía de Guanabara, próximo ao centro histórico, o Santos Dumont é conhecido como 'Aeroporto do Centro'. Recebe principalmente voos domésticos de curta distância e é muito conveniente para quem quer economizar tempo.`,
    highlights: [
      "Localização central",
      "Próximo ao Museu do Amanhã",
      "Voos domésticos",
      "Acesso rápido ao centro",
      "Terminal compacto",
    ],
    passengers: "1-4",
    bestTime: "Disponível 24 horas",
    estimatedCost: "A partir de R$ 20,00 até o centro",
  },
  rodoviario: {
    name: "Rodoviário Novo Rio",
    image: "/images/novo-rio-bus-terminal.jpg",
    description:
      "O Rodoviário Novo Rio é o principal terminal rodoviário do Rio de Janeiro.",
    fullDescription: `Localizado na região portuária, o Novo Rio conecta a cidade a mais de 1.000 cidades em todo o Brasil. É um importante centro de transporte interestadual com modernos serviços e facilidades.`,
    highlights: [
      "Terminal moderno",
      "Conexões para todo Brasil",
      "Mais de 1.000 destinos",
      "Restaurantes e serviços",
      "Segurança e conforto",
    ],
    passengers: "1-4",
    bestTime: "Disponível 24 horas, evitar horários de pico",
    estimatedCost: "A partir de R$ 15,00 até o centro",
  },
  "monte-verde": {
    name: "Monte Verde",
    image: "/images/monte-verde-neighborhood-rio-de-janeiro.jpg",
    description:
      "Monte Verde é uma região residencial privilegiada com vistas espetaculares da cidade.",
    fullDescription: `Localizada na zona sul, Monte Verde oferece uma combinação perfeita de residências sofisticadas com acesso próximo às melhores áreas do Rio. A região é conhecida por seus condomínios de qualidade, segurança e qualidade de vida.`,
    highlights: [
      "Vistas panorâmicas",
      "Região residencial segura",
      "Condomínios sofisticados",
      "Acesso à zona sul",
      "Qualidade de vida",
    ],
    passengers: "1-4",
    bestTime: "O ano todo",
    estimatedCost: "A partir de R$ 22,00 até o centro",
  },
  centro: {
    name: "Centro Histórico",
    image: "/images/centro-historico-rio-de-janeiro-downtown.jpg",
    description: "O Centro do Rio é o coração histórico e comercial da cidade.",
    fullDescription: `O Centro histórico concentra importantes instituições culturais, museus, teatros e instituições financeiras. É possível encontrar arquitetura colonial, edifícios modernos e uma vida cultural intensa. Passeios pelo Centro revelam a riqueza histórica do Rio.`,
    highlights: [
      "Patrimônio histórico",
      "Museus e teatros",
      "Architetura colonial e moderna",
      "Centro comercial",
      "Vida cultural intensa",
    ],
    passengers: "1-4",
    bestTime: "Durante o dia para turismo",
    estimatedCost: "A partir de R$ 15,00 até zona sul",
  },
};

export default function DestinationPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  // Resolver o params (necessário no Next.js 16)
  const destination = (params as any).destination;
  const data =
    destinationDetails[destination] || destinationDetails["copacabana"];

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
          <Link href="/rio">
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
                <Link key={key} href={`/rio/${key}`}>
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
