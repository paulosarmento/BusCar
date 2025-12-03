import Link from "next/link";
import Header from "../components/Header";
import { Card } from "../components/card";

// Dados dos destinos do Rio
const destinations = [
  {
    id: "copacabana",
    name: "Copacabana",
    description:
      "Uma das praias mais famosas do Rio, conhecida por suas areias douradas e vida noturna vibrante.",
    image: "/images/copacabana-beach-rio.png",
    passengers: "15+",
  },
  {
    id: "cristo-redentor",
    name: "Cristo Redentor",
    description:
      "O ícone do Rio de Janeiro, oferecendo vistas panorâmicas espetaculares da cidade.",
    image: "/images/cristo-redentor-rio-de-janeiro.jpg",
    passengers: "8+",
  },
  {
    id: "ipanema",
    name: "Ipanema",
    description:
      "Praia elegante e charmosa, famosa pela cultura, moda e vibrante vida social.",
    image: "/images/ipanema-beach-rio-de-janeiro.jpg",
    passengers: "12+",
  },
  {
    id: "galeao",
    name: "Galeão (Aeroporto)",
    description:
      "Transferências para o principal aeroporto internacional do Rio de Janeiro.",
    image: "/images/airport-rio-de-janeiro.jpg",
    passengers: "1-4",
  },
  {
    id: "santos-dumont",
    name: "Santos Dumont (Aeroporto)",
    description:
      "Aeroporto central no coração do Rio, com voos domésticos e regionais.",
    image: "/images/santos-dumont-airport-rio.jpg",
    passengers: "1-4",
  },
  {
    id: "rodoviario",
    name: "Rodoviário Novo Rio",
    description:
      "Principal terminal rodoviário do Rio com conexões para todo o Brasil.",
    image: "/images/rodoviario-novo-rio-terminal.jpg",
    passengers: "1-8",
  },
  {
    id: "monte-verde",
    name: "Monte Verde",
    description:
      "Região residencial com vistas incríveis e acesso a diversos bairros.",
    image: "/images/monte-verde-rio-de-janeiro.jpg",
    passengers: "4-6",
  },
  {
    id: "centro",
    name: "Centro Histórico",
    description:
      "Coração histórico do Rio com museus, arquitetura colonial e vida cultural.",
    image: "/images/centro-rio-de-janeiro-historic.jpg",
    passengers: "6+",
  },
];

export default function RioPage() {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Viagens em Rio de Janeiro
          </h1>
          <p className="text-lg opacity-90">
            Conheça os principais destinos onde dirijo regularmente
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
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

export const metadata = {
  title: "Viagens em Rio de Janeiro",
  description:
    "Conheça os principais destinos e rotas onde dirijo como motorista de aplicativo no Rio de Janeiro",
};
