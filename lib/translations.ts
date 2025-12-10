import { Package, ShieldCheck, UserCheck } from "lucide-react";

export const translations = {
  pt: {
    FEATURES: [
      {
        id: "comfort",
        title: "Conforto e Segurança",
        Icon: ShieldCheck,
      },
      {
        id: "driver",
        title: "Motorista Experiente",
        Icon: UserCheck,
      },
      {
        id: "luggage",
        title: "Bagageiro Disponível",
        Icon: Package,
      },
    ],

    DESTINATIONS: [
      {
        id: "copacabana",
        name: "Copacabana",
        description:
          "Uma das praias mais famosas do Rio, conhecida por suas areias douradas e vida noturna vibrante.",
        image: "/images/copacabana-beach-rio.png",
        passengers: "Passageiros: 1-4",
      },
      {
        id: "cristo-redentor",
        name: "Cristo Redentor",
        description:
          "O ícone do Rio de Janeiro, oferecendo vistas panorâmicas espetaculares da cidade.",
        image: "/images/cristo-redentor-rio-de-janeiro.jpg",
        passengers: "Passageiros: 1-4",
      },
      {
        id: "ipanema",
        name: "Ipanema",
        description:
          "Praia elegante e charmosa, famosa pela cultura, moda e vibrante vida social.",
        image: "/images/ipanema-beach-rio-de-janeiro.jpg",
        passengers: "Passageiros: 1-4",
      },
      {
        id: "galeao",
        name: "Galeão (Aeroporto)",
        description:
          "Transferências para o principal aeroporto internacional do Rio de Janeiro.",
        image: "/images/airport-rio-de-janeiro.jpg",
        passengers: "Passageiros: 1-4",
      },
      {
        id: "santos-dumont",
        name: "Santos Dumont (Aeroporto)",
        description:
          "Aeroporto central no coração do Rio, com voos domésticos e regionais.",
        image: "/images/santos-dumont-airport-rio.jpg",
        passengers: "Passageiros: 1-4",
      },
      {
        id: "rodoviario",
        name: "Rodoviário Novo Rio",
        description:
          "Principal terminal rodoviário do Rio com conexões para todo o Brasil.",
        image: "/images/rodoviario-novo-rio-terminal.jpg",
        passengers: "Passageiros: 1-4",
      },
      {
        id: "monte-verde",
        name: "Monte Verde",
        description:
          "Região residencial com vistas incríveis e acesso a diversos bairros.",
        image: "/images/monte-verde-rio-de-janeiro.jpg",
        passengers: "Passageiros: 1-4",
      },
      {
        id: "centro",
        name: "Centro Histórico",
        description:
          "Coração histórico do Rio com museus, arquitetura colonial e vida cultural.",
        image: "/images/centro-rio-de-janeiro-historic.jpg",
        passengers: "Passageiros: 1-4",
      },
    ],
    DESTINATIONDETAILS: {
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
        description:
          "O Centro do Rio é o coração histórico e comercial da cidade.",
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
    },

    // Header e Navegação
    home: "Home",
    viagensRio: "Viagens Rio",
    regiaoLagos: "Região dos Lagos",
    tours: "Tours",
    sobre: "Sobre",
    contato: "Contato",
    motorista: "Motorista RJ",
    selecionarIdioma: "Selecionar Idioma",
    reservar: "Reservar",
    reservarWhatsapp: "Reservar no WhatsApp",
    footerDescription:
      "RJ Transfer - Transfere-se com segurança e conforto. Oferecemos viagens confiáveis e seguras pelo Rio de Janeiro.",
    footerCopyright: "RJ Transfer. Todos os direitos reservados.",
    atendimento: "Atendimento 24h",

    // Home
    vantagens: "Porque escolher nossas viagens?",
    vantagensSubtitulo: "Viagens confiáveis e seguras pelo Rio de Janeiro",
    viagensConfiaveisSeguras:
      "Viagens confiáveis e seguras pelo Rio de Janeiro",
    explorarDestinos: "Explorar Destinos",
    experiencia: "Experiência",
    motoristaExperiente:
      "Motorista experiente com conhecimento profundo das ruas do Rio",
    pontualidade: "Pontualidade",
    compromissoHorarios:
      "Compromisso com horários precisos em todas as corridas",
    conforto: "Conforto",
    veiculoBemMantido: "Veículo bem mantido e ambiente seguro para viagem",

    // Dados dos destinos Rio
    destinos_rio: {
      copacabana: {
        name: "Copacabana",
        description:
          "Uma das praias mais famosas do Rio, conhecida por suas areias douradas e vida noturna vibrante.",
      },
      "cristo-redentor": {
        name: "Cristo Redentor",
        description:
          "O ícone do Rio de Janeiro, oferecendo vistas panorâmicas espetaculares da cidade.",
      },
      ipanema: {
        name: "Ipanema",
        description:
          "Praia elegante e charmosa, famosa pela cultura, moda e vibrante vida social.",
      },
      galeao: {
        name: "Galeão (Aeroporto)",
        description:
          "Transferências para o principal aeroporto internacional do Rio de Janeiro.",
      },
      "santos-dumont": {
        name: "Santos Dumont (Aeroporto)",
        description:
          "Aeroporto central no coração do Rio, com voos domésticos e regionais.",
      },
      rodoviario: {
        name: "Rodoviário Novo Rio",
        description:
          "Principal terminal rodoviário do Rio com conexões para todo o Brasil.",
      },
      "monte-verde": {
        name: "Monte Verde",
        description:
          "Região residencial com vistas incríveis e acesso a diversos bairros.",
      },
      centro: {
        name: "Centro Histórico",
        description:
          "Coração histórico do Rio com museus, arquitetura colonial e vida cultural.",
      },
    },

    // Dados dos destinos Lagos
    destinos_lagos: {
      buzios: {
        name: "Armação dos Búzios",
        description:
          "Destino turístico paradisíaco com praias selvagens, pôr do sol espetacular e charme cosmopolita.",
      },
      "arraial-do-cabo": {
        name: "Arraial do Cabo",
        description:
          "Conhecida como a 'Caribe brasileira' com águas cristalinas e praias de areia branca.",
      },
      "cabo-frio": {
        name: "Cabo Frio",
        description:
          "Balneário tradicional com farol histórico, praias bonitas e movimentação comercial.",
      },
      "sao-pedro": {
        name: "São Pedro da Aldeia",
        description:
          "Município histórico com praias tranquilas e rica herança cultural e colonial.",
      },
      "rio-ostras": {
        name: "Rio das Ostras",
        description:
          "Praia tranquila e acolhedora, perfeita para famílias com infraestrutura completa.",
      },
      macae: {
        name: "Macaé",
        description:
          "Polo industrial e turístico com praias selvagens e natureza exuberante.",
      },
      araruama: {
        name: "Araruama",
        description:
          "Conhecida por sua lagoa única com águas quentes, ideal para relaxamento e turismo.",
      },
      iguaba: {
        name: "Iguaba Grande",
        description:
          "Pérola da Região dos Lagos com praias selvagens, natureza preservada e tranquilidade.",
      },
    },

    // Dados dos tours
    tours_list: {
      "tour-rio-classico": {
        name: "Tour Clássico do Rio",
        description:
          "Conheça os principais pontos turísticos do Rio de Janeiro em um dia completo.",
        duration: "8-10 horas",
      },
      "tour-praias-rio": {
        name: "Tour das Praias do Rio",
        description:
          "Um dia tranquilo explorando as praias mais incríveis da zona sul.",
        duration: "8 horas",
      },
      "tour-lagos-completo": {
        name: "Tour Completo Região dos Lagos",
        description: "Explore toda a Região dos Lagos em um dia inesquecível.",
        duration: "10-12 horas",
      },
      "tour-buzios-dia": {
        name: "Dia em Armação dos Búzios",
        description:
          "Um dia completo neste paraíso com praias e restaurantes paradisíacos.",
        duration: "9-10 horas",
      },
      "tour-aventura": {
        name: "Tour de Aventura",
        description:
          "Para os mais aventureiros! Trilhas e atividades radicais na região.",
        duration: "8-10 horas",
      },
      "tour-cultural": {
        name: "Tour Cultural e Histórico",
        description: "Mergulhe na história e cultura do Rio de Janeiro.",
        duration: "6-8 horas",
      },
      "tour-gastronomico": {
        name: "Tour Gastronômico",
        description: "Descubra os melhores sabores e restaurantes locais.",
        duration: "6-8 horas",
      },
      "tour-personalizado": {
        name: "Tour Personalizado",
        description: "Crie seu próprio roteiro! Escolha os locais e horários.",
        duration: "Flexível",
      },
    },

    // Tours info
    comoFuncionamTours: "Como Funcionam Nossos Tours",
    escolhaTour: "Escolha um Tour",
    escolhaTourDesc:
      "Selecione um dos nossos tours disponíveis ou peça um personalizado",
    diaInteiro: "Dia Inteiro com Flexibilidade",
    diaInteiroDesc:
      "Ficarei à sua disposição o dia todo, levando para onde quiser na região",
    retornoGarantido: "Retorno Garantido",
    retornoGarantidoDesc:
      "Voltaremos para qualquer local que você desejar na região dos lagos",
    prontoAventura: "Pronto para a Aventura?",
    entreEmContatoTour: "Entre em contato e agende seu tour agora mesmo!",
    agendarAgora: "Agendar Agora",

    regiaoLagosTitulo: "Viagens na Região dos Lagos",
    regiaoLagosDescricao:
      "Conheça todos os principais destinos da Região dos Lagos",
    toursTitulo: "Tours Disponíveis",
    toursSubtitulo:
      "Passeios completos com flexibilidade total para sua família",
    regiaoRioTitulo: "Viagens no Rio de Janeiro",
    regiaoRioDescricao:
      "Descubra todos os principais destinos do Rio de Janeiro",

    // Novos itens
    destaques: "Destaques",
    voltarParaViagens: "Voltar para Viagens",
    capacidade: "Capacidade",
    melhorHorario: "Melhor Horário",
    custoEstimado: "Custo Estimado",
    solicitarCorrida: "Solicitar Corrida",
    outrosDestinos: "Outros Destinos",
    conhecerMais: "Conhecer Mais",
    tourNaoEncontrado: "Tour não encontrado",
    itinerario: "Itinerário",
    oQueEstaIncluido: "O que está incluído",
    oQueNaoEstaIncluido: "O que NÃO está incluído",
    duracao: "Duração",
    preco: "Preço",
    melhorPara: "Melhor para",
  },
  en: {
    FEATURES: [
      {
        id: "comfort",
        title: "Comfort and Safety",
        Icon: ShieldCheck,
      },
      {
        id: "driver",
        title: "Experienced Driver",
        Icon: UserCheck,
      },
      {
        id: "luggage",
        title: "Luggage Available",
        Icon: Package,
      },
    ],

    DESTINATIONS: [
      {
        id: "copacabana",
        name: "Copacabana",
        description:
          "One of the most famous beaches in Rio, known for its golden sands and vibrant nightlife.",
        image: "/images/copacabana-beach-rio.png",
        passengers: "passengers: 1-4",
      },
      {
        id: "cristo-redentor",
        name: "Cristo Redentor",
        description:
          "The iconic Rio de Janeiro, offering panoramic views of the city.",
        image: "/images/cristo-redentor-rio-de-janeiro.jpg",
        passengers: "passengers: 1-4",
      },
      {
        id: "ipanema",
        name: "Ipanema",
        description:
          "Elegant and charming beach, famous for its culture, fashion and vibrant social life.",
        image: "/images/ipanema-beach-rio-de-janeiro.jpg",
        passengers: "passengers: 1-4",
      },
      {
        id: "galeao",
        name: "Galeão (Aeroporto)",
        description:
          "Transfers to Rio de Janeiro's main international airport.",
        image: "/images/airport-rio-de-janeiro.jpg",
        passengers: "passengers: 1-4",
      },
      {
        id: "santos-dumont",
        name: "Santos Dumont (Aeroporto)",
        description:
          "Central airport in the heart of Rio, with domestic and regional flights.",
        image: "/images/santos-dumont-airport-rio.jpg",
        passengers: "passengers: 1-4",
      },
      {
        id: "rodoviario",
        name: "Rodoviário Novo Rio",
        description:
          "The main railway terminal in Rio, with connections to all of Brazil.",
        image: "/images/rodoviario-novo-rio-terminal.jpg",
        passengers: "passengers: 1-4",
      },
      {
        id: "monte-verde",
        name: "Monte Verde",
        description:
          "Residential region with stunning views and access to various neighborhoods.",
        image: "/images/monte-verde-rio-de-janeiro.jpg",
        passengers: "passengers: 1-4",
      },
      {
        id: "centro",
        name: "Centro Histórico",
        description:
          "Historical center of Rio with museums, colonial architecture, and cultural life.",
        image: "/images/centro-rio-de-janeiro-historic.jpg",
        passengers: "passengers: 1-4",
      },
    ],
    DESTINATIONDETAILS: {
      copacabana: {
        name: "Copacabana",
        image: "/images/copacabana-beach-aerial-view.jpg",
        description:
          "Copacabana is one of the most iconic beaches in Rio de Janeiro and Brazil, world-famous for its golden sands, crystal-clear waters, and vibrant atmosphere.",
        fullDescription: `Copacabana attracts tourists and locals with its 4.5 km long beach. The area offers a lively nightlife with bars, restaurants, and nightclubs. During the day, visitors can enjoy the beach, water sports, and cultural events. The promenade is perfect for walks and features many kiosks selling local food and drinks.`,
        highlights: [
          "4.5 km long beach",
          "Historic Copacabana Fort",
          "Vibrant nightlife",
          "Many restaurants and bars",
          "Water sports and activities",
        ],
        passengers: "1-4",
        bestTime: "All year round, especially summer (December to February)",
        estimatedCost: "Starting from R$ 25.00",
      },

      "cristo-redentor": {
        name: "Christ the Redeemer",
        image: "/images/cristo-redentor-statue-rio-de-janeiro.jpg",
        description:
          "Christ the Redeemer is the most famous symbol of Rio de Janeiro and one of the New Seven Wonders of the World.",
        fullDescription: `Located at the top of Corcovado Mountain, Christ the Redeemer offers 360-degree panoramic views of Rio de Janeiro. Standing 38 meters tall and weighing 635 tons, it is an engineering masterpiece and receives more than 2 million visitors per year.`,
        highlights: [
          "360-degree panoramic views",
          "UNESCO World Heritage site",
          "One of the Seven Wonders",
          "Interactive museum",
          "Easy access by train or van",
        ],
        passengers: "1-4",
        bestTime: "Clear days, avoid very cloudy weather",
        estimatedCost: "Starting from R$ 30.00",
      },

      ipanema: {
        name: "Ipanema",
        image: "/images/ipanema-beach-rio-de-janeiro-sunset.jpg",
        description:
          "Ipanema is synonymous with sophistication, elegance, and quality of life in Rio de Janeiro.",
        fullDescription: `A traditional neighborhood in Rio’s South Zone, Ipanema is known for its beautiful beaches, shopping centers, refined restaurants, and stylish bars. It is an important cultural and commercial area, and its beach is usually calmer than Copacabana.`,
        highlights: [
          "Charming and calm beach",
          "Quality shopping malls",
          "Fine dining restaurants",
          "Art galleries and culture",
          "Elegant nightlife",
        ],
        passengers: "1-4",
        bestTime: "All year round, especially on weekends",
        estimatedCost: "Starting from R$ 28.00",
      },

      galeao: {
        name: "Galeão – International Airport",
        image: "/images/rio-de-janeiro-international-airport.jpg",
        description:
          "Tom Jobim International Airport (Galeão) is Rio de Janeiro’s main airport.",
        fullDescription: `Located on Ilha do Governador, about 20 km from downtown Rio, Galeão handles international flights and many domestic routes. The airport offers modern facilities and good connections to the city.`,
        highlights: [
          "International airport",
          "20 km from downtown",
          "Modern terminal",
          "Good transport connections",
          "Full services",
        ],
        passengers: "1-4",
        bestTime: "Available 24 hours",
        estimatedCost: "Starting from R$ 45.00 to downtown",
      },

      "santos-dumont": {
        name: "Santos Dumont – Downtown Airport",
        image: "/images/santos-dumont-airport-downtown-rio.jpg",
        description:
          "Santos Dumont Airport is the most centrally located airport in Rio de Janeiro.",
        fullDescription: `Located on Guanabara Bay near the historic downtown, Santos Dumont is known as the “Downtown Airport”. It mainly handles short-haul domestic flights and is ideal for travelers who want to save time.`,
        highlights: [
          "Central location",
          "Near the Museum of Tomorrow",
          "Domestic flights",
          "Quick access to downtown",
          "Compact terminal",
        ],
        passengers: "1-4",
        bestTime: "Available 24 hours",
        estimatedCost: "Starting from R$ 20.00 to downtown",
      },

      rodoviario: {
        name: "Novo Rio Bus Terminal",
        image: "/images/novo-rio-bus-terminal.jpg",
        description:
          "Novo Rio is the main intercity bus terminal of Rio de Janeiro.",
        fullDescription: `Located in the port area, Novo Rio connects the city to more than 1,000 destinations throughout Brazil. It is a major interstate transportation hub with modern services and facilities.`,
        highlights: [
          "Modern terminal",
          "Nationwide connections",
          "More than 1,000 destinations",
          "Restaurants and services",
          "Safety and comfort",
        ],
        passengers: "1-4",
        bestTime: "Available 24 hours, avoid peak hours",
        estimatedCost: "Starting from R$ 15.00 to downtown",
      },

      "monte-verde": {
        name: "Monte Verde",
        image: "/images/monte-verde-neighborhood-rio-de-janeiro.jpg",
        description:
          "Monte Verde is a privileged residential area with spectacular views of the city.",
        fullDescription: `Located in the South Zone, Monte Verde offers a perfect combination of upscale residences and easy access to Rio’s best areas. The neighborhood is known for quality condominiums, safety, and excellent quality of life.`,
        highlights: [
          "Panoramic views",
          "Safe residential area",
          "Upscale condominiums",
          "Easy access to the South Zone",
          "High quality of life",
        ],
        passengers: "1-4",
        bestTime: "All year round",
        estimatedCost: "Starting from R$ 22.00 to downtown",
      },

      centro: {
        name: "Historic Downtown",
        image: "/images/centro-historico-rio-de-janeiro-downtown.jpg",
        description:
          "Rio de Janeiro’s downtown is the historical and commercial heart of the city.",
        fullDescription: `The historic downtown concentrates major cultural institutions, museums, theaters, and financial centers. It blends colonial architecture with modern buildings and offers a vibrant cultural scene.`,
        highlights: [
          "Historic heritage",
          "Museums and theaters",
          "Colonial and modern architecture",
          "Commercial center",
          "Vibrant cultural life",
        ],
        passengers: "1-4",
        bestTime: "Daytime for sightseeing",
        estimatedCost: "Starting from R$ 15.00 to the South Zone",
      },
    },

    // Header e Navegação
    home: "Home",
    viagensRio: "Rio Trips",
    regiaoLagos: "Lagos Region",
    tours: "Tours",
    sobre: "About",
    contato: "Contact",
    motorista: "RJ Driver",
    selecionarIdioma: "Select Language",
    reservar: "Reserve",
    reservarWhatsapp: "Reserve on WhatsApp",
    footerDescription:
      "RJ Transfer - Transfer safely and comfortably. We offer reliable and safe trips around Rio de Janeiro.",
    footerCopyright: " Rio Trips. All rights reserved.",
    atendimento: "24-hour service",

    // Home
    vantagens: "Why choose our trips?",
    vantagensSubtitulo: "Reliable and safe trips throughout Rio de Janeiro",
    viagensConfiaveisSeguras:
      "Reliable and safe trips throughout Rio de Janeiro",
    explorarDestinos: "Explore Destinations",
    experiencia: "Experience",
    motoristaExperiente:
      "Experienced driver with deep knowledge of Rio's streets",
    pontualidade: "Punctuality",
    compromissoHorarios: "Commitment to precise schedules on all rides",
    conforto: "Comfort",
    veiculoBemMantido: "Well-maintained vehicle and safe travel environment",

    // Dados dos destinos Rio
    destinos_rio: {
      copacabana: {
        name: "Copacabana",
        description:
          "One of Rio's most famous beaches, known for its golden sands and vibrant nightlife.",
      },
      "cristo-redentor": {
        name: "Christ the Redeemer",
        description:
          "The icon of Rio de Janeiro, offering spectacular panoramic views of the city.",
      },
      ipanema: {
        name: "Ipanema",
        description:
          "Elegant and charming beach, famous for its culture, fashion and vibrant social life.",
      },
      galeao: {
        name: "Galeão (Airport)",
        description:
          "Transfers to Rio de Janeiro's main international airport.",
      },
      "santos-dumont": {
        name: "Santos Dumont (Airport)",
        description:
          "Central airport in the heart of Rio, with domestic and regional flights.",
      },
      rodoviario: {
        name: "Novo Rio Bus Station",
        description:
          "Rio's main bus terminal with connections throughout Brazil.",
      },
      "monte-verde": {
        name: "Monte Verde",
        description:
          "Residential area with incredible views and access to diverse neighborhoods.",
      },
      centro: {
        name: "Historic Downtown",
        description:
          "Rio's historic heart with museums, colonial architecture and cultural life.",
      },
    },

    destinos_lagos: {
      buzios: {
        name: "Armação dos Búzios",
        description:
          "Paradisiacal tourist destination with wild beaches, spectacular sunsets and cosmopolitan charm.",
      },
      "arraial-do-cabo": {
        name: "Arraial do Cabo",
        description:
          "Known as the 'Brazilian Caribbean' with crystal-clear waters and white sand beaches.",
      },
      "cabo-frio": {
        name: "Cabo Frio",
        description:
          "Traditional beach resort with historic lighthouse, beautiful beaches and commerce.",
      },
      "sao-pedro": {
        name: "São Pedro da Aldeia",
        description:
          "Historic municipality with tranquil beaches and rich cultural and colonial heritage.",
      },
      "rio-ostras": {
        name: "Rio das Ostras",
        description:
          "Peaceful and welcoming beach, perfect for families with complete infrastructure.",
      },
      macae: {
        name: "Macaé",
        description:
          "Industrial and tourism hub with wild beaches and exuberant nature.",
      },
      araruama: {
        name: "Araruama",
        description:
          "Known for its unique lagoon with warm waters, ideal for relaxation and tourism.",
      },
      iguaba: {
        name: "Iguaba Grande",
        description:
          "Pearl of the Lagos Region with wild beaches, preserved nature and tranquility.",
      },
    },

    tours_list: {
      "tour-rio-classico": {
        name: "Classic Rio Tour",
        description:
          "Discover Rio de Janeiro's main tourist attractions in a full day.",
        duration: "8-10 hours",
      },
      "tour-praias-rio": {
        name: "Rio Beaches Tour",
        description:
          "A peaceful day exploring the most incredible beaches of the south zone.",
        duration: "8 hours",
      },
      "tour-lagos-completo": {
        name: "Complete Lagos Region Tour",
        description: "Explore the entire Lagos Region in an unforgettable day.",
        duration: "10-12 hours",
      },
      "tour-buzios-dia": {
        name: "Day in Armação dos Búzios",
        description:
          "A full day in this paradise with beautiful beaches and paradisiacal restaurants.",
        duration: "9-10 hours",
      },
      "tour-aventura": {
        name: "Adventure Tour",
        description:
          "For the most adventurous! Trails and radical activities in the region.",
        duration: "8-10 hours",
      },
      "tour-cultural": {
        name: "Cultural and Historic Tour",
        description:
          "Immerse yourself in Rio de Janeiro's history and culture.",
        duration: "6-8 hours",
      },
      "tour-gastronomico": {
        name: "Gastronomic Tour",
        description: "Discover the best flavors and local restaurants.",
        duration: "6-8 hours",
      },
      "tour-personalizado": {
        name: "Custom Tour",
        description: "Create your own itinerary! Choose locations and times.",
        duration: "Flexible",
      },
    },

    comoFuncionamTours: "How Our Tours Work",
    escolhaTour: "Choose a Tour",
    escolhaTourDesc:
      "Select one of our available tours or request a custom one",
    diaInteiro: "Full Day with Flexibility",
    diaInteiroDesc:
      "I'll be at your service all day, taking you wherever you want in the region",
    retornoGarantido: "Guaranteed Return",
    retornoGarantidoDesc:
      "We'll return to any location you want in the Lagos region",
    prontoAventura: "Ready for Adventure?",
    entreEmContatoTour: "Get in touch and book your tour now!",
    agendarAgora: "Book Now",

    regiaoLagosTitulo: "Trips in the Lagos Region",
    regiaoLagosDescricao:
      "Discover all the main destinations in the Lagos Region",
    toursTitulo: "Available Tours",
    toursSubtitulo: "Complete tours with total flexibility for your family",
    regiaoRioTitulo: "Trips in Rio de Janeiro",
    regiaoRioDescricao: "Discover all the main destinations in Rio de Janeiro",

    // Novos itens
    destaques: "Highlights",
    voltarParaViagens: "Back to Trips",
    capacidade: "Capacity",
    melhorHorario: "Best Time",
    custoEstimado: "Estimated Cost",
    solicitarCorrida: "Request Ride",
    outrosDestinos: "Other Destinations",
    conhecerMais: "Learn More",
    tourNaoEncontrado: "Tour not found",
    itinerario: "Itinerary",
    oQueEstaIncluido: "What's Included",
    oQueNaoEstaIncluido: "What's NOT Included",
    duracao: "Duration",
    preco: "Price",
    melhorPara: "Best For",
  },
  es: {
    FEATURES: [
      {
        id: "comfort",
        title: "Conforto e Seguridad",
        Icon: ShieldCheck,
      },
      {
        id: "driver",
        title: "Conductor Experiente",
        Icon: UserCheck,
      },
      {
        id: "luggage",
        title: "Bagajeiro Disponible",
        Icon: Package,
      },
    ],
    DESTINATIONS: [
      {
        id: "copacabana",
        name: "Copacabana",
        description:
          "Una de las playas mas famosas de Rio, conocida por sus arenales doradas y vida nocturna vibrante.",
        image: "/images/copacabana-beach-rio.png",
        passengers: ": Pasajeros: 1-4",
      },
      {
        id: "cristo-redentor",
        name: "Cristo Redentor",
        description:
          "El iconico Rio de Janeiro, ofreciendo vistas panoramicas espectaculares de la ciudad.",
        image: "/images/cristo-redentor-rio-de-janeiro.jpg",
        passengers: ": Pasajeros: 1-4",
      },
      {
        id: "ipanema",
        name: "Ipanema",
        description:
          "Playa elegante y charmosa, famosa por su cultura, moda y vida social vibrante.",
        image: "/images/ipanema-beach-rio-de-janeiro.jpg",
        passengers: ": Pasajeros: 1-4",
      },
      {
        id: "galeao",
        name: "Galeão (Aeroporto)",
        description:
          "Transferencias para el aeroporto principal de Rio de Janeiro.",
        image: "/images/airport-rio-de-janeiro.jpg",
        passengers: ": Pasajeros: 1-4",
      },
      {
        id: "santos-dumont",
        name: "Santos Dumont (Aeroporto)",
        description:
          "Transferencias para el aeroporto de Santos Dumont en Rio de Janeiro.",
        image: "/images/santos-dumont-airport-rio.jpg",
        passengers: ": Pasajeros: 1-4",
      },
      {
        id: "rodoviario",
        name: "Rodoviário Novo Rio",
        description:
          "Terminal principal del rodoviário de Rio con conexiones a todo el Brasil.",
        image: "/images/rodoviario-novo-rio-terminal.jpg",
        passengers: ": Pasajeros: 1-4",
      },
      {
        id: "monte-verde",
        name: "Monte Verde",
        description:
          "Región residencial con vistas increibles y acceso a diversos bairros.",
        image: "/images/monte-verde-rio-de-janeiro.jpg",
        passengers: ": Pasajeros: 1-4",
      },
      {
        id: "centro",
        name: "Centro Histórico",
        description:
          "Centro histórico de Rio con museos, arquitectura colonial y vida cultural.",
        image: "/images/centro-rio-de-janeiro-historic.jpg",
        passengers: "Pasajeros: 1-4",
      },
    ],
    DESTINATIONDETAILS: {
      copacabana: {
        name: "Copacabana",
        image: "/images/copacabana-beach-aerial-view.jpg",
        description:
          "Copacabana es una de las playas más icónicas de Río de Janeiro y de Brasil, famosa en todo el mundo por sus arenas doradas, aguas cristalinas y ambiente vibrante.",
        fullDescription: `Copacabana atrae a turistas y residentes con su playa de 4,5 km de extensión. La zona ofrece una animada vida nocturna con bares, restaurantes y discotecas. Durante el día se puede disfrutar de la playa, deportes acuáticos y eventos culturales. El paseo marítimo es ideal para caminar y cuenta con numerosos quioscos de comida y bebida típica.`,
        highlights: [
          "Playa de 4,5 km de extensión",
          "Histórico Fuerte de Copacabana",
          "Vida nocturna vibrante",
          "Numerosos bares y restaurantes",
          "Deportes acuáticos y actividades",
        ],
        passengers: "1-4",
        bestTime: "Todo el año, especialmente en verano (diciembre a febrero)",
        estimatedCost: "Desde R$ 25,00",
      },

      "cristo-redentor": {
        name: "Cristo Redentor",
        image: "/images/cristo-redentor-statue-rio-de-janeiro.jpg",
        description:
          "El Cristo Redentor es el símbolo más famoso de Río de Janeiro y una de las Siete Maravillas del Mundo.",
        fullDescription: `Ubicado en la cima del Cerro del Corcovado, el Cristo Redentor ofrece vistas panorámicas de 360 grados de Río de Janeiro. Con 38 metros de altura y un peso de 635 toneladas, es una obra maestra de la ingeniería y recibe más de 2 millones de visitantes al año.`,
        highlights: [
          "Vistas panorámicas de 360 grados",
          "Patrimonio de la UNESCO",
          "Una de las Siete Maravillas",
          "Museo interactivo",
          "Acceso fácil en tren o van",
        ],
        passengers: "1-4",
        bestTime: "Días despejados, evitar días muy nublados",
        estimatedCost: "Desde R$ 30,00",
      },

      ipanema: {
        name: "Ipanema",
        image: "/images/ipanema-beach-rio-de-janeiro-sunset.jpg",
        description:
          "Ipanema es sinónimo de sofisticación, elegancia y calidad de vida en Río de Janeiro.",
        fullDescription: `Barrio tradicional de la Zona Sur de Río, Ipanema es conocido por sus hermosas playas, centros comerciales, restaurantes y bares sofisticados. Es un importante punto cultural y comercial de la ciudad. La playa de Ipanema es más tranquila que Copacabana.`,
        highlights: [
          "Playa tranquila y encantadora",
          "Centros comerciales de calidad",
          "Restaurantes sofisticados",
          "Galerías de arte y cultura",
          "Vida nocturna elegante",
        ],
        passengers: "1-4",
        bestTime: "Todo el año, especialmente los fines de semana",
        estimatedCost: "Desde R$ 28,00",
      },

      galeao: {
        name: "Galeão – Aeropuerto Internacional",
        image: "/images/rio-de-janeiro-international-airport.jpg",
        description:
          "El Aeropuerto Internacional Tom Jobim (Galeão) es el principal aeropuerto de Río de Janeiro.",
        fullDescription: `El Galeão está ubicado en la Isla del Gobernador, a unos 20 km del centro de Río. Es la principal terminal de vuelos internacionales y numerosos vuelos nacionales. Ofrece buenas instalaciones y conexiones con la ciudad.`,
        highlights: [
          "Aeropuerto internacional",
          "A 20 km del centro",
          "Terminal moderno",
          "Buenas conexiones de transporte",
          "Servicios completos",
        ],
        passengers: "1-4",
        bestTime: "Disponible las 24 horas",
        estimatedCost: "Desde R$ 45,00 hasta el centro",
      },

      "santos-dumont": {
        name: "Santos Dumont – Aeropuerto Central",
        image: "/images/santos-dumont-airport-downtown-rio.jpg",
        description:
          "El Aeropuerto Santos Dumont es el aeropuerto más céntrico de Río de Janeiro.",
        fullDescription: `Ubicado en la Bahía de Guanabara, cerca del centro histórico, el Santos Dumont es conocido como el “Aeropuerto del Centro”. Recibe principalmente vuelos nacionales de corta distancia y es muy conveniente para ahorrar tiempo.`,
        highlights: [
          "Ubicación central",
          "Cerca del Museo del Mañana",
          "Vuelos nacionales",
          "Acceso rápido al centro",
          "Terminal compacto",
        ],
        passengers: "1-4",
        bestTime: "Disponible las 24 horas",
        estimatedCost: "Desde R$ 20,00 hasta el centro",
      },

      rodoviario: {
        name: "Terminal Rodoviario Novo Rio",
        image: "/images/novo-rio-bus-terminal.jpg",
        description:
          "El Terminal Novo Rio es el principal terminal de autobuses de Río de Janeiro.",
        fullDescription: `Ubicado en la zona portuaria, Novo Rio conecta la ciudad con más de 1.000 destinos en todo Brasil. Es un importante centro de transporte interestatal con servicios modernos.`,
        highlights: [
          "Terminal moderno",
          "Conexiones a todo Brasil",
          "Más de 1.000 destinos",
          "Restaurantes y servicios",
          "Seguridad y confort",
        ],
        passengers: "1-4",
        bestTime: "Disponible las 24 horas, evitar horas pico",
        estimatedCost: "Desde R$ 15,00 hasta el centro",
      },

      "monte-verde": {
        name: "Monte Verde",
        image: "/images/monte-verde-neighborhood-rio-de-janeiro.jpg",
        description:
          "Monte Verde es una zona residencial privilegiada con vistas espectaculares de la ciudad.",
        fullDescription: `Ubicada en la Zona Sur, Monte Verde ofrece una combinación perfecta de residencias sofisticadas y fácil acceso a las mejores áreas de Río. Es conocida por sus condominios de calidad, seguridad y excelente nivel de vida.`,
        highlights: [
          "Vistas panorámicas",
          "Zona residencial segura",
          "Condominios sofisticados",
          "Acceso a la Zona Sur",
          "Alta calidad de vida",
        ],
        passengers: "1-4",
        bestTime: "Todo el año",
        estimatedCost: "Desde R$ 22,00 hasta el centro",
      },

      centro: {
        name: "Centro Histórico",
        image: "/images/centro-historico-rio-de-janeiro-downtown.jpg",
        description:
          "El centro de Río de Janeiro es el corazón histórico y comercial de la ciudad.",
        fullDescription: `El Centro Histórico concentra importantes instituciones culturales, museos, teatros y entidades financieras. Combina arquitectura colonial con edificios modernos y una intensa vida cultural.`,
        highlights: [
          "Patrimonio histórico",
          "Museos y teatros",
          "Arquitectura colonial y moderna",
          "Centro comercial",
          "Intensa vida cultural",
        ],
        passengers: "1-4",
        bestTime: "Durante el día para turismo",
        estimatedCost: "Desde R$ 15,00 hasta la Zona Sur",
      },
    },

    // Header e Navegação
    home: "Inicio",
    viagensRio: "Viajes a Río",
    regiaoLagos: "Región de los Lagos",
    tours: "Tours",
    sobre: "Acerca de",
    contato: "Contacto",
    motorista: "Conductor RJ",
    selecionarIdioma: "Seleccionar Idioma",
    reservar: "Reservar",
    reservarWhatsapp: "Reservar en WhatsApp",
    footerDescription:
      "RJ Transfer - Traslados seguros y cómodos. Ofrecemos viajes confiables y seguros por Río de Janeiro.",
    footerCopyright: "Todos los derechos reservados",
    atendimento: "Servicio 24 horas",

    // Home
    vantagens: "Porque elegir nuestras viajes?",
    vantagensSubtitulo: "Viajes confiables y seguros por todo Río de Janeiro",
    viagensConfiaveisSeguras:
      "Viajes confiables y seguros por todo Río de Janeiro",
    explorarDestinos: "Explorar Destinos",
    experiencia: "Experiencia",
    motoristaExperiente:
      "Conductor experimentado con profundo conocimiento de las calles de Río",
    pontualidade: "Puntualidad",
    compromissoHorarios: "Compromiso con horarios precisos en todos los viajes",
    conforto: "Comodidad",
    veiculoBemMantido: "Vehículo bien mantenido y ambiente de viaje seguro",

    // Dados dos destinos Rio
    destinos_rio: {
      copacabana: {
        name: "Copacabana",
        description:
          "Una de las playas más famosas de Río, conocida por sus arenas doradas y vibrante vida nocturna.",
      },
      "cristo-redentor": {
        name: "Cristo Redentor",
        description:
          "El icono de Río de Janeiro, ofreciendo vistas panorámicas espectaculares de la ciudad.",
      },
      ipanema: {
        name: "Ipanema",
        description:
          "Playa elegante y encantadora, famosa por su cultura, moda y vibrante vida social.",
      },
      galeao: {
        name: "Galeão (Aeropuerto)",
        description:
          "Traslados al principal aeropuerto internacional de Río de Janeiro.",
      },
      "santos-dumont": {
        name: "Santos Dumont (Aeropuerto)",
        description:
          "Aeropuerto central en el corazón de Río, con vuelos nacionales y regionales.",
      },
      rodoviario: {
        name: "Terminal de Buses Novo Rio",
        description:
          "Terminal de buses principal de Río con conexiones a todo Brasil.",
      },
      "monte-verde": {
        name: "Monte Verde",
        description:
          "Zona residencial con vistas increíbles y acceso a diversos barrios.",
      },
      centro: {
        name: "Centro Histórico",
        description:
          "Corazón histórico de Río con museos, arquitectura colonial y vida cultural.",
      },
    },

    destinos_lagos: {
      buzios: {
        name: "Armação dos Búzios",
        description:
          "Destino turístico paradisíaco con playas salvajes, atardeceres espectaculares y encanto cosmopolita.",
      },
      "arraial-do-cabo": {
        name: "Arraial do Cabo",
        description:
          "Conocido como el 'Caribe brasileño' con aguas cristalinas y playas de arena blanca.",
      },
      "cabo-frio": {
        name: "Cabo Frio",
        description:
          "Balneario tradicional con faro histórico, playas bonitas y comercio.",
      },
      "sao-pedro": {
        name: "São Pedro da Aldeia",
        description:
          "Municipio histórico con playas tranquilas y rica herencia cultural y colonial.",
      },
      "rio-ostras": {
        name: "Río das Ostras",
        description:
          "Playa tranquila y acogedora, perfecta para familias con infraestructura completa.",
      },
      macae: {
        name: "Macaé",
        description:
          "Polo industrial y turístico con playas salvajes y naturaleza exuberante.",
      },
      araruama: {
        name: "Araruama",
        description:
          "Conocida por su laguna única con aguas cálidas, ideal para relajación y turismo.",
      },
      iguaba: {
        name: "Iguaba Grande",
        description:
          "Joya de la Región de los Lagos con playas salvajes, naturaleza preservada y tranquilidad.",
      },
    },

    tours_list: {
      "tour-rio-classico": {
        name: "Tour Clásico de Río",
        description:
          "Descubre las principales atracciones turísticas de Río de Janeiro en un día completo.",
        duration: "8-10 horas",
      },
      "tour-praias-rio": {
        name: "Tour de Playas de Río",
        description:
          "Un día tranquilo explorando las playas más increíbles de la zona sur.",
        duration: "8 horas",
      },
      "tour-lagos-completo": {
        name: "Tour Completo Región de los Lagos",
        description:
          "Explora toda la Región de los Lagos en un día inolvidable.",
        duration: "10-12 horas",
      },
      "tour-buzios-dia": {
        name: "Día en Armação dos Búzios",
        description:
          "Un día completo en este paraíso con playas y restaurantes paradisíacos.",
        duration: "9-10 horas",
      },
      "tour-aventura": {
        name: "Tour de Aventura",
        description:
          "¡Para los más aventureros! Senderos y actividades radicales en la región.",
        duration: "8-10 horas",
      },
      "tour-cultural": {
        name: "Tour Cultural e Histórico",
        description: "Sumérgete en la historia y cultura de Río de Janeiro.",
        duration: "6-8 horas",
      },
      "tour-gastronomico": {
        name: "Tour Gastronómico",
        description: "Descubre los mejores sabores y restaurantes locales.",
        duration: "6-8 horas",
      },
      "tour-personalizado": {
        name: "Tour Personalizado",
        description:
          "¡Crea tu propio itinerario! Elige ubicaciones y horarios.",
        duration: "Flexible",
      },
    },

    comoFuncionamTours: "Cómo Funcionan Nuestros Tours",
    escolhaTour: "Elige un Tour",
    escolhaTourDesc:
      "Selecciona uno de nuestros tours disponibles o solicita uno personalizado",
    diaInteiro: "Día Completo con Flexibilidad",
    diaInteiroDesc:
      "Estaré a tu disposición todo el día, llevándote donde quieras en la región",
    retornoGarantido: "Retorno Garantizado",
    retornoGarantidoDesc:
      "Volveremos a cualquier lugar que desees en la región de los lagos",
    prontoAventura: "¿Listo para la Aventura?",
    entreEmContatoTour: "¡Ponte en contacto y reserva tu tour ahora!",
    agendarAgora: "Reservar Ahora",

    regiaoLagosTitulo: "Viajes en la Región de los Lagos",
    regiaoLagosDescricao:
      "Descubre todos los principales destinos de la Región de los Lagos",
    toursTitulo: "Tours Disponibles",
    toursSubtitulo: "Tours completos con flexibilidad total para tu familia",
    regiaoRioTitulo: "Viajes en el Rio de Janeiro",
    regiaoRioDescricao:
      "Descubre todos los principales destinos del Rio de Janeiro",

    // Novos itens
    destaques: "Destacados",
    voltarParaViagens: "Volver a Viajes",
    capacidade: "Capacidad",
    melhorHorario: "Mejor Hora",
    custoEstimado: "Costo Estimado",
    solicitarCorrida: "Solicitar Viaje",
    outrosDestinos: "Otros Destinos",
    conhecerMais: "Conocer Más",
    tourNaoEncontrado: "Tour no encontrado",
    itinerario: "Itinerario",
    oQueEstaIncluido: "Qué Está Incluido",
    oQueNaoEstaIncluido: "Qué NO Está Incluido",
    duracao: "Duración",
    preco: "Precio",
    melhorPara: "Mejor Para",
  },
};

export type Language = "pt" | "en" | "es";
