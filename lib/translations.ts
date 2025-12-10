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
