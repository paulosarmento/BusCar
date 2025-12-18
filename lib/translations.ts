export const translations = {
  pt: {
    // Header e Navegação
    viagensRio: "Viagens Rio",
    regiaoLagos: "Região dos Lagos",
    tours: "Tours",
    reservar: "Reservar",
    contato: "Contato",
    preco: "Precos",
    consultarPreco: "Consultar Preco",
    colocarNumero: "Coloque seu telefone",
    nome: "Nome",

    tourPersonalizado: {
      celular: "Celular",
      titulo: "Monte Seu Tour Personalizado",
      subtitulo: "Escolha até 3 destinos ou adicione o seu próprio",
      selecionarDestinos: "Selecionar Destinos",
      destinosSelecionados: "Destinos Selecionados",
      adicionarCustomizado: "Adicionar Destino Customizado",
      nomeDestino: "Nome do Destino",
      placeholder: "Ex: Petrópolis, Niterói, etc.",
      adicionar: "Adicionar",
      limiteDestinos: "Você pode selecionar no máximo 3 destinos",
      nenhumDestinoSelecionado: "Nenhum destino selecionado ainda",
      remover: "Remover",
      observacoes: "Observações",
      observacoesPlaceholder:
        "Adicione observações sobre seu tour personalizado (horários preferidos, paradas especiais, etc.)",
      solicitarOrcamento: "Solicitar Orçamento",
      voltar: "Voltar para Tours",
      destinos: "Destinos",
      estimativa: "Estimativa",
      duracaoEstimada: "Duração Estimada",
      infoAdicional: "Informação Adicional",
      flexibilidadeTotal:
        "Flexibilidade total para criar a experiência perfeita",
      inclusoTransporte: "Transporte durante todo o dia",
      motoristaDedicado: "Motorista dedicado à sua disposição",
      roteiroPersonalizado: "Roteiro 100% personalizado",
      descricao:
        "Monte o tour perfeito selecionando os destinos que você deseja visitar. Você pode escolher até 3 lugares da nossa lista ou adicionar destinos personalizados.",
    },
  },
  en: {
    // Header e Navegação
    viagensRio: "Rio Trips",
    regiaoLagos: "Lagos Region",
    tours: "Tours",
    sobre: "About",
    contato: "Contact",
    reservar: "Reserve",
    preco: "Prices",
    consultarPreco: "Consult Price",
    colocarNumero: "Put your phone number",
    nome: "Name",

    tourPersonalizado: {
      celular: "Cellphone",
      titulo: "Build Your Custom Tour",
      subtitulo: "Choose up to 3 destinations or add your own",
      selecionarDestinos: "Select Destinations",
      destinosSelecionados: "Selected Destinations",
      adicionarCustomizado: "Add Custom Destination",
      nomeDestino: "Destination Name",
      placeholder: "Ex: Petrópolis, Niterói, etc.",
      adicionar: "Add",
      limiteDestinos: "You can select up to 3 destinations",
      nenhumDestinoSelecionado: "No destinations selected yet",
      remover: "Remove",
      observacoes: "Notes",
      observacoesPlaceholder:
        "Add notes about your custom tour (preferred times, special stops, etc.)",
      solicitarOrcamento: "Request Quote",
      voltar: "Back to Tours",
      destinos: "Destinations",
      estimativa: "Estimate",
      duracaoEstimada: "Estimated Duration",
      infoAdicional: "Additional Information",
      flexibilidadeTotal: "Total flexibility to create the perfect experience",
      inclusoTransporte: "Transportation throughout the day",
      motoristaDedicado: "Dedicated driver at your disposal",
      roteiroPersonalizado: "100% personalized itinerary",
      descricao:
        "Build the perfect tour by selecting the destinations you want to visit. You can choose up to 3 places from our list or add custom destinations.",
    },
  },
  es: {
    // Header e Navegação
    viagensRio: "Viajes a Río",
    regiaoLagos: "Región de los Lagos",
    tours: "Tours",
    sobre: "Acerca de",
    contato: "Contacto",
    reservar: "Reservar",
    preco: "Precios",
    consultarPreco: "Consultar Precio",
    colocarNumero: "Coloque su telefono",
    nome: "Nombre",

    tourPersonalizado: {
      celular: "Celular",
      titulo: "Arma Tu Tour Personalizado",
      subtitulo: "Elige hasta 3 destinos o agrega el tuyo propio",
      selecionarDestinos: "Seleccionar Destinos",
      destinosSelecionados: "Destinos Seleccionados",
      adicionarCustomizado: "Agregar Destino Personalizado",
      nomeDestino: "Nombre del Destino",
      placeholder: "Ej: Petrópolis, Niterói, etc.",
      adicionar: "Agregar",
      limiteDestinos: "Puedes seleccionar hasta 3 destinos",
      nenhumDestinoSelecionado: "Ningún destino seleccionado aún",
      remover: "Eliminar",
      observacoes: "Notas",
      observacoesPlaceholder:
        "Agrega notas sobre tu tour personalizado (horarios preferidos, paradas especiales, etc.)",
      solicitarOrcamento: "Solicitar Cotización",
      voltar: "Volver a Tours",
      destinos: "Destinos",
      estimativa: "Estimación",
      duracaoEstimada: "Duración Estimada",
      infoAdicional: "Información Adicional",
      flexibilidadeTotal:
        "Flexibilidad total para crear la experiencia perfecta",
      inclusoTransporte: "Transporte durante todo el día",
      motoristaDedicado: "Conductor dedicado a tu disposición",
      roteiroPersonalizado: "Itinerario 100% personalizado",
      descricao:
        "Arma el tour perfecto seleccionando los destinos que deseas visitar. Puedes elegir hasta 3 lugares de nuestra lista o agregar destinos personalizados.",
    },
  },
};
interface Destination {
  id: string;
  name: string;
  category: "rio" | "lagos";
}
// Lista de destinos disponíveis para seleção
export const availableDestinations: Destination[] = [
  // Rio de Janeiro
  { id: "copacabana", name: "Copacabana", category: "rio" },
  {
    id: "cristo-redentor",
    name: "Cristo Redentor",
    category: "rio",
  },
  { id: "ipanema", name: "Ipanema", category: "rio" },
  { id: "galeao", name: "Galeão", category: "rio" },
  {
    id: "santos-dumont",
    name: "Santos Dumont",
    category: "rio",
  },
  { id: "centro", name: "Centro Histórico", category: "rio" },
  // Região dos Lagos
  { id: "buzios", name: "Armação dos Búzios", category: "lagos" },
  {
    id: "arraial-do-cabo",
    name: "Arraial do Cabo",
    category: "lagos",
  },
  {
    id: "cabo-frio",
    name: "Cabo Frio",
    category: "lagos",
  },
  {
    id: "sao-pedro",
    name: "São Pedro da Aldeia",
    category: "lagos",
  },
  {
    id: "rio-ostras",
    name: "Rio das Ostras",
    category: "lagos",
  },
  { id: "macae", name: "Macaé", category: "lagos" },
];
